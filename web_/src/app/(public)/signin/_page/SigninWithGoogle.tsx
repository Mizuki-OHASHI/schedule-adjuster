import type { FC } from "react";

import cn from "classnames";
import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import Image from "next/image";

import fireAuth from "@lib/auth/fireAuth";

const authProvider = new GoogleAuthProvider();

type Props = {
  setFireUser: (user: User | null) => void;
};
const SigninWithGoogle: FC<Props> = ({ setFireUser: _ }) => {
  return (
    <button
      type="button"
      onClick={() => {
        signInWithPopup(fireAuth, authProvider).catch((error) => {
          console.error(error);
        });
      }}
    >
      <div
        className={cn(
          "m-2 p-4 flex items-center space-x-4 border-2 rounded-lg border-gray-500 hover:bg-gray-300 hover:dark:bg-gray-700"
        )}
      >
        <Image
          src="/google.svg"
          alt="Google Logo"
          width={24}
          height={24}
          priority
        />
        <p>Google でログイン</p>
      </div>
    </button>
  );
};

export default SigninWithGoogle;
