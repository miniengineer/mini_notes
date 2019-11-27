import React from 'react';
import './App.css';

// import Sidebar from './sidebar/Sidebar';
// import Editor from './editor/Editor';

import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      miniNotes: null
    }
  }

  componentDidMount = () => {
    axios.get('/api/v1/notes').then(response => this.setState({ miniNotes: response.data.data }));
  }

  // selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  // noteUpdate = (id, noteObj) => {
  //   //update firebase
  //   firebase
  //   .firestore()
  //   .collection('miniNotes')
  //   .doc(id)
  //   .update({
  //     title: noteObj.title,
  //     body: noteObj.body,
  //     //firebase function which generates timestamp on a server
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   });
  // }

  // newMiniNote = async (title) => {
  //   //create note
  //   const miniNote = {
  //     title: title,
  //     body: ''
  //   };
  //   //go to the firebase and add this note
  //   const newFromDB = await firebase
  //   .firestore()
  //   .collection('miniNotes')
  //   .add({
  //     title: miniNote.title,
  //     body: miniNote.body,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   });
  //   //replace currently selected note with the one just created
  //   const newID = newFromDB.id;
  //   await this.setState({ miniNotes: [...this.state.miniNotes, miniNote] });
  //   const newMiniNoteIndex = this.state.miniNotes.indexOf(this.state.miniNotes.filter(note => note.id === newID)[0]);
  //   this.setState({ selectNote: this.state.miniNotes[newMiniNoteIndex], selectedNoteIndex: newMiniNoteIndex });
  // }

  // deleteMiniNote = (note) => {
  //   const miniNoteIndex = this.state.miniNotes.indexOf(note);
  //   //if we are deleting the selected note, we need to deselect it first
  //   if (this.state.selectedNoteIndex === miniNoteIndex) {
  //     this.setState({
  //       selectedNoteIndex: null,
  //       selectNote: null
  //     });
  //   } else {
  //     this.state.miniNotes.length > 1 ?
  //     this.selectNote(this.state.miniNotes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
  //     this.setState({ selectedNoteIndex: null, selectNote: null });
  //   }

  //   firebase
  //    .firestore()
  //    .collection("miniNotes")
  //    .doc(note.id)
  //    .delete();
  // }

  render() {

    return (
      <div className='app-container'>
        {/* <Sidebar
         selectedNoteIndex = {this.state.selectedNoteIndex}
         miniNotes = {this.state.miniNotes}
         deleteNote={this.deleteMiniNote}
         selectNote={this.selectNote}
         newMiniNote={this.newMiniNote}>
        </Sidebar>
        {
          this.state.selectedNote ?
          <Editor selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          miniNotes={this.state.miniNotes}
          noteUpdate={this.noteUpdate}></Editor> :
          null
        } */}
        <p>{this.state.miniNotes ? this.state.miniNotes.map(note => note.body) : null}</p>
      </div>
    );
  }
  }

export default App;
