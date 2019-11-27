import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }

  updateTitle = (txt) => {
    this.setState({ title: txt });
  }

  newNote = () => {
    this.props.newMiniNote(this.state.title);
    //clear the input and get out of NEW NOTE after submitting new note
    this.setState({ title: null, addingNote: false});
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  }

  deleteNote = (note) => {
    this.props.deleteNote(note);
  }

  render() {

    const { miniNotes, classes, selectedNoteIndex } = this.props;

    if (miniNotes) {
      return(
        <div className={classes.sidebarContainer}>
          <Button
           onClick={this.newNoteBtnClick}
           className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
           {
             this.state.addingNote ?
             <div>
               <input
                type='text'
                className={classes.newNoteInput}
                placeholder='Enter note title'
                onKeyUp={(e) => this.updateTitle(e.target.value)}>
               </input>
               <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}>Submit Note</Button>
             </div> : null
           }
           <List>
             {
               miniNotes.map((note, i) => {
                  return(
                    <div key={i}>
                      <SidebarItem
                       note={note}
                       index={i}
                       selectedNoteIndex={selectedNoteIndex}
                       selectNote={this.selectNote}
                       deleteNote={this.deleteNote}>
                     </SidebarItem>
                     <Divider></Divider>
                    </div>
                  );
               })
             }
           </List>
        </div>
       );
    } else {
      return(
        <div></div>
      );
    }
  }
}

export default withStyles(styles)(Sidebar);
