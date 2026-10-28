import { useRef, useState } from "react";

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
          <span className="sr-only">Company website</span>
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
