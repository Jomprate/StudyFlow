import { useEffect, useState } from 'react';
import './NotificationGet.css';
import { getAll, notification } from '../../utils/notification';
import { Link } from 'react-router-dom';

type data =
  | void
  | notification[]

const NotificationGet = () => {
  const [data, setData] = useState<data>([]);

  const getRowClass = (index: number) => {
    if ((index + 1) % 2 !== 0) return '';

    return ' color';
  };

  const handleDelete = (id: string | undefined) => {
    // deleteSubject(id);
  };

  const getRows = () => {
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
        {/* <div className="link" onClick={() => handleDelete(item.id)}>
          Eliminar
        </div> */}
      </div>
    ));
  };

  const getTable = () => {
    if (!data || data.length === 0) return 'No hay datos';

    return (
      <div className="table">
        <div className="row color">
          <div>Id</div>
          <div>Id del curso</div>
          <div>Id del usuario</div>
          <div>Mensaje</div>
          <div>Estado</div>
          <div>Editar</div>
          {/* <div>Eliminar</div> */}
        </div>
        {getRows()}
      </div>
    );
  };

  useEffect(() => {
    getAll().then((response) => setData(response));
  }, []);

//   useEffect(() =>{
//     console.log(data)
//   }, [data])

  return (
    <div className="notification-get">
      <p className="notification-get-tittle">Notificaciones</p>
      {getTable()}
      <Link className='notification-get-button' to='/notification/create'>Crear</Link>
    </div>
  );
};

export default NotificationGet;
