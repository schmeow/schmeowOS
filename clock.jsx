export const command = "date +'%A\n%B %-d\n%H:%M:%S' && if [ -f ~/.lockstate ]; then echo 'LOCKED'; else echo 'UNLOCKED'; fi";
export const refreshFrequency = 1000;

export const className =`
  @font-face {
    font-family: 'Doto'; 
    src: url('Doto-Medium.ttf') format('truetype'); 
  }

  top: 150px;
  left: 1050px;
  transform: translateX(-50%);
  text-align: center;

  color: #f7f3e8;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(32, 46, 38, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 18px 32px 14px;
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
const [day, dateString, time] = output.split('\n');
const displayDay = day ? day.toUpperCase() : 'LOADING';
const displayDate = dateString ? dateString.toUpperCase() : '';
const [hhmm, ss] = time ? time.trim().split(':').reduce((acc, p, i) => i < 2 ? [[...acc[0], p], acc[1]] : [acc[0], p], [[], '']) : [[], ''];
const displayTime = hhmm.join(':');
return (
<div>
  <div className="time-wrapper">
    <div className="time">{displayTime}</div>
    <span className="seconds">{ss}</span>
  </div>
  <div className="date">{displayDay}, {displayDate}</div>
</div>
  );
}