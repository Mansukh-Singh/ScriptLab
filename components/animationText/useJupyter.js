"use client"
import { useState, useEffect } from "react";

export const useJupyter = (initialText) => {
  const [Jupyter, setJupyter] = useState('');
  const [Jupytercount, setJupytercount] = useState(0);
  const [adding_jupyter, setAdding] = useState(true);
  const jupyter_text = initialText;

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  useEffect(() => {
    (async () => {
      if (adding_jupyter) {
        if (Jupytercount < jupyter_text.length) {
          await wait(50);
          setJupyter(Jupyter + jupyter_text[Jupytercount]);
          setJupytercount(Jupytercount + 1);
        } else {
          await wait(5000);
          setAdding(!adding_jupyter);
        }
      } else {
        if (Jupytercount >= 0) {
          await wait(50);
          setJupyter(Jupyter.slice(0, Jupytercount));
          setJupytercount(Jupytercount - 1);
        } else {
          await wait(1000);
          setAdding(!adding_jupyter);
          setJupytercount(0);
        }
      }
    })();
  }, [Jupyter, Jupytercount, adding_jupyter]);

  return Jupyter;
};
