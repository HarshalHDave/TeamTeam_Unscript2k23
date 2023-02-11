import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
export const getUserList = async () => {
  const users = [];
  const apiRes = await fetch('http://localhost:5000/admin/product/list', {
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
        description: val.description,
        expiryDate: val.expiryDate,
        exportDate: val.exportDate,
        name: val.name,
        prdID: val.prdID,
        importDate: val.importDate,
        value: val.value,
      });
  });
  return users;
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



const users = [].map((_, index) => ({
  id: faker.phone.number('####'),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  type: sample(['Potholes', 'Manholes', 'Street Lights']),
  text: faker.commerce.productDescription(),
  pocnum: faker.phone.number('+91 9#### #####'),
  isVerified: faker.datatype.boolean(),
  lat: faker.address.latitude(),
  long: faker.address.longitude(),
  status: sample(['resolved', 'unresolved']),
  pocname: faker.name.fullName(),
}));
export default users;

