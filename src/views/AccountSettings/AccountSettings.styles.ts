import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      background: '#181C27',
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    titleText: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 30,
      fontWeight: 500,
    },
    paddingTop25: {
      paddingTop: 25,
    },
    paddingTop35: {
      paddingTop: 35,
    },
    paddingTop15: {
      paddingTop: 15,
    },
    paddingLeft30: {
      paddingLeft: 30,
    },
    paddingRight30: {
      paddingRight: 30,
    },
    marginTop15: {
      marginTop: 15,
    },
    marginBottom15: {
      marginBottom: 15,
    },
    paddingBottom15: {
      paddingBottom: 15,
    },
    nameText: {
      fontSize: 16,
    },
    whiteText: {
      color: '#fff',
    },
    divider: {
      margin: '20px 0px',
    },
    avatar: {
      width: 100,
      height: 100,
    },
    badgeIcon: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark,
    },
    infoTitle: {
      fontSize: 14,
    },
    infoDesc: {
      fontSize: 16,
    },
    linkStyle: {
      textDecoration: 'none',
    },
    button: {
      background: theme.palette.secondary.dark,
      textTransform: 'unset',
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
    tabBar: {
      background: 'transparent',
    },
    defaultBox: {
      display: 'inline',
      padding: '2px 4px',
      color: '#fff',
      fontWeight: 400,
    },
    tableIconButton: {
      color: 'rgb(255 255 255 / 60%)',
      padding: 2,
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
    cardContainer: {
      position: 'relative',
    },
    modalButton: {
      color: theme.palette.secondary.dark,
      textDecoration: 'none',
      fontSize: 15,
    },
    disableAddButton: {
      pointerEvents: 'none',
    },
    subscriptionHeaderBar: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    subscriptionSetToCancelIndicator: {
      display: 'inline',
      position: 'relative',
      left: 6,
      bottom: 6
    },
    subscriptionName: {
      fontSize: 18
    },
    periodEndSpacing: {
      paddingRight: 10
    }
  }), { index: 1 }
);
