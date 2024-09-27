import axios from 'axios';

interface course {
  description: string | undefined;
  id?: string | undefined;
  isEnabled?: boolean | undefined;
  logo?: string | undefined;
  name: string | undefined;
  userId: string | undefined;
  teacherDTO?: {
    id?: string | undefined;
  };
}

interface paginationResult {
  listResult: Array<course>;
}
interface courseData {
  paginationResult: paginationResult;
}

const courseCrete = ({ userId, name, description }: course) => {
  const body = {
    teacherDTO: {
      id: userId,
      fullName: 'string',
    },
    name,
    description,
    logo: '',
    isEnabled: false,
  };

  return axios
    .post('https://localhost:7033/CreateCourse', body)
    .then(() => alert('Se creo el curso'))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      alert('Error al crear curso');
    });
};

const formmatedData = (data: courseData) => {
  const arrayData = data?.paginationResult?.listResult;
  return arrayData.map((item) => {
    return {
      description: item.description,
      id: item.id,
      isEnabled: item.isEnabled,
      logo: item.logo,
      name: item.name,
      userId: item.teacherDTO?.id,
    };
  });
};

const getAllCourse = (userId: string | undefined, page: string | null = '1') => {
  return (
    axios
      .get(`https://localhost:7033/GetCourses?TeacherId=${userId}&Pagination.Page=${page}`)
      .then((response) => {
        return formmatedData(response?.data?.data);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

const getCourseById = (courseId: string | undefined) => {
  return (
    axios
      .get(`https://localhost:7033/GetCourseById?CourseId=${courseId}`)
      .then((response) => {
        const res = response?.data?.data;
        const parsedData: course = {
          description: res.description,
          id: res.id,
          isEnabled: res.isEnabled,
          logo: res.logo,
          name: res.name,
          userId: res.teacherDTO.id,
        };
        return parsedData;
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

const courseUpdate = (id: string | undefined, { userId, description, name }: course) => {
  const body = {
    id,
    teacherDTO: {
      id: userId,
      fullName: 'string',
    },
    name,
    description,
    logo: '',
    isEnabled: false,
  };

  return (
    axios
      .put('https://localhost:7033/UpdateCourse', body)
      .then(() => alert('Se modifico el curso'))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        alert('Error al modificar curso');
      })
  );
};

const courseDelete = (id: string | undefined) => {
  return (
    axios
      .delete(`https://localhost:7033/DeleteCourse?courseId=${id}`)
      .then(() => alert('Se elimino el curso'))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        alert('Error al eliminar curso');
      })
  );
};

export { courseCrete, getAllCourse, getCourseById, courseUpdate, courseDelete };
export type { course };
