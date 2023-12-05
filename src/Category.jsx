/* eslint-disable react/prop-types */
import axios from "axios";

function Category(props) {
  console.log(props);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // // when we select a category, navigate to the page and return a string with the questions

  const handleSelectedCategoryClick = () => {
    axios
      // what i'm trying to do below is send a request for 10 questions from one category of the Trivia API and have them appear when we click the button
      .get(
        "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"
        //     // this is just for ONE random category right now, we need to update it with template literal to select the one we actually want
      )
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <button onClick={handleSelectedCategoryClick}>{props.name}</button>
      {/* <button >Test</button> */}
    </div>
  );
}

export default Category;
