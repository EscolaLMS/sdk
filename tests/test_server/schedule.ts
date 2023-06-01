import nock from "nock";

export const response = {
  success: true,
  message: "Schedule retrieved successfully",
  data: [
    {
      id: 1,
      date_from: "2021-06-01T00:00:00.000Z",
      date_to: "2021-06-30T00:00:00.000Z",
      tutor: {
        email: "test@test.com",
        first_name: "Jan",
        last_name: "Kowalski",
        id: 1,
      },
      subject: {
        id: 1,
        name: "Test subject",
      },
      semester: {
        id: 1,
        name: "Test semester",
        type: "summer",
        year: "2021",
      },
      term_status: {
        id: 1,
        name: "Test status",
      },
      group: {
        id: 1,
        name: "Test group",
      },
    },
    {
      id: 2,
      date_from: "2021-06-01T00:00:00.000Z",
      date_to: "2021-06-30T00:00:00.000Z",
      tutor: {
        email: "test2@test.com",
        first_name: "Kamil",
        last_name: "Nowak",
        id: 2,
      },
      subject: {
        id: 2,
        name: "Test subject 2",
      },
      semester: {
        id: 2,
        name: "Test semester 2",
        type: "summer",
        year: "2021",
      },
      term_status: {
        id: 2,
        name: "Test status 2",
      },
      group: {
        id: 2,
        name: "Test group 2",
      },
    },
  ],
};

export default (scope: nock.Scope) =>
  scope.get("/api/schedules").query(true).reply(200, response);
