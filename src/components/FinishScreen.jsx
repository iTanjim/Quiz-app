export default function FinishScreen({points, maxPoints, dispatch}) {
    const percentage = (points / maxPoints) * 100;
    const scoreStyle = percentage >= 65 ? 'pass' : "fail";
    let emoji;
    if (percentage === 100) emoji = "You're a pro.";
    if(percentage >= 80 && percentage < 100) emoji = "You know your stuff.";
    if(percentage >= 50 && percentage < 80) emoji = "You're familar with branded.";
    if(percentage >= 0 && percentage < 50) emoji = "You lack knowledge on this Archetype.";

  return (
    <div className="result">
        <p>You scored <strong className = {scoreStyle}>{points}</strong> out of {maxPoints} (<strong className={scoreStyle}>{Math.ceil(percentage)}%</strong>)</p>
        <p className="emoji">{emoji}</p>
        <button className="btn restart-btn" onClick={() => dispatch({type: 'restart'})}>
          Restart
        </button>
    </div>
  )
}
