/*  eslint-disable react/prop-types*/
import React from 'react';
import Button from '../src/components/Button';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';


function ResultWidget({ results }){
  return(
  <Widget >
        <Widget.Header>
          Resultado
        </Widget.Header>

      <Widget.Content >
        <p>Você acertou 
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if(isAcerto){
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
        
          },0)} 
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              # {index + 1}
              {' '}
              {result == true 
              ? 'Acertou'
              : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>     
    </Widget>
  );
}


function LoandWidget(){
  return(
  <Widget >
        <Widget.Header>
          Carregando...  
        </Widget.Header>

      <Widget.Content style={{
            background: '#2e3644',
                }}>
          <img 
          style={{
            width: '100%',
                 height: '150px',
                 objectFit: 'cover',
                }}
          src="https://cdn.dribbble.com/users/1253165/screenshots/3621577/star-wars.gif"/>
        </Widget.Content>     
    </Widget>
  );
}

function QuestionWidget({ question,totalQuestions, questionIndex, onSubmit, addResult, }){
  
  const [isQuestionSubmited,setIsQuestionSubmited] = React.useState(false);
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return(
  <Widget>
  <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${db.questions.length}`}
        </h3>
      </Widget.Header>

    <img
      alt="Descricao"
      style={{
        width: '100%',
             height: '150px',
             objectFit: 'cover',
            }}
        src={question.image}
    />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form onSubmit={(infosDoEventos) =>{
            infosDoEventos.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() =>{
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            },3 * 1000);
            
        }}>
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId =` alternative__${alternativeIndex}`;
              

              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                >
                    {alternative}
                    <input
                      name={questionId}
                      id={alternativeId}
                      onChange = {() => setSelectedAlternative(alternativeIndex)}
                      type="radio"
                    />
                </Widget.Topic>
                
              );
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>
                Confirmar
            </Button>
           
            {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </form>

      </Widget.Content>
    </Widget>
    );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage() {
  
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [curretQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = curretQuestion;
  const question = db.questions[questionIndex];

  function addResult(result){
    setResults([
      ...results,
      result, 
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    },7*1000);
  } ,[]);
  
  function handleSubmitQuiz(){

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions){
      setCurrentQuestion(questionIndex + 1);
    }
    else{
      setCurrentQuestion(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo/>

          {screenState == screenStates.QUIZ && (<QuestionWidget 
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit ={handleSubmitQuiz}
            addResult= {addResult}
            
          />)}  

          {screenState === screenStates.LOADING && <LoandWidget />}
          
          {screenState === screenStates.RESULT && <div><ResultWidget results={results}/></div>}
        </QuizContainer>
        </QuizBackground>
      );
}
