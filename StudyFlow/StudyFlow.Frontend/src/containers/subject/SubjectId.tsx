import './SubjectId.css';
import { deleteSubject, getSubjectByCourse } from '../../utils/subject';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type data =
  | void
  | {
      courseId: string | undefined;
      id: string | undefined;
      link: string | undefined;
      name: string | undefined;
      type: string | undefined;
    }[];

const SubjectId = () => {
  const [data, setData] = useState<data>([]);
  const { courseId } = useParams();

  const getRowClass = (index: number) => {
    if ((index + 1) % 2 !== 0) return ''
    
    return ' color';
  }

  const handleDelete = (id: string | undefined) => {
    deleteSubject(id);
  }

  const getRows = () => {
    return data?.map((item, index) => (
      <div key={item.id} className={`row${getRowClass(index)}`}>
        <div>{item.id}</div>
        <div>{item.courseId}</div>
        <div>{item.name}</div>
        <div>{item.type}</div>
        <div>{item.link}</div>
        <div className='link'><Link to={`/subject/update/${item.id}`} >Editar</Link></div>
        <div className='link' onClick={() => handleDelete(item.id)}>Eliminar</div>
      </div>
    ));
  };

  const getTable = () => {
    if (!data || data.length === 0) return 'No hay datos';

    return (
      <div className="table">
        <div className='row color'>
          <div>Id</div>
          <div>Id del curso</div>
          <div>Nombre</div>
          <div>Tipo</div>
          <div>Link</div>
          <div>Editar</div>
          <div>Eliminar</div>
        </div>
        {getRows()}
      </div>
    );
  };

  useEffect(() => {
    getSubjectByCourse({ courseId }).then((response) => setData(response));
  }, [courseId]);

  return (
    <div className="subject-id">
      <p className="subject-id-tittle">Tareas del curso</p>
      {getTable()}
    </div>
  );
};

export default SubjectId;
