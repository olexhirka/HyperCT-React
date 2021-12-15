import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const merchantCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: '#181c27',
    },
    cardContainer: {
      position: 'relative',
    },
    iconButtonContainer: {
      position: 'absolute',
      top: '0',
      right: '0',
      paddingTop: '15px',
      paddingRight: '11px',
    },
    iconButton: {
      padding: '0',
    },
    imageTextContainer: {
      textAlign: 'center',
    },
    merchantImage: {
      width: '40px',
      height: 'auto',
    },
    merchantImageBackDrop: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '85px',
      height: '85px',
      backgroundColor: '#222735',
      borderRadius: '50%',
    },
    merchantName: {
      marginTop: 15,
      color: '#fff',
      fontSize: 18,
      fontWeight: 700,
    },
    menu: {
      borderRadius: 6,
      background: '#151720',
      boxShadow: '0px 4px 8px #13151e',
      '& .MuiListItem-button:hover': {
        background: '#222735',
        color: theme.palette.secondary.dark,
      },
    },
    linkStyle: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }), { index: 1 }
);
