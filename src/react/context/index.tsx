import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  PropsWithChildren,
} from "react";

import { interceptors } from "./../../services/request";

import { fetchDataType } from "./states";

import {
  course as getCourses,
  getCourse,
  getCourseProgram,
  progress as getProgress,
  sendProgress as postSendProgress,
  tutors as getTutors,
  tutor as getTutor,
  topicPing as putTopicPing,
  h5pProgress as postSendh5pProgress,
} from "./../../services/courses";
import { changePassword as postNewPassword } from "../../services/profile";
import {
  bookConsultationDate,
  consultations as getConsultations,
  getConsultation,
  getTutorConsultations,
  getUserConsultations,
  approveConsultation,
  genereteJitsy,
  rejectConsultation,
  changeTermDate,
} from "./../../services/consultations";
import {
  products as getProducts,
  getSingleProduct,
} from "../../services/products";
import {
  getMyWebinars,
  getWebinar,
  webinars as getWebinars,
  genereteJitsyWebinar,
} from "../../services/webinars";
import { events as getEvents } from "../../services/events";
import {
  settings as getSettings,
  config as getConfig,
} from "./../../services/settings";
import { uniqueTags as getUniqueTags } from "./../../services/tags";
import { categoryTree as getCategoryTree } from "./../../services/categories";
import { getNotifications, readNotification } from "../../services/notify";
import { getCertificates, getCertificate } from "../../services/certificates";
import { getMattermostChannels } from "../../services/mattermost";
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
} from "./../../services/auth";
import { pages as getPages, page as getPage } from "./../../services/pages";
import {
  cart as getCart,
  addToCart as postAddToCart,
  removeFromCart as deleteRemoveFromCart,
  payWithStripe as postPayWithStripe,
  payWithP24 as postPayWithP24,
  orders as getOrders,
  payments as getPayments,
  useVoucher as postVoucher,
  orderInvoice,
  addMisingProducts as postAddMisingProducts,
} from "./../../services/cart";
import {
  userGroups as getUserGroups,
  userGroup as getUserGroup,
  registerableGroups as getRegisterableGroups,
} from "./../../services/user_groups";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { EditorContextProvider } from "@escolalms/h5p-react";
import * as API from "./../../types/api";
import { getH5p } from "../../services/h5p";
import {
  ContextPaginatedMetaState,
  ContextListState,
  ContextStateValue,
  FontSize,
  EscolaLMSContextReadConfig,
  EscolaLMSContextConfig,
  SortProgram,
} from "./types";

import {
  defaultConfig,
  attempted,
  guessTheAnswer,
  blackList,
  completed,
  questionSet,
} from "./defaults";

import { fields as getFields } from "../../services/fields";

import {
  getQuestionnaires,
  questionnaireAnswer,
} from "../../services/questionnaire";
import {
  stationaryEvents as getStationaryEvents,
  getMyStationaryEvents,
  getStationaryEvent,
} from "../../services/stationary_events";

export const SCORMPlayer: React.FC<{
  uuid: string;
}> = ({ uuid }) => {
  const { apiUrl } = useContext(EscolaLMSContext);
  return <iframe src={`${apiUrl}/api/scorm/play/${uuid}`} />;
};

export const EscolaLMSContext: React.Context<EscolaLMSContextConfig> =
  React.createContext(defaultConfig);

export const sortProgram: SortProgram = (lessons) => {
  return [...lessons]
    .sort((lessonA, lessonB) =>
      typeof lessonA.order === "number" && typeof lessonB.order === "number"
        ? lessonA.order - lessonB.order
        : 0
    )
    .map((lesson) => ({
      ...lesson,
      topics: [...(lesson.topics || [])].sort((topicA, topicB) =>
        typeof topicA.order === "number" && typeof topicB.order === "number"
          ? topicA.order - topicB.order
          : 0
      ),
    }));
};

export interface EscolaLMSContextProviderType {
  apiUrl: string;
  defaults?: Partial<EscolaLMSContextReadConfig>;
  imagePrefix?: string;
  initialFetch?: boolean;
}

/**
 *
 * @component
 */

export const EscolaLMSContextProvider: FunctionComponent<
  PropsWithChildren<EscolaLMSContextProviderType>
> = ({
  children,
  apiUrl,
  defaults,
  imagePrefix = `${apiUrl}/storage/imgcache`,
  initialFetch = true,
}) => {
  interceptors(apiUrl);
  const initialValues = {
    ...defaultConfig,
    ...defaults,
  };

  const getImagePrefix = () => imagePrefix;

  const getDefaultData = <K extends keyof EscolaLMSContextReadConfig>(
    key: K
  ): EscolaLMSContextReadConfig[K] => {
    return initialValues[key];
  };

  //

  const [courses, setCourses] = useLocalStorage<
    ContextPaginatedMetaState<API.CourseListItem>
  >("lms", "courses", getDefaultData("courses"));

  const [consultations, setConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >("lms", "consultations", getDefaultData("consultations"));

  const [consultation, setConsultation] = useLocalStorage<
    ContextStateValue<API.Consultation>
  >("lms", "consultation", getDefaultData("consultation"));

  const [userConsultations, setUserConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >("lms", "userConsultations", getDefaultData("userConsultations"));

  const [tutorConsultations, setTutorConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.AppointmentTerm>
  >("lms", "tutorConsultations", getDefaultData("tutorConsultations"));

  const [webinars, setWebinars] = useLocalStorage<
    ContextListState<EscolaLms.Webinar.Models.Webinar>
  >("lms", "webinars", getDefaultData("webinars"));

  const [events, setEvents] = useLocalStorage<
    ContextPaginatedMetaState<API.Event>
  >("lms", "events", getDefaultData("events"));

  const [userGroup, setUserGroup] = useLocalStorage<
    ContextStateValue<API.UserGroup>
  >("lms", "userGroup", getDefaultData("userGroup"));

  const [userGroups, setUserGroups] = useLocalStorage<
    ContextPaginatedMetaState<API.UserGroup>
  >("lms", "userGroups", getDefaultData("userGroups"));

  const [registerableGroups, setRegisterableGroups] = useLocalStorage<
    ContextListState<API.UserGroup>
  >("lms", "registerableGroups", getDefaultData("registerableGroups"));

  const [course, setCourse] = useLocalStorage<
    ContextStateValue<API.CourseListItem>
  >("lms", "course", getDefaultData("course"));

  const [settings, setSettings] = useLocalStorage<
    ContextStateValue<API.AppSettings>
  >("lms", "settings", getDefaultData("settings"));

  const [config, setConfig] = useLocalStorage<ContextStateValue<API.AppConfig>>(
    "lms",
    "config",
    getDefaultData("config")
  );

  const [uniqueTags, setUniqueTags] = useLocalStorage<
    ContextListState<API.Tag>
  >("lms", "tags", getDefaultData("uniqueTags"));

  const [categoryTree, setCategoryTree] = useLocalStorage<
    ContextListState<API.Category>
  >("lms", "categories", getDefaultData("categoryTree"));

  const [program, setProgram] = useLocalStorage<
    ContextStateValue<API.CourseProgram>
  >("lms", "tags", getDefaultData("program"));

  const [cart, setCart] = useLocalStorage<ContextStateValue<API.Cart>>(
    "lms",
    "cart",
    getDefaultData("cart")
  );

  const [token, setToken] = useLocalStorage<string | null>(
    "lms",
    "token",
    null
  );

  const [tokenExpireDate, setTokenExpireDate] = useLocalStorage<string | null>(
    "lms",
    "tokenExpireDate",
    null
  );

  const [user, setUser] = useLocalStorage<ContextStateValue<API.UserAsProfile>>(
    "lms",
    "user",
    getDefaultData("user")
  );

  const [progress, setProgress] = useState<
    ContextStateValue<API.CourseProgress>
  >(getDefaultData("progress"));

  const [tutors, setTutors] = useLocalStorage<ContextListState<API.UserItem>>(
    "lms",
    "tutors",
    getDefaultData("tutors")
  );

  const [orders, setOrders] = useLocalStorage<
    ContextPaginatedMetaState<API.Order>
  >("lms", "orders", getDefaultData("orders"));

  const [payments, setPayments] = useLocalStorage<
    ContextPaginatedMetaState<API.Payment>
  >("lms", "payments", getDefaultData("payments"));

  const [certificates, setCertificates] = useLocalStorage<
    ContextPaginatedMetaState<API.Certificate>
  >("lms", "certificates", getDefaultData("certificates"));

  const [mattermostChannels, setMattermostChannels] = useLocalStorage<
    ContextStateValue<API.MattermostData>
  >("lms", "mattermostChannels", getDefaultData("mattermostChannels"));

  const [tutor, setTutor] = useState<ContextStateValue<API.UserItem>>(
    getDefaultData("tutor")
  );

  const [pages, setPages] = useLocalStorage<
    ContextPaginatedMetaState<API.PageListItem>
  >("lms", "pages", getDefaultData("pages"));

  const [page, setPage] = useLocalStorage<ContextStateValue<API.Page>>(
    "lms",
    "page",
    getDefaultData("page")
  );

  const [fontSize, setFontSize] = useLocalStorage<FontSize>(
    "lms",
    "fontSize",
    getDefaultData("fontSize")
  );

  const [h5p, setH5P] = useLocalStorage<ContextStateValue<API.H5PObject>>(
    "lms",
    "h5p",
    getDefaultData("h5p")
  );

  const [notifications, setNotifications] = useLocalStorage<
    ContextListState<API.Notification>
  >("lms", "notifications", getDefaultData("notifications"));

  const [fields, setFields] = useLocalStorage<
    ContextListState<EscolaLms.ModelFields.Models.Metadata>
  >("lms", "fields", getDefaultData("fields"));

  const [stationaryEvents, setStationaryEvents] = useLocalStorage<
    ContextListState<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >("lms", "stationaryEvents", getDefaultData("stationaryEvents"));

  const [stationaryEvent, setStationaryEvent] = useLocalStorage<
    ContextStateValue<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >("lms", "stationaryEvent", getDefaultData("stationaryEvent"));

  const [userStationaryEvents, setUserStationaryEvents] = useLocalStorage<
    ContextListState<API.StationaryEvent>
  >("lms", "userStationaryEvents", getDefaultData("userStationaryEvents"));

  const [webinar, setWebinar] = useLocalStorage<
    ContextStateValue<EscolaLms.Webinar.Models.Webinar>
  >("lms", "webinar", getDefaultData("webinar"));

  const [userWebinars, setUserWebinars] = useLocalStorage<
    ContextListState<API.Event>
  >("lms", "userWebinars", getDefaultData("userWebinars"));

  const [products, setProducts] = useLocalStorage<
    ContextPaginatedMetaState<API.Product>
  >("lms", "products", getDefaultData("products"));

  const [product, setProduct] = useLocalStorage<ContextStateValue<API.Product>>(
    "lms",
    "product",
    getDefaultData("product")
  );

  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const fetchConfig = useCallback(() => {
    return fetchDataType<API.AppConfig>({
      controllers: abortControllers.current,
      controller: `config`,
      mode: "value",
      fetchAction: getConfig({
        signal: abortControllers.current?.config?.signal,
      }),
      setState: setConfig,
    });
  }, []);

  const fetchSettings = useCallback(() => {
    return fetchDataType<API.AppSettings>({
      controllers: abortControllers.current,
      controller: `settings`,
      mode: "value",
      fetchAction: getSettings({
        signal: abortControllers.current?.settings?.signal,
      }),
      setState: setSettings,
    });
  }, []);

  const fetchCategories = useCallback(() => {
    return fetchDataType<API.Category>({
      controllers: abortControllers.current,
      controller: `categories`,
      mode: "list",
      fetchAction: getCategoryTree({
        signal: abortControllers.current?.categories?.signal,
      }),
      setState: setCategoryTree,
    });
  }, []);

  const fetchTags = useCallback(() => {
    return fetchDataType<API.Tag>({
      controllers: abortControllers.current,
      controller: `tags`,
      mode: "list",
      fetchAction: getUniqueTags({
        signal: abortControllers.current?.tags?.signal,
      }),
      setState: setUniqueTags,
    });
  }, []);

  useEffect(() => {
    if (initialFetch) {
      fetchSettings();
      fetchConfig();
      fetchTags();
      fetchCategories();
    }
  }, [initialFetch]);

  useEffect(() => {
    if (defaults) {
      defaults.consultation !== null &&
        setConsultations({
          loading: false,
          list: defaults.consultations?.list,
          error: undefined,
        });
      defaults.courses !== null &&
        setCourses({
          loading: false,
          list: defaults.courses?.list,
          error: undefined,
        });
      defaults.webinars !== null &&
        setWebinars({
          loading: false,
          list: defaults.webinars?.list,
          error: undefined,
        });
      defaults.stationaryEvents !== null &&
        setStationaryEvents({
          loading: false,
          list: defaults.stationaryEvents?.list,
          error: undefined,
        });
      defaults.events !== null &&
        setEvents({
          loading: false,
          list: defaults.events?.list,
          error: undefined,
        });
    }
  }, [defaults]);

  const fetchProducts = useCallback(
    (
      filter: API.PageParams &
        API.PaginationParams & { type?: string; "tags[]"?: string }
    ) => {
      return fetchDataType<API.Product>({
        controllers: abortControllers.current,
        controller: `products/${JSON.stringify(filter)}`,
        mode: "paginated",
        fetchAction: getProducts(filter, {
          signal:
            abortControllers.current[`products/${JSON.stringify(filter)}`]
              ?.signal,
        }),
        setState: setProducts,
      });
    },
    []
  );

  const fetchProduct = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.Product>({
            controllers: abortControllers.current,
            controller: `product`,
            mode: "value",
            fetchAction: getSingleProduct(id, token, {
              signal: abortControllers.current?.product?.signal,
            }),
            setState: setProduct,
          })
        : Promise.reject();
    },
    [token]
  );

  const fetchFields = useCallback((filter: API.FieldsParams) => {
    return fetchDataType<EscolaLms.ModelFields.Models.Metadata>({
      controllers: abortControllers.current,
      controller: `fields/${JSON.stringify(filter)}`,
      mode: "list",
      fetchAction: getFields(filter, {
        signal:
          abortControllers.current[`fields/${JSON.stringify(filter)}`]?.signal,
      }),
      setState: setFields,
    });
  }, []);

  const fetchStationaryEvents = useCallback(
    (filter: API.StationaryEventsParams) => {
      return fetchDataType<API.StationaryEvent>({
        controllers: abortControllers.current,
        controller: `stationaryevents/${JSON.stringify(filter)}`,
        mode: "list",
        fetchAction: getStationaryEvents(filter, {
          signal:
            abortControllers.current[
              `stationaryevents/${JSON.stringify(filter)}`
            ]?.signal,
        }),
        setState: setStationaryEvents,
      });
    },
    []
  );

  const fetchStationaryEvent = useCallback((id: number) => {
    return fetchDataType<API.StationaryEvent>({
      controllers: abortControllers.current,
      controller: `stationaryevent`,
      mode: "value",
      fetchAction: getStationaryEvent(id, {
        signal: abortControllers.current?.stationaryevent?.signal,
      }),
      setState: setStationaryEvent,
    });
  }, []);

  const fetchUserWebinars = useCallback(() => {
    return token
      ? fetchDataType<API.Event>({
          controllers: abortControllers.current,
          controller: `userwebinars`,
          mode: "list",
          fetchAction: getMyWebinars(token, {
            signal: abortControllers.current?.userwebinars?.signal,
          }),
          setState: setUserWebinars,
        })
      : Promise.reject();
  }, [token]);

  const fetchWebinar = useCallback((id: number) => {
    return fetchDataType<API.Webinar>({
      controllers: abortControllers.current,
      controller: `webinar`,
      mode: "value",
      fetchAction: getWebinar(id, {
        signal: abortControllers.current?.webinar?.signal,
      }),
      setState: setWebinar,
    });
  }, []);

  const fetchUserStationaryEvents = useCallback(() => {
    return token
      ? fetchDataType<API.StationaryEvent>({
          controllers: abortControllers.current,
          controller: `userstationaryevents`,
          mode: "list",
          fetchAction: getMyStationaryEvents(token, {
            signal: abortControllers.current?.userstationaryevents?.signal,
          }),
          setState: setUserStationaryEvents,
        })
      : Promise.reject();
  }, [token]);

  const fetchTutorConsultations = useCallback(() => {
    return token
      ? fetchDataType<API.AppointmentTerm>({
          controllers: abortControllers.current,
          controller: `tutorconsultation`,
          mode: "paginated",
          fetchAction: getTutorConsultations(token, {
            signal: abortControllers.current?.tutorconsultation?.signal,
          }),
          setState: setTutorConsultations,
        })
      : Promise.reject();
  }, [token]);

  const approveConsultationTerm = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.AppointmentTerm>({
            controllers: abortControllers.current,
            controller: `aprovetutorterm`,
            mode: "paginated",
            fetchAction: approveConsultation(token, id, {
              signal: abortControllers.current?.aprovetutorterm?.signal,
            }),
            setState: setTutorConsultations,
          })
        : Promise.reject();
    },
    [token]
  );

  const rejectConsultationTerm = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.AppointmentTerm>({
            controllers: abortControllers.current,
            controller: `rejectterm`,
            mode: "paginated",
            fetchAction: rejectConsultation(token, id, {
              signal: abortControllers.current?.rejectterm?.signal,
            }),
            setState: setTutorConsultations,
          })
        : Promise.reject();
    },
    [token]
  );

  const generateConsultationJitsy = useCallback(
    (id: number) => {
      return token ? genereteJitsy(token, id) : Promise.reject();
    },
    [token]
  );

  const generateWebinarJitsy = useCallback(
    (id: number) => {
      return token ? genereteJitsyWebinar(token, id) : Promise.reject();
    },
    [token]
  );

  const fetchCertificates = useCallback(
    (params?: API.PaginationParams) => {
      return token
        ? fetchDataType<API.Certificate>({
            controllers: abortControllers.current,
            controller: `certificates/${JSON.stringify(params)}`,
            mode: "paginated",
            fetchAction: getCertificates(token, params, {
              signal: abortControllers.current?.certificates?.signal,
            }),
            setState: setCertificates,
          })
        : Promise.reject();
    },
    [token]
  );

  const fetchCertificate = useCallback(
    (id: number) => {
      return token ? getCertificate(token, id) : Promise.reject();
    },
    [token]
  );

  const fetchMattermostChannels = useCallback(() => {
    return token
      ? fetchDataType<API.MattermostData>({
          controllers: abortControllers.current,
          controller: `mattermostchannels`,
          mode: "value",
          fetchAction: getMattermostChannels(
            token,
            {},
            {
              signal: abortControllers.current?.mattermostchannels?.signal,
            }
          ),
          setState: setMattermostChannels,
        })
      : Promise.reject();
  }, [token]);

  const fetchNotifications = useCallback(() => {
    return token
      ? fetchDataType<API.Notification>({
          controllers: abortControllers.current,
          controller: `mattermostchannels`,
          mode: "list",
          fetchAction: getNotifications(
            token,

            {
              signal: abortControllers.current?.mattermostchannels?.signal,
            }
          ),
          setState: setNotifications,
        })
      : Promise.reject();
  }, [token, notifications]);

  const readNotify = useCallback(
    (id: string) => {
      return token
        ? readNotification(id, token)
            .then((response) => {
              if (response.success) {
                setNotifications((prevState) => ({
                  ...prevState,
                  list:
                    prevState && prevState.list
                      ? prevState.list.filter(
                          (item: API.Notification) => item.id !== id
                        )
                      : [],
                  loading: false,
                }));
              }
            })
            .catch((error) => {
              setNotifications((prevState) => ({
                ...prevState,
                loading: false,
                error: error,
              }));
            })
        : Promise.reject();
    },
    [token, notifications]
  );

  const fetchCourses = useCallback((filter: API.CourseParams) => {
    return fetchDataType<API.Course>({
      controllers: abortControllers.current,
      controller: `courses/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getCourses(
        filter,

        {
          signal:
            abortControllers.current[`courses/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setCourses,
    });
  }, []);

  const fetchConsultations = useCallback((filter: API.ConsultationParams) => {
    return fetchDataType<API.Consultation>({
      controllers: abortControllers.current,
      controller: `consultations/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getConsultations(
        filter,

        {
          signal:
            abortControllers.current[`consultations/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setConsultations,
    });
  }, []);

  const changeConsultationTerm = useCallback(
    (termId: number, newDate: string) => {
      return token ? changeTermDate(termId, newDate, token) : Promise.reject();
    },
    [token]
  );

  const fetchUserConsultations = useCallback(() => {
    return token
      ? fetchDataType<API.Consultation>({
          controllers: abortControllers.current,
          controller: `userconsultations`,
          mode: "paginated",
          fetchAction: getUserConsultations(
            token,

            {
              signal: abortControllers.current?.userconsultations?.signal,
            }
          ),
          setState: setConsultations,
        })
      : Promise.reject();
  }, [token]);

  const bookConsultationTerm = useCallback(
    (id: number, term: string) => {
      return token
        ? bookConsultationDate(token, id, term).then((response) => {
            if (response.success) {
              fetchUserConsultations();
              return response;
            }
            throw Error("Error occured");
          })
        : Promise.reject();
    },
    [token]
  );

  const fetchConsultation = useCallback((id: number) => {
    return fetchDataType<API.Consultation>({
      id: id,
      controllers: abortControllers.current,
      controller: `consultation`,
      mode: "value",
      fetchAction: getConsultation(id, {
        signal: abortControllers.current?.consultation?.signal,
      }),
      setState: setConsultation,
    });
  }, []);

  const getProductInfo = useCallback(
    (id: number) => {
      return token ? getSingleProduct(id, token) : Promise.reject();
    },
    [token]
  );

  const fetchWebinars = useCallback((filter: API.WebinarParams) => {
    return fetchDataType<EscolaLms.Webinar.Models.Webinar>({
      controllers: abortControllers.current,
      controller: `webinars/${JSON.stringify(filter)}`,
      mode: "list",
      fetchAction: getWebinars(
        filter,

        {
          signal:
            abortControllers.current[`webinars/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setWebinars,
    });
  }, []);

  const fetchEvents = useCallback((filter: API.EventsParams) => {
    return fetchDataType<API.Event>({
      controllers: abortControllers.current,
      controller: `events/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getEvents(
        filter,

        {
          signal:
            abortControllers.current[`events/${JSON.stringify(filter)}`]
              ?.signal,
        }
      ),
      setState: setEvents,
    });
  }, []);

  const fetchUserGroup = useCallback((id: number) => {
    return fetchDataType<API.UserGroup>({
      controllers: abortControllers.current,
      controller: `usergroup`,
      mode: "value",
      fetchAction: getUserGroup(
        id,

        {
          signal: abortControllers.current?.usergroup?.signal,
        }
      ),
      setState: setUserGroup,
    });
  }, []);

  const fetchRegisterableGroups = useCallback(() => {
    return fetchDataType<API.UserGroup>({
      controllers: abortControllers.current,
      controller: `registablegroups`,
      mode: "list",
      fetchAction: getRegisterableGroups({
        signal: abortControllers.current?.registablegroups?.signal,
      }),
      setState: setRegisterableGroups,
    });
  }, []);

  const fetchUserGroups = useCallback((params: API.UserGroupsParams) => {
    return fetchDataType<API.UserGroup>({
      controllers: abortControllers.current,
      controller: `getusergroups/${JSON.stringify(params)}`,
      mode: "paginated",
      fetchAction: getUserGroups(params, {
        signal:
          abortControllers.current[`getusergroups/${JSON.stringify(params)}`]
            ?.signal,
      }),
      setState: setUserGroups,
    });
  }, []);

  const fetchCourse = useCallback((id: number) => {
    setCourse((prevState) => ({
      ...prevState,
      loading: true,
      byId: prevState.byId
        ? {
            ...prevState.byId,
            [id]: {
              ...prevState.byId[id],
              loading: true,
            },
          }
        : { [id]: { loading: true } },
    }));
    return getCourse(id).then((response) => {
      if (response.success) {
        const lessons = sortProgram(response.data.lessons || []);
        setCourse((prevState) => ({
          loading: false,
          value: {
            ...response.data,
            lessons: lessons,
          },
          byId: prevState.byId
            ? {
                ...prevState.byId,
                [id]: {
                  value: response.data,
                  loading: false,
                },
              }
            : {
                [id]: {
                  value: response.data,
                  loading: false,
                },
              },
        }));
      }
      if (response.success === false) {
        setCourse((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
          byId: prevState.byId
            ? {
                ...prevState.byId,
                [id]: {
                  error: response,
                  loading: false,
                },
              }
            : {
                [id]: {
                  error: response,
                  loading: false,
                },
              },
        }));
      }
    });
  }, []);

  const socialAuthorize = useCallback((token: string) => {
    setToken(token);
  }, []);

  const resetState = useCallback(() => {
    setToken(null);

    setUser(defaultConfig.user);
    setProgram(defaultConfig.program);
    setCart(defaultConfig.cart);
    setCertificates(defaultConfig.certificates);
    setNotifications(defaultConfig.notifications);
    setMattermostChannels(defaultConfig.mattermostChannels);
  }, []);

  const logout = useCallback(() => {
    // API Call here to destroy token
    resetState();

    return Promise.resolve();
  }, []);

  const register = useCallback((body: API.RegisterRequest) => {
    return postRegister(body);
  }, []);

  const fetchProfile = useCallback(() => {
    return token
      ? fetchDataType<API.UserAsProfile>({
          controllers: abortControllers.current,
          controller: `profile`,
          mode: "value",
          fetchAction: getProfile(token, {
            signal: abortControllers.current?.profile?.signal,
          }),
          setState: setUser,
        })
      : Promise.reject();
  }, [token]);

  useEffect(() => {
    fetchProfile().catch(() => {
      logout();
    });
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      setUser((prevState) => ({ ...prevState, loading: true }));
      getProfile(token)
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
    return postLogin(body).then((response) => {
      if (response.success) {
        setToken(response.data.token);
        setTokenExpireDate(response.data.expires_at);
      }
    });
  }, []);

  const fetchQuestionnaires = useCallback(
    (model: string, id: number) => {
      return token ? getQuestionnaires(token, model, id) : Promise.reject();
    },
    [token]
  );

  const sendQuestionnaireAnswer = useCallback(
    (
      model: string,
      modelID: number,
      id: number,
      body: Partial<EscolaLms.Questionnaire.Models.QuestionAnswer>
    ) => {
      return token
        ? questionnaireAnswer(token, model, modelID, id, body)
        : Promise.reject();
    },
    [token]
  );

  const fetchCart = useCallback(() => {
    return token
      ? fetchDataType<API.Cart>({
          controllers: abortControllers.current,
          controller: `cart`,
          mode: "value",
          fetchAction: getCart(token, {
            signal: abortControllers.current?.cart?.signal,
          }),
          setState: setCart,
        })
      : Promise.reject();
  }, [token]);

  const addToCart = useCallback(
    (productId: number, quantity?: number) => {
      if (!token) {
        return Promise.reject("No token provided");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddToCart(productId, token, quantity)
        .then(() => {
          fetchCart();
        })
        .catch((error) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error.data,
          }));
        });
    },
    [fetchCart]
  );

  const addMisingProducts = useCallback(
    (products: number[]) => {
      if (!token) {
        return Promise.reject("No token provided");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddMisingProducts(token, products)
        .then(() => {
          fetchCart();
        })
        .catch((error) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error.data,
          }));
        });
    },
    [fetchCart]
  );

  const removeFromCart = useCallback(
    (itemId: number) => {
      if (!token) {
        return Promise.reject("No token provided");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return deleteRemoveFromCart(itemId, token)
        .then((response) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            value: {
              ...prevState.value,
              items:
                prevState && prevState.value
                  ? prevState.value.items.filter((item) => item.id !== itemId)
                  : [],
            },
          }));
          fetchCart();
        })
        .catch((error) => {
          setCart((prevState) => ({
            ...prevState,
            loading: false,
            error: error.data,
          }));
        });
    },
    [fetchCart]
  );

  const payWithStripe = useCallback(
    (payment_method: string, return_url: string) => {
      return token
        ? postPayWithStripe(payment_method, return_url, token).then((res) => {
            console.log(res);
          })
        : Promise.reject();
    },
    [token]
  );

  const payWithP24 = useCallback(
    (email: string, return_url: string, data?: API.InvoiceData) => {
      return token
        ? postPayWithP24(email, return_url, token, data)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              console.log(err);
              return err;
            })
        : Promise.reject();
    },
    [token]
  );

  const fetchOrderInvoice = useCallback(
    (id: number) => {
      return token ? orderInvoice(token, id) : Promise.reject();
    },
    [token]
  );

  const fetchProgram = useCallback(
    (id: number) => {
      setProgram((prevState) => ({ ...prevState, loading: true }));
      return id && token
        ? getCourseProgram(id, token)
            .then((response) => {
              if (response.success) {
                setProgram({
                  loading: false,
                  value: {
                    ...response.data,
                    lessons: sortProgram(response.data.lessons),
                  },
                });
              }
              if (response.success === false) {
                setProgram((prevState) => ({
                  ...prevState,
                  loading: false,
                  error: response,
                }));
              }
            })
            .catch((error) => {
              setProgram((prevState) => ({
                ...prevState,
                loading: false,
                error: error.data,
              }));
            })
        : Promise.reject();
    },
    [token]
  );

  const fetchProgress = useCallback(() => {
    return token
      ? fetchDataType<API.CourseProgress>({
          controllers: abortControllers.current,
          controller: `progress`,
          mode: "value",
          fetchAction: getProgress(token, {
            signal: abortControllers.current?.progress?.signal,
          }),
          setState: setProgress,
        })
      : Promise.reject();
  }, [token]);

  const fetchH5P = useCallback((id: string) => {
    return fetchDataType<API.H5PObject>({
      controllers: abortControllers.current,
      controller: `h5p`,
      mode: "value",
      fetchAction: getH5p(Number(id), {
        signal: abortControllers.current?.h5p?.signal,
      }),
      setState: setH5P,
    });
  }, []);

  const fetchTutors = useCallback(() => {
    return fetchDataType<API.UserItem>({
      controllers: abortControllers.current,
      controller: `tutors`,
      mode: "list",
      fetchAction: getTutors({
        signal: abortControllers.current?.tutors?.signal,
      }),
      setState: setTutors,
    });
  }, []);

  const fetchTutor = useCallback(
    (id: number) => {
      return fetchDataType<API.UserItem>({
        controllers: abortControllers.current,
        controller: `tutor`,
        mode: "value",
        fetchAction: getTutor(id, {
          signal: abortControllers.current?.tutor?.signal,
        }),
        setState: setTutor,
      });
    },
    [token]
  );

  const fetchOrders = useCallback(
    (params?: API.PaginationParams) => {
      return token
        ? fetchDataType<API.Order>({
            controllers: abortControllers.current,
            controller: `orders/${JSON.stringify(params)}`,
            mode: "paginated",
            fetchAction: getOrders(token, params, {
              signal: abortControllers.current?.orders?.signal,
            }),
            setState: setOrders,
          })
        : Promise.reject();
    },
    [token]
  );

  const fetchPayments = useCallback(() => {
    return token
      ? fetchDataType<API.Payment>({
          controllers: abortControllers.current,
          controller: "payments",
          mode: "paginated",
          fetchAction: getPayments(token, {
            signal: abortControllers.current?.payments?.signal,
          }),
          setState: setPayments,
        })
      : Promise.reject();
  }, [token]);

  const fetchPages = useCallback(() => {
    return fetchDataType<API.PageListItem>({
      controllers: abortControllers.current,
      controller: "pages",
      mode: "paginated",
      fetchAction: getPages({
        signal: abortControllers.current?.pages?.signal,
      }),
      setState: setPages,
    });
  }, []);

  const fetchPage = useCallback((slug: string) => {
    return fetchDataType<API.PageListItem>({
      controllers: abortControllers.current,
      controller: "page",
      mode: "value",
      fetchAction: getPage(slug, {
        signal: abortControllers.current?.page?.signal,
      }),
      setState: setPage,
    });
  }, []);

  const sendProgress = useCallback(
    (courseId: number, data: API.CourseProgressItemElement[]) => {
      return token
        ? postSendProgress(courseId, data, token).then((res) => {
            setProgress((prevState) => ({
              ...prevState,
              value:
                prevState && prevState.value
                  ? prevState.value.map((courseProgress) => {
                      if (courseProgress.course.id === courseId) {
                        return {
                          ...courseProgress,
                          progress: courseProgress.progress.map((progress) => {
                            const el = data.find(
                              (item) => item.topic_id === progress.topic_id
                            );
                            if (el) {
                              return el;
                            }
                            return progress;
                          }),
                        };
                      }
                      return courseProgress;
                    })
                  : [],
            }));
          })
        : Promise.reject();
    },
    [token]
  );

  const h5pProgress = useCallback(
    (courseId: string, topicId: number, statement: API.IStatement) => {
      const statementId = statement?.verb?.id;
      const statementCategory = statement?.context?.contextActivities?.category;
      const result: API.IResult | undefined = statement?.result;
      const hasParent =
        statement?.context?.contextActivities?.parent &&
        statement?.context?.contextActivities?.parent?.length > 0;

      if (
        attempted === statementId &&
        statementCategory &&
        statementCategory[0].id.includes(guessTheAnswer)
      ) {
        sendProgress(Number(courseId), [
          {
            topic_id: topicId,
            status: 1,
          },
        ]);
      }

      if (blackList.includes(statementId)) {
        return null;
      }

      if (completed.includes(statementId)) {
        if (
          (!hasParent &&
            statementCategory &&
            !statementCategory[0]?.id.includes(questionSet)) ||
          (statementCategory &&
            statementCategory[0]?.id.includes(questionSet) &&
            result &&
            result?.score?.max === result?.score?.raw)
        ) {
          sendProgress(Number(courseId), [
            {
              topic_id: topicId,
              status: 1,
            },
          ]);
        }
      }

      return token
        ? postSendh5pProgress(topicId, statementId, statement, token)
        : null;
    },
    [token]
  );

  const updateProfile = useCallback(
    (body: API.UpdateUserDetails) => {
      setUser((prevState) => ({
        ...prevState,
        loading: true,
      }));

      return token
        ? postUpdateProfile(body, token).then((res) => {
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
          })
        : Promise.reject();
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
        ? postUpdateAvatar(file, token).then((res) => {
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
          })
        : Promise.reject();
    },
    [token]
  );

  const topicPing = useCallback(
    (topicId: number) => {
      return token
        ? putTopicPing(topicId, token).catch((err) => err)
        : Promise.reject();
    },
    [token]
  );

  const progressMap = useMemo(() => {
    const defaultMap: {
      coursesProcProgress: Record<number, number>;
      finishedTopics: number[];
    } = {
      coursesProcProgress: {},
      finishedTopics: [],
    };
    if (progress.value) {
      progress.value.reduce((acc, course) => {
        acc.coursesProcProgress[
          typeof course.course.id === "number" ? course.course.id : 0
        ] =
          course.progress.reduce((sum, item) => sum + item.status, 0) /
          course.progress.length;
        acc.finishedTopics = acc.finishedTopics.concat(
          course.progress
            .filter((item) => item.status !== 0)
            .map((item) => item.topic_id)
        );
        return acc;
      }, defaultMap);
    }
    return defaultMap;
  }, [progress]);

  const topicIsFinished = useCallback(
    (topicId: number) =>
      progressMap && progressMap.finishedTopics.includes(topicId),
    [progressMap]
  );

  const courseProgress = useCallback(
    (courseId: number) =>
      progressMap && progressMap.coursesProcProgress[courseId]
        ? progressMap.coursesProcProgress[courseId]
        : 0,
    [progressMap]
  );

  const getNextPrevTopic = useCallback(
    (topicId: number, next: boolean = true) => {
      const lesson: API.Lesson | undefined = program.value?.lessons.find(
        (lesson) => !!lesson.topics?.find((topic) => topicId === topic.id)
      );

      if (program.value === undefined) {
        return null;
      }

      if (!lesson) {
        return null;
      }

      const currentLessonIndex = program.value.lessons.findIndex(
        (fLesson) => lesson.id === fLesson.id
      );
      if (currentLessonIndex === undefined) {
        return null;
      }

      const currentTopicIndex = (
        program.value && program.value.lessons ? program.value.lessons : []
      )[currentLessonIndex].topics?.findIndex(
        (topic) => Number(topic.id) === Number(topicId)
      );

      if (currentTopicIndex === undefined) {
        return null;
      }

      const topics = program.value.lessons[currentLessonIndex].topics;

      if (next) {
        if (Array.isArray(topics) && topics[currentTopicIndex + 1]) {
          return topics[currentTopicIndex + 1] || null;
        } else {
          if (program.value.lessons[currentLessonIndex + 1]) {
            const newLesson = program.value.lessons[currentLessonIndex + 1];
            return (newLesson.topics && newLesson.topics[0]) || null;
          }
        }
      } else {
        if (Array.isArray(topics) && topics[currentTopicIndex - 1]) {
          return topics[currentTopicIndex - 1] || null;
        } else {
          if (program.value.lessons[currentLessonIndex - 1]) {
            const newLesson = program.value.lessons[currentLessonIndex - 1];
            return (
              (newLesson.topics &&
                newLesson.topics[newLesson.topics.length - 1]) ||
              null
            );
          }
        }
      }

      return null;
    },
    [program]
  );

  const fontSizeToggle = useCallback(
    (bigger: boolean) => {
      const newFontSize = (fontSize + (bigger ? 1 : -1)) % 4;
      return setFontSize(newFontSize);
    },
    [fontSize]
  );

  const getRefreshedToken = useCallback(() => {
    return token
      ? refreshToken(token)
          .then((res) => {
            if (res.success) {
              setTokenExpireDate(res.data.expires_at);
              setToken(res.data.token);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      : Promise.reject();
  }, [token]);

  const changePassword = useCallback(
    (body: API.ChangePasswordRequest) => {
      return token ? postNewPassword(token, body) : Promise.reject();
    },
    [token]
  );

  const realizeVoucher = useCallback(
    (voucher: string) => {
      return token
        ? postVoucher(voucher, token)
        : Promise.reject("No token provided");
    },
    [token]
  );

  return (
    <EscolaLMSContext.Provider
      value={{
        apiUrl,
        courses,
        course,
        program,
        fetchCourses,
        fetchCourse,
        fetchProgram,
        fetchSettings,
        settings,
        config,
        fetchConfig,
        fetchTags,
        uniqueTags,
        fetchCategories,
        categoryTree,
        login,
        logout,
        forgot,
        reset,
        user,
        register,
        fetchCart,
        addToCart,
        removeFromCart,
        cart,
        payWithStripe,
        fetchProgress,
        progress,
        sendProgress,
        fetchTutors,
        tutors,
        fetchTutor,
        tutor,
        fetchOrders,
        orders,
        fetchPayments,
        payments,
        pages,
        fetchPages,
        page,
        fetchPage,
        updateProfile,
        updateAvatar,
        topicPing,
        topicIsFinished,
        courseProgress,
        getNextPrevTopic,
        fontSize,
        fontSizeToggle,
        h5pProgress,
        userGroups,
        fetchUserGroups,
        userGroup,
        fetchUserGroup,
        registerableGroups,
        fetchRegisterableGroups,
        socialAuthorize,
        notifications,
        fetchNotifications,
        readNotify,
        certificates,
        fetchCertificates,
        fetchCertificate,
        mattermostChannels,
        fetchMattermostChannels,
        h5p,
        fetchH5P,
        emailVerify,
        getRefreshedToken,
        tokenExpireDate,
        fetchConsultations,
        consultations,
        consultation,
        fetchConsultation,
        fields,
        fetchFields,
        stationaryEvents,
        fetchStationaryEvents,
        fetchStationaryEvent,
        fetchUserConsultations,
        userConsultations,
        bookConsultationTerm,
        fetchWebinars,
        fetchWebinar,
        webinars,
        payWithP24,
        getProductInfo,
        fetchTutorConsultations,
        approveConsultationTerm,
        generateConsultationJitsy,
        rejectConsultationTerm,
        tutorConsultations,
        fetchEvents,
        events,
        changePassword,
        stationaryEvent,
        webinar,
        userWebinars,
        fetchUserWebinars,
        generateWebinarJitsy,
        realizeVoucher,
        products,
        product,
        fetchQuestionnaires,
        sendQuestionnaireAnswer,
        fetchUserStationaryEvents,
        userStationaryEvents,
        fetchOrderInvoice,
        addMisingProducts,
        getImagePrefix,
        changeConsultationTerm,
        fetchProducts,
        fetchProduct,
      }}
    >
      <EditorContextProvider url={`${apiUrl}/api/hh5p`}>
        {children}
      </EditorContextProvider>
    </EscolaLMSContext.Provider>
  );
};
