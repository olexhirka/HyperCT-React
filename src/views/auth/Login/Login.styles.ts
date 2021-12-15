import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        height: '100vh',
      },
      loginCard: {
        minWidth: 400,
        borderRadius: 12,
        background: theme.palette.primary.dark,
      },
      loginCardContent: {
        padding: '25px 35px',
      },
      loginCardText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 17,
      },
      inputContainer: {
        marginTop: 15,
        '& .MuiFormControl-root.MuiTextField-root': {
          width: '100%',
        },
      },
      submitButton: {
        width: '100%',
        height: 45,
        backgroundColor: theme.palette.secondary.dark,
        marginTop: 30,
      },
      linkContainerStyles: {
        marginTop: 15,
        fontSize: 14,
      },
      linkStyles: {
        textDecoration: 'none',
        '&:link': {
          color: theme.palette.secondary.dark,
        },
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
        '&:active': {
          color: theme.palette.secondary.dark,
        },
        '&:visited': {
          color: theme.palette.secondary.dark,
        },
      },
    }),
  { index: 1 },
);
