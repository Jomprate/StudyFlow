import './SubjectId.css';
import { deleteSubject, getSubjectByCourse } from '../../utils/subject';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Icourse, getAllCourse } from '../../utils/course';

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
    const [courses, setCourses] = useState<void | Icourse[]>([]);
    const [courseId, setCourseId] = useState<string | undefined>('')

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

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setCourseId(value);
    }

    const getOptions = () => {
        if (!courses || courses.length === 0) return <option value=''>Selecciones un curso</option>

        const options = courses.map(course => {
            return <option value={course.id}>{course.name}</option>
        })

        return <>
            <option value=''>Selecciones un curso</option>
            {options}
        </>
    }

    useEffect(() => {
        getAllCourse('b0a2064f-6a0a-499e-a686-7671b07b5a52').then(response => setCourses(response))
        getSubjectByCourse({ courseId }).then((response) => setData(response));
    }, [courseId]);

    return (
        <div className="subject-id">
            <p className="subject-id-tittle">Selecciona el curso</p>
            <select name="icourse" id="icourse" value={courseId} onChange={handleChange}>
                {getOptions()}
            </select>
            <p className="subject-id-tittle">Tareas del curso</p>
            {getTable()}
            <Link className="subject-get-button" to="/subject/create">
                Crear
            </Link>
        </div>
    );
};

export default SubjectId;