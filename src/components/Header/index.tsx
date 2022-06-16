import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './header.css';
import { LinearProgress } from '@mui/material';
import { useAppSelector } from '../../store';
import { boughtCurrencySelect } from '../../store/storeSlice';
import CurrencyNotification from '../CurrencyNotification';

interface Pages {
  value: string;
  path: string;
}

const pages: Pages[] = [
  {
    value: 'Pairs',
    path: '/',
  },
  {
    value: 'Favorites',
    path: '/favorites',
  },
];

const Header = () => {
  const { loading = false, status = '' } = useAppSelector(boughtCurrencySelect);
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <NavLink
                  to={page.path}
                  key={page.value}
                  className={({ isActive }) =>
                    cn('header-link', {
                      'header-link__active': isActive,
                    })
                  }>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page.value}
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {status && <CurrencyNotification />}
      {loading && <LinearProgress color="secondary" />}
    </>
  );
};
export default Header;
