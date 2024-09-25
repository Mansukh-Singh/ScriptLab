"use client"
import { useState, useEffect } from "react";

export const useNotebook = (initialText) => {
  const [Notebook, setNotebook] = useState('');
  const [Notebookcount, setNotebookcount] = useState(0);
  const [adding_notebook, setAdding] = useState(true);
  const notebook_text = initialText;

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  useEffect(() => {
    (async () => {
      if (adding_notebook) {
        if (Notebookcount < notebook_text.length) {
          await wait(50);
          setNotebook(Notebook + notebook_text[Notebookcount]);
          setNotebookcount(Notebookcount + 1);
        } else {
          await wait(5000);
          setAdding(!adding_notebook);
        }
      } else {
        if (Notebookcount >= 0) {
          await wait(50);
          setNotebook(Notebook.slice(0, Notebookcount));
          setNotebookcount(Notebookcount - 1);
        } else {
          await wait(1000);
          setAdding(!adding_notebook);
          setNotebookcount(0);
        }
      }
    })();
  }, [Notebook, Notebookcount, adding_notebook]);

  return Notebook;
};
