import nock from "nock";

import categories from "./categories";
import config from "./config";
import settings from "./settings";
import tags from "./tags";
import course from "./course";
import courses from "./courses";

export default () => {
  const scope = nock("http://api.localhost");
  categories(scope);
  config(scope);
  settings(scope);
  tags(scope);
  course(scope);
  courses(scope);
  return scope;
};
