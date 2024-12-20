"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { PiPlayPauseFill as PlayPause } from "react-icons/pi";
import { GrPowerReset as Reset } from "react-icons/gr";
import { GoStopwatch as Stopwatch } from "react-icons/go";
import { FaPause as Paused, FaPlay as Running } from "react-icons/fa6";
import { Position } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

type Props = {
  id: string;
  position: Position;
  zIndex: number;
  bringToTop: () => void;
};

const TimerJr = ({ id, zIndex, bringToTop, position }: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isStopwatch, setIsStopwatch] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  useEffect(() => {
    setMinutes(5);
    handleStartPause();
  }, []);

  useEffect(() => {
    if (stopwatchRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (isStopwatch) {
            if (prev === 59) {
              setMinutes((m) => m + 1);
              return 0;
            }
            return prev + 1;
          } else {
            setTimerRunning(true);
            if (prev === 0) {
              if (minutes === 0) {
                clearInterval(timerRef.current!);
                setStopwatchRunning(false);
                return 0;
              }
              setMinutes((m) => (m > 0 ? m - 1 : m));
              return 59;
            }
            return prev - 1;
          }
        });
      }, 1000);
    } else if (!stopwatchRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current!);
  }, [stopwatchRunning, isStopwatch, minutes]);

  const handleStartPause = useCallback(() => {
    setStopwatchRunning(!stopwatchRunning);
  }, [stopwatchRunning]);

  const handleReset = useCallback(() => {
    setStopwatchRunning(false);
    setTimerRunning(false);
    setMinutes(0);
    setSeconds(0);
  }, []);

  const handleSetTime = useCallback((min: number, sec: number) => {
    setMinutes((prevMin) => prevMin + min);
    setSeconds((prevSec) => prevSec + sec);
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const TimeButton = ({
    label,
    min,
    sec,
  }: {
    label: string;
    min: number;
    sec: number;
  }) => (
    <button
      onClick={() => handleSetTime(min, sec)}
      disabled={isStopwatch}
      className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-neutral-700 ${isGlassMode ? "border-neutral-200 dark:border-neutral-500" : ""} text-neutral-800 transition-all duration-300 dark:text-neutral-50 ${isStopwatch ? "pointer-events-none opacity-25" : "hover:bg-neutral-700 hover:text-neutral-100"}`}
    >
      {label}
    </button>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className={` ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} aspect-square w-72 rounded-3xl bg-white p-7 shadow-xl dark:border dark:border-neutral-800 dark:bg-neutral-900 md:absolute`}
    >
      <div className="absolute left-0 top-2 w-full opacity-0 md:opacity-100">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-500 dark:bg-neutral-300" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>

      <div
        className={`relative mb-6 rounded-xl border ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : "bg-opacity-60"} border-neutral-300 bg-neutral-200 text-center dark:border-neutral-700 dark:bg-neutral-800`}
      >
        {/* Stopwatch/Timer Display */}
        <div className="pointer-events-none absolute left-[3%] top-2 select-none text-xs text-neutral-600 dark:text-neutral-50">
          {!(seconds === 0 && minutes === 0) ? (
            timerRunning || stopwatchRunning ? (
              <Running />
            ) : (
              <Paused />
            )
          ) : (
            ""
          )}
        </div>
        <span className="pointer-events-none mr-1 select-none text-8xl tracking-tighter text-neutral-700 dark:text-neutral-50">
          {String(minutes).padStart(2, "0")}
        </span>
        <span className="pointer-events-none select-none text-5xl tracking-tighter text-neutral-700 dark:text-neutral-50">
          {String(seconds).padStart(2, "0")}
        </span>
      </div>

      {/* Time Buttons */}
      <div className="mb-4 flex items-center justify-between">
        <TimeButton label="10M" min={10} sec={0} />
        <TimeButton label="5M" min={5} sec={0} />
        <TimeButton label="1M" min={1} sec={0} />
        <TimeButton label="1S" min={0} sec={1} />
      </div>

      {/* Stopwatch, Reset, Start/Pause Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsStopwatch((prev) => !prev)}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] text-sm transition-all duration-300 ${isGlassMode ? "border-neutral-700 dark:border-neutral-500 dark:hover:bg-neutral-800" : ""} border-neutral-700 hover:bg-neutral-700 hover:text-neutral-100 dark:hover:border-neutral-50 hover:dark:bg-neutral-50 dark:hover:text-neutral-800 ${timerRunning ? "pointer-events-none opacity-25" : ""} ${isStopwatch ? "bg-neutral-700 text-neutral-100 dark:bg-neutral-50 dark:text-neutral-800" : `text-neutral-800 ${isGlassMode ? "dark:bg-transparent" : "dark:bg-neutral-900"} dark:text-neutral-50`}`}
        >
          <Stopwatch size={"20px"} />
        </button>
        <button
          onClick={handleReset}
          className={`flex ${isGlassMode ? "border-neutral-700 dark:border-neutral-500" : "border-neutral-800 dark:border-neutral-700"} h-12 w-12 items-center justify-center rounded-full border-[1.5px] text-neutral-800 transition-colors duration-300 hover:bg-neutral-700 hover:text-neutral-100 dark:text-neutral-50 dark:hover:border-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-800`}
        >
          <Reset size={"20px"} />
        </button>
        <button
          onClick={handleStartPause}
          className="flex h-12 w-28 items-center justify-center rounded-full border-[1.5px] border-neutral-700 bg-neutral-700 text-white transition-colors duration-300 hover:bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-200"
        >
          <PlayPause size={"30px"} />
        </button>
      </div>
    </div>
  );
};

export default TimerJr;
