const styles = {
    chatBox: {
      alignItem: 'center',
      justifyContent: 'center',
      overflowY: 'auto',
    },
    topMenu: {
      marginTop: '10px',
      justifyContent: 'flex-end',
      display: 'flex',
    },
    chatBoxTop: {
      marginTop: '10px',
      overflowY: 'scroll',
      paddingRight: '10px',
      maxHeight: 'calc(100vh - 300px)',
      minHeight: 'calc(100vh - 300px)',
    },
    chatBoxBottom: {
      marginTop: '15px',
      marginLeft: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%'
    },
    chatCard: {
      maxHeight: 'calc(100vh - 170px)',
      minHeight: 'calc(100vh - 170px)',
    },
    noMessageCard: {
      marginTop: '15px',
      maxHeight: 'calc(100vh - 320px)',
      minHeight: 'calc(100vh - 320px)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noMessageText: {
      fontSize: '50px',
      color: 'rgb(224, 220, 220)',
      cursor: 'default',
    },
  };
  
  export default styles;
  