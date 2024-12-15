import { Api } from "@generated/api.gen";
import env from "@lib/env";

const api = new Api({
  baseUrl: env.backendUrl,
});

export default api;
