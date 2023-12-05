// this component needs to display our questions and answers
// we navigate here after a category has been selected

import axios from "axios"
import { useEffect, useState } from "react"

function Quiz() {
    const [selectedCategory, setSelectedCategory] = useState('')
    // is usestate returning a string or is it returning our key id?

    useEffect(() => {
        console.log('useEffect runs')
        axios.get('https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple')
        // this is just for ONE random category right now, we need to update it with template literal to select
        .then((result) => {
            // setSelectedCategory(result.data.trivia_categories);
            console.log(result)

    })
}, [])

    return (
        <h2>QUESTION:</h2>
    )
}

export default Quiz