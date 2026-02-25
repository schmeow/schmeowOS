import { React } from "uebersicht";

export const command = `if [ -f ~/.lockstate ]; then cat ~/.lockstate; else echo 'unlocked'; fi && echo '' && (cat $HOME/Documents/schmeowos/notifstate.txt 2>/dev/null || echo '0')`;
export const refreshFrequency = 10;

export const className = `
  top: 20px;
  left: 250px;
  z-index: -10;
`;

export const render = ({ output }) => {
  console.log(JSON.stringify(output));
  const lines = output ? output.split('\n').filter(l => l.trim() !== '') : [];
  const isLocked = (lines[lines.length - 2] || '').trim().startsWith('locked');
  const notifReady = (lines[lines.length - 1] || '').trim() === '1';
  const shouldShow = isLocked && notifReady;

  return (
    <img
      src="flower2.png"
      style={{
        width: "900px",
        transform: isLocked ? "rotate(45deg) translateY(-30px)" : "rotate(45deg) translateY(0)",
        opacity: isLocked ? 0 : 1,
        pointerEvents: isLocked ? "none" : "auto",
        filter: "saturate(70%) brightness(40%) blur(0.7px) hue-rotate(10deg) opacity(60%)",
        transition: "transform 0.4s ease, opacity 0.4s ease",
        transitionDelay: isLocked ? "0ms" : "700ms",
      }}
    />
  );
};