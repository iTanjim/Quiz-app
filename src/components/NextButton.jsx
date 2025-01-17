
export default function NextButton({dispatch, answer, index, numQuestions}) {
  if(answer === null) return null;
  return (
    <button className="btn next-btn" onClick={() => {
     numQuestions === index + 1 ? dispatch({type: 'finished'}) : dispatch({type: "nextQuestion"})
     console.log(numQuestions, index)
  }}>Next</button>
  )
}
