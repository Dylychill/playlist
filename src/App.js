import React, { useState } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';

const songs = [
  {name:"Ain't no rest for the Wicked", path: "CagetheElephant"},
  {name:"A Boy Named Sue", path: "JohnnyCash.mp3"}
]

function App() {
  const [selected,setSelected] = useState('')
  return (
    <div className="App">
      {songs.map((s,i)=>{
        return <Song key={i} song={s}
          selected={selected===s.name}
          onSelect={()=> setSelected(s.name)}
        />
      })}
    </div>
  );
}

function Song(props){
  const {song, selected, onSelect} = props
  return <div>
    <div onClick={onSelect}>{song.name}</div>
    {selected && <ReactAudioPlayer
      src={"/music/"+song.path}
      controls
    />}
  </div>
}

export default App;