import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Board } from "@/components/Board";
import { useGameData } from "@/hooks/useGameData";
import { useGameMoves } from "@/hooks/useGameMoves";
import { MoveDto } from "@/model/moveDto";
import { BoardDto } from "@/model/gameDto";
import { ErrorScreen, LoadingScreen } from "@/components/GameStatusScreens.tsx";
import { GameHeader } from "@/components/GameHeader.tsx";
import { GameInfoPanel } from "@/components/GameInfoPanel.tsx";
import { MoveConfirmationBar } from "@/components/MoveConfirmationBar.tsx";
import { GameInstructions } from "@/components/GameInstructions.tsx";
import { GameOverModal } from "@/components/GameOverModal.tsx";
import { createPreviewBoard } from "@/utils/boardUtils.ts";

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
  const [pendingMove, setPendingMove] = useState<MoveDto | null>(null);
  const [previewBoard, setPreviewBoard] = useState<BoardDto | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  // Reset local state when game updates
  useEffect(() => {
    setPendingMove(null);
    setPreviewBoard(null);
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
    if (!game || isMoving || pendingMove) return;

    if (selectedSquare) {
      const validMove = validMoves.find(
        (move) => move.toRow === row && move.toCol === col,
      );

      if (validMove) {
        const preview = createPreviewBoard(game.board, validMove);

        setPreviewBoard(preview);
        setPendingMove(validMove);
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

  const handleConfirmMove = () => {
    if (pendingMove) {
      executeMove({
        fromRow: pendingMove.fromRow,
        fromCol: pendingMove.fromCol,
        toRow: pendingMove.toRow,
        toCol: pendingMove.toCol,
      });
    }
  };

  const handleCancelMove = () => {
    setPendingMove(null);
    setPreviewBoard(null);
  };

  // Rendering States
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen hasError={true} />;
  if (!game) return <ErrorScreen hasError={false} />;

  const isGameOver = ["WHITE_WON", "BLACK_WON", "DRAW"].includes(game.state);
  const displayBoard = previewBoard || game.board;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-10 px-4 pb-32">
      <GameHeader />

      <GameInfoPanel game={game} isGameOver={isGameOver} />

      {/* Board Wrapper */}
      <div className="relative mb-8">
        <Board
          activePieces={game.activePieces}
          board={displayBoard}
          currentPlayerColor={game.currentPlayerColor}
          highlightSquare={
            pendingMove
              ? { row: pendingMove.fromRow, col: pendingMove.fromCol }
              : null
          }
          isMoving={isMoving}
          selectedSquare={selectedSquare}
          validMoves={validMoves}
          onSquareClick={handleSquareClick}
        />
      </div>

      {pendingMove && (
        <MoveConfirmationBar
          isMoving={isMoving}
          pendingMove={pendingMove}
          onCancel={handleCancelMove}
          onConfirm={handleConfirmMove}
        />
      )}

      <GameInstructions currentPlayerColor={game.currentPlayerColor} />

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
