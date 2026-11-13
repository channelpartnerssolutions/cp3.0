"use client";

import { useEffect, useRef, useState } from "react";

// Styled replacement for the browser's default audio controls (Figma "Listen
// to the full article here"): black pill with play/pause, elapsed time, a
// seek bar, total time, a mute toggle and a volume bar.
export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => {
      setTime(audio.currentTime);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setPlaying(!audio.paused);
    };
    const events = ["timeupdate", "loadedmetadata", "durationchange", "play", "pause", "ended"];
    events.forEach((e) => audio.addEventListener(e, sync));
    sync();
    return () => events.forEach((e) => audio.removeEventListener(e, sync));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const seek = (value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  const changeVolume = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value;
    audioRef.current.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const range =
    "h-[13px] cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-runnable-track]:h-[13px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:size-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-track]:h-[13px] [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:size-[13px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean";
  const fill = (value: number, max: number) => ({
    background: `linear-gradient(to right, #fff ${max ? (value / max) * 100 : 0}%, #666 ${max ? (value / max) * 100 : 0}%)`,
  });

  return (
    <div className="flex h-10 w-full items-center gap-3 rounded-full bg-black px-4 text-white md:gap-4 md:px-[42px]">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause article audio" : "Play article audio"}
        className="flex size-6 shrink-0 items-center justify-center"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
            <path d="M6 4.5v15l13-7.5z" />
          </svg>
        )}
      </button>
      <span className="shrink-0 text-sm tabular-nums md:text-lg">{formatTime(time)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={time}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="Seek"
        className={`min-w-0 flex-1 ${range}`}
        style={fill(time, duration)}
      />
      <span className="shrink-0 text-sm tabular-nums md:text-lg">{formatTime(duration)}</span>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="hidden shrink-0 sm:block"
      >
        <svg viewBox="0 0 27 21" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[21px] w-[27px]" aria-hidden>
          <path d="M2 7.5h4l6-5v16l-6-5H2z" fill="currentColor" />
          {muted ? (
            <path d="M17 7l6 7M23 7l-6 7" strokeLinecap="round" />
          ) : (
            <path d="M16.5 6.5a5.5 5.5 0 0 1 0 8M19.5 3.5a9.5 9.5 0 0 1 0 14" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={muted ? 0 : volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        aria-label="Volume"
        className={`hidden w-[94px] shrink-0 sm:block ${range}`}
        style={fill(muted ? 0 : volume, 1)}
      />
    </div>
  );
}

function formatTime(seconds: number) {
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
