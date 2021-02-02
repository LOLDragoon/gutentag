import React, { Component, useState, useEffect } from 'react';

const HashtagInputter = props => {

  function addRandomCategory() {
    console.log("I've been clicked")
    //props.addCategory(Math.floor(Math.random()*100))
    props.addCategory("wahaha")
  }

  function handleCategoryChange(e){
    //console.log(e.target.value)
    props.changeCategoryValue(e.target.value)
  }

  function handleSubmit(event){
    if(props.categoryValue !== ''){
    props.addCategory(props.categoryValue)
    
    }
    else{
      console.log("please put something before submitting, you troll")
    }
    event.preventDefault();
  }

  return(
    <div className="hashtagInputter">
      <form  onSubmit = {handleSubmit}>
        <label htmlFor= "newCategory"> Add a new Category: </label>
        <div className="newCategoryForm">
        <input className ="categoryInputter" placeholder="new category" id="newCategory" type='text' maxLength = '20' value = {props.categoryValue} onChange={handleCategoryChange}/>
        <input className= "categorySubmit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default HashtagInputter