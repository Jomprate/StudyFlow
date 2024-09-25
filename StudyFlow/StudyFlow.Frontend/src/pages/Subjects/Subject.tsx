import { Navbar } from "../../Components";
import { Footer, Subject as SubjectCtn, SubjectId, SubjectUpdate } from "../../containers";
import './Subject.css';

interface subject {
  method?: string
}

const Subject = ({ method = 'post' }: subject) => {
  const getSubject = () => {
    if (method === 'get') return <SubjectId />
    if (method === 'put') return <SubjectUpdate />

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
