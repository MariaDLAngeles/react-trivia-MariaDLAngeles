/* eslint-disable react/prop-types */
// this component needs to display our questions and answers
// we navigate here after a category has been selected

import { useEffect, useState } from "react";
import shuffle from "lodash.shuffle";
// import nth from "lodash.nth"
import unescape from "lodash.unescape";
//LOLOLOLOL -- lodash unescape won't handle apostrophe's, it's not us, it's the SYSTEM. The trivia API is returning &#039; when lodash expects it to be &#39;

function Questions(props) {
  console.log("this is props in questions", props);
  // props.data is an array, only show questions if data has any data
  const isQuestionsEmpty = props.data.length === 0;

  //this is so we can cycle through our questions
  const [questionObjectIndex, setQuestionObjectIndex] = useState(0);
  //this is so we can record how many questions are correct
  const [recordedCorrectAnswers, setRecordedCorrectAnswers] = useState([]);
  //this is so we can select whatever answer we want and change it up until we submit it
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const [finishedQuiz, setFinishedQuiz] = useState(false);

  useEffect(() => {
    console.log("in useEffect");
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
    setShuffledAnswers(shuffle(allAnswers));
  }, [questionObjectIndex, props.data]);

  const handleNextQuestionClick = () => {
    if (selectedAnswer === props.data[questionObjectIndex].correct_answer) {
      setRecordedCorrectAnswers(
        recordedCorrectAnswers.concat([selectedAnswer])
      );
      // if isCorrect is true, then change the state to + 1, else do nothing
      console.log("this is", recordedCorrectAnswers);
    }

    setQuestionObjectIndex(
      questionObjectIndex === props.data.length - 1
        ? questionObjectIndex
        : questionObjectIndex + 1
    );

    setSelectedAnswer(null);

  };

  const handleFinishQuizClick = () => {
    setFinishedQuiz(true);
  };

  const countrecordedCorrectAnswers = () => {
    return recordedCorrectAnswers.length;
  };

  const handleSelectedAnswerClick = (event) => {
    console.log("this is event", event);
    // answer is event.target.innerText -- technically not react, but the only way out is down
    // if we have time, we'll change it to make answers its own compontent
    setSelectedAnswer(event.target.innerText);
  };

  const handleReturnToCategoryPageClick = () => {
    props.selectCategory(null);
  };

  // when we click next question, we need to record isCorrect true/false
  // count how many true (correct)
  // display count at end of quiz

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

  // we want shuffling to happen to the answers when a question loads, after the question loads the answers should not change. The user clicks the next question and the cycle begins again.

  // on the click of my answer
  // SELECT the answer (change the color of the button to indicate the change)
  // disable the next button until a selection is made
  // if a selection has been made
  //when we click the next button
  // record the value of isCorrect from the selected answer
  // and add it to an empty array
  console.log("this is # of correct", countrecordedCorrectAnswers());
  if (finishedQuiz) {
    return (
      <div className="QA-headings-block">
        <h2>{props.data[0].category} Quiz!</h2>
        <div className="QA-block">
          <h1>You got {countrecordedCorrectAnswers()} questions right!</h1>
          <h2>
            <a onClick={handleReturnToCategoryPageClick}>Click here</a> to try
            another quiz!
          </h2>
        </div>
      </div>
    );
  }

  return isQuestionsEmpty ? null : (
    <div className="QA-headings-block">
      <h2>{props.data[0].category} Quiz!</h2>
      <h3>Choose an answer and click Next Question to continue.</h3>
      <div className="QA-block">
        {/* this code was for displaying our questions in a list */}
        {/* {props.data.map((questionObject) => (
        <div>{questionObject.question}</div>
        
      ))
      } */}
        <div className="question">
          <strong>Question:</strong>{" "}
          {unescape(props.data[questionObjectIndex].question)}
        </div>
        <br></br>
        <div className="answers">
          {/* <strong>Choose one:</strong>{" "} */}
          {shuffledAnswers.map((answer) => (
            <button
              className="answer-buttons"
              onClick={handleSelectedAnswerClick}
              key={answer.answerString}
            >
              {unescape(answer.answerString)}
            </button>
          ))}
        </div>
        <br></br>
        {questionObjectIndex != props.data.length - 1 ? (
          <button
            className="next-question-button"
            onClick={handleNextQuestionClick}
            disabled={selectedAnswer ? false : true}
          >
            Next Question
          </button>
        ) : (
          <button
            className="finished-quiz-button"
            onClick={handleFinishQuizClick}
          >
            Finish Quiz
          </button>
        )}
      </div>
      <br></br>
      <div className="back-to-category-page">
        <h3>
          Go Back to{" "}
          <a onClick={handleReturnToCategoryPageClick}>Category Page</a>
        </h3>
      </div>
    </div>
  );
}

export default Questions;
