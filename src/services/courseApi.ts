import axios from 'axios';

function checkStatus(response: any) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return { ...response.data };
  }
}

export const getList = (params: any) => {
  return axios.get('/api/courseList', { params }).then(checkStatus);
};
