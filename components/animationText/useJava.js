"use client"
import { useState, useEffect } from "react";

export const useJava = (initialText) => {
  const [Java, setJava] = useState('');
  const [Javacount, setJavacount] = useState(0);
  const [adding_java, setAdding] = useState(true);
  const java_text = initialText;

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  useEffect(() => {
    (async () => {
      if (adding_java) {
        if (Javacount < java_text.length) {
          await wait(50);
          setJava(Java + java_text[Javacount]);
          setJavacount(Javacount + 1);
        } else {
          await wait(5000);
          setAdding(!adding_java);
        }
      } else {
        if (Javacount >= 0) {
          await wait(50);
          setJava(Java.slice(0, Javacount));
          setJavacount(Javacount - 1);
        } else {
          await wait(1000);
          setAdding(!adding_java);
          setJavacount(0);
        }
      }
    })();
  }, [Java, Javacount, adding_java]);

  return Java;
};
