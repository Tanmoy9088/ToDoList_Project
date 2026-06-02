import { useState } from "react";
// let id = null;

function StopWatch() {
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [savedTime, setSavedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  function start() {
    const now = Date.now();
    setStartTime(now);
    if (laps.length === 0) {
      setLastLapTime(now);
    }
    setIsRunning(true);
    const id = setInterval(() => {
      setCount(Date.now() - now + savedTime);
    }, 100);
    setIntervalId(id);
    console.log(count);
  }
  function stop() {
    clearInterval(intervalId!);
    setSavedTime((prev) => prev + (Date.now() - startTime));

    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    clearInterval(intervalId!);
    setSavedTime(0);
    setCount(0);
    setStartTime(0);
    setLaps([]);
    setLastLapTime(0);
  }
  const lap = () => {
    const nowL = Date.now();
    console.log(nowL);
    const delta = nowL - lastLapTime; // time since last lap
    setLaps((prev) => [...prev, delta]); // save it
    setLastLapTime(nowL);
    // setIsRunning(true);
  };
  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  };
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-center items-center">
        <p className=" sw-label ">STOPWATCH</p>
        <div
          className={`h-[60vh] w-[50vw] flex flex-col gap-10 justify-center items-center bg-zinc-900 text-white border rounded-2xl`}
        >
          <div>
            <p>{formatTime(count)}</p>
          </div>
          <div className={`flex justify-center gap-5`}>
            <button
              className="border p-2 rounded-xl font-bold bg-emerald-400 uppercase"
              onClick={start}
              disabled={isRunning}
            >
              start
            </button>
            <button
              className="border p-2 rounded-xl font-bold bg-red-500 text-white uppercase"
              onClick={stop}
              disabled={!isRunning}
            >
              stop
            </button>
            <button
              className="border p-2 rounded-xl font-bold uppercase bg-zinc-500"
              onClick={reset}
              //   disabled={!isRunning}
            >
              reset
            </button>
            {isRunning && (
              <button
                className="border p-2 rounded-xl font-bold bg-yellow-400 uppercase"
                onClick={lap}
              >
                Lap
              </button>
            )}
          </div>
          <div className=" h-64 w-64 border p-2 rounded-xl border-white flex flex-col gap-0 overflow-y-auto">
            {laps.map((delta, i) => (
              <p className="border p-1 text-center rounded-2xl m-1" key={i}>
                Lap {i + 1}: {(delta / 1000).toFixed(2)}s
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StopWatch;
