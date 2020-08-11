import React, { useState, useCallback } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';
import {useDropzone} from 'react-dropzone'


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
      <MyDropzone />
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

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps()} style={{
        fontSize:11, padding:30, width:300, margin:'10px', textAlign:'center',
        color:isDragActive?'white':'grey',
        border:isDragActive?'2px dashed white':'2px dashed grey'
      }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default App;