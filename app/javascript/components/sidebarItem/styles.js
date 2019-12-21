const styles = theme => ({
  textSection: {
    maxWidth: '85%'
  },
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red'
    },
    cursor: 'pointer'
  },
  editIcon: {
    position: 'absolute',
    right: '30px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red'
    },
    cursor: 'pointer'
  },
});

export default styles;
