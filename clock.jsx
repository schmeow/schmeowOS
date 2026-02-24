export const command = "date +'%A\n%B %-d\n%H:%M:%S' && if [ -f ~/.lockstate ]; then cat ~/.lockstate; else echo 'unlocked'; fi";
export const className =`
  @font-face {
    font-family: 'Doto'; 
    src: url('Doto-Medium.ttf') format('truetype'); 
  }

    top: 135px;
    left: 1050px;
    transform: translateX(-50%);
    text-align: center;

    color: #f7f3e8;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .time-wrapper {
    position: relative;
    display: inline-block;
  }

  .time {
    font-family: 'Doto', sans-serif;
    font-size: 50px; 
    letter-spacing: 0.1em;
    margin-bottom: 10px;
    font-weight: normal;
    line-height: 1;
    white-space: nowrap;
  }

  .date {
    font-family: 'Doto';
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.2em;
    margin-bottom: 10px;
    opacity: 0.8;
    white-space: nowrap;
  }

  .seconds {
    position: absolute;
    left: 100%;
    top: 0;
    font-family: 'Doto', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    opacity: 0.7;
    padding-left: 4px;
  }
`;

export const render = ({ output }) => {
  const lines = output.split('\n');
  const isLocked = lines[lines.length - 1].trim().startsWith('locked');
  const [day, dateString, time] = lines;
  const displayDay = day ? day.toUpperCase() : 'LOADING';
  const displayDate = dateString ? dateString.toUpperCase() : '';
  const [hhmm, ss] = time ? time.trim().split(':').reduce((acc, p, i) => i < 2 ? [[...acc[0], p], acc[1]] : [acc[0], p], [[], '']) : [[], ''];
  const displayTime = hhmm.join(':');

  return (
    <div style={{
      transition: "transform 0.4s ease, opacity 0.4s ease",
      transitionDelay: isLocked ? "0ms" : "200ms",
      transform: isLocked ? "translateY(-30px)" : "translateY(0)",
      opacity: isLocked ? 0 : 1,
      pointerEvents: isLocked ? "none" : "auto",
      background: "rgba(60, 83, 70, 0.35)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "16px",
      padding: "18px 32px 14px",
    }}>
      <div className="time-wrapper">
        <div className="time">{displayTime}</div>
        <span className="seconds">{ss}</span>
      </div>
      <div className="date">{displayDay}, {displayDate}</div>
    </div>
  );
}