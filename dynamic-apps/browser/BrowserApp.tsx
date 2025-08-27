import React, { useCallback, useRef, useState } from "react";

const START_URL = "https://www.google.com/webhp?igu=1";

const normalizeUrl = (raw: string) => {
  const t = raw.trim();
  if (!t) return START_URL;
  // If it looks like a URL, add protocol if missing; otherwise, search Google
  const looksLikeUrl = /^[a-z]+:\/\/|^\w+\.\w+/.test(t);
  if (looksLikeUrl) {
    return /^https?:\/\//i.test(t) ? t : `https://${t}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(t)}`;
};

export default function BrowserApp(props: any) {
  const [address, setAddress] = useState(START_URL);
  const [current, setCurrent] = useState(START_URL);
  const [history, setHistory] = useState<string[]>([START_URL]);
  const [index, setIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const canGoBack = index > 0;
  const canGoForward = index < history.length - 1;

  const goTo = useCallback(
    (url: string, push = true) => {
      const next = normalizeUrl(url);
      setCurrent(next);
      setAddress(next);
      if (push) {
        const newHistory = [...history.slice(0, index + 1), next];
        setHistory(newHistory);
        setIndex(newHistory.length - 1);
      }
    },
    [history, index]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      goTo(address, true);
    },
    [address, goTo]
  );

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    const newIndex = index - 1;
    setIndex(newIndex);
    setCurrent(history[newIndex]);
    setAddress(history[newIndex]);
  }, [canGoBack, history, index]);

  const goForward = useCallback(() => {
    if (!canGoForward) return;
    const newIndex = index + 1;
    setIndex(newIndex);
    setCurrent(history[newIndex]);
    setAddress(history[newIndex]);
  }, [canGoForward, history, index]);

  const refresh = useCallback(() => {
    setCurrent((u) => u);
  }, []);

  const home = useCallback(() => {
    goTo(START_URL, true);
  }, [goTo]);

  return (
    <div className="flex flex-col w-full h-full bg-neutral-900 text-white rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-800 border-b border-neutral-700">
        {/* Back */}
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={`px-2 py-1 rounded-lg ${
            canGoBack
              ? "hover:bg-neutral-700"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          ◀
        </button>

        {/* Forward */}
        <button
          onClick={goForward}
          disabled={!canGoForward}
          className={`px-2 py-1 rounded-lg ${
            canGoForward
              ? "hover:bg-neutral-700"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          ▶
        </button>

        {/* Refresh */}
        <button
          onClick={refresh}
          className="px-2 py-1 rounded-lg hover:bg-neutral-700"
        >
          ⟳
        </button>

        {/* Home */}
        <button
          onClick={home}
          className="px-2 py-1 rounded-lg hover:bg-neutral-700"
        >
          ⌂
        </button>

        {/* Address bar */}
        <form onSubmit={onSubmit} className="flex-1">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search or enter URL"
            className="w-full px-3 py-1 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </form>

        {/* Host */}
        <span className="ml-2 text-xs text-neutral-400 hidden md:block">
          {new URL(current).host}
        </span>
      </div>

      {/* Iframe viewer */}
      <div className="flex-1">
        <iframe
          key={current}
          ref={iframeRef}
          src={current}
          title="Browser"
          className="w-full h-full border-none rounded-b-2xl"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
