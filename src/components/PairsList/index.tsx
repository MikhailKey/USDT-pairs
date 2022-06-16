import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Pair } from '../../interfaces/Pair';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { favouritesSelect, toggleFavorite } from '../../store/storeSlice';
import PairModal from '../PairModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { TablePagination } from '@mui/material';
import './pairs-list.css';

type RowProps = {
  row: Pair;
  onOpenModal: () => void;
  onPairClick: (pair: Pair) => void;
};
const Row: React.FC<RowProps> = ({ row, onOpenModal, onPairClick }) => {
  const dispatch = useAppDispatch();
  const storeFavorites = useAppSelector(favouritesSelect);
  const [open, setOpen] = useState(false);
  const uniqueId = `${row.base}/${row.counter}`;

  const inFavorites = storeFavorites[uniqueId]?.base;

  const handleChangeFavorite = () => {
    dispatch(toggleFavorite(row));
  };

  const handleClickPairCell = () => {
    onOpenModal();
    onPairClick(row);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className="pairs-arrowcell">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUpIcon color="warning" />
            ) : (
              <KeyboardArrowDownIcon color="warning" />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="left"
          onClick={handleClickPairCell}
          className="pairs-clickcell">
          {`${row.base}/${row.counter}`}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleChangeFavorite}>
            {inFavorites ? (
              <StarIcon color="warning" />
            ) : (
              <StarBorderIcon color="warning" />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional info
              </Typography>
              <Typography variant="subtitle1">Fee: {row.fee}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

type Props = {
  pairs: Pair[];
};
const PairsList: React.FC<Props> = ({ pairs }) => {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [targetPair, setTargetPair] = useState<Pair | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpened(true);
  };

  const handleCloseModal = () => {
    setOpened(false);
    setTargetPair(null);
  };

  const handleChangeTargetPair = (pair: Pair) => {
    setTargetPair(pair);
  };
  return (
    <>
      {targetPair && (
        <PairModal open={opened} onClose={handleCloseModal} pair={targetPair} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pair name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(pair => (
                <Row
                  onPairClick={handleChangeTargetPair}
                  onOpenModal={handleOpenModal}
                  key={pair.baseAddress}
                  row={pair}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pairs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PairsList;
