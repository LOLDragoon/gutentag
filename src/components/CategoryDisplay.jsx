const CategoryDisplay = props =>{

  let tagArray = []
  let tag ='';
  let id = `${props.category}Adder`
  let labelId =`${props.category}NewTag`
  console.log(props.selected)
  
 

  function hashtagOn (e){
    props.selectHashtag(e.target.innerText)
  }

  function hashtagOff(e){
    props.removeHashtag(e.target.innerText)
  }

  function handleTagChange(e){
    tag = e.target.value
    console.log(tag)
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(tag)
    if(tag !== ''){
    props.addHashtag(tag, props.category)
    document.getElementById(id).reset()
    }
    else{
      console.log("please put something before submitting, you troll")
    }
    
  }

  function areYouSure(){
    let r = window.confirm(`this will delete "${props.category}" and all of its tags, are you sure about that? (any tags saved in loadouts will still appear when loaded)`)
    if(r){
      console.log("argh you killed me")
      props.deleteCategory(props.category)
    }
    else{
      console.log("thanks for sparing me, master")
    }
    
  }

  function selectAll(){
    props.selectAllCategory(props.category)
  }

  function deselectAll(){
    props.clearSelectedCategory(props.category)
  }

  function deleteTag(e){
    console.log(e.target.innerText)
    props.deleteHashtag(e.target.innerText,props.category)
  }

  for(let tag of props.tags){
    if(props.selected[tag]){
      tagArray.push(<div className= "tag on"  onContextMenu ={deleteTag} onClick = {hashtagOff}>{tag}</div>)
    }
    else{
      tagArray.push(<div className="tag off" onContextMenu= {deleteTag}  onClick = {hashtagOn}>{tag}</div>)
    }
  }




  return(
    <div className="category">
      <div className = "categoryHeader">
        <div className="xButtonContainer">
          <h2>
            {props.category}
          </h2>
          <span className="xButton" onClick={areYouSure}>&times;</span>
        </div>
      
        <div className ="categoryForm">
          <form className="categoryAdder" id= {id} onSubmit = {handleSubmit}>
            <input className="categoryTextbox" id={labelId} type='text' maxLength = '20'  placeHolder="cool new tags go here" onChange={handleTagChange}/>
            <input className="categorySubmit" type="submit" value="Submit" />
          </form>
        </div>
        Right-click a tag to delete it
      </div>
      <div className= "tagDisplay">
      {tagArray}
      </div>
      <div className ="selectOptions">
        <button onClick={selectAll}>Select All</button>
        <button onClick={deselectAll}>Deselect All</button>
      </div>
    </div>
  )


}




export default CategoryDisplay