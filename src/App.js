import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';
import {useDropzone} from 'react-dropzone'
import {initialize, useDatu} from 'datu'
import 'firebase/storage'
import * as firebase from "firebase/app"

const songs = [
  {name:"Ain't no rest for the Wicked", path: "CagetheElephant"},
  {name:"A Boy Named Sue", path: "JohnnyCash.mp3"}
]

function App() {
  const [messages, send] = useDatu()
  console.log(messages)
  const [selected,setSelected] = useState('')
  const allSongs = [...songs, ...messages]
  return (
    <div className="App">
      {allSongs.map((s,i)=>{
        return <Song key={i} song={s}
          selected={selected===s.name}
          onSelect={()=> setSelected(s.name)}
        />
      })}
      <div className="upload">
        <MyDropzone send={send}/>
      </div>
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
    const file = acceptedFiles[0]
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(file.name);
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      send({
        name: file.name,
        file: `https://firebasestorage.googleapis.com/v0/b/playlist-2020.appspot.com/o/${file.name}?alt=media`
      })
    });
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

const firebaseConfig = {
  apiKey: "AIzaSyAI1eDbNS_I5QypZ9Lk_5nq385B3bNIb-g",
  authDomain: "playlist-e0780.firebaseapp.com",
  databaseURL: "https://playlist-e0780.firebaseio.com",
  projectId: "playlist-e0780",
  storageBucket: "playlist-e0780.appspot.com",
  messagingSenderId: "757302387694",
  appId: "1:757302387694:web:497bc9e36f30548bd524ff"
};
initialize(firebaseConfig)