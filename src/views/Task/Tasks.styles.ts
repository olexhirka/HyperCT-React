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
        textTransform: 'unset',
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
      statusContainer: {
        borderRadius: '6px',
        color: '#fff',
      },
      statusFilledContainer: {
        background: '#FF484F',
      },
      statusOpenContainer: {
        background: theme.palette.secondary.dark,
      },
      linkStyle: {
        textDecoration: 'none',
      },
      checkoutTextContainer: {
        color: theme.palette.secondary.dark,
      },
      addToCartTextContainer: {
        color: '#077dff',
      },
      searchTextContainer: {
        color: '#855fff',
      },
      svgIcon: {
        display: 'flex',
      },
      title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 700,
      },
      modalButton: {
        color: theme.palette.secondary.dark,
        textDecoration: 'none',
        fontSize: 15,
      },
      disableAddButton: {
        pointerEvents: 'none',
      },
      alignRight: {
        textAlign: 'end',
      },
      marginRight: {
        marginRight: theme.spacing(2),
      },
      taskUsage: {
        color: theme.palette.secondary.dark,
      },
      taskUsageCritical: {
        color: theme.palette.secondary.dark,
      },
      taskUsageErrorText: {
        display: 'inline',
        position: 'relative',
        left: 6,
        bottom: 6
      },
      productName: {
        color: '#ffffff99'
      },
      activeTasks: {
        fontSize: 18
      },
      shiftActionItems: {
        paddingLeft: 8
      }
    }),
  { index: 1 },
);
