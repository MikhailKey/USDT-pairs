import React, { useState, useEffect, useMemo } from 'react';
import { favouritesSelect } from '../../store/storeSlice';
import { useSelector } from 'react-redux';
import PairsList from '../../components/PairsList';
import { Typography } from '@mui/material';
import { Pair } from '../../interfaces/Pair';
import './favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Pair[] | null>(null);
  const storeFavorites = useSelector(favouritesSelect);

  useEffect(() => {
    const favoritesKeys = storeFavorites && Object.values(storeFavorites);

    if (favoritesKeys?.length) {
      setFavorites(favoritesKeys);
    } else {
      setFavorites(null);
    }
  }, [storeFavorites]);


  return (
    <>
      <div className="favorites-title">
        <Typography variant="h4">Favorites</Typography>
      </div>
      {favorites?.length ? (
        <PairsList pairs={favorites} />
      ) : (
        <Typography variant="h6">No favorites for now</Typography>
      )}
    </>
  );
};

export default Favorites;
