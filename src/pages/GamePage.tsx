import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
  const { sessionId, gameId } = useParams<{
    sessionId: string;
    gameId: string;
  }>();
  const navigate = useNavigate();
  const { data: game, isLoading, isFetching, error } = useGameData(gameId);

  const { fetchValidMoves, executeMove, executeAiMove, isMoving, isAiMoving } =
    useGameMoves(sessionId, gameId);

  const handleGoHome = () => {
    navigate(`/session/${sessionId}`);
  };

  const [selectedSquare, setSelectedSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [validMoves, setValidMoves] = useState<MoveDto[]>([]);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const humanColor = useMemo(() => {
    if (!game) return null;
    if (game.playerWhite.type === "HUMAN") return "WHITE";
    if (game.playerBlack.type === "HUMAN") return "BLACK";

    return "WHITE";
  }, [game]);

  const currentPlayer = useMemo(() => {
    if (!game) return null;

    return game.currentPlayerColor === "W"
      ? game.playerWhite
      : game.playerBlack;
  }, [game]);

  useEffect(() => {
    if (!game || game.state !== "IN_PROGRESS") return;

    const isAiTurn = currentPlayer?.type === "AI";

    if (isAiTurn && !isAiMoving && !isMoving && !isFetching) {
      const timer = setTimeout(() => {
        executeAiMove();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [
    currentPlayer,
    game?.state,
    isAiMoving,
    isMoving,
    isFetching,
    executeAiMove,
  ]);

  const displayBoard = useMemo(() => {
    if (!game) return null;
    if (humanColor === "BLACK") {
      const reversedRows = [...game.board.board].reverse();

      return {
        ...game.board,
        board: reversedRows.map((row) => [...row].reverse()),
      };
    }

    return game.board;
  }, [game, humanColor]);

  useEffect(() => {
    setSelectedSquare(null);
    setValidMoves([]);
  }, [game]);

  useEffect(() => {
    if (game && ["WHITE_WON", "BLACK_WON", "DRAW"].includes(game.state)) {
      setShowGameOverModal(true);
    }
  }, [game]);

  const handleSquareClick = async (row: number, col: number) => {
    if (!game || isMoving || isAiMoving || currentPlayer?.type === "AI") return;

    const humanColorShort = humanColor === "WHITE" ? "W" : "B";

    if (game.currentPlayerColor !== humanColorShort) return;

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

        return;
      }
    }

    const square = game.board.board[row][col];

    if (square.piece && square.piece.color === humanColorShort) {
      setSelectedSquare({ row, col });
      const moves = await fetchValidMoves(row, col);

      setValidMoves(moves);
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen hasError={true} />;
  if (!game || !displayBoard) return <ErrorScreen hasError={false} />;

  const isGameOver = ["WHITE_WON", "BLACK_WON", "DRAW"].includes(game.state);
  const boardWrapperClasses = `relative flex justify-center w-full max-w-6xl transition-transform duration-500 ease-soft-spring ${
    instructionsOpen ? "-translate-x-40" : ""
  }`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-10 px-4 pb-32 relative overflow-hidden">
      <GameHeader />
      <GameInfoPanel game={game} isGameOver={isGameOver} />

      <div className={boardWrapperClasses}>
        <div className="relative shadow-2xl rounded-xl overflow-hidden border-8 border-amber-800/20">
          {isAiMoving && <AiThinkingOverlay />}

          <Board
            activePieces={game.activePieces}
            board={displayBoard}
            currentPlayerColor={game.currentPlayerColor}
            humanColor={humanColor ?? "WHITE"}
            isMoving={isMoving || isAiMoving}
            selectedSquare={selectedSquare}
            validMoves={validMoves}
            onSquareClick={handleSquareClick}
          />
        </div>

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
            <GameInstructions />
          </div>
        )}
      </div>

      {showGameOverModal && (
        <GameOverModal
          game={game}
          onClose={() => setShowGameOverModal(false)}
          onHome={handleGoHome}
        />
      )}
    </div>
  );
}
