import React from 'react';
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import debounce from '../utils/utils';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";

import { Editor } from '@tinymce/tinymce-react';


class EditorT extends React.Component {
  constructor() {
    super();

    this.state = {
      body: '',
      title: '',
      id: '',
    };
  }

  updateBody = async (value) => {
    await this.setState({ body: value});
    this.update();
  }

  //make PATCH requests once user stop typing for 1.5 seconds
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.body
    })
  }, 1500);

  //show selected note body when note is selected
  componentDidMount = () => {
    this.setState({
      body: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  };

  componentDidUpdate = () => {
    //change only if selected note is different from the one which is displayed
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        body: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  render() {
    const { classes } = this.props;

    return(
     <div className={classes.editorContainer}>
      {/* <ReactQuill
       value={this.state.body}
       onChange={this.updateBody}
       placeholder='Anything you want to write down?'>
       </ReactQuill> */}
       {/* <SunEditor onChange={this.updateBody} /> */}
       <Editor
         initialValue={this.state.body}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onChange={this.handleEditorChange}
       />
     </div>
    );
  }
}

export default withStyles(styles)(EditorT);
