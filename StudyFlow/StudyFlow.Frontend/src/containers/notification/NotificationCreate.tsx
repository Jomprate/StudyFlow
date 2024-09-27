import { useState } from 'react';
import './NotificationCreate.css';
import { createNotification, notification } from '../../utils/notification';

const NotificationCreate = () => {
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
    const isEmpy = Object.values(data).some((value) => value === '');
    if (isEmpy) alert('Llenar todos los datos');
    else createNotification({...data, state: parseInt(data?.state?.toString())});
    
  };

  return (
    <div className="notification-create">
      <p className="notification-create-title">Crear Notificación</p>
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
          <input type="number" name="state" value={data?.state} onChange={handleChange} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default NotificationCreate;
