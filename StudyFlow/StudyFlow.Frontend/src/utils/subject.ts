import axios from 'axios';

interface createSubject {
  name?: string | undefined;
  courseId?: string | undefined;
  link?: string | undefined;
  type?: string | undefined;
  userId?: string | undefined;
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

export { createSubject }
