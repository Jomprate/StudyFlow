import { Navbar } from "../../Components";
import { Footer, Subject as SubjectCtn, SubjectId, SubjectStudentId, SubjectTeacherId, SubjectUpdate } from "../../containers";
import './Subject.css';

interface subject {
  method?: string
}

const Subject = ({ method = 'post' }: subject) => {
  const getSubject = () => {
    if (method === 'get') return <SubjectId />
    if (method === 'put') return <SubjectUpdate />
    if (method === 'get-student-id') return <SubjectStudentId />
    if (method === 'get-teacher-id') return <SubjectTeacherId />

    return <SubjectCtn />
  }

  return (
    <div className="subject-ctn">
      <Navbar />
      {getSubject()}
      <Footer />
    </div>
  );
};

export default Subject;
