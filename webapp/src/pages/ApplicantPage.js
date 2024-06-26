/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
import ReportIcon from '@mui/icons-material/Report';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getActiveUserList } from '../_mock/user';

// mui icons

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone_number', label: 'Phone Number', alignRight: false },
  { id: 'profile_img', label: 'Profile Image', alignRight: false },
  { id: 'sign_img', label: 'Sign Image', alignRight: false },
  { id: 'aadhar_img', label: 'Aadhar Image', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'dob', label: 'DOB', alignRight: false },
  { id: 'isAuth', label: 'isAuth', alignRight: false },

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
    // console.log(array);
    return filter(array, (_user) => _user.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ApplicantPage() {
  useEffect(() => {
    getActiveUserList().then((val) => {
      setUserList(val);
    });
  }, []);
  useEffect(() => {

  }, [])
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('text');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [currId, setcurrId] = useState();
  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setcurrId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const updateOrDelete = async (type, id) => {

    if (type === 'resolve') {
      const apiRes = await fetch(`http://192.168.137.173:5000/admin/user/partial-update/${id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: true,
          isDeleted: false,
          isAuth: true
        }),
      });
      const response = await apiRes.json();
      console.log(response);
      if (response.status === 'SUCCESS') {
        console.log('success');
        getActiveUserList().then((val) => {
          setUserList(val);
        });
        console.log("The updated user is: ")
        console.log(userList);
      } else {
        console.log('error');
      }
    } else {
      console.log(id);
    }
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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  // useEffect(() => {
  //     setcurrId(filteredUsers.map((user) => user.id));
  // }, [])

  return (
    <>
      <Helmet>
        <title> Applicants</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Applicants
          </Typography>
          {/* <Button
            onClick={() => window.open('https://adityapai18.github.io/unl_project/report_page/', '_blank')}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Raise an Issue
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
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, email, phone_number, profile_img, sign_img, aadhar_img, address_line_1, address_line_2, town, city, state, dob, isAuth } = row;
                    // const selectedUser = selected.indexOf(text) !== -1;
                    console.log(id)
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, text)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={text} src={avatarUrl} /> */}

                          </Stack>
                        </TableCell>
                        {
                          isAuth ? <></> : <>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phone_number}</TableCell>
                            <TableCell align="left"> <a target="_blank" rel="noreferrer" href={profile_img} alt="profile">profile img </a></TableCell>
                            <TableCell align="left"> <a target="_blank" rel="noreferrer" href={sign_img} alt="sign"> sign img</a></TableCell>
                            <TableCell align="left"> <a target="_blank" rel="noreferrer" href={aadhar_img} alt="aadhar"> aadhar pdf</a></TableCell>
                            <TableCell align="left">{address_line_1 + " " + address_line_2 + " " + town + " " + city + " " + state}</TableCell>
                            <TableCell align="left">{dob}</TableCell>
                            <TableCell align="left">{isAuth ? 'Authorized' :
                              <>  
                                <Button sx={{ color: 'success.main' }} onClick={() => updateOrDelete('resolve', id)}>Accept</Button>
                                <Button sx={{ color: 'error.main' }} onClick={() => updateOrDelete('delete', id)}>Reject</Button>
                              </>
                            }
                            </TableCell>
                          
                          </>
                        }

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

      {/* <Popover
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
            </Popover> */}
    </>
  );
}
