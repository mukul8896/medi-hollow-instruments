import React from "react";

function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-4 py-2 rounded font-semibold transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : "bg-white border border-blue-500 text-blue-500 hover:bg-blue-50";
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export default Button;
