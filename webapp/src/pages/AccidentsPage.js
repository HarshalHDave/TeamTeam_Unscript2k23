/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getUserAccidentList } from '../_mock/user';

// import json
// eslint-disable-next-line import/extensions
import nseData from '../data/nseBonds.json';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // {id: 'id', label: 'ID', alignRight: false },
  { id: 'symbol', label: 'Symbol', alignRight: false },
  { id: 'coupr', label: 'Coupon', alignRight: false },
  { id: 'credit_rating', label: 'Credit Rating', alignRight: false },
  { id: 'maturity_date', label: 'Maturity Date', alignRight: false },
  { id: 'face_value', label: 'Face Value', alignRight: false },
  { id: 'bYield', label: 'bYield', alignRight: false },
  { id: 'isin', label: 'isin', alignRight: false },
  // { id: 'mstrQty', label: 'mstrQty', alignRight: false },
  // {id: 'blob', label: 'label', alignRight: false},

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const handleMapCLick = (lat, lng) => {
  console.log(lat, lng);
  let loc = lng;
  loc += ',';
  loc += lat;
  let url = 'https://adityapai18.github.io/unl_project/landing_page/';
  url += '?loc=';
  url += window.btoa(loc);
  console.log(url);
  window.open(url, '_blank');
};

export default function AccidentPage() {
  const users = [];

  console.log(nseData.data);
  // users.push(nseData);
  console.log(users);
  // users.push(nseData);

  // setUserList(nseData.data);



  const updateOrDelete = async (type) => {
    if (type === 'resolve') {
      const apiRes = await fetch(`http://localhost:5000/admin/reports/update/${currId}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: false,
        }),
      });
      const response = await apiRes.json();
      if (response.status === 'SUCCESS') {
        getUserAccidentList().then((val) => {
          setUserList(val);
        });
      }
    } else {
      console.log(currId);
    }
  };



  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('text');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);

  const [currId, setcurrId] = useState();
  const handleOpenMenu = (event, id) => {
    setcurrId(id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.text);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, text) => {
    const selectedIndex = selected.indexOf(text);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, text);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    console.log(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    setUserList(nseData.data);
  }, []);

  return (
    <>
      <Helmet>
        <title> My Bonds </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Bonds
          </Typography>
          {/* <Button
            onClick={() => window.open('https://adityapai18.github.io/unl_project/report_page/', '_blank')}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Report an Accident
          </Button> */}
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // eslint-disable-next-line camelcase
                    const { id, symbol, series, coupr, credit_rating, maturity_date, face_value, isin, bYield, } = row;
                    // const selectedUser = selected.indexOf(text) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        {/* {/id*  */}
                        <TableCell align='left'>{id}</TableCell>
                        <TableCell align="left">{symbol + series}</TableCell>
                        <TableCell align="left">{coupr}</TableCell>
                        <TableCell align="left">{credit_rating}</TableCell>
                        <TableCell align="left">{maturity_date}</TableCell>
                        <TableCell align="left">{face_value}</TableCell>
                        <TableCell align="left">{bYield}</TableCell>
                        <TableCell align="left">{isin}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'success.main' }} onClick={() => updateOrDelete('resolve')}>
          <Iconify icon={'material-symbols:done-rounded'} sx={{ mr: 2 }} />
          Resolved
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => updateOrDelete('delete')}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
