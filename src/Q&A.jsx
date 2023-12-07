// this component needs to display our questions and answers
// we navigate here after a category has been selected

import axios, { all } from "axios";
import { useEffect, useState } from "react";
// import { shuffle } from "lodash";
import shuffle from "lodash.shuffle";

function Questions(props) {
  console.log("this is props in questions", props);
  // props.data is an array, only show questions if data has any data
  const isQuestionsEmpty = props.data.length === 0;

  //this is so we can cycle through our questions
  const [questionObjectIndex, setQuestionObjectIndex] = useState(0);

  const handleNextQuestionClick = () => {
    setQuestionObjectIndex(questionObjectIndex + 1);
  };

  const incorrectAnswers = props.data.incorrect_answers;
  console.log("this is incorrect answers", incorrectAnswers);

  /**
   * props.data is an array like:
   * [
   *   {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Music",
      "question": "What album did Bon Iver release in 2016?",
      "correct_answer": "22, A Million",
      "incorrect_answers": [
          "Bon Iver, Bon Iver",
          "Blood Bank EP",
          "For Emma, Forever Ago"
      ]
    }
    ...
  ]
   */

  // we need to combine the correct answer with the incorrect answers, while keeping track of what the correct answer is
  // we need to shuffle the combined list
  //we need to take those list items as a new list below the question
  // they need to be buttons or in some way clickable so we can register an answer

  const allAnswers = [];
  if (props.data.length > 0) {
    //this is adding the correct answer
    allAnswers.push({
      answerString: props.data[questionObjectIndex].correct_answer,
      isCorrect: true,
    });
    //next we add the incorrect answers
    props.data[questionObjectIndex].incorrect_answers.forEach(
      (incorrectAnswer) => {
        allAnswers.push({
          answerString: incorrectAnswer,
          isCorrect: false,
        });
      }
    );
  }
  console.log("this is allAnswers", allAnswers);

  const shuffledAnswers = shuffle(allAnswers);

  console.log("this is shuffledAnswers", shuffledAnswers);

  return isQuestionsEmpty ? null : (
    <div>
      {/* this code was for displaying our questions in a list */}
      {/* {props.data.map((questionObject) => (
        <div>{questionObject.question}</div>
        
      ))
      } */}
      <strong>Question:</strong> {props.data[questionObjectIndex].question}
      <br></br>
      <strong>Answers:</strong>{" "}
      {shuffledAnswers.map((answer) => (
        <button>{answer.answerString}</button>
      ))}
      <br></br>
      <button onClick={handleNextQuestionClick}>Next Question</button>
    </div>
  );
}

export default Questions;
