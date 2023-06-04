import { AcademicProgramme } from "./types/academic-programmes";
import AcademicProgrammeView from "./components/AcademicProgrammeView";
import { useState, useEffect } from "react";
import academicProgrammeService from "./services/academic-programmes";

const App = () => {
  const [academicProgrammes, setAcademicProgrammes] = useState(
    [] as AcademicProgramme[]
  );

  useEffect(() => {
    academicProgrammeService
      .getMany()
      .then((res) => setAcademicProgrammes(res.data));
  }, []);

  return (
    <div>
      <AcademicProgrammeView academicProgrammes={academicProgrammes} />
    </div>
  );
};

export default App;
