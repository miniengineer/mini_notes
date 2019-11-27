import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../utils/utils';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  updateBody = async (value) => {
    await this.setState({ text: value});
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);

  //show selected note body when note is selected
  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  };

  componentDidUpdate = () => {
    //change only if selected note is different from the one which is displayed
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  render() {
    const { classes } = this.props;

    return(
     <div className={classes.editorContainer}>
      <ReactQuill
       value={this.state.text}
       onChange={this.updateBody}
       placeholder='Anything you want to write down?'>
       </ReactQuill>
     </div>
    );
  }
}

export default withStyles(styles)(Editor);
