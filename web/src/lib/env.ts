// 環境変数の読み込みとバリデーションを行う

/*
BACKEND_URL=http://localhost:8080
FIREBASE_API_KEY=AIzaSyAFUXQYRfYVDBXTmqc-3uGLhu5zIOk30IQ
FIREBASE_AUTH_DOMAIN=schedule-adjuster-dev.firebaseapp.com
FIREBASE_PROJECT_ID=schedule-adjuster-dev
FIREBASE_STORAGE_BUCKET=schedule-adjuster-dev.appspot.com
FIREBASE_MESSAGING_SENDER_ID=466832050730
FIREBASE_APP_ID=1:466832050730:web:96656af623997fcd4b1153
FIREBASE_MEASUREMENT_ID=G-NG1YY70GRM
*/

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().regex(/^https?:\/\/.+/),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
});
type EnvInput = z.input<typeof envSchema>;

const rawEnv = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} satisfies Record<keyof EnvInput, string | undefined>;

const parsedEnv = envSchema.safeParse(rawEnv);
if (!parsedEnv.success) {
  throw new Error(JSON.stringify(parsedEnv.error, null, 2));
}
const envValues = parsedEnv.data;

const env = {
  backendUrl: envValues.NEXT_PUBLIC_BACKEND_URL,
  firebase: {
    apiKey: envValues.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: envValues.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: envValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: envValues.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envValues.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: envValues.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
};

export default env;
