import { Question } from '../objects/question'
import { useState } from 'react'
import { GetStaticProps} from 'next'

enum State { WAITING_FOR_ANSWER, ANSWERED, ENDED }
type Props = { questions: Question[] }

const IndexPage = ({questions}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const [state, setState] = useState(State.WAITING_FOR_ANSWER)
  const [chosenAnswer, setChosenAnswer] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)

  const answered = function(answer: string) {
    if(state !== State.WAITING_FOR_ANSWER) return
    setState(State.ANSWERED)
    setChosenAnswer(answer)

    if(currentQuestion.correctAnswer === answer) setCorrectAnswers(correctAnswers + 1)
    else setIncorrectAnswers(incorrectAnswers + 1)
  }

  const nextQuestion = function() {
    if(state === State.ANSWERED) {
      if(questions.length < currentQuestion.id + 2) {
        setState(State.ENDED)
        return
      }

      setCurrentQuestion(questions[currentQuestion.id + 1])
      setState(State.WAITING_FOR_ANSWER)
      setChosenAnswer("")
    }
  }

  const restart = function() {
    setState(State.WAITING_FOR_ANSWER)
    setCurrentQuestion(questions[0])
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setChosenAnswer("")
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">  
      {state === State.ENDED ? (
        <div className="grid grid-rows-3 flex justify-center items-center"> 
          <h1 className="font-bold text-2xl">
            Quiz over!
          </h1>
          <p>
            You answered {correctAnswers} question correctly out of {correctAnswers + incorrectAnswers} total questions!
          </p>
          <button className="text-indigo-500 underline text-left" onClick={restart}>
            Restart
          </button>
        </div>
      ) : (
        <div className={"grid grid-rows-" + (state === State.WAITING_FOR_ANSWER ? 2 : 3)}>
          <h1 className="flex items-center justify-center font-bold">
            {currentQuestion.question}
          </h1>
          <div className={"flex justify-center gap-1 grid grid-rows-" + currentQuestion.answers.length}>
            {currentQuestion.answers.map((answer) => <button className={"pl-3 pr-3 " + (state === State.WAITING_FOR_ANSWER ? "hover:bg-indigo-300 bg-gray-300" : chosenAnswer === answer && answer !== currentQuestion.correctAnswer ? "bg-red-500" : answer === currentQuestion.correctAnswer ? "bg-green-500" : "bg-gray-300")} id={answer} onClick={() => answered(answer)}>{answer}</button>)}
          </div>
          {state === State.ANSWERED ? <div className="flex justify-center items-center float-right mt-3 rounded-md text-indigo-500 underline">
            <button onClick={nextQuestion}>Next Question</button>
          </div> : ""}
        </div>
      )}
      
    </div>
  ) 
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/questions/")
  const data = await res.json()

  return {
    props: {
      questions: data
    }
  }
}

export default IndexPage
