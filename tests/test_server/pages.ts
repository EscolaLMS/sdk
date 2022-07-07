import nock from "nock";

export const onePageResponse = {
  success: true,
  message: "page fetched successfully",
  data: {
    id: 2,
    title: "Grass-roots static model",
    slug: "grass-roots-static-model",
    author_id: 45,
    content:
      "Expedita aut quis sunt expedita debitis omnis.\n==============================================\n\nArchitecto eveniet voluptatem animi maiores quo asperiores. Placeat ut quam et vero magni consequuntur qui. Qui quibusdam voluptatem dolor molestias. Ex vero fuga veritatis sed.\n\nConsequuntur quae dolores omnis in soluta.\n==========================================\n\n>  Quis fugit provident repellat tempora qui et fugit. At quaerat quidem pariatur voluptates iste pariatur. Ut odit omnis ut eum soluta ducimus omnis neque.\n\nQuia voluptatem necessitatibus quae autem nisi.\n===============================================\n\n* Facilis voluptatum omnis corrupti dolores non quia.\n* Et velit aut iure voluptatem voluptatem veniam atque.\n* Asperiores qui qui minima nam voluptatem mollitia.",
    active: true,
  },
};

export const response = {
  success: true,
  data: [
    {
      id: 1,
      title: "Multi-lateral reciprocal parallelism",
      slug: "multi-lateral-reciprocal-parallelism",
      author_id: 44,
      content:
        "Voluptatem voluptas illo repellat sequi.\n========================================\n\nLaboriosam tempora ex nam qui. Et mollitia accusantium consequatur nihil. Voluptatem cupiditate perspiciatis voluptatem voluptas qui perspiciatis autem. Ea accusantium et harum totam amet eius.\n\n>  Praesentium expedita hic iste explicabo dolor sed nemo nesciunt. Qui tempora enim et dolorum sint. Eveniet quidem laudantium rerum.\n\n* Assumenda voluptatem voluptatem est.\n* Nulla quia ut tenetur distinctio eos cumque optio dolores.\n* Debitis pariatur ab aut ut et.\n\n1. Architecto sed excepturi explicabo molestiae.\n2. Dolore cumque quam libero.\n3. Repellat enim reprehenderit autem quia quia aliquid cumque.\n\nOptio non temporibus corporis aliquid dolor eum enim.\n=====================================================\n\n>  Esse voluptatum qui voluptas qui eum ea vitae. Quos ut sit molestiae nihil. Omnis qui ipsa voluptatem aut doloribus et. Debitis quia est et eaque maxime totam reiciendis.\n\n* Omnis eaque nisi animi asperiores aliquam omnis.\n* Unde est culpa quis earum magni aspernatur.\n* Rerum dolorem dignissimos quia eos aliquam officia qui blanditiis.\n\n1. Ut ut totam porro et.\n2. Labore tenetur molestiae quis libero dolorum voluptas.\n3. Consequuntur quia suscipit ab voluptatum explicabo et cupiditate.",
      active: true,
    },
    {
      id: 2,
      title: "Grass-roots static model",
      slug: "grass-roots-static-model",
      author_id: 45,
      content:
        "Expedita aut quis sunt expedita debitis omnis.\n==============================================\n\nArchitecto eveniet voluptatem animi maiores quo asperiores. Placeat ut quam et vero magni consequuntur qui. Qui quibusdam voluptatem dolor molestias. Ex vero fuga veritatis sed.\n\nConsequuntur quae dolores omnis in soluta.\n==========================================\n\n>  Quis fugit provident repellat tempora qui et fugit. At quaerat quidem pariatur voluptates iste pariatur. Ut odit omnis ut eum soluta ducimus omnis neque.\n\nQuia voluptatem necessitatibus quae autem nisi.\n===============================================\n\n* Facilis voluptatum omnis corrupti dolores non quia.\n* Et velit aut iure voluptatem voluptatem veniam atque.\n* Asperiores qui qui minima nam voluptatem mollitia.",
      active: true,
    },
    {
      id: 3,
      title: "Down-sized nextgeneration forecast",
      slug: "down-sized-nextgeneration-forecast",
      author_id: 46,
      content:
        "Quia nesciunt ut quos beatae omnis magnam id.\n=============================================\n\nRerum laborum beatae voluptate est. Iste odit doloremque voluptas dicta fugit officia ab. Ducimus sit enim ea ut aut animi.\n\n1. Consequatur magni sit ex voluptatum quaerat est porro.\n2. Vel minima distinctio quo in qui et qui beatae.\n3. Consequatur qui non pariatur sed consequatur eligendi et.",
      active: true,
    },
    {
      id: 4,
      title: "Grass-roots maximized policy",
      slug: "grass-roots-maximized-policy",
      author_id: 47,
      content:
        "Ducimus doloribus reprehenderit non quis rerum.\n===============================================\n\n1. Esse nulla quisquam voluptatibus et.\n2. Odit illum amet tempore impedit ut nihil reprehenderit.\n3. Et sint deleniti sint earum eum recusandae vero.\n\nAut sint aspernatur omnis voluptatem officiis.\n==============================================\n\nDolores ea excepturi adipisci omnis sapiente optio. Aut velit nihil nam. Nesciunt vero sunt commodi enim blanditiis fugit occaecati.\n\nEst voluptatibus et aspernatur sit nulla non id.\n================================================\n\n>  Laudantium ratione cumque beatae. Aut esse alias maxime quae tenetur rerum rerum. Temporibus delectus commodi necessitatibus omnis vel.\n\n* Officiis assumenda a rerum natus.\n* Voluptates esse est ad voluptate veritatis.\n* Et maiores nihil fugiat rem in ullam.\n\nDoloremque enim dolor quia quos.\n================================\n\n>  Quae molestias qui officia sed. Et fugiat dolorem dolor deserunt quaerat perferendis dolorem. Consequatur minus molestiae vero ipsam voluptate odio.\n\n* Saepe optio aut quasi quasi.\n* Et assumenda deleniti qui voluptate.\n* Eos nulla aspernatur reprehenderit quae consequatur et dicta recusandae.\n\n1. Voluptatem ab nesciunt aut est minima molestiae.\n2. Et non quod repellat odio eum tenetur inventore.\n3. Voluptas dolorem facere et qui.\n\nNihil reprehenderit qui repellendus voluptate voluptates est.\n=============================================================\n\nEt quisquam numquam dignissimos deserunt. Qui sint quia earum asperiores. Soluta ut voluptates et sit magnam modi voluptatem ullam.\n\n* Vel maiores velit natus quia.\n* Delectus expedita labore sit aperiam.\n* Perferendis quas animi dicta beatae harum voluptatem eum.\n\n1. Aut nam quis recusandae consequatur.\n2. Ipsam ut nemo repellat aut.\n3. Minima ea ipsa quia aut fugit consectetur similique.\n\nAutem et quo ipsum repellat iure ab.\n====================================\n\nQuo sed quis occaecati dolorem. Voluptatibus molestiae est totam neque ea similique quo.\n\n>  Voluptate rerum unde corporis voluptas. Quo ullam eum expedita repudiandae voluptatem aliquid. Sequi sunt quam a delectus.\n\n1. Nihil aspernatur vel maxime odio eligendi provident.\n2. Dolor libero earum expedita voluptates blanditiis omnis.\n3. Quos minus laborum quia ipsa.\n\nOmnis quisquam quasi ut voluptatum.\n===================================\n\nFuga aspernatur omnis provident earum. Sunt dolor eius sit impedit assumenda placeat aliquid. Ea reprehenderit accusantium molestiae est. Possimus sunt alias iure maxime quo.\n\n>  Consequuntur velit similique et ut ut. Qui hic non libero aliquid esse libero. Dolores dolores maxime consequuntur doloribus aut molestiae laboriosam.\n\n* Culpa et corrupti sit quia eligendi est ullam.\n* Voluptatem et quod et praesentium sint qui.\n* Accusamus ea consequatur sint omnis veritatis quaerat.\n\nMolestiae occaecati rerum porro enim.\n=====================================\n\nOdio molestiae rerum quia quidem earum. Mollitia cum ducimus reiciendis quia et. Assumenda sint eos officiis laborum.\n\n>  Dolorum et recusandae facere totam qui. Maiores minima officia non animi et sunt quaerat repudiandae. Est corrupti incidunt animi expedita dolor. Est odit alias occaecati quis ipsam eligendi.",
      active: true,
    },
    {
      id: 5,
      title: "Object-based multi-tasking pricingstructure",
      slug: "object-based-multi-tasking-pricingstructure",
      author_id: 48,
      content:
        "Voluptatem saepe tenetur et molestias pariatur enim et.\n=======================================================\n\nMinima commodi voluptas aperiam est. Quia alias quisquam asperiores voluptas quia. Ullam aut sed dolore officia. Et nesciunt sed repudiandae ab magni repellat minus.\n\n>  Velit voluptatibus eos nesciunt voluptatem totam. Qui dolor aut odio. Qui vel expedita adipisci et.\n\n* Quis repellendus explicabo dolores officia provident ad maiores.\n* Adipisci totam accusantium tempore.\n* Sequi quia omnis et enim.\n\n1. Quidem recusandae fugiat nobis sunt enim totam.\n2. Aut dolorum necessitatibus nulla nihil asperiores.\n3. Nesciunt in beatae velit officiis non blanditiis.\n\nSunt et ullam est sapiente saepe rerum eius.\n============================================\n\n* Officia dolores voluptatem praesentium reprehenderit voluptatum aspernatur consequuntur.\n* Minus officiis sed sed optio consequatur commodi.\n* Earum sed voluptatem qui harum aut enim et.\n\n1. Et cum voluptatem reprehenderit sed eos accusantium.\n2. Sit quam aut atque et.\n3. Quo cum facere quod consequatur omnis quasi.",
      active: true,
    },
    {
      id: 6,
      title: "Down-sized regional synergy",
      slug: "down-sized-regional-synergy",
      author_id: 49,
      content:
        "Ad quae et voluptatem animi.\n============================\n\nAssumenda molestias in dolor iusto possimus aspernatur. Et eos eos quis exercitationem. Voluptate fugiat iusto beatae quaerat et. Eius nihil ex velit rem.\n\n>  Ex repellendus assumenda sunt numquam. Ullam nobis nihil rerum voluptatum. Eaque aspernatur sunt numquam placeat.",
      active: true,
    },
    {
      id: 7,
      title: "Compatible 24hour flexibility",
      slug: "compatible-24hour-flexibility",
      author_id: 50,
      content:
        "Et et aliquam rerum et temporibus eveniet nisi corporis.\n========================================================\n\n* Neque facilis ipsam et enim magnam nisi officiis.\n* Ut animi magnam odio ut error.\n* Consequatur corrupti enim ut est sint.\n\nBeatae est ut odio omnis.\n=========================\n\nPariatur totam et et sint et aut. Laboriosam quos accusantium aspernatur consequatur commodi. Rerum et assumenda porro asperiores et in fugiat.\n\n* Error distinctio aut adipisci quos.\n* Aut deleniti molestiae voluptates voluptatem inventore non eveniet.\n* Accusamus doloribus tenetur maxime et blanditiis eius.\n\nVeritatis mollitia voluptates dolores.\n======================================\n\n>  Nihil dicta animi modi et iusto sint. Autem rerum ut facere distinctio maiores nam. Sunt nihil ad quae rerum sit ad est. Repellendus et doloribus qui.\n\n* Iusto nam sed quasi non nam ut.\n* Totam explicabo et quos beatae tenetur enim.\n* Eos quia expedita consequatur quae eos cumque.\n\n1. Tempora possimus aut voluptatem voluptatibus.\n2. Sed omnis consequuntur ut quae quibusdam dolore nihil atque.\n3. Quo quia suscipit numquam mollitia ut ex.",
      active: true,
    },
    {
      id: 8,
      title: "Business-focused uniform localareanetwork",
      slug: "business-focused-uniform-localareanetwork",
      author_id: 51,
      content:
        "Perspiciatis nobis neque possimus sed quod voluptatem.\n======================================================\n\nQuia consequuntur quo in velit. Voluptas similique vel vel facilis iure. Perferendis ut molestias rerum.\n\n>  Perspiciatis ut dolorem porro error dignissimos itaque velit. Quidem eos fugit quos porro a dignissimos. Facilis unde et est ex a exercitationem sed.",
      active: true,
    },
    {
      id: 9,
      title: "De-engineered multi-state hierarchy",
      slug: "de-engineered-multi-state-hierarchy",
      author_id: 52,
      content:
        "Culpa consequatur eius pariatur et non architecto ut ut.\n========================================================\n\nEum eligendi autem eveniet magnam quasi fugit. Et sed officia voluptas dolorem et.\n\n>  Ut molestiae sint ipsam quam laborum qui totam. Est aut qui similique quam eaque perferendis et. Qui quod eligendi est sint culpa eum nihil.\n\n1. Et veritatis dolores provident reiciendis eum.\n2. Et sequi reprehenderit id labore dolorum illum amet.\n3. Blanditiis doloremque corrupti ipsam.",
      active: true,
    },
    {
      id: 10,
      title: "Profound multimedia interface",
      slug: "profound-multimedia-interface",
      author_id: 53,
      content:
        "Non voluptatem in ad tempore qui.\n=================================\n\nFugiat ad expedita corporis perspiciatis. Ex ipsam est placeat accusantium. Doloribus sunt vel inventore sed cum doloremque.\n\n>  Neque et autem sint. Ipsa qui sunt quia tempore sit porro. Dolorem autem laudantium nobis est.\n\n* Qui ipsam eum eligendi error aut optio.\n* Autem et exercitationem iste porro.\n* Quisquam quis aut enim sed.",
      active: true,
    },
    {
      id: 11,
      title: "contactt",
      slug: "contactt",
      author_id: 2,
      content: "contact here",
      active: true,
    },
  ],
  meta: {
    current_page: 1,
    first_page_url: "http://api-stage.escolalms.com/api/pages?page=1",
    from: 1,
    last_page: 1,
    last_page_url: "http://api-stage.escolalms.com/api/pages?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://api-stage.escolalms.com/api/pages?page=1",
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
    path: "http://api-stage.escolalms.com/api/pages",
    per_page: 15,
    prev_page_url: null,
    to: 11,
    total: 11,
  },
  message: "pages list retrieved successfully",
};

export default (scope: nock.Scope) => {
  scope
    .get("/api/pages")
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

  scope.get(new RegExp("/api/pages([^s]+)")).reply(function (uri, requestBody) {
    return [200, onePageResponse];
  });
};

//.reply(200, response);
