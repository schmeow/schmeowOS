import { React, run } from "uebersicht";

export const refreshFrequency = false;

export const className = `display: none;`;

export const render = () => {
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "l" && e.metaKey) {
        run("cat ~/.lockstate 2>/dev/null | grep -q locked && echo unlocked > ~/.lockstate || echo locked > ~/.lockstate");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return <div id="lockcontroller" />;
};