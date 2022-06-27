import nock from "nock";

import categories from "./categories";
import config from "./config";
import settings from "./settings";
import tags from "./tags";

export default () => {
  const scope = nock("http://api.localhost");
  categories(scope);
  config(scope);
  settings(scope);
  tags(scope);
  return scope;
};
