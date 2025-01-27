import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import ResetColor from "./ResetColor";

const initialState = {
  questions: [],
  //'loading', 'error' 'ready' 'active' 'finished'
  status: "loading",
  qIndex: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      ResetColor();
      return { ...initialState, questions: state.questions, status: "ready" };

    case "newAnswer":
      const question = state.questions.at(state.qIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, qIndex: state.qIndex + 1, answer: null };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, qIndex, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = Array.isArray(questions)
    ? questions.reduce((prev, curr) => prev + curr.points, 0)
    : 0;

  useEffect(
    function () {
      fetch("https://itanjim.github.io/quizData/questions.json")
        .then((res) => res.json())
        .then((data) =>
          dispatch({ type: "dataRecived", payload: data.questions })
        )
        .catch((err) => dispatch({ type: "dataFailed" }));
    },

    []
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <div className="main-cont">
            <Progress
              index={qIndex}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[qIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={qIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </div>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
