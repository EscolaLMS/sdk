import {
  DefaultMetaResponse,
  DefaultResponse,
  PaginationParams,
  Template,
} from "./core";
import { AttendanceStatus, CertificateAssignableTypes } from "./enums";
import { Tutor } from "./user";

export type SemesterData = {
  id: number;
  name: string;
  type: string;
  speciality: string;
  study_plan_id: number;
  academic_year_id: number;
  is_active: boolean;
};

export type ProjectParams = PaginationParams & {
  course_id: number;
  topic_id: number;
};

export interface AddProjectBody {
  topic_id: string;
  file: File;
}

export interface ProjectFile {
  id: number;
  created_at: Date | string;
  file_url: string;
  topic_id: number;
  user_id: number;
}

export type SemestersParams = {
  academic_year_id?: number;
};

export type AcademicYearParams = {
  active?: boolean;
};

export type SubjectsParams = PaginationParams & {
  semester_id?: number;
};

export type ScheduleParams = {
  date_from?: string;
  date_to?: string;
  group_id?: number;
  term_status_id?: number;
};

export type Subject = {
  id: number;
  name: string;
};

export type AcademicYear = {
  id: number;
  name: string;
  year: number;
  year_name: string;
  summer_semester_start: string;
  summer_semester_end: string;
  winter_semester_start: string;
  winter_semester_end: string;
  active: boolean;
};

export type Semester = {
  id: number;
  name: string;
  type: string;
  year: string;
};

export type ExamScale = {
  s_subject_scale_form_id: number;
  scale: {
    name: string;
    grade: number;
    grade_value: number;
  }[];
};

export type ExamResults = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  result: number;
}[];

export type Exam = {
  id: number;
  semester_subject_id: number;
  title: string;
  type: string;
  weight: number;
  passed_at: string;
  created_at: string;
  group_id: number;
  grade_scale: ExamScale;
  results: ExamResults;
};

export type GroupSubjectFinalGradeGradeTerm = {
  id: number;
  name: string;
};

export type GroupSubjectFinalGrade = {
  grade_date: string;
  grade_name: string;
  grade_term: GroupSubjectFinalGradeGradeTerm;
  grade_value: number;
  id: number;
};

export type GroupSubject = {
  group_id: number;
  as_assessment_form_name: string;
  as_form_name: string;
  as_form_name_shortcut: string;
  subject: Subject;
  tutor: Tutor;
  ssubject_form_hours_numbers: number;
  final_grades: GroupSubjectFinalGrade[];
};

export type Group = {
  id: number;
  name: string;
};

export type ScheduleData = {
  id: number;
  date_from: Date | string;
  date_to: Date | string;
  tutor: Tutor;
  subject: Subject;
  semester: Semester;
  term_status: TermStatus;
  group: Group;
  ms_teams_join_url: string | null;
};

export type AttendanceItem = {
  user_id: number;
  value: AttendanceStatus | null;
};

export type Attendance = {
  attendances: AttendanceItem[];
  date_from: string;
  date_to: string;
  group_id: number;
  id: number;
  semester_id: number;
  subject_id: number;
  teacher_id: number;
  term_status_id: number;
};

export type TermStatus = {
  id: number;
  name: string;
};

export type Certificate = {
  id: number;
  template: Template;
  created_at: Date;
  updated_at: Date;
  path?: null;
  content?: any;
  title?: string;
  assignable_id?: number;
};

export type CertificateParams = PaginationParams & {
  assignable_type?: CertificateAssignableTypes;
  assignable_id?: number;
};

export type CertificateList = DefaultMetaResponse<Certificate>;

export type SubjectsList = DefaultMetaResponse<GroupSubject>;
export type ExamsList = DefaultMetaResponse<Exam>;
export type Schedule = DefaultResponse<ScheduleData[]>;
export type ExamsParams = PaginationParams & {
  group_id?: number;
};
