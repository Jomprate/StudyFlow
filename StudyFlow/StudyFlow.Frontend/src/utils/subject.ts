import axios from 'axios';

interface createSubject {
  name?: string | undefined;
  courseId?: string | undefined;
  link?: string | undefined;
  type?: string | undefined;
  userId?: string | undefined;
}
interface getSubjec {
  courseId?: string | undefined;
  studentId?: string | undefined;
  teacherId?: string | undefined;
}
interface course {
  id: string | undefined;
}
interface item {
  id: string | undefined;
  name: string | undefined;
  link: string | undefined;
  type: string | undefined;
  course: course;
}
interface paginationResult {
  listResult: Array<item>;
}
interface subjectData {
  paginationResult: paginationResult;
}

const createSubject = ({ courseId = '', link = '', name = '', type = '', userId = '' }: createSubject) => {
  const body = {
    courseId,
    subjectDTO: {
      course: {
        id: courseId,
        teacherDTO: {
          id: userId,
        },
      },
      name,
      type,
      link,
    },
  };

  return (
    axios
      .post('https://localhost:7033/AddSubjectByCourse', body)
      .then((response) => response)
      // eslint-disable-next-line no-console
      .catch((e) => console.log('Error', e))
  );
};

const formaterData = (data: subjectData) => {
  const arrayData = data?.paginationResult?.listResult;
  return arrayData.map((item) => {
    return {
      courseId: item.course.id,
      id: item.id,
      link: item.link,
      name: item.name,
      type: item.type,
    };
  });
};

const getSubjectByCourse = ({ courseId = '' }: getSubjec) => {
  return (
    axios
      .get(`https://localhost:7033/GetSubjectByCourseId?CourseId=${courseId}`)
      .then((response) => {
        const res = response.data.data;
        return formaterData(res);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

const updateSubject = (subjectId: string | undefined, data: createSubject) => {
  const { courseId = '', link = '', name = '', type = '', userId = '' } = data;
  const body = {
    courseId,
    subjectDTO: {
      id: subjectId,
      course: {
        id: courseId,
        teacherDTO: {
          id: userId,
          fullName: 'string',
        },
      },
      name,
      type,
      link,
      listScheduleds: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        subjectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        scheduledDate: new Date().toISOString(),
        link: 'string',
      },
    },
  };

  return (
    axios
      .put('https://localhost:7033/SetSubjectByCourse', body)
      .then((response) => response)
      // eslint-disable-next-line no-console
      .catch((e) => console.log('Error', e))
  );
};

const deleteSubject = (id: string | undefined) => {
  return axios
    .delete(`https://localhost:7033/DeleteSubjectById?subjectId=${id}`)
    .then((response) => response)
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e));
};

//b0a2064f-6a0a-499e-a686-7671b07b5a52
const getSubjectByTeacher = ({ teacherId = '' }: getSubjec) => {
  return (
    axios
      .get(`https://localhost:7033/api/OnBoardingStudent/GetSubjectsByTeacher?TeacherId=${teacherId}`)
      .then((response) => {
        const res = response.data.data;
        return formaterData(res);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

//cb51ed40-41f5-4c46-8de1-5075e28db511
const getSubjectByStudent = ({ studentId = '' }: getSubjec) => {
  return (
    axios
      .get(`https://localhost:7033/api/OnBoardingStudent/GetSubjectsByStudent?StudentId=${studentId}`)
      .then((response) => {
        const res = response.data.data;
        return formaterData(res);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  );
};

export { createSubject, getSubjectByCourse, updateSubject, deleteSubject, getSubjectByStudent, getSubjectByTeacher };
