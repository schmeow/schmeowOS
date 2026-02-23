export const command = "date +'%A\n%B %-d\n%H:%M:%S' && if [ -f ~/.lockstate ]; then echo 'LOCKED'; else echo 'UNLOCKED'; fi";
export const refreshFrequency = 1000;

export const className =`

  @font-face {
    font-family: 'Doto'; 
    src: url('Doto-Medium.ttf') format('truetype'); 
  }
  
  top: 15%;
  left: 52%; 
  transform: translateX(-50%);
  text-align: center;
  
  color: #f7f3e8;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .time {
    font-family: 'Doto', sans-serif;
    font-size: 5vw; 
    letter-spacing: 0.1em;
    margin-bottom: 20px;
    font-weight: normal;
    line-height: 1;
    white-space: nowrap;
  }
  
  .date {
    font-family: 'Doto';
    font-size: 1.5vw;
    font-weight: bold;
    letter-spacing: 0.2em;
    margin-bottom: 10px;
    opacity: 0.8;
    white-space: nowrap;
  }

  .seconds {
    font-size: 2vw;
    vertical-align: super;
    
    letter-spacing: 0.1em;
    opacity: 0.7;
  }
`;

export const render = ({ output }) => {
  const lines = output.split('\n');
  const isLocked = lines[lines.length - 1].trim() === 'LOCKED';

  // if (!isLocked) return <div style={{display: 'none'}} />;
  
  const [day, dateString, time] = output.split('\n');
  const displayDay = day ? day.toUpperCase() : 'LOADING';
  const displayDate = dateString ? dateString.toUpperCase() : '';
  const [hhmm, ss] = time ? time.trim().split(':').reduce((acc, p, i) => i < 2 ? [[...acc[0], p], acc[1]] : [acc[0], p], [[], '']) : [[], ''];
  const displayTime = hhmm.join(':');
  return (
    <div>
      <div className="time">{displayTime}<span className="seconds">{ss}</span></div>
      <div className="date">{displayDay}, {displayDate}</div>
    </div>
  );
}