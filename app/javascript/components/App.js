import React from 'react';
import './App.css';

//components
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
import Login from "./Login";

import axios from 'axios';
import { GoogleLogout } from 'react-google-login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      currentUser: {
        id: 2,
        username: 'Fabian Prewett',
        email: 'fabian.p@gmail.com'
      },
      selectedNoteIndex: null,
      selectedNote: null,
      miniNotes: null
    }
  }

  // componentDidMount = () => {
  //   axios.get(`/api/v1/users/${this.state.currentUser.id}/notes`).then(response => this.setState({ miniNotes: response.data.data }));
  // }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    //update note in the db
    axios.patch(`/api/v1/users/${this.state.currentUser.id}/notes/${id}`, noteObj);
  }

  newMiniNote = async (title) => {
    //create a note
    const miniNote = {
      title: title,
      body: ''
    };
    //add this note to the db
    const newID = await axios.post(`/api/v1/users/${this.state.currentUser.id}/notes`, miniNote);
    //replace currently selected note with the one just created
    await this.setState({ miniNotes: [...this.state.miniNotes, miniNote] });
    const newMiniNoteIndex = this.state.miniNotes.indexOf(this.state.miniNotes.filter(note => note.id === newID.data.data.id)[0]);
    this.setState({ selectedNote: this.state.miniNotes[newMiniNoteIndex], selectedNoteIndex: newMiniNoteIndex });
  }

  deleteMiniNote = async (note) => {
    const miniNoteIndex = this.state.miniNotes.indexOf(note);
    //if we are deleting the selected note, we need to deselect it first
    if (this.state.selectedNoteIndex === miniNoteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.miniNotes.length > 1 ?
      this.selectNote(this.state.miniNotes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    await axios.delete(`/api/v1/users/${this.state.currentUser.id}/notes/${note.id}`);
    const afterDeletion = await axios.get(`/api/v1/users/${this.state.currentUser.id}/notes`);
    this.setState({ miniNotes: afterDeletion.data.data });
  }

    //successfull google login
    onSuccessResponce = async (responce) => {
      const username = responce.profileObj.givenName;
      const email = responce.profileObj.email;
      const resp = await axios.get('/api/v1/users');
      const currentUser = resp.data.data.find(user => user.email === email);
      if (currentUser) {
        this.setState({ currentUser });
        axios.get(`/api/v1/users/${this.state.currentUser.id}/notes`).then(response => this.setState({ miniNotes: response.data.data, isLoggedIn: true }));
      } else {
        await axios.post('/api/v1/users', { username, email });
      }
    };

    onFailureResponce = (responce) => {
      console.log(responce);
    };

    //logout from google account
    logout = () => {
      console.log("logout success");
      this.setState({ isLoggedIn: false});
    }

    onFailure = () => {
      console.log("failed to logout");
    }

  render() {

    return (
      <div className='app-container'>
        {
          this.state.isLoggedIn ?
          <div>
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
        <GoogleLogout
            className="logout"
            clientId="810788223244-gh5323o4hs7221o63ojgi5gafm9u5bie.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={this.logout} onFailure={this.onFailure} >
           </GoogleLogout>
          </div> : <Login onSuccessResponce={this.onSuccessResponce} onFailureResponce={this.onFailureResponce} />
        }
      </div>
    );
  }
  }

export default App;
