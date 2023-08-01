import nock from "nock";
import { API } from "../../src";

export const response: API.PaginatedMetaList<API.CompetencyChallenge> & {
  message: string;
  success: true;
} = {
  success: true,
  data: [
    {
      id: 7,
      name: "Testowe",
      description:
        '### Czego się dowiesz i nauczysz?\n\n* Kurs umożliwia nabycie solidnych podstaw z zakresu rachunkowości zarówno pod względem teoretycznym jak i praktycznym\n* Kurs podstawy księgowości przygotowuje słuchacza do pracy w działach księgowości \\* Kurs przygotowuje do zawodu księgowy, który został ujęty w klasyfikacji zawodów (kod zawodu 331301)\n\n### Mark\n\n==Sed pretium turpis sapien, eu imperdiet purus fermentum eu. Nunc erat lectus, viverra ac nibh nec==\n\n### Code\n\n<code>Ut ut lectus quis urna porttitor lacinia. Vestibulum ac aliquam mi. Vestibulum suscipit tincidunt risus eu viverra. Mauris commodo euismod nisl, at dapibus elit tempor quis.</code>\n\n### Blockquote\n\n> Suspendisse non ex eget lacus aliquam hendrerit id sed mauris. Pellentesque eget purus sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n\n### Tasklist\n\n- [ ] Sed ullamcorper, odio id cursus imperdiet, diam velit iaculis magna, non placerat dui odio et nisl. Morbi eget gravida enim. Cras luctus eleifend porttitor. Donec nec lacus eu risus malesuada venenatis. Duis placerat posuere quam at placerat. Integer interdum enim ac sem imperdiet sodales.\n- [x] Sed ullamcorper, odio id cursus imperdiet, diam velit iaculis magna, non placerat dui odio et nisl. Morbi eget gravida enim. Cras luctus eleifend porttitor. Donec nec lacus eu risus malesuada venenatis. Duis placerat posuere quam at placerat. Integer interdum enim ac sem imperdiet sodales.\n\n### Ordered List\n\n1. Item 1\n2. Item 2\n3. Item 3\n\n### Unordered List\n\n* Item 1\n* Item 2\n* Item 3\n\n### Image\n\n \\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero mauris, laoreet vel elit nec, maximus commodo nulla. Curabitur blandit nisl id enim congue, bibendum molestie est fringilla. Curabitur vehicula tortor sed eros posuere eleifend. Sed id enim a dui dictum bibendum eu in diam. Praesent vulputate semper lorem, vel vestibulum leo aliquam a. Integer fermentum massa sit amet sem vestibulum, efficitur suscipit lacus tempor. Curabitur eu dignissim elit.\\\\r \\n \\\\r \\n Sed pretium turpis sapien, eu imperdiet purus fermentum eu. Nunc erat lectus, viverra ac nibh nec, dignissim consequat neque. Cras lacinia sodales augue tempus rutrum. Praesent nec metus venenatis, tincidunt nunc eleifend, molestie turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque imperdiet elit et risus viverra imperdiet. Nunc ut iaculis augue. Praesent dapibus vehicula metus at maximus.\\\\r \\n  \\n Ut ut lectus quis urna porttitor lacinia. Vestibulum ac aliquam mi. Vestibulum suscipit tincidunt risus eu viverra. Mauris commodo euismod nisl, at dapibus elit tempor quis. Phasellus sit amet cursus lacus, hendrerit tempus augue. Suspendisse a libero risus. Nam hendrerit metus nisi, laoreet sagittis leo ullamcorper non. Etiam eget nibh convallis, finibus tellus ac, porttitor lacus. Ut at augue et magna pretium aliquet quis in leo. Donec malesuada lectus nibh, vel consequat purus cursus eu. Nunc nec scelerisque metus, vitae varius nibh. Nullam imperdiet tellus et interdum iaculis. Proin tristique quam faucibus dolor tincidunt, in fringilla mauris facilisis.\\\\r \\n \\\\r \\n   ![](https://placekitten.com/g/600/600) \\n Suspendisse non ex eget lacus aliquam hendrerit id sed mauris. Pellentesque eget purus sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet elementum lacus, gravida iaculis dolor dictum non. Praesent id sapien sed libero vulputate tempus. Vestibulum faucibus ante vel arcu blandit euismod. Integer auctor sem eget scelerisque commodo. Duis tempor, lectus et viverra condimentum, ante tellus maximus quam, eu suscipit risus tortor a dui. In fermentum metus sed mi eleifend sagittis.\\\\r \\n \n\n# Header 1\n\n# Alternative Header 1\n\n## Header 2\n\n### Header 3\n\n#### Header 4\n\n##### Header 5\n\n#### Do kogo skierowane jest szkolenie?\n\n* Dla pracowników działu księgowości\n* Dla osób które swoją karierę zawodową chcą związać z pracą w księgowości\n* Dla osób pracujących w działach IT wdrażających systemy księgowe`, table: ` | First Header  | Second Header | | ------------- | ------------- | | Content Cell  | Content Cell  | | Content Cell  | Content Cell  |`, image: ` ![alt text](https://placekitten.com/g/600/600)`, link: `My favorite search engine is [Duck Duck Go](https://duckduckgo.com).`, mathInline: "$c = \\\\pm\\\\sqrt{a^2 + b^2}$", mathBlock: `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.\n\n\\\n\\',
      type: API.CompetencyChallengeType.Simple,
      image_path: "competency-challenges/7/dummy-jpg2.jpeg",
      category: { id: 25, name: "Category" },
      is_active: true,
      is_highlighted: false,
      quiz_id: 10,
      created_at: "2023-07-06T11:01:49.000000Z",
      summary: "Lorem",
      results_count: 7,
      authors: [],
      results: [
        {
          id: 1,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 4,
              matched_course: [1],
            },
            {
              category_id: 21,
              scale_category_id: 22,
              parent_category_id: 21,
              score: 0,
              max_score: 1,
              matched_course: [9],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 53,
          created_at: "2023-07-13T08:31:22.000000Z",
        },
        {
          id: 2,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 2,
              matched_course: [1],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 54,
          created_at: "2023-07-13T08:32:47.000000Z",
        },
        {
          id: 3,
          value: [],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 55,
          created_at: "2023-07-13T08:33:29.000000Z",
        },
        {
          id: 4,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 2,
              matched_course: [1],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 56,
          created_at: "2023-07-13T08:34:41.000000Z",
        },
        {
          id: 5,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 3,
              matched_course: [1],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 57,
          created_at: "2023-07-13T08:53:47.000000Z",
        },
        {
          id: 6,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 2,
              matched_course: [1],
            },
            {
              category_id: 21,
              scale_category_id: 22,
              parent_category_id: 21,
              score: 1,
              max_score: 1,
              matched_course: [9],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 58,
          created_at: "2023-07-13T10:16:38.000000Z",
        },
        {
          id: 11,
          value: [
            {
              category_id: 25,
              scale_category_id: 26,
              parent_category_id: 25,
              score: 0,
              max_score: 2,
              matched_course: [1],
            },
          ],
          scale: [
            [
              {
                parent_category_id: 25,
                category_id: 26,
                scale_min: 0,
              },
              {
                parent_category_id: 25,
                category_id: 27,
                scale_min: 35,
              },
              {
                parent_category_id: 25,
                category_id: 28,
                scale_min: 80,
              },
            ],
            [
              {
                parent_category_id: 21,
                category_id: 22,
                scale_min: 0,
              },
              {
                parent_category_id: 21,
                category_id: 23,
                scale_min: 35,
              },
              {
                parent_category_id: 21,
                category_id: 24,
                scale_min: 80,
              },
            ],
          ],
          attempt_id: 68,
          created_at: "2023-07-14T07:51:11.000000Z",
        },
      ],
    },
    {
      id: 1,
      name: "Wyzwanie",
      description: "",
      type: API.CompetencyChallengeType.Complex,
      image_path: null,
      is_active: true,
      is_highlighted: true,
      quiz_id: 4,
      created_at: "2023-07-03T09:20:37.000000Z",
      results_count: 0,
      results: [],
      summary: "Lorem",
      authors: [],
    },
  ],
  meta: {
    current_page: 1,
    last_page: 4,
    links: [
      { url: null, label: "&laquo; Previous", active: false },
      {
        url: "http://api-stage.escolalms.com/api/competency-challenges?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://api-stage.escolalms.com/api/competency-challenges?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://api-stage.escolalms.com/api/competency-challenges?page=3",
        label: "3",
        active: false,
      },
      {
        url: "http://api-stage.escolalms.com/api/competency-challenges?page=4",
        label: "4",
        active: false,
      },
      {
        url: "http://api-stage.escolalms.com/api/competency-challenges?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url:
      "http://api-stage.escolalms.com/api/competency-challenges?page=2",
    path: "http://api-stage.escolalms.com/api/competency-challenges",
    per_page: "6",
    prev_page_url: null,
    to: 6,
    total: 21,
  },
  message: "Challenges retrieved successfully",
};

export default (scope: nock.Scope) =>
  scope
    .get("/api/competency-challenges")
    .query(true)
    .reply(function () {
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

//.reply(200, response);
