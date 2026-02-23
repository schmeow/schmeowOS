import { React } from "uebersicht";

export const command = "cat ~/.lockstate 2>/dev/null || echo 'unlocked'";
export const refreshFrequency = 550;

export const className = `
  top: 200px;
  left: 340px;
  z-index: -1;
`;

export const render = ({ output }) => {
  const isLocked = (output || "").trim().startsWith("locked");

  return (
    <img 
      src="flower.png"
      style={{ 
        width: "300px", 
        height: "300px", 
        pointerEvents: "none",
        transform: isLocked ? "rotate(-45deg)" : "rotate(-70deg)",
        opacity: isLocked ? 1 : 0,
        filter: "saturate(40%) brightness(60%) blur(0.5px) hue-rotate(120deg)",
        transition: "transform 0.4s ease, opacity 0.4s ease",
      }}
    />
  );
};