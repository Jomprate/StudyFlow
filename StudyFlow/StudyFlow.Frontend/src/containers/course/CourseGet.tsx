import { useEffect, useState } from 'react';
import './CourseGet.css';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Icourse, courseDelete, getAllCourse, getCourseById } from '../../utils/course';

type data = void | Icourse[];

const CourseGet = () => {
    const { courseId } = useParams();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const [data, setData] = useState<data>([]);
    const [course, setCourse] = useState<void | Icourse>();

    const getRowClass = (index: number) => {
        if ((index + 1) % 2 !== 0) return '';

        return ' color';
    };

    const handleDelete = (id: string | undefined) => {
        courseDelete(id);
    };

    const getRows = () => {
        if (courseId && (course?.logo || course?.id || course?.name || course?.description || course?.userId)) {
            return (
                <div className={`row${getRowClass(0)}`}>
                    <div>{course.id}</div>
                    <div>{course.userId}</div>
                    <div>{course.name}</div>
                    <div>{course.description}</div>
                    <div>{course.logo ?? 'None'}</div>
                    <div className="link">
                        <Link to={`/course/update/${course.id}`}>Editar</Link>
                    </div>
                    <div className="link" onClick={() => handleDelete(course.id)}>
                        Eliminar
                    </div>
                </div>
            );
        }

        return data?.map((item, index) => (
            <div key={item.id} className={`row${getRowClass(index)}`}>
                <div>{item.id}</div>
                <div>{item.userId}</div>
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>{item.logo ?? 'None'}</div>
                <div className="link">
                    <Link to={`/course/update/${item.id}`}>Editar</Link>
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
            (!courseId || (!course?.userId && !course?.id && !course?.name && !course?.description && !course?.logo))
        )
            return 'No hay datos';

        return (
            <div className="table">
                <div className="row color">
                    <div>Id</div>
                    <div>Id del usuario</div>
                    <div>Nombre</div>
                    <div>Descripción</div>
                    <div>Logo</div>
                    <div>Editar</div>
                    <div>Eliminar</div>
                </div>
                {getRows()}
            </div>
        );
    };

    useEffect(() => {
        if (courseId && courseId !== '') getCourseById(courseId).then((response) => setCourse(response));
        getAllCourse('6fe44fdc-cac4-4d08-82d6-8a672b6960c0', page).then((response) => setData(response));
    }, [courseId, page]);

    return (
        <div className="course-get">
            <p className="course-get-tittle">Cursos</p>
            {getTable()}
            <Link className="course-get-button" to="/course/create">
                Crear
            </Link>
        </div>
    );
};

export default CourseGet;