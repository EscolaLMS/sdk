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

import { CoursesContext } from "./courses";
import { fetchDataType } from "./states";
import {
  getCourse,
  getCourseProgram,
  progress as getProgress,
  sendProgress as postSendProgress,
  tutor as getTutor,
  topicPing as putTopicPing,
  h5pProgress as postSendh5pProgress,
  courseProgress as getCourseProgress,
} from "./../../services/courses";
import {
  bookConsultationDate,
  consultations as getConsultations,
  getConsultation,
  getTutorConsultations,
  getUserConsultations,
  approveConsultation,
  generateJitsy,
  rejectConsultation,
  changeTermDate,
} from "./../../services/consultations";
import {
  products as getProducts,
  getSingleProduct,
} from "../../services/products";
import { getMyWebinars, generateJitsyWebinar } from "../../services/webinars";
import { events as getEvents } from "../../services/events";
import {
  settings as getSettings,
  config as getConfig,
} from "./../../services/settings";
import { getNotifications, readNotification } from "../../services/notify";
import { getCertificates, getCertificate } from "../../services/certificates";
import { getMattermostChannels } from "../../services/mattermost";

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
  addMissingProducts as postAddMissingProducts,
} from "./../../services/cart";
import {
  userGroups as getUserGroups,
  userGroup as getUserGroup,
  registerableGroups as getRegisterableGroups,
} from "./../../services/user_groups";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "./../../types/api";

import {
  ContextPaginatedMetaState,
  ContextListState,
  ContextStateValue,
  FontSize,
  EscolaLMSContextReadConfig,
  EscolaLMSContextConfig,
  EscolaLMSContextAPIConfig,
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
import { CoursesContextProvider } from "./courses";
import { CategoriesContext, CategoriesContextProvider } from "./categories";
import { TagsContext, TagsContextProvider } from "./tags";
import { TutorsContext, TutorsContextProvider } from "./tutors";
import { WebinarsContext, WebinarsContextProvider } from "./webinars";
import { WebinarContext, WebinarContextProvider } from "./webinar";
import { H5pContext, H5pContextProvider } from "./h5p";
import { PagesContext, PagesContextProvider } from "./pages";
import { PageContext, PageContextProvider } from "./page";

import {
  ConsultationsContext,
  ConsultationsContextProvider,
} from "./consultations";
import { UserContext, UserContextProvider } from "./user";

export const SCORMPlayer: React.FC<{
  uuid: string;
}> = ({ uuid }) => {
  const { apiUrl } = useContext(EscolaLMSContext);
  return <iframe src={`${apiUrl}/api/scorm/play/${uuid}`} />;
};

export const EscolaLMSContext: React.Context<EscolaLMSContextConfig> =
  React.createContext(defaultConfig);

export const getDefaultData = <K extends keyof EscolaLMSContextReadConfig>(
  key: K,
  initialValues: EscolaLMSContextReadConfig & EscolaLMSContextAPIConfig
): EscolaLMSContextReadConfig[K] => {
  return initialValues[key];
};

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

export const getCalcCourseProgress = (
  courseId: number,
  progress: ContextStateValue<API.CourseProgress>,
  courseProgressDetails: ContextStateValue<API.CourseProgressDetails>
) => {
  if (
    courseProgressDetails &&
    courseProgressDetails.byId &&
    courseProgressDetails.byId[Number(courseId)] &&
    courseProgressDetails.byId[Number(courseId)].value
  ) {
    return courseProgressDetails.byId[Number(courseId)].value;
  }
  return (
    progress &&
    progress.value &&
    progress.value.find(
      (courseProgress: API.CourseProgressItem) =>
        courseProgress.course.id === Number(courseId)
    )?.progress
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

const EscolaLMSContextProviderInner: FunctionComponent<
  PropsWithChildren<EscolaLMSContextProviderType>
> = ({
  children,
  apiUrl,
  defaults,
  imagePrefix = `${apiUrl}/storage/imgcache`,
  initialFetch = true,
}) => {
  // interceptors(apiUrl);
  const initialValues = {
    ...defaultConfig,
    ...defaults,
  };

  const getImagePrefix = () => imagePrefix;

  const {
    token,
    user,
    socialAuthorize,
    changePassword,
    login,
    logout: logoutUser,
    forgot,
    reset,
    fetchProfile,
    updateProfile,
    updateAvatar,
    getRefreshedToken,
    emailVerify,
    tokenExpireDate,
    register,
  } = useContext(UserContext);

  const { courses, fetchCourses } = useContext(CoursesContext);
  const { categoryTree, fetchCategories } = useContext(CategoriesContext);
  const { uniqueTags, fetchTags } = useContext(TagsContext);
  const { tutors, fetchTutors } = useContext(TutorsContext);
  const { webinars, fetchWebinars } = useContext(WebinarsContext);
  const { webinar, fetchWebinar } = useContext(WebinarContext);
  const { h5p, fetchH5P } = useContext(H5pContext);
  const { consultations, fetchConsultations } =
    useContext(ConsultationsContext);
  const { pages, fetchPages } = useContext(PagesContext);
  const { page, fetchPage } = useContext(PageContext);

  const [consultation, setConsultation] = useLocalStorage<
    ContextStateValue<API.Consultation>
  >("lms", "consultation", getDefaultData("consultation", initialValues));

  const [userConsultations, setUserConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >(
    "lms",
    "userConsultations",
    getDefaultData("userConsultations", initialValues)
  );

  const [tutorConsultations, setTutorConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.AppointmentTerm>
  >(
    "lms",
    "tutorConsultations",
    getDefaultData("tutorConsultations", initialValues)
  );

  const [events, setEvents] = useLocalStorage<
    ContextPaginatedMetaState<API.Event>
  >("lms", "events", getDefaultData("events", initialValues));

  const [userGroup, setUserGroup] = useLocalStorage<
    ContextStateValue<API.UserGroup>
  >("lms", "userGroup", getDefaultData("userGroup", initialValues));

  const [userGroups, setUserGroups] = useLocalStorage<
    ContextPaginatedMetaState<API.UserGroup>
  >("lms", "userGroups", getDefaultData("userGroups", initialValues));

  const [registerableGroups, setRegisterableGroups] = useLocalStorage<
    ContextListState<API.UserGroup>
  >(
    "lms",
    "registerableGroups",
    getDefaultData("registerableGroups", initialValues)
  );

  const [course, setCourse] = useLocalStorage<
    ContextStateValue<API.CourseListItem>
  >("lms", "course", getDefaultData("course", initialValues));

  const [settings, setSettings] = useLocalStorage<
    ContextStateValue<API.AppSettings>
  >("lms", "settings", getDefaultData("settings", initialValues));

  const [config, setConfig] = useLocalStorage<ContextStateValue<API.AppConfig>>(
    "lms",
    "config",
    getDefaultData("config", initialValues)
  );

  const [program, setProgram] = useLocalStorage<
    ContextStateValue<API.CourseProgram>
  >("lms", "tags", getDefaultData("program", initialValues));

  const [cart, setCart] = useLocalStorage<ContextStateValue<API.Cart>>(
    "lms",
    "cart",
    getDefaultData("cart", initialValues)
  );

  const [progress, setProgress] = useState<
    ContextStateValue<API.CourseProgress>
  >(getDefaultData("progress", initialValues));

  const [courseProgressDetails, setCourseProgressDetails] = useState<
    ContextStateValue<API.CourseProgressDetails>
  >(getDefaultData("courseProgressDetails", initialValues));

  const [orders, setOrders] = useLocalStorage<
    ContextPaginatedMetaState<API.Order>
  >("lms", "orders", getDefaultData("orders", initialValues));

  const [payments, setPayments] = useLocalStorage<
    ContextPaginatedMetaState<API.Payment>
  >("lms", "payments", getDefaultData("payments", initialValues));

  const [certificates, setCertificates] = useLocalStorage<
    ContextPaginatedMetaState<API.Certificate>
  >("lms", "certificates", getDefaultData("certificates", initialValues));

  const [mattermostChannels, setMattermostChannels] = useLocalStorage<
    ContextStateValue<API.MattermostData>
  >(
    "lms",
    "mattermostChannels",
    getDefaultData("mattermostChannels", initialValues)
  );

  const [tutor, setTutor] = useState<ContextStateValue<API.UserItem>>(
    getDefaultData("tutor", initialValues)
  );

  const [fontSize, setFontSize] = useLocalStorage<FontSize>(
    "lms",
    "fontSize",
    getDefaultData("fontSize", initialValues)
  );

  const [notifications, setNotifications] = useLocalStorage<
    ContextListState<API.Notification>
  >("lms", "notifications", getDefaultData("notifications", initialValues));

  const [fields, setFields] = useLocalStorage<
    ContextListState<EscolaLms.ModelFields.Models.Metadata>
  >("lms", "fields", getDefaultData("fields", initialValues));

  const [stationaryEvents, setStationaryEvents] = useLocalStorage<
    ContextListState<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >(
    "lms",
    "stationaryEvents",
    getDefaultData("stationaryEvents", initialValues)
  );

  const [stationaryEvent, setStationaryEvent] = useLocalStorage<
    ContextStateValue<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >("lms", "stationaryEvent", getDefaultData("stationaryEvent", initialValues));

  const [userStationaryEvents, setUserStationaryEvents] = useLocalStorage<
    ContextListState<API.StationaryEvent>
  >(
    "lms",
    "userStationaryEvents",
    getDefaultData("userStationaryEvents", initialValues)
  );

  const [userWebinars, setUserWebinars] = useLocalStorage<
    ContextListState<API.Event>
  >("lms", "userWebinars", getDefaultData("userWebinars", initialValues));

  const [products, setProducts] = useLocalStorage<
    ContextPaginatedMetaState<API.Product>
  >("lms", "products", getDefaultData("products", initialValues));

  const [product, setProduct] = useLocalStorage<ContextStateValue<API.Product>>(
    "lms",
    "product",
    getDefaultData("product", initialValues)
  );

  const abortControllers = useRef<Record<string, AbortController | null>>({});

  const fetchConfig = useCallback(() => {
    return fetchDataType<API.AppConfig>({
      controllers: abortControllers.current,
      controller: `config`,
      mode: "value",
      fetchAction: getConfig.bind(
        null,
        apiUrl
      )({
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
      fetchAction: getSettings.bind(
        null,
        apiUrl
      )({
        signal: abortControllers.current?.settings?.signal,
      }),
      setState: setSettings,
    });
  }, []);

  useEffect(() => {
    if (initialFetch) {
      fetchSettings();
      fetchConfig();
    }
  }, [initialFetch]);

  useEffect(() => {
    if (defaults) {
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
        fetchAction: getProducts.bind(null, apiUrl)(filter, {
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
            controller: `product${id}`,
            id,
            mode: "value",
            fetchAction: getSingleProduct.bind(null, apiUrl)(id, token, {
              signal: abortControllers.current?.[`product${id}`]?.signal,
            }),
            setState: setProduct,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchFields = useCallback((filter: API.FieldsParams) => {
    return fetchDataType<EscolaLms.ModelFields.Models.Metadata>({
      controllers: abortControllers.current,
      controller: `fields/${JSON.stringify(filter)}`,
      mode: "list",
      fetchAction: getFields.bind(null, apiUrl)(filter, {
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
        fetchAction: getStationaryEvents.bind(null, apiUrl)(filter, {
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
      controller: `stationaryevent${id}`,
      id,
      mode: "value",
      fetchAction: getStationaryEvent.bind(null, apiUrl)(id, {
        signal: abortControllers.current?.[`stationaryevent${id}`]?.signal,
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
          fetchAction: getMyWebinars.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.userwebinars?.signal,
          }),
          setState: setUserWebinars,
        })
      : Promise.reject("noToken");
  }, [token]);

  const fetchUserStationaryEvents = useCallback(() => {
    return token
      ? fetchDataType<API.StationaryEvent>({
          controllers: abortControllers.current,
          controller: `userstationaryevents`,
          mode: "list",
          fetchAction: getMyStationaryEvents.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.userstationaryevents?.signal,
          }),
          setState: setUserStationaryEvents,
        })
      : Promise.reject("noToken");
  }, [token]);

  const fetchTutorConsultations = useCallback(() => {
    return token
      ? fetchDataType<API.AppointmentTerm>({
          controllers: abortControllers.current,
          controller: `tutorconsultation`,
          mode: "paginated",
          fetchAction: getTutorConsultations.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.tutorconsultation?.signal,
          }),
          setState: setTutorConsultations,
        })
      : Promise.reject("noToken");
  }, [token]);

  const approveConsultationTerm = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.AppointmentTerm>({
            controllers: abortControllers.current,
            controller: `aprovetutorterm${id}`,
            mode: "paginated",
            fetchAction: approveConsultation.bind(null, apiUrl)(token, id, {
              signal:
                abortControllers.current?.[`aprovetutorterm${id}`]?.signal,
            }),
            setState: setTutorConsultations,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const rejectConsultationTerm = useCallback(
    (id: number) => {
      return token
        ? fetchDataType<API.AppointmentTerm>({
            controllers: abortControllers.current,
            controller: `rejectterm${id}`,
            mode: "paginated",
            fetchAction: rejectConsultation.bind(null, apiUrl)(token, id, {
              signal: abortControllers.current?.[`rejectterm${id}`]?.signal,
            }),
            setState: setTutorConsultations,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const generateConsultationJitsy = useCallback(
    (id: number) => {
      return token
        ? generateJitsy.bind(null, apiUrl)(token, id)
        : Promise.reject("noToken");
    },
    [token]
  );

  const generateWebinarJitsy = useCallback(
    (id: number) => {
      return token
        ? generateJitsyWebinar.bind(null, apiUrl)(token, id)
        : Promise.reject("noToken");
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
            fetchAction: getCertificates.bind(null, apiUrl)(token, params, {
              signal:
                abortControllers.current[
                  `certificates/${JSON.stringify(params)}`
                ]?.signal,
            }),
            setState: setCertificates,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchCertificate = useCallback(
    (id: number) => {
      return token
        ? getCertificate.bind(null, apiUrl)(token, id)
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchMattermostChannels = useCallback(() => {
    return token
      ? fetchDataType<API.MattermostData>({
          controllers: abortControllers.current,
          controller: `mattermostchannels`,
          mode: "value",
          fetchAction: getMattermostChannels.bind(null, apiUrl)(
            token,
            {},
            {
              signal: abortControllers.current?.mattermostchannels?.signal,
            }
          ),
          setState: setMattermostChannels,
        })
      : Promise.reject("noToken");
  }, [token]);

  const fetchNotifications = useCallback(() => {
    return token
      ? fetchDataType<API.Notification>({
          controllers: abortControllers.current,
          controller: `mattermostchannels`,
          mode: "list",
          fetchAction: getNotifications.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.mattermostchannels?.signal,
          }),
          setState: setNotifications,
        })
      : Promise.reject("noToken");
  }, [token, notifications]);

  const readNotify = useCallback(
    (id: string) => {
      return token
        ? readNotification
            .bind(null, apiUrl)(id, token)
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
        : Promise.reject("noToken");
    },
    [token, notifications]
  );

  const changeConsultationTerm = useCallback(
    (termId: number, newDate: string) => {
      return token
        ? changeTermDate.bind(null, apiUrl)(termId, newDate, token)
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchUserConsultations = useCallback(() => {
    return token
      ? fetchDataType<API.Consultation>({
          controllers: abortControllers.current,
          controller: `userconsultations`,
          mode: "paginated",
          fetchAction: getUserConsultations.bind(null, apiUrl)(
            token,

            {
              signal: abortControllers.current?.userconsultations?.signal,
            }
          ),
          setState: setUserConsultations,
        })
      : Promise.reject("noToken");
  }, [token]);

  const bookConsultationTerm = useCallback(
    (id: number, term: string) => {
      return token
        ? bookConsultationDate
            .bind(null, apiUrl)(token, id, term)
            .then((response) => {
              if (response.success) {
                fetchUserConsultations();
                return response;
              }
              throw Error("Error occured");
            })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchConsultation = useCallback((id: number) => {
    return fetchDataType<API.Consultation>({
      id,
      controllers: abortControllers.current,
      controller: `consultation${id}`,
      mode: "value",
      fetchAction: getConsultation.bind(null, apiUrl)(id, {
        signal: abortControllers.current?.[`consultation${id}`]?.signal,
      }),
      setState: setConsultation,
    });
  }, []);

  const getProductInfo = useCallback(
    (id: number) => {
      return token
        ? getSingleProduct.bind(null, apiUrl)(id, token)
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchEvents = useCallback((filter: API.EventsParams) => {
    return fetchDataType<API.Event>({
      controllers: abortControllers.current,
      controller: `events/${JSON.stringify(filter)}`,
      mode: "paginated",
      fetchAction: getEvents.bind(null, apiUrl)(
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
      controller: `usergroup${id}`,
      id,
      mode: "value",
      fetchAction: getUserGroup.bind(null, apiUrl)(
        id,

        {
          signal: abortControllers.current?.[`usergroup${id}`]?.signal,
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
      fetchAction: getRegisterableGroups.bind(
        null,
        apiUrl
      )({
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
      fetchAction: getUserGroups.bind(null, apiUrl)(params, {
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
    return getCourse
      .bind(
        null,
        apiUrl
      )(id)
      .then((response) => {
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

  const resetState = useCallback(() => {
    logoutUser();

    setProgram(defaultConfig.program);
    setCart(defaultConfig.cart);
    setCertificates(defaultConfig.certificates);
    setNotifications(defaultConfig.notifications);
    setMattermostChannels(defaultConfig.mattermostChannels);
  }, [logoutUser]);

  const logout = useCallback(() => {
    // TODO this should be composition of contexts
    // API Call here to destroy token
    resetState();

    return Promise.resolve();
  }, []);

  const fetchQuestionnaires = useCallback(
    (model: string, id: number) => {
      return token
        ? getQuestionnaires.bind(null, apiUrl)(token, model, id)
        : Promise.reject("noToken");
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
        ? questionnaireAnswer.bind(null, apiUrl)(
            token,
            model,
            modelID,
            id,
            body
          )
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchCart = useCallback(() => {
    return token
      ? fetchDataType<API.Cart>({
          controllers: abortControllers.current,
          controller: `cart`,
          mode: "value",
          fetchAction: getCart.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.cart?.signal,
          }),
          setState: setCart,
        })
      : Promise.reject("noToken");
  }, [token]);

  const addToCart = useCallback(
    (productId: number, quantity?: number) => {
      if (!token) {
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddToCart
        .bind(null, apiUrl)(productId, token, quantity)
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

  const addMissingProducts = useCallback(
    (products: number[]) => {
      if (!token) {
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddMissingProducts
        .bind(null, apiUrl)(token, products)
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
        return Promise.reject("noToken");
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return deleteRemoveFromCart
        .bind(null, apiUrl)(itemId, token)
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
        ? postPayWithStripe
            .bind(null, apiUrl)(payment_method, return_url, token)
            .then((res) => {
              console.log(res);
            })
        : Promise.reject("noToken");
    },
    [token]
  );

  const payWithP24 = useCallback(
    (email: string, return_url: string, data?: API.InvoiceData) => {
      return token
        ? postPayWithP24
            .bind(null, apiUrl)(email, return_url, token, data)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              console.log(err);
              return err;
            })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchOrderInvoice = useCallback(
    (id: number) => {
      return token
        ? orderInvoice.bind(null, apiUrl)(token, id)
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchProgram = useCallback(
    (id: number) => {
      setProgram((prevState) => ({ ...prevState, loading: true }));
      return getCourseProgram
        .bind(null, apiUrl)(id, token)
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
        });
    },
    [token]
  );

  const fetchProgress = useCallback(() => {
    return token
      ? fetchDataType<API.CourseProgress>({
          controllers: abortControllers.current,
          controller: `progress`,
          mode: "value",
          fetchAction: getProgress.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.progress?.signal,
          }),
          setState: setProgress,
        })
      : Promise.reject("noToken");
  }, [token]);

  const fetchCourseProgress = useCallback((id: number) => {
    if (!token) {
      return Promise.reject("noToken");
    }
    setCourseProgressDetails((prevState) => ({
      ...prevState,
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
    return getCourseProgress
      .bind(null, apiUrl)(id, token)
      .then((response) => {
        if (response.success) {
          setCourseProgressDetails((prevState) => ({
            ...prevState,
            loading: false,
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
          setCourseProgressDetails((prevState) => ({
            ...prevState,
            loading: false,
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

  const fetchTutor = useCallback(
    (id: number) => {
      return fetchDataType<API.UserItem>({
        controllers: abortControllers.current,
        controller: `tutor${id}`,
        id,
        mode: "value",
        fetchAction: getTutor.bind(null, apiUrl)(id, {
          signal: abortControllers.current?.[`tutor${id}`]?.signal,
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
            fetchAction: getOrders.bind(null, apiUrl)(token, params, {
              signal:
                abortControllers.current[`orders/${JSON.stringify(params)}`]
                  ?.signal,
            }),
            setState: setOrders,
          })
        : Promise.reject("noToken");
    },
    [token]
  );

  const fetchPayments = useCallback(() => {
    return token
      ? fetchDataType<API.Payment>({
          controllers: abortControllers.current,
          controller: "payments",
          mode: "paginated",
          fetchAction: getPayments.bind(null, apiUrl)(token, {
            signal: abortControllers.current?.payments?.signal,
          }),
          setState: setPayments,
        })
      : Promise.reject("noToken");
  }, [token]);

  const sendProgress = useCallback(
    (courseId: number, data: API.CourseProgressItemElement[]) => {
      return token
        ? postSendProgress
            .bind(null, apiUrl)(courseId, data, token)
            .then((res) => {
              setCourseProgressDetails((prevState) => ({
                ...prevState,
                byId: {
                  ...prevState.byId,
                  [courseId]: {
                    loading: false,
                    value: data,
                  },
                },
              }));
              setProgress((prevState) => ({
                ...prevState,
                value:
                  prevState && prevState.value
                    ? prevState.value.map((courseProgress) => {
                        if (courseProgress.course.id === courseId) {
                          return {
                            ...courseProgress,
                            progress: courseProgress.progress.map(
                              (progress) => {
                                const el = data.find(
                                  (item) => item.topic_id === progress.topic_id
                                );
                                if (el) {
                                  return el;
                                }
                                return progress;
                              }
                            ),
                          };
                        }
                        return courseProgress;
                      })
                    : [],
              }));
            })
        : Promise.reject("noToken");
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
        const pr = getCalcCourseProgress(
          Number(courseId),
          progress,
          courseProgressDetails
        );
        sendProgress(
          Number(courseId),
          pr?.map((prItem) => {
            if (prItem.topic_id === topicId) {
              return {
                ...prItem,
                status: API.CourseProgressItemElementStatus.COMPLETE,
              };
            }
            return prItem;
          }) || [
            {
              topic_id: topicId,
              status: API.CourseProgressItemElementStatus.COMPLETE,
            },
          ]
        );
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
          const pr = getCalcCourseProgress(
            Number(courseId),
            progress,
            courseProgressDetails
          );
          sendProgress(
            Number(courseId),
            pr?.map((prItem) => {
              if (prItem.topic_id === topicId) {
                return {
                  ...prItem,
                  status: API.CourseProgressItemElementStatus.COMPLETE,
                };
              }
              return prItem;
            }) || [
              {
                topic_id: topicId,
                status: API.CourseProgressItemElementStatus.COMPLETE,
              },
            ]
          );
        }
      }

      return token
        ? postSendh5pProgress.bind(null, apiUrl)(
            topicId,
            statementId,
            statement,
            token
          )
        : null;
    },
    [token, progress, courseProgressDetails]
  );

  const topicPing = useCallback(
    (topicId: number) => {
      return token
        ? putTopicPing
            .bind(null, apiUrl)(topicId, token)
            .catch((err) => err)
        : Promise.reject("noToken");
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
            .filter(
              (item) =>
                item.status === API.CourseProgressItemElementStatus.COMPLETE
            )
            .map((item) => item.topic_id)
        );
        return acc;
      }, defaultMap);
    }
    return defaultMap;
  }, [progress]);

  const topicIsFinished = useCallback(
    (topicId: number) => {
      if (progressMap && progressMap.finishedTopics.includes(topicId)) {
        return true;
      }

      // fetch by

      return false;
    },

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

  const realizeVoucher = useCallback(
    (voucher: string) => {
      return token
        ? postVoucher.bind(null, apiUrl)(voucher, token)
        : Promise.reject("noToken");
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
        fetchCourseProgress,
        progress,
        courseProgressDetails,
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
        fetchProfile,
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
        addMissingProducts,
        getImagePrefix,
        changeConsultationTerm,
        fetchProducts,
        fetchProduct,
      }}
    >
      {children}
    </EscolaLMSContext.Provider>
  );
};

export const EscolaLMSContextProvider: FunctionComponent<
  PropsWithChildren<EscolaLMSContextProviderType>
> = ({ children, ...props }) => {
  const contextProps = { defaults: props.defaults, apiUrl: props.apiUrl };
  return (
    <UserContextProvider {...contextProps}>
      <CoursesContextProvider {...contextProps}>
        <CategoriesContextProvider {...contextProps}>
          <TagsContextProvider {...contextProps}>
            <TutorsContextProvider {...contextProps}>
              <WebinarsContextProvider {...contextProps}>
                <WebinarContextProvider {...contextProps}>
                  <H5pContextProvider {...contextProps}>
                    <ConsultationsContextProvider {...contextProps}>
                      <PagesContextProvider {...contextProps}>
                        <PageContextProvider {...contextProps}>
                          <EscolaLMSContextProviderInner {...props}>
                            {children}
                          </EscolaLMSContextProviderInner>
                        </PageContextProvider>
                      </PagesContextProvider>
                    </ConsultationsContextProvider>
                  </H5pContextProvider>
                </WebinarContextProvider>
              </WebinarsContextProvider>
            </TutorsContextProvider>
          </TagsContextProvider>
        </CategoriesContextProvider>
      </CoursesContextProvider>
    </UserContextProvider>
  );
};
