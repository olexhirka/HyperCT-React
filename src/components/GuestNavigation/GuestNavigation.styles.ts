import {
  createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';

const drawerWidth = 240;

export const navigationStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 7,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'transparent',
    boxShadow: 'unset',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    padding: 18,
  },
  hide: {
    display: 'none !important',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: '0px',
    background: '#191b25',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#191b25',
    borderRight: '0px',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    background: '#191b25',
    border: '1px solid rgba(0,0,0,0)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  divider: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  focusVisible: {
    borderRadius: '0px 6px 6px 0px;',
    background: 'inherit',
    '&:not(:first-child)': {
      marginTop: 10,
    },
    // selected styles
    '&.Mui-selected': {
      color: '#fff',
      background: theme.palette.secondary.dark,
      '& svg path': {
        fill: '#fff',
      },
      '& span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock': {
        color: '#fff',
      },
      '&:hover': {
        background: theme.palette.secondary.dark,
        '& svg path': {
          fill: '#fff',
        },
        '& span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock': {
          color: '#fff',
        },
      },
    },
    // hover styles
    '&:hover': {
      background: theme.palette.secondary.dark,
      '& svg path': {
        fill: '#fff',
      },
      '& span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock': {
        color: '#fff',
      },
    },
  },
  title: {
    marginLeft: 32,
    '& .MuiInput-underline:before': {
      borderBottom: '0px',
    },
  },
  menuGrid: {
    padding: '20px 10px 17px 10px',
  },
  chevronIconButton: {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  userInfoContainer: {
    padding: '18px 8px 40px 8px',
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    color: '#b5b9c8',
  },
  role: {
    fontSize: 12,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.3)',
  },
  userInfoButton: {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #1d212e',
    background: '#181c27',
  },
  userInfoButtonWrapper: {
    width: '100%',
    textAlign: 'left',
    borderRadius: 6,
  },
  menu: {
    borderRadius: 6,
    background: '#191b25',
    width: 200,
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
}), { index: 1 });
