import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Board } from "@/components/Board";
import { useGameData } from "@/hooks/useGameData";
import { useGameMoves } from "@/hooks/useGameMoves";
import { MoveDto } from "@/model/moveDto";
import { ErrorScreen, LoadingScreen } from "@/components/GameStatusScreens.tsx";
import { GameHeader } from "@/components/GameHeader.tsx";
import { GameInfoPanel } from "@/components/GameInfoPanel.tsx";
import { GameInstructions } from "@/components/GameInstructions.tsx";
import { GameOverModal } from "@/components/GameOverModal.tsx";

export function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, error } = useGameData(gameId);
  const { fetchValidMoves, executeMove, isMoving } = useGameMoves(gameId);

  // Local State
  const [selectedSquare, setSelectedSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [validMoves, setValidMoves] = useState<MoveDto[]>([]);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  // Reset local state when game updates
  useEffect(() => {
    setSelectedSquare(null);
    setValidMoves([]);
  }, [game]);

  // Check for game over state
  useEffect(() => {
    if (game) {
      const isGameOver =
          game.state === "WHITE_WON" ||
          game.state === "BLACK_WON" ||
          game.state === "DRAW";

      if (isGameOver) {
        setShowGameOverModal(true);
      }
    }
  }, [game]);

  const handleSquareClick = async (row: number, col: number) => {
    if (!game || isMoving) return;

    if (selectedSquare) {
      const validMove = validMoves.find(
          (move) => move.toRow === row && move.toCol === col,
      );

      if (validMove) {
        // Execute move directly
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

  const openInstructions = () => setInstructionsOpen(true);
  const closeInstructions = () => setInstructionsOpen(false);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen hasError={true} />;
  if (!game) return <ErrorScreen hasError={false} />;

  const isGameOver = ["WHITE_WON", "BLACK_WON", "DRAW"].includes(game.state);

  const boardWrapperClasses = `relative flex justify-center w-full max-w-6xl transition-transform duration-300 ${
      instructionsOpen ? "-translate-x-40" : ""
  }`;

  return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-10 px-4 pb-32 relative">
        <GameHeader />
        <GameInfoPanel game={game} isGameOver={isGameOver} />

        {/* Board Wrapper */}
        <div className={boardWrapperClasses}>
          <Board
              activePieces={game.activePieces}
              board={game.board}
              currentPlayerColor={game.currentPlayerColor}
              highlightSquare={null}
              isMoving={isMoving}
              selectedSquare={selectedSquare}
              validMoves={validMoves}
              onSquareClick={handleSquareClick}
          />

          {/* Open Instructions Button  */}
          {!instructionsOpen && (
              <button
                  className="absolute top-0 -right-0 w-12 h-12 bg-amber-400 text-white font-bold rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-amber-500 transition"
                  title="Show Game Instructions"
                  onClick={openInstructions}
              >
                📖
              </button>
          )}

          {/* Instructions Panel */}
          {instructionsOpen && (
              <div className="absolute top-0 right-[-160px] w-96 h-full bg-white shadow-xl rounded-l-2xl p-6 overflow-auto transition-transform duration-300 animate-slide-in">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition text-2xl"
                    title="Close Instructions"
                    onClick={closeInstructions}
                >
                  ❌
                </button>

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