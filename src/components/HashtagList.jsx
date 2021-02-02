var app = window.require('electron').remote;
const {clipboard} = app.require('electron')



const HashtagList = props => {

  let hashtagString = ''
  let newLoadout =''
  let loadoutTitle
  let loadButtons = []

  //TODO: add switch cases as to which website it should be formatted for and put the rules in
  function processSelected(){
    let selectedSet = new Set()
    
    // first we iterate over the object and process the tags according to the rules
    // ex: instagram:
    // we remove all spaces and special characters, convert to lowercase and then append a # in front
    console.log(props.websiteStyle)
    switch (props.websiteStyle) {
      case "instagram":
        console.log("We in instagram town")
        for(let hashtag in props.selected){
          if(props.selected[hashtag]){
           let processedHashtag ="#" + hashtag.replace(/[^A-Z0-9]+/ig, "")
            selectedSet.add(processedHashtag.toLowerCase())
          }
        }
        break;
    
      default:
        break;
    }


    for(let hashtag of selectedSet){
      if(hashtagString.length === 0){
        hashtagString += `${hashtag}`
      }
      else{
        hashtagString+= ` ${hashtag}`
      }
    }
    console.log(hashtagString)
  }
  


  function handleSave(e){
    e.preventDefault()
    props.saveLoadout(newLoadout)

  }

  function handleLoad(e){
    console.log("this is what we are loading",e.target.innerText)
    props.loadLoadout(e.target.innerText)
  }

  function handleLoadoutChange(e){
    //console.log(e.target.value)
    newLoadout = e.target.value

  }

  function handleWebsiteChoice(e){
    props.changeWebsiteStyle(e.target.value)
  }

  function copyToClipboard(){
    let copy = document.getElementById("theFeed").value
    clipboard.writeText(copy)
  }

  // render logic starts here

  function clearAllSelected(){
    props.clearAllSelected()
  }

  function deleteLoad(e){
    let r = window.confirm(`You are about to delete loudout "${e.target.innerText}"`)
    if(r){
  
      props.deleteLoadout(e.target.innerText)
    }
  }

  processSelected()



  if (props.loadoutName.length>0){
    loadoutTitle = <div className ="loadoutDiv"> {props.loadoutName} has been loaded </div>
  }
  else if(hashtagString.length>0){
    loadoutTitle = 
    <form className = "loadoutDiv" onSubmit ={handleSave}>
      <label htmlFor="newLoadout">Name this new loadout? </label>
        
        <input className ="loudoutInputter" id="newLoadout" type='text' maxLength = '20' onChange={handleLoadoutChange}/>
        <input className ="loadoutSubmit" type="submit" value="Save Loadout" />
    </form>
  }
  else{
    loadoutTitle = <div className = "loadoutDiv"></div>
  }

  for(let presets in props.loadouts){
    loadButtons.push(<button onContextMenu={deleteLoad} onClick={handleLoad}>{presets}</button>)
  }

  return(
    <div className = "hashtagList">
      <label htmlFor ="websiteStyle">Making hashtags for </label>
      <select id="websiteStyle"  value = {props.websiteStyle} onChange={handleWebsiteChoice}>
        <option value ="instagram">Instagram</option>
      </select>
      {loadoutTitle}
      <textarea id="theFeed" readOnly = {true} value = {hashtagString}/>
      <div>
        <button onClick ={clearAllSelected}>Clear All Selected</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    </div>
  )

}

export default HashtagList;