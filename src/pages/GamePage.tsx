// src/pages/GamePage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@heroui/react";

import { Board } from "@/components/Board";
import { useGameData } from "@/hooks/useGameData";
import { useGameMoves } from "@/hooks/useGameMoves";
import { MoveDto } from "@/model/moveDto";
import { ErrorScreen, LoadingScreen } from "@/components/GameStatusScreens.tsx";
import { GameHeader } from "@/components/GameHeader.tsx";
import { GameInfoPanel } from "@/components/GameInfoPanel.tsx";
import { GameInstructions } from "@/components/GameInstructions.tsx";
import { GameOverModal } from "@/components/GameOverModal.tsx";
import { AiThinkingOverlay } from "@/components/AiThinkingOverlay";

export function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, isFetching,error } = useGameData(gameId);

  // Destructureer ook isAiMoving uit de hook
  const { fetchValidMoves, executeMove,executeAiMove, isMoving, isAiMoving } =
    useGameMoves(gameId);

  // Local State
  const [selectedSquare, setSelectedSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [validMoves, setValidMoves] = useState<MoveDto[]>([]);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Memoizeer wie de huidige speler is
  const currentPlayer = useMemo(() => {
    if (!game) return null;

    return game.currentPlayerColor === "W"
      ? game.playerWhite
      : game.playerBlack;
  }, [game]);

  // AUTOMATISCHE AI TRIGGER
  useEffect(() => {
    // 1. Stop als er geen game is of game is gedaan
    if (!game || game.state !== "IN_PROGRESS") return;

    // 2. Check of het de beurt is aan de AI
    const isAiTurn = currentPlayer?.type === "AI";

    // 3. De cruciale check:
    // Trigger de AI move alleen als:
    // - Het AI turn is
    // - Er geen actie van de AI loopt (isAiMoving)
    // - Er geen menselijke zet loopt (isMoving)
    // - De backend data niet aan het refreshen is (isFetching) <--- DIT STOPT DE LUS
    const canTriggerAi = isAiTurn && !isAiMoving && !isMoving && !isFetching;

    if (canTriggerAi) {
      const timer = setTimeout(() => {
        executeAiMove();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, game?.state, isAiMoving, isMoving, isFetching, executeAiMove]);

  // Reset local state when game updates
  useEffect(() => {
    setSelectedSquare(null);
    setValidMoves([]);
  }, [game]);

  // Check for game over state
  useEffect(() => {
    if (game) {
      const isGameOver = ["WHITE_WON", "BLACK_WON", "DRAW"].includes(
        game.state,
      );

      if (isGameOver) {
        setShowGameOverModal(true);
      }
    }
  }, [game]);

  const handleSquareClick = async (row: number, col: number) => {
    // Blokkeer input als er bewogen wordt OF als de AI aan zet is
    if (!game || isMoving || isAiMoving || currentPlayer?.type === "AI") return;

    if (selectedSquare) {
      const validMove = validMoves.find(
        (move) => move.toRow === row && move.toCol === col,
      );

      if (validMove) {
        executeMove({
          fromRow: validMove.fromRow,
          fromCol: validMove.fromCol,
          toRow: validMove.toRow,
          toCol: validMove.toCol,
        });
        setSelectedSquare(null);
        setValidMoves([]);
      } else {
        const square = game.board.board[row][col];

        if (square.piece && square.piece.color === game.currentPlayerColor) {
          setSelectedSquare({ row, col });
          const moves = await fetchValidMoves(row, col);

          setValidMoves(moves);
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      const square = game.board.board[row][col];

      if (square.piece && square.piece.color === game.currentPlayerColor) {
        setSelectedSquare({ row, col });
        const moves = await fetchValidMoves(row, col);

        setValidMoves(moves);
      }
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen hasError={true} />;
  if (!game) return <ErrorScreen hasError={false} />;

  const isGameOver = ["WHITE_WON", "BLACK_WON", "DRAW"].includes(game.state);

  const boardWrapperClasses = `relative flex justify-center w-full max-w-6xl transition-transform duration-500 ease-soft-spring ${
    instructionsOpen ? "-translate-x-40" : ""
  }`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-10 px-4 pb-32 relative overflow-hidden">
      <GameHeader />
      <GameInfoPanel game={game} isGameOver={isGameOver} />

      {/* Board Wrapper */}
      <div className={boardWrapperClasses}>
        <div className="relative shadow-2xl rounded-xl overflow-hidden border-8 border-amber-800/20">
          {/* AI Thinking Overlay wordt hier getoond */}
          {isAiMoving && <AiThinkingOverlay />}

          <Board
            activePieces={game.activePieces}
            board={game.board}
            currentPlayerColor={game.currentPlayerColor}
            highlightSquare={null}
            isMoving={isMoving || isAiMoving}
            selectedSquare={selectedSquare}
            validMoves={validMoves}
            onSquareClick={handleSquareClick}
          />
        </div>

        {/* HeroUI Button voor Instructions */}
        {!instructionsOpen && (
          <Button
            isIconOnly
            className="absolute top-0 -right-16 bg-amber-500 text-white shadow-lg hover:scale-110 transition-transform"
            radius="full"
            size="lg"
            onPress={() => setInstructionsOpen(true)}
          >
            📖
          </Button>
        )}

        {/* Instructions Panel */}
        {instructionsOpen && (
          <div className="absolute top-0 right-[-160px] w-96 h-full bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 overflow-auto animate-in slide-in-from-right duration-500">
            <Button
              isIconOnly
              className="absolute top-4 right-4 text-gray-500"
              variant="light"
              onPress={() => setInstructionsOpen(false)}
            >
              ❌
            </Button>
            <GameInstructions currentPlayerColor={game.currentPlayerColor} />
          </div>
        )}
      </div>

      {showGameOverModal && (
        <GameOverModal
          game={game}
          onClose={() => setShowGameOverModal(false)}
          onHome={() => navigate("/")}
        />
      )}
    </div>
  );
}
