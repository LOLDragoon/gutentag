import React, { Component, useState, useEffect } from 'react';
import HashtagInputter from '../components/HashtagInputter.jsx'
import CategoryDisplay from '../components/CategoryDisplay.jsx'
import HashtagList from '../components/HashtagList.jsx'
import LoadoutDisplay from '../components/LoadoutDisplay.jsx';
//const config = require('../savedData/saveData.json')
//const savedLoadouts = require('../savedData/loadouts.json')
const cloneDeep = require('lodash.clonedeep');
var app = window.require('electron').remote;
const Store = app.require('electron-store');
//const {clipboard} = app.require('electron')
const store = new Store();


/*
TODO:
STYLE THE HASHTAGLIST SECTION FIRST TO SEE WHAT OPTIONS FOR LOADOUTS IS GOOD


IMPLEMENT MEANS OF DELETING LOADOUTS: 

IDEA 1
LOAD A PRESET, GIVE OPTION TO DELETE IN THE TEXT THAT SAYS WHICH ONE IS LOADED
COULD BE CLUNKY BUT WOULD BE OBVIOUS

IDEA 2
CHANGE CURRENT DISPLAY TO SHOW ALL LOADOUTS IN A FULL, LIMITED WINDOW AKIN TO CATEGORIES
WITH OPTIONS TO COPY TO CLIPBOARD OR ADD TO CURRENT SET
MAY TAKE UP A LOT OF SCREEN SPACE AND RUIN THE SIMPLE AESTHETIC

IMPLEMENT HASHTAG LIMIT WARNINGS?:
INSTAGRAM HAS MAX 30 HASHTAGS, MAKE TEXT WARNING APPEAR WHEN THAT LIMIT IS EXCEEDED, ASKING THEM TO TRIM

*/




class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryValue:'',
      saveData: cloneDeep(store.store.savedData),
      selected:{},
      loadouts: cloneDeep(store.store.loadouts),
      loadoutName:'',
      websiteStyle:'instagram'
    }
    this.addCategory = this.addCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.changeCategoryValue = this.changeCategoryValue.bind(this)
    this.addHashtag = this.addHashtag.bind(this)
    this.deleteHashtag = this.deleteHashtag.bind(this)
    this.selectHashtag = this.selectHashtag.bind(this)
    this.removeHashtag = this.removeHashtag.bind(this)
    this.saveloadout = this.saveloadout.bind(this)
    this.deleteLoadout = this.deleteLoadout.bind(this)
    this.loadLoadout = this.loadLoadout.bind(this)
    this.changeWebsiteStyle = this.changeWebsiteStyle.bind(this)
    this.clearAllSelected = this.clearAllSelected.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.selectAllCategory = this.selectAllCategory.bind(this)
    this.clearSelectedCategory = this.clearSelectedCategory.bind(this)
    this.deleteHashtag = this.deleteHashtag.bind(this)
    this.deleteLoadout = this.deleteLoadout.bind(this)
  }

  // adds a new hashtag to a given category
  //TODO: duplicate verification?
  addHashtag (stringInput, category){
    stringInput = stringInput.trim()
    let copySaveData = cloneDeep(this.state.saveData)
    copySaveData[category].unshift(stringInput);
    store.set("savedData",copySaveData)
    this.setState({saveData:copySaveData})
  }

  deleteHashtag(tagName,category){
    let copySaveData = cloneDeep(this.state.saveData)
    let copySelected = cloneDeep(this.state.selected)
    delete copySelected[tagName]
    let updatedCategory = copySaveData[category].filter(function(value,index,array) {
      return value !== tagName
    })

    // console.log(updatedCategory)
    copySaveData[category]  = updatedCategory
    //console.log(copySaveData)
    store.set("savedData",copySaveData)
    this.setState({saveData:copySaveData,
                   selected:copySelected})

  }

  //handles the data for the add category input field
  changeCategoryValue(stringInput){
    this.setState({categoryValue:stringInput});
  }


  //makes a new category box
  // definitely check for duplicate keys
  addCategory(stringInput){
    stringInput = stringInput.trim()
    if(this.state.saveData[stringInput]){
      console.log("Category exists, I'm out of here")
      return
    }
    let copySaveData = cloneDeep(this.state.saveData)
    copySaveData[stringInput] = [];
    store.set("savedData",copySaveData)
    console.log("we saved")
    this.setState({saveData:copySaveData,
                  categoryValue:''})
  }

  deleteCategory(stringInput){
    let copySaveData = cloneDeep(this.state.saveData)
    delete copySaveData[stringInput]
    store.set("savedData",copySaveData)
    this.setState({saveData:copySaveData})

  }

  // toggles a hashtag to be on
  // Consider a select all button/subroutine, may be doable on the component level
  selectHashtag(stringValue) {
    let copySelected = cloneDeep(this.state.selected)
    copySelected[stringValue] = true;
    this.setState({selected:copySelected,
                   loadoutName:''})

  }

  //removes hashtage from the displayed datastructure
  removeHashtag(stringValue){
    let copySelected = cloneDeep(this.state.selected)
    copySelected[stringValue] = false;
    this.setState({selected:copySelected,
                   loadoutName:''})
  }

  clearAllSelected(){
    this.setState({selected:{}})
  }


  // ticks all in the given category off
  clearSelectedCategory(categoryName){
    let categoryToClear = cloneDeep(this.state.saveData[categoryName])
    let newSelected = cloneDeep(this.state.selected) 
    for (let tag of categoryToClear){
      newSelected[tag] = false;
    }

    this.setState({selected:newSelected})

  }

  //ticks all in a given category on
  selectAllCategory(categoryName){
    let categoryToSelect = cloneDeep(this.state.saveData[categoryName])
    let newSelected = cloneDeep(this.state.selected) 
    for (let tag of categoryToSelect){
      newSelected[tag] = true;
    }

    this.setState({selected:newSelected})

  }


  saveloadout(loadoutName){
    let trimmed = loadoutName.trim()
    let currentlySelected = cloneDeep(this.state.selected)
    let loadoutsToUpdate = cloneDeep(this.state.loadouts)
    let newLoadout = {}
    //this allows us to prune all the falses we have been accumulating before saving
    for(let hashtag in currentlySelected){
      if(currentlySelected[hashtag]){
        newLoadout[hashtag] = true
      }
    }
    loadoutsToUpdate[trimmed] = newLoadout

    store.set('loadouts',loadoutsToUpdate)
    console.log("we saved")
    this.setState({loadouts:loadoutsToUpdate,
                  loadoutName:trimmed})
      
    
    
  }

  loadLoadout(name){
    console.log(name,"this is the name of what we are loading")
    console.log(this.state.loadouts)
    console.log(name === "tags from deleted ")
    let newSelected = cloneDeep(this.state.loadouts[`${name}`])
    console.log("this is our new selected",newSelected)
    this.setState({selected:newSelected,
                  loadoutName:name})
  }

  deleteLoadout(loadoutName){
    let loadoutCopy = cloneDeep(this.state.loadouts)
    delete loadoutCopy[loadoutName]
    store.set("loadouts",loadoutCopy)
    this.setState({loadouts:loadoutCopy})
  }

  changeWebsiteStyle(website){
    this.setState({websiteStyle:website})
  }


  //render logic, will pass down all the things everyone needs to know to everybody

  render(){
    
    const categories =[]

    for(let category in this.state.saveData){
      categories.push(
        <CategoryDisplay 
          selected = {this.state.selected}
          addHashtag = {this.addHashtag} 
          category = {category} 
          tags = {this.state.saveData[category]}
          selectHashtag = {this.selectHashtag}
          removeHashtag = {this.removeHashtag}
          deleteCategory = {this.deleteCategory}
          selectAllCategory={this.selectAllCategory}
          clearSelectedCategory={this.clearSelectedCategory}
          deleteHashtag = {this.deleteHashtag}/>)
    }



    return(
      <div className = "mainContainer">
        <h1>#GutenTag</h1>
        <div className = "loader">
            <HashtagList 
              websiteStyle = {this.state.websiteStyle}
              selected = {this.state.selected}
              loadouts ={this.state.loadouts}
              loadoutName ={this.state.loadoutName}
              saveLoadout = {this.saveloadout}
              loadLoadout ={this.loadLoadout}
              deleteLoadout = {this.deleteLoadout}
              changeWebsiteStyle ={this.changeWebsiteStyle}
              clearAllSelected = {this.clearAllSelected}
              deleteLoadout = {this.deleteLoadout}
              />
            <LoadoutDisplay
            loadLoadout ={this.loadLoadout}
            deleteLoadout = {this.deleteLoadout}
            loadouts ={this.state.loadouts}
            />
          </div>

          <HashtagInputter 
              addCategory = {this.addCategory} 
              changeCategoryValue = {this.changeCategoryValue} 
              categoryValue = {this.state.categoryValue}/>
        <div className = "categoryHolder">
        {categories}
        </div>
      </div>
    )
  }
}

export default MainContainer;