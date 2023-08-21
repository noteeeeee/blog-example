import { EnvConfig } from "@app/config";
import axios from "axios";
import { eventHandler } from "h3";

export default eventHandler(async (event) => {
  const { req, res } = event;
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }
  console.log("[vue-sitemap] generate dynamic routes");

  const routes = await axios
    .get(EnvConfig.API_BASEURL + "/articles/uuids")
    .then((res) => res.data);

  return routes.map((uuid: string) => `/articles/${uuid}`);
});
