import { useState } from "react";
import './CourseCreate.css';
import { Icourse, courseCrete } from "../../utils/course";

const CourseCreate = () => {
    const [data, setData] = useState<Icourse>({
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
        const isEmpy = Object.values(data).some((value) => value === '');
        if (isEmpy) alert('Llenar todos los datos');
        else courseCrete(data);
    };

    return (
        <div className="icourse-create">
            <p className="icourse-create-title">Crear Curso</p>
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
                <button type="submit">Crear</button>
            </form>
        </div>
    );
}

export default CourseCreate;