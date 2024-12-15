import { atom } from "jotai";

import type { UserGet } from "@generated/api.gen";
import type { User } from "firebase/auth";

export const authUserAtom = atom<UserGet | null>(null);

export const fireUserAtom = atom<User | null>(null);
