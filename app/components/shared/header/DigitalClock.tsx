"use client";
import { useState, useEffect, useMemo } from "react";

function DigitalClock() {

  const [time, setTime] = useState<Date>(new Date())
  const [is24Hour, setIs24Hour] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);

  return (
    <div>
      <div className="flex items-center justify-center  text-cyan-400">

     
            <div className="text-md  font-bold tracking-tight">
              {formattedTime}
            </div>
          
          
      </div>

    </div>
  )
}

export default DigitalClock;