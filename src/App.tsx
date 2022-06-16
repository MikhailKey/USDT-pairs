import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { store } from './store';
import Pairs from './pages/Pairs';
import Favorites from './pages/Favorites';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2a4b57',
    },
    secondary: {
      main: '#7c61b0',
    },
    divider: grey[800],
    background: {
      default: '#2a4b57',
      paper: '#2a4b57',
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Header />
          <div className="container app-wrap">
            <Routes>
              <Route path="/" element={<Pairs />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
