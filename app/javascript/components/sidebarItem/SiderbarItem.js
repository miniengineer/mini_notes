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
    open: false
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectNote = (n, i) => this.props.selectNote(n,i);


  ////////CHANGE TO SWEET ALERT
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
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Edit title
      </Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Note Title"}</DialogTitle>
        <DialogContent>
        <TextField id="outlined-basic" variant="outlined" onChange={(e) => console.log(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          </div>
          <EditIcon onClick={() => this.selectNote(note, index)} className={classes.editIcon}></EditIcon>
          <DeleteIcon onClick={() => this.deleteNote(note)} className={classes.deleteIcon}></DeleteIcon>
       </ListItem>
     </div>
     );
  }

}

export default withStyles(styles)(SidebarItem);
