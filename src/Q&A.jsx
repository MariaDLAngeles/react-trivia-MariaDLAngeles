import { useEffect, useState } from "react";
import shuffle from "lodash.shuffle";
import unescape from "lodash.unescape";
//lodash unescape won't handle apostrophe's, it's not us, it's the SYSTEM.
// The trivia API is returning &#039; when lodash expects it to be &#39;

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
      //this is adding the incorrect answers
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
    setSelectedAnswer(event.target.innerText);
  };

  const handleReturnToCategoryPageClick = () => {
    props.selectCategory(null);
  };

  const incorrectAnswers = props.data.incorrect_answers;
  console.log("this is incorrect answers", incorrectAnswers);

  //lodash expects ' to be &#39
  //Trivia API is sending us &#039
  //our fixlodashunescape function targets &#039 and changes it to &#39;
  //it runs throug lodash

  const fixString = (inputString) => {
    const newString = inputString.replaceAll('&#039', '&#39')
    const newNewString = newString.replaceAll('&rsquo;', '&#39')
    const stringAfterUnescape = unescape(newNewString);
    return stringAfterUnescape;
  };

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

  console.log("this is # of correct", countrecordedCorrectAnswers());
  if (finishedQuiz) {
    return (
      <div id="QA-headings-block">
        <h2>{props.data[0].category} Quiz!</h2>
        <div id="QA-block">
          <p>You got {countrecordedCorrectAnswers()} questions right!</p>
          <p>
            <a onClick={handleReturnToCategoryPageClick}>Try
            another quiz!</a>
          </p>
        </div>
      </div>
    );
  }

  return isQuestionsEmpty ? null : (
    <main>
      <>
        <div id="QA-headings-block">
          <h1>{props.data[0].category} Quiz!</h1>
          <p>Choose an answer and click Next Question to continue.</p>
          <p>
            Go Back to{" "}
            <a onClick={handleReturnToCategoryPageClick}>Category Page</a>
          </p>
        </div>
        <div id="QA-block">
          <p className="question-title">Question:</p>{" "}
          <p className="question-text">
            {fixString(props.data[questionObjectIndex].question)}
          </p>
          <p className="answer-title">Answers: </p>
          {shuffledAnswers.map((answer) => (
            <button
              className="answer-buttons"
              onClick={handleSelectedAnswerClick}
              key={answer.answerString}
            >
              {fixString(answer.answerString)}
            </button>
          ))}
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
        <div className="back-to-category-page"></div>
      </>
    </main>
  );
}

export default Questions;
