import React, { useState } from "react";
import './Subject.css';

// {
//     "courseId": "aa72e3ff-69e4-4c0a-8cca-ef1f74930734",
//     "subjectDTO": {
//       "course": {
//         "id": "aa72e3ff-69e4-4c0a-8cca-ef1f74930734",
//         "teacherDTO": {
//           "id": "b0a2064f-6a0a-499e-a686-7671b07b5a52"
//         }
//       },
//       "name": "Quintos metododos",
//       "type": "task",
//       "link": "www.youtube.com"
//     }
//   }

const Subject = () => {
    const [data, setData] = useState({
        courseId: "",
        link: '',
        name: '',
        type: '',
        userId: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name} = e.target;
        setData((prev) => ({...prev, [name]: value}))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
    } 

    return <div className="subject">
        <p className="subject-title">Crear Tarea</p>
        <form onSubmit={onSubmit} className="subject-form">
            <div>
                <label htmlFor="courseId">Id del Curso:</label>
                <input type="text" name="courseId" value={data?.courseId} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="userId">Id del Usuario:</label>
                <input type="text" name="userId" value={data?.userId} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="name">Nombre de la tarea:</label>
                <input type="text" name="name" value={data?.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="type">Tipo de la tarea:</label>
                <input type="text" name="type" value={data?.type} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="link">Link:</label>
                <input type="text" name="link" value={data?.link} onChange={handleChange}/>
            </div>
            <button type="submit" >Crear</button>
        </form>
    </div>
}

export default Subject;