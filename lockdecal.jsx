import { React } from "uebersicht";

export const command = `if [ -f ~/.lockstate ]; then cat ~/.lockstate; else echo 'unlocked'; fi && echo '' && (cat $HOME/Documents/schmeowos/notifstate.txt 2>/dev/null || echo '0')`;
export const refreshFrequency = 10;

export const className = `
  top: 200px;
  left: 320px;
  z-index: -1;
`;

export const render = ({ output }) => {
  console.log(JSON.stringify(output));
  const lines = output ? output.split('\n').filter(l => l.trim() !== '') : [];
  const isLocked = (lines[lines.length - 2] || '').trim().startsWith('locked');
  const notifReady = (lines[lines.length - 1] || '').trim() === '1';
  const shouldShow = isLocked && notifReady;

  return (
    <img
      src="flower.png"
      style={{
        width: "300px",
        height: "300px",
        pointerEvents: "none",
        transform: shouldShow ? "rotate(-45deg)" : "rotate(-75deg)",
        opacity: shouldShow ? 1 : 0,
        filter: "saturate(40%) brightness(60%) blur(0.5px) hue-rotate(120deg)",
        transition: "transform 0.4s ease, opacity 0.4s ease",
        transitionDelay: isLocked ? "0ms" : "300ms",
      }}
    />
  );
};