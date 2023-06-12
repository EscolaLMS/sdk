import nock from "nock/types";

export const response = {
  success: true,
  message: "",
  data: [
    {
      created_at: "2021-08-31T14:00:00.000000Z",
      group_id: 1,
      id: 1,
      passed_at: "2021-08-31T14:00:00.000000Z",
      results: [
        {
          email: "test@test.com",
          first_name: "Jane",
          last_name: "Doe",
          result: 12,
          user_id: 1,
        },
      ],
      semester: {
        id: 1,
        name: "2021/1",
        type: "summer",
        year: "2022",
      },
      semester_subject_id: 1,
      title: "Egzamin 1",
      type: "manual",
      user_id: 1,
      weight: 85,
    },
    {
      created_at: "2021-08-31T14:00:00.000000Z",
      group_id: 2,
      id: 2,
      passed_at: "2021-08-31T14:00:00.000000Z",
      results: [
        {
          email: "test@test.com",
          first_name: "Jane",
          last_name: "Doe",
          result: 55,
          user_id: 1,
        },
      ],
      semester: {
        id: 2,
        name: "2021/1",
        type: "summer",
        year: "2022",
      },
      semester_subject_id: 2,
      title: "Egzamin 2",
      type: "manual",
      user_id: 1,
      weight: 100,
    },
  ],
};

export default (scope: nock.Scope) =>
  scope.get("/api/exams").query(true).reply(200, response);
