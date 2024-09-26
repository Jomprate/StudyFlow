import { useEffect, useState } from 'react';
import './NotificationGet.css';
import { getAll, notification, deleteNotification, getNotificationById } from '../../utils/notification';
import { Link, useParams } from 'react-router-dom';

type data = void | notification[];

const NotificationGet = () => {
  const { notificationId } = useParams();
  const [data, setData] = useState<data>([]);
  const [notification, setNotification] = useState<void | notification>();

  const getRowClass = (index: number) => {
    if ((index + 1) % 2 !== 0) return '';

    return ' color';
  };

  const handleDelete = (id: string | undefined) => {
    deleteNotification(id);
  };

  const getRows = () => {
    if (notificationId && (notification?.courseId || notification?.id || notification?.message || notification?.state || notification?.userId)) {
      return (
        <div className={`row${getRowClass(0)}`}>
          <div>{notification.id}</div>
          <div>{notification.courseId}</div>
          <div>{notification.userId}</div>
          <div>{notification.message}</div>
          <div>{notification.state}</div>
          <div className="link">
            <Link to={`/notification/update/${notification.id}`}>Editar</Link>
          </div>
          <div className="link" onClick={() => handleDelete(notification.id)}>
            Eliminar
          </div>
        </div>
      );
    }

    return data?.map((item, index) => (
      <div key={item.id} className={`row${getRowClass(index)}`}>
        <div>{item.id}</div>
        <div>{item.courseId}</div>
        <div>{item.userId}</div>
        <div>{item.message}</div>
        <div>{item.state}</div>
        <div className="link">
          <Link to={`/notification/update/${item.id}`}>Editar</Link>
        </div>
        <div className="link" onClick={() => handleDelete(item.id)}>
          Eliminar
        </div>
      </div>
    ));
  };

  const getTable = () => {
    if (
      (!data || data.length === 0) &&
      (!notificationId || (!notification?.courseId && !notification?.id && !notification?.message && !notification?.state && !notification?.userId))
    )
      return 'No hay datos';

    return (
      <div className="table">
        <div className="row color">
          <div>Id</div>
          <div>Id del curso</div>
          <div>Id del usuario</div>
          <div>Mensaje</div>
          <div>Estado</div>
          <div>Editar</div>
          <div>Eliminar</div>
        </div>
        {getRows()}
      </div>
    );
  };

  useEffect(() => {
    if (!notificationId || notificationId === '') getAll().then((response) => setData(response));
    else getNotificationById(notificationId).then((response) => setNotification(response));
  }, [notificationId]);

  return (
    <div className="notification-get">
      <p className="notification-get-tittle">Notificaciones</p>
      {getTable()}
      <Link className="notification-get-button" to="/notification/create">
        Crear
      </Link>
    </div>
  );
};

export default NotificationGet;
