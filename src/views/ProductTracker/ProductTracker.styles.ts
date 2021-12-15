import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      button: {
        background: theme.palette.secondary.dark,
      },
      searchRoot: {
        padding: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        width: 250,
        borderRadius: '6px',
        border: 'solid 1px #313747',
        background: '#232735',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 2,
      },
      filterButton: {
        background: '#232735',
        borderRadius: '6px',
        border: 'solid 1px #313747',
      },
      filterButtonIcon: {
        color: theme.palette.secondary.dark,
      },
      table: {
        minWidth: 650,
        background: '#151720',
      },
      tableCell: {
        borderColor: '#1d212e',
        color: 'rgb(255 255 255 / 60%)',
      },
      tableIconButton: {
        color: 'rgb(255 255 255 / 60%)',
        padding: 2,
      },
      lastCheckedContainer: {
        borderRadius: 6,
        background: '#181c27',
        padding: '8px 10px',
        border: 'solid 1px rgba(255,255,255,0.09)',
      },
      outOfStockText: {
        borderRadius: 6,
        padding: '8px 10px',
        background: 'rgba(7,125,255,0.1)',
        color: '#077dff',
      },
      inStockText: {
        borderRadius: 6,
        padding: '8px 10px',
        background: 'rgba(0,176,167,0.1)',
        color: theme.palette.secondary.dark,
      },
      unknownText: {
        borderRadius: 6,
        padding: '8px 10px',
        background: 'rgb(255 255 255 / 4%)',
        color: '#b5b9c8',
      },
      companyText: {
        color: '#fff',
      },
      pagination: {
        '& .MuiPaginationItem-textPrimary.Mui-selected': {
          backgroundColor: theme.palette.secondary.dark,
        },
        '& .MuiPaginationItem-page[aria-label="Go to next page"]': {
          backgroundColor: 'rgb(255 255 255 / 4%)',
        },
        '& .MuiPaginationItem-page[aria-label="Go to previous page"]': {
          backgroundColor: 'rgb(255 255 255 / 4%)',
        },
      },
      linkStyle: {
        textDecoration: 'none',
      },
      title: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 700,
      },
      productName: {
        color: '#ffffff99',
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    }),
  { index: 1 },
);
