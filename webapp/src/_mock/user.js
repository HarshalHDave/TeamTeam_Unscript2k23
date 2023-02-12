/* eslint-disable prefer-template */
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
export const getActiveUserList = async () => {
  const userList = [];
  const apiRes = await fetch('http://192.168.137.173:5000/admin/user/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log(result.data.data);
  result.data.data.forEach((val) => {
    userList.push({
      email: val.email,
      name: val.name,
      phone_number: val.phone_number,
      profile_img: val.profile_img,
      sign_img: val.sign_img,
      aadhar_img: val.aadhar_img,
      address: val.address_line_1 + ' ' + val.address_line_2 + ' ' + val.town + ' ' + val.city + ' ' + val.state,
      dob: val.dob,
      isAuth: val.isAuth,
      id: val.id
    });
  });
  return userList;
  // users.push();
};
export const getUserAccidentList = async () => {
  const users = [];
  const apiRes = await fetch('http://localhost:5000/admin/transaction/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJiYXJmaSIsImlhdCI6MTY3NDk4Mjc1MSwiZXhwIjoxNzA2NTE4NzUxfQ.hG-qXpuHW3cUBU94vws-zo5KPvVq-Nl8GJUtKFuBdpY',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log(result.data.data);
  result.data.data.forEach((val) => {
    users.push({
      id: val.id,
      name: val.prdName,
      value: val.value,
      status: val.status,
      importDate: val.importDate,
      expiryDate: val.expiryDate,
    });
  });
  return users;
  // users.push();
};

export const getUserTransactions = async () => {
  const userTransactions = [];
  const apiRes = await fetch('http://192.168.137.173:5000/admin/open_order/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log(result.data.data);
  result.data.data.forEach((val) => {
    userTransactions.push({
      id: val.id,
      qty: val.qty,
      blob: val.blob,
      isSell: val.isSell,
      isCancelled: val.isCancelled,
      isOpen: val.isOpen,
      strike_price: val.strike_price,
      isin: val.isin,
      createdAt: val.createdAt,
    });
  });
  return userTransactions;
  // users.push();
};



const userList = [].map((_, index) => ({
  name: faker.name,
  email: faker.email,
  phone_number: faker.phone_number,
  profile_img: faker.profile_img,
  sign_img: faker.sign_img,
  aadhar_img: faker.aadhar_img,
  address: faker.address_line_1 + ' ' + faker.address_line_2 + ' ' + faker.city + ' ' + faker.state,
  dob: faker.dob,
  isAuth: true,
}))

export default userList;

export const userTransactions = [].map((_, index) => ({
  id: faker.id,
  qty: faker.qty,
  blob: faker.blob,
  isSell: faker.isSell,
  isCancelled: faker.isCancelled,
  isOpen: faker.isOpen,
  strike_price: faker.strike_price,
  isin: faker.isin,
  createdAt: faker.createdAt,

}))

