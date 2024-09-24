import React from "react";
import { Navbar } from "../../Components";
import { Footer, Subject as SubjectCtn } from "../../containers";
import './Subject.css';

const Subject = () => {
  return (
    <div className="subject-ctn">
      <Navbar />
      <SubjectCtn />
      <Footer />
    </div>
  );
};

export default Subject;
