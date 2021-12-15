import { ReactElement, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Grid, CardContent, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { MerchantModel } from 'models';
import { useStore } from 'hooks';
import { merchantCardStyles } from './MerchantCard.styles';

interface Props {
  merchant: MerchantModel;
}

const MerchantCard = ({ merchant }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const classes = merchantCardStyles();

  const {
    root,
    iconButtonContainer,
    iconButton,
    merchantImage,
    merchantImageBackDrop,
    merchantName,
    menu,
    cardContainer,
  } = classes;

  const {
    dataStore: {
      merchantStore: { deleteByID },
      authStore: { user },
    },
  } = useStore();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={root}>
      <CardContent className={cardContainer}>
        <Grid container justify="center" alignItems="center">
          {user?.role === 1 && (
            <Grid item xs={12} className={iconButtonContainer}>
              <IconButton className={iconButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVert />
              </IconButton>

              <Menu
                id="simple-menu"
                PopoverClasses={{
                  paper: menu,
                }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/dashboard/merchants/edit/${merchant.id}`}
                  className={classes.linkStyle}>
                  Edit
                </MenuItem>

                <MenuItem onClick={() => deleteByID(merchant.id)}>Delete</MenuItem>
              </Menu>
            </Grid>
          )}

          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item>
              <div className={merchantImageBackDrop}>
                <img className={merchantImage} height="40px" src={merchant.imagePath} alt={merchant.name} />
              </div>
            </Grid>
            <Grid item>
              <Typography className={merchantName} variant="body2" color="textSecondary" component="p">
                {merchant.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default observer(MerchantCard);
