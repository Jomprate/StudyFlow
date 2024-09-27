import { useState } from 'react';
import './CourseUpdate.css';
import { useParams } from 'react-router-dom';
import { course, courseUpdate } from '../../utils/course';

const CourseUpdate = () => {
  const { courseId } = useParams();
  const [data, setData] = useState<course>({
    description: '',
    name: '',
    userId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    courseUpdate(courseId, data);
  };

  return (
    <div className="course-create">
      <p className="course-create-title">Modificar Curso</p>
      <form onSubmit={onSubmit} className="subject-form">
        <div>
          <label htmlFor="userId">Id del Usuario:</label>
          <input type="text" name="userId" value={data?.userId} onChange={handleChange} />
        </div>
        <div>
              <label htmlFor="name">Nombre:</label>
              <input type="text" name="name" value={data?.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="description">Descripcion:</label>
              <input type="text" name="description" value={data?.description} onChange={handleChange} />
            </div>
        <button type="submit">Modificar</button>
      </form>
    </div>
  );
};

export default CourseUpdate;
