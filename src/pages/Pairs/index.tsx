import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PairsList from '../../components/PairsList';
import { useAxiosRequest } from '../../hooks/useAxiosRequest';
import { Pair } from '../../interfaces/Pair';
import './pairs.css';
import TableSkeleton from '../../components/TableSkeleton';

const Pairs: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Pair[] | null>(null);
  const { data, loading } = useAxiosRequest<Pair[]>('/meta', 'get', null);

  useEffect(() => {
    if (data?.length) {
      setFilteredData(data.filter(pair => pair.counter === 'USDT'));
    }
  }, [data]);

  return (
    <>
      <div className="pairs-title">
        <Typography variant="h4">USDT pairs</Typography>
      </div>
      <div className="pairs-list">
        {loading && <TableSkeleton />}
        {filteredData?.length && <PairsList pairs={filteredData} />}
      </div>
    </>
  );
};

export default Pairs;
