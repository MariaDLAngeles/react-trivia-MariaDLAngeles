// this is where we want the number of correct answers from the quiz to be displayed

// maybe as a 'you got x out of x questions right!'

function QuizReview() {
  //question object has all our info
  // recorded answers has our answers in an array
  // correct answer

  return (
    <div className="parent">
      <div className="QA-block">
        {/* this code was for displaying our questions in a list */}
        {props.data.map((questionObject) => (
          <div>{questionObject.question}</div>
        ))}
        <br></br>
        <div className="answers">
          <strong>Answers:</strong>{" "}
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
        <button
          className="next-question-button"
          onClick={handleNextQuestionClick}
        >
          Next Question
        </button>
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
