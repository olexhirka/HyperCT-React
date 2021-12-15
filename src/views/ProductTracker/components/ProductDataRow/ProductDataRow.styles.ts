import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => createStyles({
  whiteText: {
    color: '#fff',
  },
  alignLeft: {
    textAlign: 'left',
  },
  marginTop20: {
    marginTop: '20px',
  },
}), { index: 1 });
