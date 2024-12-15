import axios from "axios";
import useSWRMutation from "swr/mutation";

// import type { ErrorResponse } from "@/types/api-error";

import type { AxiosError } from "axios";
import type { Key } from "swr";

import fireAuth from "@lib/auth/fireAuth";
import env from "@lib/env";

export const apiGETMutation = <
  Result,
  Error = ErrorResponse,
  Params = Record<string, never>,
>(
  url: string
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { params?: Params } | undefined }
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken();
    return axios
      .get<Result>(`${env.backendUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        params: arg?.params,
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data;
      });
  };
  return useSWRMutation<Result, Error, Key, { params?: Params } | undefined>(
    url,
    fetcher
  );
};

export const apiPOSTMutation = <
  Result,
  Error = ErrorResponse,
  Data = Record<string, never>,
>(
  url: string
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { data?: Data } | undefined }
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken();
    return axios
      .post<Result>(`${env.backendUrl}${url}`, arg?.data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data;
      });
  };
  return useSWRMutation<Result, Error, Key, { data?: Data } | undefined>(
    url,
    fetcher
  );
};

export const apiPUTMutation = <
  Result,
  Error = ErrorResponse,
  Data = Record<string, never>,
>(
  url: string
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { data: Data } | undefined }
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken();
    return axios
      .put<Result>(`${env.backendUrl}${url}`, arg?.data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data;
      });
  };
  return useSWRMutation<Result, Error, Key, { data: Data } | undefined>(
    url,
    fetcher
  );
};

export const apiDELETEMutation = <
  Result,
  Error = ErrorResponse,
  Params = Record<string, never>,
>(
  url: string
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { data?: Params } | undefined }
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken();
    return axios
      .delete<Result>(`${env.backendUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        data: arg?.data,
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data;
      });
  };
  return useSWRMutation<Result, Error, Key, { data?: Params } | undefined>(
    url,
    fetcher
  );
};
