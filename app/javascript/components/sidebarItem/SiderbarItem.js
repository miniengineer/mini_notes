import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { removeHTMLTags } from '../utils/utils';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';



class SidebarItem extends React.Component {
  state = {
    open: false,
    choiceOpen: false,
    title: ''
  }

  //////////////OPEN TITLE EDIT DIALOG TAB
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  ////////////OPEN EDIT CHOICE DIALOG TAB
  handleChoiceOpen = () => {
    this.setState({ choiceOpen: true });
  }

  ///////////CANCEL EDITING (CLOSE THE DIALOG TAB)
  handleClose = () => {
    this.setState({ open: false, choiceOpen: false });
  }

  ////////////////API TO DB TO EDIT TITLE
  handleTitleEdit = (note) => {
    this.props.noteTitleUpdate(note.id, this.state.title);
    /////////////CLOSE DIALOG TABS
    this.setState({ open: false, choiceOpen: false });
  }

  /////////////UPDATE STATE WHILE USER INPUTS NEW TITLE
  noteTitleUpdate = (e) => {
    this.setState({ title: e.target.value });
  }

  ////////////////OPEN REACT QUILL TO EDIT NOTE
  selectNote = (n, i) => {
    this.props.selectNote(n,i);
    //////CLOSE DIALOG TAB
    this.setState({ choiceOpen: false });
  }


  //TODO CHANGE TO SWEET ALERT
  deleteNote = (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  }


  render() {

    const { index, note, classes, selectedNoteIndex } = this.props;

    return(
     <div key={index}>
       <ListItem
        // selected is a property of listItem component and if it's true (meaning that it's selected) it will be highlighted
        selected={selectedNoteIndex === index}
        alignItems='flex-start'>
          <div className={classes.textSection}>
            <ListItemText
             primary={note.title}
             secondary={removeHTMLTags(note.body.substring(0,30)) + '...'}>
             </ListItemText>
             <div>
      <Dialog
        open={this.state.choiceOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Note Title"}</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleClickOpen} color="primary">
            Edit Title
          </Button>
          <Button onClick={() => this.selectNote(note, index)} color="primary" autoFocus>
            Edit Note
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Note Title"}</DialogTitle>
        <DialogContent>
        <TextField id="outlined-basic" variant="outlined"
         onChange={this.noteTitleUpdate}
         />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleTitleEdit(note)} color="primary" autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          </div>
          {/* <EditIcon onClick={() => this.selectNote(note, index)} className={classes.editIcon}></EditIcon> */}
          <EditIcon onClick={this.handleChoiceOpen} className={classes.editIcon}></EditIcon>
          <DeleteIcon onClick={() => this.deleteNote(note)} className={classes.deleteIcon}></DeleteIcon>
       </ListItem>
     </div>
     );
  }

}

export default withStyles(styles)(SidebarItem);
