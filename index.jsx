import { React } from "uebersicht";
import { styled } from "uebersicht";

export const refreshFrequency = 60000;
export const command = `
  source "$HOME/Documents/schmeowos/.env"

  imsg=\$(sqlite3 ~/Library/Messages/chat.db \
    "SELECT COUNT(*) FROM message WHERE is_read=0 AND is_from_me=0;")

  ACCESS_TOKEN=\$(curl -s --max-time 10 -X POST https://oauth2.googleapis.com/token \
    -d client_id=\$GMAIL_CLIENT_ID \
    -d client_secret=\$GMAIL_CLIENT_SECRET \
    -d refresh_token=\$GMAIL_REFRESH_TOKEN \
    -d grant_type=refresh_token | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

  gmail=\$(curl -s --max-time 10 "https://www.googleapis.com/gmail/v1/users/me/labels/INBOX" \
    -H "Authorization: Bearer \$ACCESS_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('messagesUnread', 0))")

  outlook=0
  echo "DEBUG: \$imsg|\$gmail|\$outlook"
`;

export const className = `
  top: 290px; 
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
  width: 260px;
`;

const Row = styled("div")`
  justify-content: center;
  background: rgba(10, 18, 14, 0.5);
  border: 1px solid rgba(80, 160, 100, 0.25);
  border-radius: 15px;
  padding: 3px 14px 7px 14px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.55);
  opacity: ${p => p.zero ? 0.35 : 1};
`;

const Label = styled("span")`
  font-size: 10px;
  color: #ffffff;
  text-shadow: 0 0 6px rgba(80,200,110,0.4);
  letter-spacing: 0.03em;
`;

const p = (n, singular, plural) => n === 1 ? singular : plural;

const fakeData = [
  { key: "messages", label: (im, dc) => `you have ${im + dc} new ${p(im + dc, "message", "messages")}`, imessage: 3, discord: 5 },
  { key: "email",    label: (gm, ol) => `you have ${gm + ol} new ${p(gm + ol, "email", "emails")}`,     gmail: 0,   outlook: 0 },
];

export const render = ({ output }) => {
  const parts = (output || "").trim().split("|");
  const imessageCount = parseInt(parts[0]) || 0;
  const gmailCount    = parseInt(parts[1]) || 0;
  const outlookCount  = parseInt(parts[2]) || 0;

  const data = [
    { key: "messages", label: (im, dc) => `you have ${im + dc} new ${p(im + dc, "message", "messages")}`, imessage: imessageCount, discord: 0 },
    { key: "email",    label: (gm, ol) => `you have ${gm + ol} new ${p(gm + ol, "email", "emails")}`,     gmail: gmailCount, outlook: outlookCount },
  ];

  return (
    <>
      <Wrapper>
        {data.map(({ key, label, imessage, discord, gmail, outlook }) => {
          const count = key === "messages" ? imessage + discord : gmail + outlook;
          return (
            <Row key={key} zero={count === 0}>
              <Label>
                {count === 0 ? `no new ${key}s` : label(
                  key === "messages" ? imessage : gmail,
                  key === "messages" ? discord  : outlook
                )}
              </Label>
            </Row>
          );
        })}
      </Wrapper>
    </>
  );
};