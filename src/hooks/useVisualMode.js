import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    
    if(replace) {
      setMode(mode);  
    } else {
      setMode(mode);
      setHistory((prev) => [...prev, mode])
    }
  };

  function back() {

    //Edge case: cannot go back if mode is initial
    if(history.length > 1) {
      history.pop();
    }

    let lastItem = history[history.length - 1];
    setMode(lastItem);

  };

  return { mode, transition, back };
};
