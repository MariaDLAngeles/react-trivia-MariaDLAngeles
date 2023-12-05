function Category (props) {
  console.log('this is props:', props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )  
}

export default Category