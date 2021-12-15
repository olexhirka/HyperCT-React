import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const merchantSearchStyles = makeStyles((theme: Theme) => createStyles({
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
}), { index: 1 });
