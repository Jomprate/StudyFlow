import { useState } from 'react';
import './NotificationCreate.css';
import { updateSubject } from '../../utils/subject';
import { useParams } from 'react-router-dom';

const NotificationCreate = () => {
    const { subjectId } = useParams();
    const [data, setData] = useState({
        courseId: '',
        link: '',
        name: '',
        type: '',
        userId: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
      };
    
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSubject(subjectId, data);
      };

    return <div className='subject-update'>
        <p className='subject-update-title'>Crear Notificación</p>
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
          <label htmlFor="name">Nombre de la tarea:</label>
          <input type="text" name="name" value={data?.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="type">Tipo de la tarea:</label>
          <input type="text" name="type" value={data?.type} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="link">Link:</label>
          <input type="text" name="link" value={data?.link} onChange={handleChange} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
}

export default NotificationCreate;