import { useEffect } from "react"

function Timer({dispatch, secondsRemaining}) {

  const munites = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - munites * 60;

  useEffect( () => {
    const interval = setInterval(()=> {
      dispatch({type: 'tick'});
    }, 1000)
    return () => clearInterval(interval);
  }, [dispatch])
  return (
    <div className="timer">{munites < 10 ? 0 : null}{munites}:{seconds < 10 ? 0 : null}{seconds}</div>
  )
}

export default Timer