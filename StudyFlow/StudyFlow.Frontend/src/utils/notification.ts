import axios from 'axios';

interface notification {
  id?: string;
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

const getNotificationById = (id: string | undefined) => {
  return (
    axios
      .get(`https://localhost:7033/api/Notification/${id}`)
      .then((response) => {
        const notification = response?.data.data;
        return notification;
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

const createNotification = ({ courseId, userId, message, state }: notification) => {
  const body = {
    courseId,
    userId,
    message,
    state,
    course: {
      id: courseId,
      teacherDTO: {
        id: userId,
        fullName: 'string',
      },
    },
  };

  return axios
    .post('https://localhost:7033/createNotification', body)
    .then(() => alert('Se creo la notificacion'))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      alert('Error al crear notificacion');
    });
};

const updateNotification = (id: string | undefined, { courseId, userId, message, state }: notification) => {
  const body = {
    id,
    courseId,
    userId,
    message,
    state: state,
    course: {
      id: courseId,
      teacherDTO: {
        id: userId,
        fullName: 'string',
      },
    },
  };

  return axios
    .put('https://localhost:7033/api/Notification', body)
    .then(() => alert('Se modifico la notificacion'))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      alert('Error al modificar notificacion');
    });
};

const deleteNotification = (id: string | undefined) => {
  return axios
    .delete(`https://localhost:7033/api/Notification/${id}`)
    .then(() => alert('Se elimino la notificacion'))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      alert('Error al eliminar notificacion');
    });
};

export { getAll, createNotification, updateNotification, deleteNotification, getNotificationById };
export type { notification };
