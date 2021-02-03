
import React from 'react';
import Button from '../src/components/Button';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';


function LoandWidget(){
  return(
    <Widget>
        <Widget.Header>
          Carregando...  
        </Widget.Header>

        <Widget.Content>
          [Desafio do Loading]  
        </Widget.Content>     
    </Widget>
  );
}


export default function QuizPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
                <h3>
                  Pergunta 
                  1
                  de 
                    {`${db.questions.length}`}
                </h3>
              </Widget.Header>
        </Widget>

            <img
              alt="Descricao"
              style={{
                width: '100%',
                     height: '150px',
                     objectFit: 'cover',
                    }}
                src="http://placehold.it/400x400"
            />
    
            <Widget>
              <Widget.Content>
                <h2>Titulo</h2>
                <p>teste teste teste teste</p>
                <Button>
                    Confirmar
                </Button>
              </Widget.Content>
            </Widget>
          <LoandWidget />
          </QuizContainer>
        </QuizBackground>
      );
}
