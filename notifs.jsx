import { React } from "uebersicht";
import { styled } from "uebersicht";

export const refreshFrequency = 10;

export const command = `
  imsg=\$(sqlite3 ~/Library/Messages/chat.db \
    "SELECT COUNT(*) FROM message WHERE is_read=0 AND is_from_me=0;")
  gmail=\$(osascript -e 'tell application "Mail"' \
    -e 'set total to 0' \
    -e 'repeat with a in every account' \
    -e 'if name of a is "Google" then' \
    -e 'repeat with mb in every mailbox of a' \
    -e 'if name of mb is "INBOX" then' \
    -e 'set total to total + (unread count of mb)' \
    -e 'end if' \
    -e 'end repeat' \
    -e 'end if' \
    -e 'end repeat' \
    -e 'return total' \
    -e 'end tell')
  outlook=\$(osascript -e 'tell application "Mail"' \
    -e 'repeat with a in every account' \
    -e 'if name of a is "Exchange" then' \
    -e 'repeat with mb in every mailbox of a' \
    -e 'if name of mb is "Inbox" then' \
    -e 'return unread count of mb' \
    -e 'end if' \
    -e 'end repeat' \
    -e 'end if' \
    -e 'end repeat' \
    -e 'end tell')
  echo "1" > $HOME/Documents/schmeowos/notifstate.txt
  lockstate=\$(cat ~/.lockstate 2>/dev/null || echo 'unlocked')
  echo "\$imsg|\$gmail|\$outlook|\$lockstate"
`;

export const className = `
    top: 350px; 
    left: 51%; 
    transform: translateX(-50%);
    font-family: 'Doto', monospace;
`;

export const css = `
    @font-face {
        font-family: 'Doto';
        src: url('Doto-Medium.ttf') format('truetype');
    }
`;

const Wrapper = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 350px;
`;

const Row = styled("div")`
    justify-content: center;
    background: rgba(10, 18, 14, 0.5);
    border-radius: 15px;
    padding: 3px 14px 7px 14px;
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.55);
    opacity: ${p => p.zero ? 0.35 : 1};
`;

const Label = styled("span")`
    font-size: 13px;
    color: #ffffff;
    text-shadow: 0 0 6px rgba(80,200,110,0.4);
    letter-spacing: 0.03em;
`;

const p = (n, singular, plural) => n === 1 ? singular : plural;

export const render = ({ output }) => {
  const lines = (output || "").trim().split("\n");
  const parts = lines[0].split("|");
  const isLocked = (parts[3] || "").trim().startsWith("locked");

  const imessageCount = parseInt(parts[0]) || 0;
  const gmailCount    = parseInt(parts[1]) || 0;
  const outlookCount  = parseInt(parts[2]) || 0;

  const data = [
    { key: "messages", label: (n) => `you have ${n} new ${p(n, "message", "messages")}`, count: imessageCount },
    { key: "email",    label: (n) => `you have ${n} new ${p(n, "email", "emails")}`,     count: gmailCount + outlookCount },
  ];

  return (
    <>
      <Wrapper style={{
        transition: "transform 0.4s ease, opacity 0.4s ease",
        transitionDelay: isLocked ? "0ms" : "0ms",
        transform: isLocked ? "translateY(0)" : "translateY(30px)",
        opacity: isLocked ? 1 : 0,
        pointerEvents: isLocked ? "auto" : "none"
      }}>
        {data.map(({ key, label, count }) => (
          <Row key={key} zero={count === 0}>
            <Label>
              {count === 0 ? `no new ${key}s` : label(count)}
            </Label>
          </Row>
        ))}
      </Wrapper>
    </>
  );
};