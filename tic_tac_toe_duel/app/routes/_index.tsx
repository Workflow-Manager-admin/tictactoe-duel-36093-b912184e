import { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main container for the TicTacToe Duel game.
 * Minimalist 3x3 grid, two player, win/draw detection, restart button.
 * Uses primary (#ffffff), secondary (#000000), accent (#2196f3).
 */
export default function Index() {
  const emptyBoard = Array(9).fill(null);

  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState({ type: "playing", winner: null });

  // PUBLIC_INTERFACE
  /** Determines winner or draw */
  function calculateStatus(board) {
    // Winning combinations
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // Rows
      [0,3,6],[1,4,7],[2,5,8], // Cols
      [0,4,8],[2,4,6]          // Diagonals
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { type: "win", winner: board[a] };
      }
    }
    if (board.every(Boolean)) return { type: "draw", winner: null };
    return { type: "playing", winner: null };
  }

  // PUBLIC_INTERFACE
  /** Handles a cell click */
  function handleClick(idx) {
    if (board[idx] || status.type !== "playing") return;
    const boardCopy = [...board];
    boardCopy[idx] = xIsNext ? "X" : "O";
    const newStatus = calculateStatus(boardCopy);
    setBoard(boardCopy);
    setXIsNext((prev) => !prev);
    setStatus(newStatus);
  }

  // PUBLIC_INTERFACE
  /** Resets the game to initial state */
  function handleRestart() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus({ type: "playing", winner: null });
  }

  // PUBLIC_INTERFACE
  /** Renders a single cell of the grid */
  function Cell({ value, onClick }) {
    return (
      <button
        onClick={onClick}
        aria-label={value ? `Cell: ${value}` : "Empty cell"}
        className="w-20 h-20 sm:w-24 sm:h-24 border border-black text-3xl sm:text-4xl font-bold flex items-center justify-center transition-colors bg-white hover:bg-[#e3f2fd] focus:outline-none"
        style={{
          color: value === "X" ? "#2196f3" : value === "O" ? "#000000" : "#000000",
          borderColor: "#000000",
          backgroundColor: "#ffffff",
        }}
        disabled={Boolean(value) || status.type !== "playing"}
      >
        {value}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  /** Player turn or game status */
  function InfoText() {
    if (status.type === "win") {
      return (
        <span className="font-semibold" style={{ color: "#2196f3" }}>
          Player {status.winner === "X" ? "1" : "2"} ({status.winner}) wins!
        </span>
      );
    }
    if (status.type === "draw") {
      return <span className="font-semibold" style={{ color: "#000000" }}>It's a draw!</span>;
    }
    return (
      <span>
        Turn:{" "}
        <span
          style={{ color: "#2196f3", fontWeight: 600 }}
        >
          Player {xIsNext ? "1 (X)" : "2 (O)"}
        </span>
      </span>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center"
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="flex flex-col items-center gap-8 w-full">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "#000000", letterSpacing: "0.01em" }}
        >
          TicTacToe Duel
        </h1>
        <div className="mb-2 text-lg" style={{ color: "#000000" }}>
          <InfoText />
        </div>
        <div
          className="grid grid-cols-3 gap-0"
          style={{
            border: `2px solid #000000`,
            borderRadius: "0.75rem",
            background: "#fff",
            boxShadow: "0 4px 24px 0 rgba(33,150,243,0.07)",
          }}
        >
          {board.map((cell, idx) => (
            <Cell key={idx} value={cell} onClick={() => handleClick(idx)} />
          ))}
        </div>
        <button
          onClick={handleRestart}
          className="mt-6 px-6 py-2 rounded-lg text-base font-medium border-2 transition-colors"
          style={{
            color: "#2196f3",
            borderColor: "#2196f3",
            background: "#ffffff",
          }}
        >
          Restart
        </button>
      </div>
      <footer className="mt-16 text-sm text-[#00000066]">
        &copy; {new Date().getFullYear()} TicTacToe Duel
      </footer>
    </main>
  );
}
