import { AcademicProgramme } from "./types/academic-programmes";
import AcademicProgrammeView from "./components/AcademicProgrammeView";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [academicProgrammes, setAcademicProgrammes] = useState(
    [] as AcademicProgramme[]
  );

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
      },
    };

    axios
      .get("http://localhost:1337/api/academic-programmes", config)
      .then((res) => {
        setAcademicProgrammes(res.data.data);
      });
  }, []);

  return (
    <div>
      <AcademicProgrammeView academicProgrammes={academicProgrammes} />
    </div>
  );
};

export default App;
