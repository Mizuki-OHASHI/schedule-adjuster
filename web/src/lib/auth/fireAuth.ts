import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import env from "@lib/env";

const fireApp = initializeApp(env.firebase);
const fireAuth = getAuth(fireApp);

export default fireAuth;
