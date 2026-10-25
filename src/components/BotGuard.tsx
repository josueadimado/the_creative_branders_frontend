import { useRef, useState } from "react";

/**
 * A blank field people never see, plus the time the form opened.
 * The server refuses the message if that field is filled, or if it
 * arrives the instant the form appeared. That is how simple bots work.
 */
export function useBotGuard() {
  const started = useRef(Date.now());
  const [website, setWebsite] = useState("");

  return {
    payload: {
      website,
      form_started: started.current,
    },
    field: (
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Leave this blank
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            name="tcb_leave_blank"
          />
        </label>
      </div>
    ),
  };
}
