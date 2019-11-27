import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../utils/utils';


class SidebarItem extends React.Component {

  selectNote = (n, i) => this.props.selectNote(n,i);

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
        className={classes.listItem}
        // selected is a property of listItem component and if it's true (meaning that it's selected) it will be highlighted
        selected={selectedNoteIndex === index}
        alignItems='flex-start'>
          <div className={classes.textSection}
            onClick={() => this.selectNote(note, index)}>
            <ListItemText
             primary={note.title}
             secondary={removeHTMLTags(note.body.substring(0,30)) + '...'}>
             </ListItemText>
          </div>
          <DeleteIcon onClick={() => this.deleteNote(note)}
           className={classes.deleteIcon}></DeleteIcon>
       </ListItem>
     </div>
     );
  }

}

export default withStyles(styles)(SidebarItem);
