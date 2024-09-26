import { useState } from 'react';
import './NotificationUpdate.css';
import { notification, updateNotification } from '../../utils/notification';
import { useParams } from 'react-router-dom';

const NotificationUpdate = () => {
  const { notificationId } = useParams();
  const [data, setData] = useState<notification>({
    courseId: '',
    message: '',
    state: 0,
    userId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNotification(notificationId, {...data, state: parseInt(data?.state?.toString())});
  };

  return (
    <div className="notification-create">
      <p className="notification-create-title">Modificar Notificación</p>
      <form onSubmit={onSubmit} className="subject-form">
        <div>
          <label htmlFor="courseId">Id del Curso:</label>
          <input type="text" name="courseId" value={data?.courseId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="userId">Id del Usuario:</label>
          <input type="text" name="userId" value={data?.userId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="message">Mensaje:</label>
          <input type="text" name="message" value={data?.message} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="state">Estado:</label>
          <input type="text" name="state" value={data?.state} onChange={handleChange} />
        </div>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
};

export default NotificationUpdate;
