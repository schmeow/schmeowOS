import { React } from "uebersicht";

export const command = `date +'%A
%B %-d
%H:%M:%S' && if [ -f ~/.lockstate ]; then cat ~/.lockstate; else echo 'unlocked'; fi && echo '' && (cat $HOME/Documents/schmeowos/notifstate.txt 2>/dev/null || echo '0')`;
export const refreshFrequency = 10;

export const className =`
  @font-face {
    font-family: 'Doto'; 
    src: url('Doto-Medium.ttf') format('truetype'); 
  }

    top: 15%;
    left: 53%; 
    transform: translateX(-50%);
    text-align: center;
    color: #f7f3e8;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .time {
    font-family: 'Doto', sans-serif;
    font-size: 130px; 
    letter-spacing: 0.1em;
    margin-bottom: 20px;
    font-weight: normal;
    line-height: 1;
    white-space: nowrap;
  }
  .date {
    font-family: 'Doto';
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 0.2em;
    margin-bottom: 10px;
    opacity: 0.8;
    white-space: nowrap;
    transform: translateX(-5%);
  }
  .seconds {
    font-size: 40px;
    vertical-align: super;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }
`;

export const render = ({ output }) => {
  const lines = output ? output.split('\n').filter(l => l.trim() !== '') : [];
  const isLocked = (lines[lines.length - 2] || '').trim().startsWith('locked');
  const notifReady = (lines[lines.length - 1] || '').trim() === '1';
  const shouldShow = isLocked && notifReady;
  const [day, dateString, time] = lines;
  const displayDay = day ? day.toUpperCase() : 'LOADING';
  const displayDate = dateString ? dateString.toUpperCase() : '';
  const [hhmm, ss] = time ? time.trim().split(':').reduce((acc, p, i) => i < 2 ? [[...acc[0], p], acc[1]] : [acc[0], p], [[], '']) : [[], ''];
  const displayTime = hhmm.join(':');

  return (
  <div id="lockclock-root" style={{
    transition: "transform 0.4s ease, opacity 0.4s ease",
    transitionDelay: isLocked ? "600ms" : "0ms",
    transform: shouldShow ? "translateY(0)" : "translateY(30px)",
    opacity: shouldShow ? 1 : 0,
    pointerEvents: shouldShow ? "auto" : "none"
    }}>
    <div className="time">{displayTime}<span className="seconds">{ss}</span></div>
    <div className="date">{displayDay}, {displayDate}</div>
  </div>
);
}