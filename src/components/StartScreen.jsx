export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start-screen">
      <h2>Welcome!</h2>
      <h3>
        {numQuestions} questions to test your knowledge on Branded Archetype.
      </h3>
      <button
        className="btn restart-btn"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
