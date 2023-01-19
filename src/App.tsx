import React, { useState } from 'react';
import QuetionCard from './components/QuetionCard';
import { fetchQuizQuestions, QuestionsState} from './Api';
import './App.css';
import { Difficulty } from './Api';


export type AnswerObject = {
  quetion : string;
  answer : string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const[loading,setLoading]=useState(false)
  const[questions,setQuestions]=useState<QuestionsState[]>([]);
  const[number,setNumber] =useState(0)
  const[userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
  const[score,setScore]=useState(0);
  const[gameOver,setGameover]=useState(true)

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))
  console.log("first", questions)

  const startTrivia = async()=>{
    setLoading(true);
    setGameover(false);

const newQuestions = await fetchQuizQuestions(
  TOTAL_QUESTIONS,
  Difficulty.EASY
);

console.log("newQuestions", newQuestions)
setQuestions(newQuestions);
setScore(0);
setUserAnswers([]);
setNumber(0);
setLoading(false);


  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{
  if(!gameOver){
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if(correct) setScore(prev => prev + 1);
    const answerObject:AnswerObject ={
      quetion : questions[number].question,
      answer,
      correct,
      correctAnswer : questions[number].correct_answer,
    }
    setUserAnswers((prev) => [...prev, answerObject])
console.log("score",score)
  }
  }
  const nextQuetion = ()=>{
    const nextQuetion = number+1;

    if(nextQuetion=== TOTAL_QUESTIONS){
      setGameover(true)
    }else{
      setNumber(nextQuetion)
    }
    
  }

  return (
    <>
    
    
      <h1>field</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
    

    <button onClick={startTrivia}>
       start
    </button> ) :null}
   {!gameOver ? <p>Score : {score}</p> : null}

   {loading &&  <p>Loading Quetions....</p>}
    {!loading && !gameOver && (

    <QuetionCard   
    quetionNr={number + 1}
    totalQuetions={TOTAL_QUESTIONS}
    quetion={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers ? userAnswers[number]:undefined}
    callback={checkAnswer}
    />)}
    {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
    <button onClick={nextQuetion}>Next Question</button>):null}
    </>
  );
}

export default App;
