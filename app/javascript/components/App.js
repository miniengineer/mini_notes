import React from 'react';
import './App.css';

import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        id: 4,
        username: 'Fabian Prewett',
        email: 'fabian.p@gmail.com'
      },
      selectedNoteIndex: null,
      selectedNote: null,
      miniNotes: null
    }
  }

  componentDidMount = () => {
    axios.get(`/api/v1/users/${this.state.currentUser.id}/notes`).then(response => this.setState({ miniNotes: response.data.data }));
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    //update note in the db
    axios.patch(`/api/v1/users/${this.state.currentUser.id}/notes/${id}`, noteObj).then(response => console.log(response.data.data));
  }

  newMiniNote = async (title) => {
    //create a note
    const miniNote = {
      title: title,
      body: ''
    };
    //add this note to the db
    const newID = await axios.post(`/api/v1/users/${this.state.currentUser.id}/notes`);
    //replace currently selected note with the one just created
    console.log({newID});
    await this.setState({ miniNotes: [...this.state.miniNotes, miniNote] });
    const newMiniNoteIndex = this.state.miniNotes.indexOf(this.state.miniNotes.filter(note => note.id === newID.data.data.id)[0]);
    this.setState({ selectNote: this.state.miniNotes[newMiniNoteIndex], selectedNoteIndex: newMiniNoteIndex });
  }

  deleteMiniNote = async (note) => {
    const miniNoteIndex = this.state.miniNotes.indexOf(note);
    console.log(miniNoteIndex);
    //if we are deleting the selected note, we need to deselect it first
    if (this.state.selectedNoteIndex === miniNoteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.miniNotes.length > 1 ?
      this.selectNote(this.state.miniNotes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectNote: null });
    }

    await axios.delete(`/api/v1/users/${this.state.currentUser.id}/notes/${note.id}`);
    const afterDeletion = await axios.get(`/api/v1/users/${this.state.currentUser.id}/notes`);
    this.setState({ miniNotes: afterDeletion.data.data });
  }

  render() {

    return (
      <div className='app-container'>
        <Sidebar
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
        }
      </div>
    );
  }
  }

export default App;
