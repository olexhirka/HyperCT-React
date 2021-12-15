import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        backgroundColor: '#fff',
        maxWidth: '100%',
      },
      content: {
        width: '100vw',
      },
    }),
  { index: 1 },
);
