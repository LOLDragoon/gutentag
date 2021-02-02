const LoadoutDisplay = props => {

  let loadButtons =[]

  function deleteLoad(e){
    let r = window.confirm(`You are about to delete loudout "${e.target.innerText}"`)
    if(r){
  
      props.deleteLoadout(e.target.innerText)
    }
  }

  function handleLoad(e){
    console.log("this is what we are loading",e.target.innerText)
    props.loadLoadout(e.target.innerText)
  }


  for(let presets in props.loadouts){
    loadButtons.push(<button onContextMenu={deleteLoad} onClick={handleLoad}>{presets}</button>)
  }

  return(
    <div className ="loadoutDisplay">
      Click to load your loadout <br></br> Right-click to delete your loadout:
      <div className= "loadButtonsContainer">
      {loadButtons}
      </div>
    </div>
  )

}

export default LoadoutDisplay;