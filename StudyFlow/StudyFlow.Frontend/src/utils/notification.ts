import axios from 'axios';

interface notification {
  id: string;
  courseId: string;
  userId: string;
  message: string;
  state: number;
}

interface data {
  data: Array<notification>;
}

const formaterData = (data: data) => {
  const response = data.data;
  return response;
};

const getAll = () => {
  return (
    axios
      .get('https://localhost:7033/api/Notification')
      .then((response) => {
        return formaterData(response?.data);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

export { getAll };    export type { notification };

