/* eslint-disable react/prop-types */
import axios from "axios";
import Questions from "./Q&A";
import { useState } from "react";

function Category(props) {
  console.log(props);
  const [QAData, setQAData] = useState([]);
  // // when we select a category, navigate to the page and return a string with the questions

  const handleSelectedCategoryClick = () => {
    axios
      // what i'm trying to do below is send a request for 10 questions from one category of the Trivia API and have them appear when we click the button
      .get(
        "https://opentdb.com/api.php?amount=10&category=" + `${props.id}` + "&difficulty=easy&type=multiple"
        //     // this is just for ONE random category right now, we need to update it with template literal to select the one we actually want
      )
      .then((result) => {
        console.log("result: ", result);
        setQAData(result.data.results);
        props.selectCategory(props.id)
      });
  };


  return (
    <div>
      <button onClick={handleSelectedCategoryClick}>{props.name}</button>
      {/* <button >Test</button> */}
      <Questions data={QAData} />
    </div>
  );
}

export default Category;
