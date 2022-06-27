import nock from "nock";

import categories from "./categories";
import config from "./config";
import settings from "./settings";
import tags from "./tags";
import course from "./course";
import courses from "./courses";

export default () => {
  const scope = nock("http://api.localhost");
  categories(scope).persist();
  config(scope).persist();
  settings(scope).persist();
  tags(scope).persist();
  course(scope).persist();
  courses(scope).persist();
  return scope;
};
