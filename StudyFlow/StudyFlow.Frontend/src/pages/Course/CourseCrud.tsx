import { Navbar } from '../../Components';
import './CourseCrud.css';
import { CourseCreate, CourseGet, CourseUpdate, Footer } from '../../containers';

const CourseCrud = ({method = 'post'}) => {
    const getCourse = () => {
        if (method === 'get') return <CourseGet />
        if (method === 'put') return <CourseUpdate />
        
        return <CourseCreate />
      }
    
      return (
        <div className="course-ctn">
          <Navbar />
          {getCourse()}
          <Footer />
        </div>
      );
} 

export default CourseCrud;