export interface AcademicProgramme {
  id: number;
  attributes: {
    name: string;
    graduate_level: string;
    study_mode: string;
    nec_2010: string;
    nec_2020: string;
    min_semester: number;
    max_semester: number;
    required_graduation_credit: number;
    degree_qualification_type: string;
  };
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
