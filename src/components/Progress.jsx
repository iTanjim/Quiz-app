import { useEffect, useState } from "react";

export default function Progress({index, numQuestions, points, maxPoints, answer}) {
  const mIndex = index + 1;
  const progValue = index + Number(answer !== null);
  useEffect(() => {
    const root = document.documentElement;
    const currIncVal = Number(getComputedStyle(root).getPropertyValue("--color-val-inc"));
    const currDecVal = Number(getComputedStyle(root).getPropertyValue("--color-val-dec"));
    root.style.setProperty("--color-val-inc", currIncVal + (progValue * 1.1));
    root.style.setProperty("--color-val-dec", currDecVal - (progValue * 1.1) );
    const progressBar = document.querySelector("progress");

    if(progValue >= (numQuestions/5)){
        progressBar.style.boxShadow = `0 0 25px 2px rgba( var(--color-val-dec) , var(--color-val-inc), var(--color-val-inc), ${progValue * 0.07})`;
    }
    else{
      progressBar.style.boxShadow = "none";
    }

    console.log(currIncVal,"and",  currDecVal, typeof(currIncVal));
    }, [progValue]
  )
  return (
    <header className="progress">
        <p>Question <strong>{mIndex}</strong> / {numQuestions}</p>
        <progress max={numQuestions} value={progValue}/>
        <p><strong>{points}</strong> / {maxPoints}</p>
    </header>
  )
}
