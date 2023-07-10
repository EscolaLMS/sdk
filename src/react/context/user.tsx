import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  EscolaLMSContextConfig,
  EscolaLMSContextReadConfig,
  ContextPaginatedMetaState,
  ContextStateValue,
} from "./types";
import { defaultConfig } from "./defaults";
import { fetchDataType } from "./states";

import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";
import { getDefaultData } from "./index";

import {
  login as postLogin,
  profile as getProfile,
  register as postRegister,
  updateProfile as postUpdateProfile,
  updateAvatar as postUpdateAvatar,
  forgot,
  reset,
  emailVerify,
  refreshToken,
  startAccountDelete,
  finishAccountDelete,
} from "./../../services/auth";

import { changePassword as postNewPassword } from "../../services/profile";

type UserContextType = Pick<
  EscolaLMSContextConfig,
  | "user"
  | "socialAuthorize"
  | "changePassword"
  | "login"
  | "logout"
  | "forgot"
  | "reset"
  | "fetchProfile"
  | "updateProfile"
  | "updateAvatar"
  | "getRefreshedToken"
  | "emailVerify"
  | "register"
  | "initAccountDelete"
  | "confirmAccountDelete"
> & { token?: string | null; tokenExpireDate?: string | null };

export const UserContext: React.Context<UserContextType> =
  createContext<UserContextType>({
    user: defaultConfig.user,
    socialAuthorize: defaultConfig.socialAuthorize,
    changePassword: defaultConfig.changePassword,
    login: defaultConfig.login,
    logout: defaultConfig.logout,
    forgot: defaultConfig.forgot,
    reset: defaultConfig.reset,
    fetchProfile: defaultConfig.fetchProfile,
    updateProfile: defaultConfig.updateProfile,
    updateAvatar: defaultConfig.updateAvatar,
    getRefreshedToken: defaultConfig.getRefreshedToken,
    emailVerify: defaultConfig.emailVerify,
    register: defaultConfig.register,
    token: null,
    tokenExpireDate: null,
    initAccountDelete: defaultConfig.initAccountDelete,
    confirmAccountDelete: defaultConfig.confirmAccountDelete,
  });

export interface UserContextProviderType {
  apiUrl: string;
  defaults?: Partial<Pick<EscolaLMSContextReadConfig, "user" | "token">>;
  ssrHydration?: boolean;
}

export const UserContextProvider: FunctionComponent<
  PropsWithChildren<UserContextProviderType>
> = ({ children, defaults, apiUrl, ssrHydration }) => {
  const abortControllers = useRef<Record<string, AbortController | null>>({});

  useEffect(() => {
    if (defaults) {
      defaults.user !== null &&
        setUser({
          loading: false,
          value: defaults.user?.value,
          error: undefined,
        });
    }
  }, [defaults]);

  const [token, setToken] = useLocalStorage<string | null>(
    "user_token",
    "token",
    defaults?.token ?? null
  );

  const [user, setUser] = useLocalStorage<ContextStateValue<API.UserAsProfile>>(
    "user",
    "user",
    getDefaultData("user", {
      ...defaultConfig,
      ...defaults,
    }),
    ssrHydration
  );

  const logout = useCallback(() => {
    // API Call here to destroy token
    resetState();

    return Promise.resolve();
  }, []);

  useEffect(() => {
    fetchProfile().catch(() => {
      logout();
    });
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      setUser((prevState) => ({
        ...prevState,
        loading: true,
        error: undefined,
      }));
      getProfile
        .bind(
          null,
          apiUrl
        )(token)
        .then((response) => {
          if (response.success) {
            setUser({
              loading: false,
              value: response.data,
            });
          }
          if (response.success === false) {
            setUser((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, [token, logout]);

  const login = useCallback((body: API.LoginRequest) => {
    return postLogin
      .bind(
        null,
        apiUrl
      )(body)
      .then((response) => {
        if (response.success) {
          setToken(response.data.token);
          //setTokenExpireDate(response.data.expires_at);
        } else {
          setUser((prevState) =>
            prevState
              ? { ...prevState, error: response, loading: false }
              : { error: response, loading: false }
          );
        }
        return response;
      })
      .catch((error) => {
        setUser((prevState) =>
          prevState
            ? { ...prevState, error: error, loading: false }
            : { error: error, loading: false }
        );
        return error;
      });
  }, []);

  const fetchProfile = useCallback(() => {
    return token
      ? fetchDataType<API.UserAsProfile>({
          controllers: abortControllers.current,
          controller: `profile`,
          mode: "value",
          fetchAction: getProfile.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.profile?.signal,
          }),
          setState: setUser,
        })
      : Promise.reject("noToken");
  }, [token]);

  const updateProfile = useCallback(
    (body: API.UpdateUserDetails) => {
      setUser((prevState) => ({
        ...prevState,
        loading: true,
      }));

      return token
        ? postUpdateProfile
            .bind(null, apiUrl)(body, token)
            .then((res) => {
              if (res.success === true) {
                setUser((prevState) => ({
                  value: {
                    ...res.data,
                  },
                  loading: false,
                }));
              } else if (res.success === false) {
                setUser((prevState) => ({
                  ...prevState,
                  error: res,
                  loading: false,
                }));
              }
              return res;
            })
        : Promise.reject("noToken");
    },
    [token]
  );

  const updateAvatar = useCallback(
    (file: File) => {
      setUser((prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      });
      return token
        ? postUpdateAvatar
            .bind(null, apiUrl)(file, token)
            .then((res) => {
              if (res.success === true) {
                setUser((prevState) => ({
                  ...prevState,
                  value: {
                    ...res.data,
                    avatar: res.data.avatar,
                    path_avatar: res.data.path_avatar,
                  },
                  loading: false,
                }));
              }
              return res;
            })
            .catch((error) => error)
        : Promise.reject("noToken");
    },
    [token]
  );

  const getRefreshedToken = useCallback(() => {
    return token
      ? refreshToken
          .bind(
            null,
            apiUrl
          )(token)
          .then((res) => {
            if (res.success) {
              setToken(res.data.token);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      : Promise.reject("noToken");
  }, [token]);

  const changePassword = useCallback(
    (body: API.ChangePasswordRequest) => {
      return token
        ? postNewPassword.bind(null, apiUrl)(token, body)
        : Promise.reject("noToken");
    },
    [token]
  );

  const socialAuthorize = useCallback((token: string) => {
    setToken(token);
  }, []);

  const tokenExpireDate = useMemo(() => {
    try {
      return token
        ? new Date(
            JSON.parse(atob(token.split(".")[1])).exp * 1000
          ).toISOString()
        : null;
    } catch (er) {
      return null;
    }
  }, [token]);

  const initAccountDelete = useCallback(
    (returnUrl: string) => {
      return token
        ? startAccountDelete
            .bind(null, apiUrl)(token, returnUrl)
            .then((res) => {
              return res;
            })
            .catch((error) => error)
        : Promise.reject("noToken");
    },
    [token, logout]
  );

  const confirmAccountDelete = useCallback(
    (userId: string, deleteToken: string) => {
      return token
        ? finishAccountDelete
            .bind(null, apiUrl)(token, userId, deleteToken)
            .then((res) => {
              return res;
            })
            .catch((error) => error)
        : Promise.reject("noToken");
    },
    [token, logout]
  );

  useEffect(() => {
    if (tokenExpireDate) {
      const ms = Math.max(
        1000,
        new Date(tokenExpireDate).getTime() - Date.now() - 15000
      ); // 15 seconds grace period

      // if long-term token (remember_me)
      if (ms / 1000 > 60 * 60) return;

      const t = setTimeout(() => getRefreshedToken(), ms);
      return () => {
        clearTimeout(t);
      };
    }
  }, [tokenExpireDate]);

  const resetState = useCallback(() => {
    // TODO pass reset State to User
    setToken(null);

    setUser(defaultConfig.user);
  }, []);

  const register = useCallback((body: API.RegisterRequest) => {
    return postRegister.bind(null, apiUrl)(body);
  }, []);

  return (
    <UserContext.Provider
      value={{
        tokenExpireDate,
        token,
        user,
        socialAuthorize,
        changePassword,
        login,
        logout,
        forgot: forgot.bind(null, apiUrl),
        reset: reset.bind(null, apiUrl),
        fetchProfile,
        updateProfile,
        updateAvatar,
        getRefreshedToken,
        emailVerify: emailVerify.bind(null, apiUrl),
        register,
        initAccountDelete,
        confirmAccountDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
