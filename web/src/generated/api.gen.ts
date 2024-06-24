/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AccountCreate */
export interface AccountCreate {
  /** User Id */
  user_id: string;
  /** Group Id */
  group_id: string;
  role: AccountRole;
  /** Name */
  name: string;
}

/** AccountGet */
export interface AccountGet {
  /** User Id */
  user_id: string;
  /** Group Id */
  group_id: string;
  role: AccountRole;
  /** Name */
  name: string;
  /** Id */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  group: GroupGet;
}

/** AccountRole */
export enum AccountRole {
  GUEST = "GUEST",
  USER = "USER",
  ADMIN = "ADMIN",
}

/** GroupCreate */
export interface GroupCreate {
  /** Name */
  name: string;
  /** Description */
  description?: string;
}

/** GroupGet */
export interface GroupGet {
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /** Id */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** ParticipantAvailability */
export enum ParticipantAvailability {
  YES = "YES",
  MAYBE = "MAYBE",
  NO = "NO",
}

/** ParticipantCreate */
export interface ParticipantCreate {
  /** Schedule Id */
  schedule_id: string;
  /** User Id */
  user_id: string;
  /** Toparticipate */
  toParticipate: boolean;
  availability?: ParticipantAvailability;
}

/** ParticipantGet */
export interface ParticipantGet {
  /** Schedule Id */
  schedule_id: string;
  /** User Id */
  user_id: string;
  /** Toparticipate */
  toParticipate: boolean;
  availability?: ParticipantAvailability;
  /** Id */
  id: string;
  user: UserGet;
  prodile: ParticipantProfileGet;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** ParticipantProfileCreate */
export interface ParticipantProfileCreate {
  /** Participant Id */
  participant_id: string;
  /** Intprop1 */
  intProp1?: number;
  /** Intprop2 */
  intProp2?: number;
  /** Intprop3 */
  intProp3?: number;
  /** Listprop1 */
  listProp1?: string[];
  /** Listprop2 */
  listProp2?: string[];
  /** Listprop3 */
  listProp3?: string[];
}

/** ParticipantProfileGet */
export interface ParticipantProfileGet {
  /** Participant Id */
  participant_id: string;
  /** Intprop1 */
  intProp1?: number;
  /** Intprop2 */
  intProp2?: number;
  /** Intprop3 */
  intProp3?: number;
  /** Listprop1 */
  listProp1?: string[];
  /** Listprop2 */
  listProp2?: string[];
  /** Listprop3 */
  listProp3?: string[];
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** ScheduleConfigGet */
export interface ScheduleConfigGet {
  /** Schedule Master Id */
  schedule_master_id: string;
  /** Constraints */
  constraints: ScheduleConstraintGet[];
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** ScheduleConstraintGet */
export interface ScheduleConstraintGet {
  /** Schedule Config Id */
  schedule_config_id: string;
  prop_id: ScheduleConstraintPropId;
  /** Name */
  name: string;
  /** Constraints */
  constraints: object;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** ScheduleConstraintPropId */
export enum ScheduleConstraintPropId {
  IntProp1 = "intProp1",
  IntProp2 = "intProp2",
  IntProp3 = "intProp3",
  ListProp1 = "listProp1",
  ListProp2 = "listProp2",
  ListProp3 = "listProp3",
}

/** ScheduleCreate */
export interface ScheduleCreate {
  /** Schedule Master Id */
  schedule_master_id: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /**
   * Startat
   * @format date-time
   */
  startAt: string;
  /**
   * Endat
   * @format date-time
   */
  endAt?: string;
  /** Allday */
  allDay: boolean;
  /** Canceled */
  canceled: boolean;
}

/** ScheduleGet */
export interface ScheduleGet {
  /** Schedule Master Id */
  schedule_master_id: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /**
   * Startat
   * @format date-time
   */
  startAt: string;
  /**
   * Endat
   * @format date-time
   */
  endAt?: string;
  /** Allday */
  allDay: boolean;
  /** Canceled */
  canceled: boolean;
  /** Id */
  id: string;
  config: ScheduleConfigGet;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
}

/** UserCreate */
export interface UserCreate {
  role: UserRole;
  /** Name */
  name: string;
  /** Email */
  email: string;
  /**
   * Birthday
   * @format date
   */
  birthday?: string;
}

/** UserGet */
export interface UserGet {
  role: UserRole;
  /** Name */
  name: string;
  /** Email */
  email: string;
  /**
   * Birthday
   * @format date
   */
  birthday?: string;
  /** Id */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Accounts */
  accounts: AccountGet[];
}

/** UserRole */
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: string[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Schedule Adjuster API
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name IndexGet
   * @summary Index
   * @request GET:/
   * @secure
   */
  indexGet = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  health = {
    /**
     * No description
     *
     * @name HealthHealthStatusGet
     * @summary Health
     * @request GET:/health/{status}
     * @secure
     */
    healthHealthStatusGet: (status: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/health/${status}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags user
     * @name GetUsersUsersGet
     * @summary Get Users
     * @request GET:/users
     * @secure
     */
    getUsersUsersGet: (params: RequestParams = {}) =>
      this.request<UserGet[], any>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name GetUserUserUserIdGet
     * @summary Get User
     * @request GET:/user/{user_id}
     * @secure
     */
    getUserUserUserIdGet: (userId: string, params: RequestParams = {}) =>
      this.request<UserGet, HTTPValidationError>({
        path: `/user/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateUserUserUserIdPut
     * @summary Update User
     * @request PUT:/user/{user_id}
     * @secure
     */
    updateUserUserUserIdPut: (
      userId: string,
      data: UserCreate,
      params: RequestParams = {}
    ) =>
      this.request<UserCreate, HTTPValidationError>({
        path: `/user/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name AddUserUserPost
     * @summary Add User
     * @request POST:/user
     * @secure
     */
    addUserUserPost: (data: UserCreate, params: RequestParams = {}) =>
      this.request<UserCreate, HTTPValidationError>({
        path: `/user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  groups = {
    /**
     * No description
     *
     * @tags group
     * @name GetGroupsGroupsGet
     * @summary Get Groups
     * @request GET:/groups
     * @secure
     */
    getGroupsGroupsGet: (params: RequestParams = {}) =>
      this.request<GroupGet[], any>({
        path: `/groups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  group = {
    /**
     * No description
     *
     * @tags group
     * @name GetGroupGroupGroupIdGet
     * @summary Get Group
     * @request GET:/group/{group_id}
     * @secure
     */
    getGroupGroupGroupIdGet: (groupId: string, params: RequestParams = {}) =>
      this.request<GroupGet, HTTPValidationError>({
        path: `/group/${groupId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name UpdateGroupGroupGroupIdPut
     * @summary Update Group
     * @request PUT:/group/{group_id}
     * @secure
     */
    updateGroupGroupGroupIdPut: (
      groupId: string,
      data: GroupCreate,
      params: RequestParams = {}
    ) =>
      this.request<GroupCreate, HTTPValidationError>({
        path: `/group/${groupId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name AddGroupGroupPost
     * @summary Add Group
     * @request POST:/group
     * @secure
     */
    addGroupGroupPost: (data: GroupCreate, params: RequestParams = {}) =>
      this.request<GroupCreate, HTTPValidationError>({
        path: `/group`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags group
     * @name GetAccountsByGroupGroupAccountsGroupIdGet
     * @summary Get Accounts By Group
     * @request GET:/group/accounts/{group_id}
     * @secure
     */
    getAccountsByGroupGroupAccountsGroupIdGet: (
      groupId: string,
      params: RequestParams = {}
    ) =>
      this.request<AccountGet[], HTTPValidationError>({
        path: `/group/accounts/${groupId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  account = {
    /**
     * No description
     *
     * @tags account
     * @name GetAccountAccountAccountIdGet
     * @summary Get Account
     * @request GET:/account/{account_id}
     * @secure
     */
    getAccountAccountAccountIdGet: (
      accountId: string,
      params: RequestParams = {}
    ) =>
      this.request<AccountGet, HTTPValidationError>({
        path: `/account/${accountId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name UpdateAccountAccountAccountIdPut
     * @summary Update Account
     * @request PUT:/account/{account_id}
     * @secure
     */
    updateAccountAccountAccountIdPut: (
      accountId: string,
      data: AccountCreate,
      params: RequestParams = {}
    ) =>
      this.request<AccountCreate, HTTPValidationError>({
        path: `/account/${accountId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AddAccountAccountPost
     * @summary Add Account
     * @request POST:/account
     * @secure
     */
    addAccountAccountPost: (data: AccountCreate, params: RequestParams = {}) =>
      this.request<AccountCreate, HTTPValidationError>({
        path: `/account`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  accounts = {
    /**
     * No description
     *
     * @tags account
     * @name UpdateAccountsAccountsPut
     * @summary Update Accounts
     * @request PUT:/accounts
     * @secure
     */
    updateAccountsAccountsPut: (
      data: AccountCreate[],
      params: RequestParams = {}
    ) =>
      this.request<AccountCreate[], HTTPValidationError>({
        path: `/accounts`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags account
     * @name AddAccountsAccountsPost
     * @summary Add Accounts
     * @request POST:/accounts
     * @secure
     */
    addAccountsAccountsPost: (
      data: AccountCreate[],
      params: RequestParams = {}
    ) =>
      this.request<AccountCreate[], HTTPValidationError>({
        path: `/accounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  schedules = {
    /**
     * No description
     *
     * @tags schedule
     * @name GetSchedulesSchedulesGet
     * @summary Get Schedules
     * @request GET:/schedules
     * @secure
     */
    getSchedulesSchedulesGet: (params: RequestParams = {}) =>
      this.request<ScheduleGet[], any>({
        path: `/schedules`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags schedule
     * @name UpdateSchedulesSchedulesPut
     * @summary Update Schedules
     * @request PUT:/schedules
     * @secure
     */
    updateSchedulesSchedulesPut: (
      data: ScheduleCreate[],
      params: RequestParams = {}
    ) =>
      this.request<ScheduleCreate[], HTTPValidationError>({
        path: `/schedules`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags schedule
     * @name AddSchedulesSchedulesPost
     * @summary Add Schedules
     * @request POST:/schedules
     * @secure
     */
    addSchedulesSchedulesPost: (
      data: ScheduleCreate[],
      params: RequestParams = {}
    ) =>
      this.request<ScheduleCreate[], HTTPValidationError>({
        path: `/schedules`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  schedule = {
    /**
     * No description
     *
     * @tags schedule
     * @name GetScheduleScheduleScheduleIdGet
     * @summary Get Schedule
     * @request GET:/schedule/{schedule_id}
     * @secure
     */
    getScheduleScheduleScheduleIdGet: (
      scheduleId: string,
      params: RequestParams = {}
    ) =>
      this.request<ScheduleGet, HTTPValidationError>({
        path: `/schedule/${scheduleId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags schedule
     * @name UpdateScheduleScheduleScheduleIdPut
     * @summary Update Schedule
     * @request PUT:/schedule/{schedule_id}
     * @secure
     */
    updateScheduleScheduleScheduleIdPut: (
      scheduleId: string,
      data: ScheduleCreate,
      params: RequestParams = {}
    ) =>
      this.request<ScheduleCreate, HTTPValidationError>({
        path: `/schedule/${scheduleId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags schedule
     * @name AddScheduleSchedulePost
     * @summary Add Schedule
     * @request POST:/schedule
     * @secure
     */
    addScheduleSchedulePost: (
      data: ScheduleCreate,
      params: RequestParams = {}
    ) =>
      this.request<ScheduleCreate, HTTPValidationError>({
        path: `/schedule`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  participants = {
    /**
     * No description
     *
     * @tags participant
     * @name GetParticipantsParticipantsGet
     * @summary Get Participants
     * @request GET:/participants
     * @secure
     */
    getParticipantsParticipantsGet: (params: RequestParams = {}) =>
      this.request<ParticipantGet[], any>({
        path: `/participants`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name UpdateParticipantsParticipantsPut
     * @summary Update Participants
     * @request PUT:/participants
     * @secure
     */
    updateParticipantsParticipantsPut: (
      data: ParticipantCreate[],
      params: RequestParams = {}
    ) =>
      this.request<ParticipantGet[], HTTPValidationError>({
        path: `/participants`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name AddParticipantsParticipantsPost
     * @summary Add Participants
     * @request POST:/participants
     * @secure
     */
    addParticipantsParticipantsPost: (
      data: ParticipantCreate[],
      params: RequestParams = {}
    ) =>
      this.request<ParticipantGet[], HTTPValidationError>({
        path: `/participants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  participant = {
    /**
     * No description
     *
     * @tags participant
     * @name GetParticipantParticipantParticipantIdGet
     * @summary Get Participant
     * @request GET:/participant/{participant_id}
     * @secure
     */
    getParticipantParticipantParticipantIdGet: (
      participantId: string,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantGet, HTTPValidationError>({
        path: `/participant/${participantId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name UpdateParticipantParticipantParticipantIdPut
     * @summary Update Participant
     * @request PUT:/participant/{participant_id}
     * @secure
     */
    updateParticipantParticipantParticipantIdPut: (
      participantId: string,
      data: ParticipantCreate,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantGet, HTTPValidationError>({
        path: `/participant/${participantId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name AddParticipantParticipantPost
     * @summary Add Participant
     * @request POST:/participant
     * @secure
     */
    addParticipantParticipantPost: (
      data: ParticipantCreate,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantGet, HTTPValidationError>({
        path: `/participant`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  participantProfile = {
    /**
     * No description
     *
     * @tags participant
     * @name GetParticipantProfileParticipantProfileParticipantIdGet
     * @summary Get Participant Profile
     * @request GET:/participant-profile/{participant_id}
     * @secure
     */
    getParticipantProfileParticipantProfileParticipantIdGet: (
      participantId: string,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantProfileGet, HTTPValidationError>({
        path: `/participant-profile/${participantId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name UpdateParticipantProfileParticipantProfileParticipantIdPut
     * @summary Update Participant Profile
     * @request PUT:/participant-profile/{participant_id}
     * @secure
     */
    updateParticipantProfileParticipantProfileParticipantIdPut: (
      participantId: string,
      data: ParticipantProfileCreate,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantProfileGet, HTTPValidationError>({
        path: `/participant-profile/${participantId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags participant
     * @name AddParticipantProfileParticipantProfilePost
     * @summary Add Participant Profile
     * @request POST:/participant-profile
     * @secure
     */
    addParticipantProfileParticipantProfilePost: (
      data: ParticipantProfileCreate,
      params: RequestParams = {}
    ) =>
      this.request<ParticipantProfileGet, HTTPValidationError>({
        path: `/participant-profile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
