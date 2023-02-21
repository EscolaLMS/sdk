import nock from "nock";

export const oneTaskResponse = {
  success: true,
  message: "",
  data: {
    id: 4,
    title: "My task 2",
    user: {
      id: 1,
      first_name: "Osman",
      last_name: "Kanu",
    },
    created_by: {
      id: 1,
      first_name: "Osman",
      last_name: "Kanu",
    },
    completed_at: null,
    related_type: "EscolaLMS\\Courses\\Course",
    related_id: 1,
    notes: [
      {
        id: 1,
        note: "note 1",
        user: {
          id: 1,
          first_name: "Osman",
          last_name: "Kanu",
        },
        task_id: 4,
      },
      {
        id: 2,
        note: "note 2",
        user: {
          id: 1,
          first_name: "Osman",
          last_name: "Kanu",
        },
        task_id: 4,
      },
      {
        id: 3,
        note: "note 3",
        user: {
          id: 1,
          first_name: "Osman",
          last_name: "Kanu",
        },
        task_id: 4,
      },
    ],
  },
};

export const response = {
  success: true,
  data: [
    {
      id: 3,
      title: "My task 1",
      user: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      created_by: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      completed_at: null,
      related_type: "EscolaLMS\\Courses\\Course",
      related_id: 1,
      has_notes: false,
    },
    {
      id: 4,
      title: "My task 2",
      user: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      created_by: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      completed_at: null,
      related_type: "EscolaLMS\\Courses\\Course",
      related_id: 1,
      has_notes: true,
    },
    {
      id: 5,
      title: "My task 3",
      user: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      created_by: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      completed_at: null,
      related_type: "EscolaLMS\\Courses\\Course",
      related_id: 1,
      has_notes: false,
    },
    {
      id: 6,
      title: "My task 4",
      user: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      created_by: {
        id: 1,
        first_name: "Osman",
        last_name: "Kanu",
      },
      completed_at: null,
      related_type: "EscolaLMS\\Courses\\Course",
      related_id: 1,
      has_notes: false,
    },
  ],
  meta: {
    current_page: 1,
    first_page_url: "http://app.theonlineschool.s.escolait.pl/api/tasks?page=1",
    from: 1,
    last_page: 1,
    last_page_url: "http://app.theonlineschool.s.escolait.pl/api/tasks?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://app.theonlineschool.s.escolait.pl/api/tasks?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: null,
    path: "http://app.theonlineschool.s.escolait.pl/api/tasks",
    per_page: 15,
    prev_page_url: null,
    to: 4,
    total: 4,
  },
  message: "",
};

export default (scope: nock.Scope) => {
  scope
    .get("/api/tasks")
    .query(true)
    .reply(function (uri, requestBody) {
      const parsed = new URL(this.req.path, "http://example.com");
      const page = parsed.searchParams.get("page") || "1";

      return [
        200,
        {
          ...response,
          meta: { ...response.meta, current_page: parseInt(page) },
        },
      ];
    });

  scope.get(new RegExp("/api/tasks([^s]+)")).reply(function (uri, requestBody) {
    return [200, oneTaskResponse];
  });
};

//.reply(200, response);
