export default function Options({question, dispatch, answer}) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
        {question.options.map(
          (option, index ) =>
             <button className={`btn btn-option ${ hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}  ${index === answer && `answer ${answer !== question.correctOption && "bad"}`} `} key = {option}
              onClick={() => {dispatch({type: 'newAnswer', payload: index});
              }}
              disabled = {hasAnswered}
              >
              {option}
              </button>
        )}
    </div>
  )
}
