import nock from "nock";

import categories from "./categories";
import config from "./config";
import settings from "./settings";
import tags from "./tags";
import course from "./course";
import courses from "./courses";
import login from "./login";
import me from "./me";
import user_consultations from "./user_consultations";
import tutors from "./tutors";

export default () => {
  const scope = nock("http://api.localhost");
  categories(scope).persist();
  config(scope).persist();
  settings(scope).persist();
  tags(scope).persist();
  course(scope).persist();
  courses(scope).persist();
  login(scope).persist();
  me(scope).persist();
  tutors(scope).persist();
  user_consultations(scope);
  return scope;
};
