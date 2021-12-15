import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 700,
      },
      chartDataWrapper: {
        marginTop: 40,
      },
      chartDataCount: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 700,
      },
      chartDataTitle: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 400,
        opacity: 0.6,
      },
      blueText: {
        color: '#077dff',
      },
      cyanText: {
        color: theme.palette.secondary.dark,
      },
      chartWrapper: {
        marginTop: 40,
        '& .recharts-wrapper': {
          marginLeft: -30,
        },
      },
      divider: {
        width: '100%',
        marginTop: '50px',
        marginBottom: '50px',
      },
      bottomChartWrapper: {
        marginLeft: -30,
        marginTop: 46,
      },
      purchasesPlatform: {
        marginTop: 46,
      },
      link: {
        color: '#077dff',
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
      iconButton: {
        padding: 2,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      table: {
        minWidth: 650,
        background: '#151720',
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
      tableCell: {
        borderColor: '#1d212e',
        color: 'rgb(255 255 255 / 60%)',
      },
      companyText: {
        color: '#fff',
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
    }),
  { index: 1 },
);
