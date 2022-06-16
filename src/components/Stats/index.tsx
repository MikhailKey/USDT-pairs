import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import './stats.css';

type Props = {
  stat: number;
};

const Stats: React.FC<Props> = ({ stat }) => {
  const color = stat < 0 ? red : green;
  return (
    <div className="stats-wrap">
      {stat < 0 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      <Typography variant="body1">{stat}%</Typography>
    </div>
  );
};

export default Stats;
