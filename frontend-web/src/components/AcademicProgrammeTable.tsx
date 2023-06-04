import { AcademicProgramme } from "../types/academic-programmes";

const AcademicProgrammeTable = ({
  academicProgrammes,
}: {
  academicProgrammes: AcademicProgramme[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>NEC 2010</th>
          <th>NEC 2020</th>
          <th>Graduate level</th>
          <th>Minimum semester</th>
          <th>Maximum semester</th>
        </tr>
      </thead>
      <tbody>
        {academicProgrammes.map((x) => (
          <tr key={x.id}>
            <td>{x.attributes.name}</td>
            <td>{x.attributes.nec_2010}</td>
            <td>{x.attributes.nec_2020}</td>
            <td>{x.attributes.graduate_level}</td>
            <td>{x.attributes.min_semester}</td>
            <td>{x.attributes.max_semester}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AcademicProgrammeTable;
