// import { useState } from 'react'
import { useEffect, useState } from "react";
import "./App.css";
import Category from "./Category";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  // if not null then show only this category instead of the full list
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);

  useEffect(() => {
    console.log("useEffect runs");
    axios.get("https://opentdb.com/api_category.php").then((result) => {
      setCategories(result.data.trivia_categories);
      // console.log(result)
    });

    // is it res.data or something else like res.name? our key is name and the value is the category
  }, []);
  // console.log("render runs");

  // }

  /**
 * categories looks like: 
 * [
 * {
			"id": 9,
			"name": "General Knowledge"
		}, ...etc
 * ]
 */
  if (selectedCategoryID != null) {
    // only show selected category
    //we have our id
    // find the name of category that is = to our id
    // pull a category from our array -- javascript array find object

    const searchCategoryObject = categories.find((category) => category.id === selectedCategoryID)

    return <div>
        <div className="category-list">
          {/* right now we are having to click twice to get to our questions */}
        <Category
            id={selectedCategoryID}
            name={searchCategoryObject.name}
            selectCategory={setSelectedCategoryID}
          />
        </div>
    </div>;
  }
  // else 
  return (
    <div>
      <div className="category-list">
        {/* <div>{selectedCategoryID}</div> */}
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            selectCategory={setSelectedCategoryID}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
