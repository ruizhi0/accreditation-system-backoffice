import { useState } from "react";
import { AcademicProgramme } from "../types/academic-programmes";
import AcademicProgrammeTable from "./AcademicProgrammeTable";

const AcademicProgrammeView = ({
  academicProgrammes,
}: {
  academicProgrammes: AcademicProgramme[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredAcademicProgrammes = searchTerm
    ? academicProgrammes.filter(
        (x) =>
          x.attributes.name.toLowerCase().includes(searchTerm) ||
          x.attributes.nec_2010.includes(searchTerm) ||
          x.attributes.nec_2020.includes(searchTerm)
      )
    : academicProgrammes;

  return (
    <div>
      <h1>Academic Programmes</h1>
      <div>
        Search: <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <AcademicProgrammeTable academicProgrammes={filteredAcademicProgrammes} />
    </div>
  );
};

export default AcademicProgrammeView;
