import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const font = "'DM Sans', sans-serif";

export const darkTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#92E9A8',
        },
        '&$active': {
          color: '#2F363E',
        },
      },
    },
  },
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#41464C',
      dark: '#181c27',
      light: '#B0B2B4',
    },
    secondary: {
      main: blue[200],
      light: '#99BBE8',
      dark: '#00B0A7',
    },
    background: {
      default: '#151720',
    },
    text: {
      primary: '#CBD0D6',
    },
    success: {
      main: '#0FE765',
      light: '#92E9A8',
    },
    type: 'dark',
  },
});

// '& .MuiDataGrid-columnsContainer': {
//     // backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
// },

// '& .MuiDataGrid-row': {
//     '& .MuiDataGrid-cell': {
//         margin: 20,
//         borderRadius: 10
//         // color:
//         //     theme.palette.type === 'light'
//         //         ? 'rgba(0,0,0,.85)'
//         //         : 'rgba(255,255,255,0.65)',
//         // backgroundColor: '#9fb2c4'
//     },
// },
