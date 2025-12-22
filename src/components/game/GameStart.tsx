import { useState } from "react";
import { AiDifficulty } from "@/model/gameDto.ts";

interface Props {
    onStartAi: (difficulty: AiDifficulty) => void;
    onStartPlayer: () => void;
    isStartingAi?: boolean;
    isStartingPlayer?: boolean;
}

export function GameStart({
                              onStartAi,
                              onStartPlayer,
                              isStartingAi,
                              isStartingPlayer,
                          }: Props) {
    const [difficulty, setDifficulty] =
        useState<AiDifficulty>("MEDIUM");

    const isDisabled = isStartingAi || isStartingPlayer;

    return (
        <div className="flex flex-col gap-4 w-full max-w-xs">

            {/* Difficulty select */}
            <div className="relative w-full">
                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(e.target.value as AiDifficulty)
                    }
                    disabled={isDisabled}
                    className="
            w-full
            px-4 py-2 pr-10
            rounded-xl
            border border-amber-300
            bg-white
            text-gray-800
            font-medium
            shadow-sm
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-amber-400
            focus:border-amber-400
            appearance-none
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
                >
                    <option value="BEGINNER">Beginner</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                    <option value="EXTREME">Extreme</option>
                </select>

                {/* Dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    ▼
                </div>
            </div>

            {/* Start vs AI */}
            <button
                className="
          w-full
          px-6 py-3
          bg-amber-700
          text-white
          font-semibold
          rounded-xl
          shadow-lg
          transition-colors
          hover:bg-amber-800
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
                disabled={isDisabled}
                onClick={() => onStartAi(difficulty)}
            >
                {isStartingAi ? "Starting..." : "Start Game vs AI"}
            </button>

            {/* Start vs Player */}
            <button
                className="
          w-full
          px-6 py-3
          bg-amber-500
          text-white
          font-semibold
          rounded-xl
          shadow-lg
          transition-colors
          hover:bg-amber-600
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
                disabled={isDisabled}
                onClick={onStartPlayer}
            >
                {isStartingPlayer ? "Starting..." : "Start Game vs Player"}
            </button>
        </div>
    );
}
