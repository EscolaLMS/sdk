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
import {
  ConsultationsAccessEnquiryContext,
  ConsultationAccessEnquiryContextProvider,
} from "./consultations_access_enquiry";

import { CoursesContext } from "./courses";
import {
  DictionariesWordsContext,
  DictionariesWordsContextProvider,
} from "./dictionary/dictionariesWords";
import {
  DictionariesWordContext,
  DictionariesWordContextProvider,
} from "./dictionary/dictionariesWord";
import {
  DictionariesAccessContext,
  DictionariesAccessContextProvider,
} from "./dictionary/dictionariesAccess";
import {
  DictionariesWordsCategoriesContext,
  DictionariesWordsCategoriesContextProvider,
} from "./dictionary/dictionariesWordsCategories";
import { fetchDataType, handleNoTokenError } from "./states";
import {
  getCourse,
  getCourseProgram,
  progress as getProgress,
  sendProgress as postSendProgress,
  tutor as getTutor,
  topicPing as putTopicPing,
  h5pProgress as postSendh5pProgress,
  courseProgress as getCourseProgress,
  myAuthoredCourses as getMyAuthoredCourses,
  progressPaginated as getProgressPaginated,
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
  getMyProducts,
  getSingleProduct,
  attachProduct as postAttachProduct,
  cancelSubscripton as postCancelSubscription,
} from "../../services/products";
import { getMyWebinars, generateJitsyWebinar } from "../../services/webinars";
import { events as getEvents } from "../../services/events";
import {
  settings as getSettings,
  config as getConfig,
} from "./../../services/settings";
import {
  getCertificates,
  getCertificate,
  generateCertificatePdf,
} from "../../services/certificates";
import { getMattermostChannels } from "../../services/mattermost";

import {
  payWithStripe as postPayWithStripe,
  payWithP24 as postPayWithP24,
  subscriptionPayWithP24 as postSubscriptionPayWithP24,
  orders as getOrders,
  payments as getPayments,
  addVoucher as postVoucher,
  removeVoucher as deleteVoucher,
  orderInvoice,
} from "./../../services/cart";
import {
  userGroups as getUserGroups,
  userGroup as getUserGroup,
  registerableGroups as getRegisterableGroups,
} from "./../../services/user_groups";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as API from "../../types";

import {
  ContextPaginatedMetaState,
  ContextListState,
  ContextStateValue,
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
import { TasksContext, TasksContextProvider } from "./tasks";
import { TaskContext, TaskContextProvider } from "./task";
import {
  CourseAccessContext,
  CourseAccessContextProvider,
} from "./course_access";
import {
  ConsultationAccessContext,
  ConsultationAccessContextProvider,
} from "./consultations_access";
import {
  NotificationsContext,
  NotificationsContextProvider,
} from "./notifications";

import {
  BookmarkNotesContext,
  BookmarkNotesContextProvider,
} from "./bookmark_notes";
import { CartContext, CartContextProvider } from "./cart";
import {
  QuestionnairesContext,
  QuestionnairesContextProvider,
} from "./questionnaires";
import { SubjectsContext, SubjectsContextProvider } from "./subjects";
import { ScheduleContext, ScheduleContextProvider } from "./schedule";
import {
  ScheduleTutorsContext,
  ScheduleTutorsContextProvider,
} from "./subjectsTutors";
import { AttendancesContext, AttendancesContextProvider } from "./attendances";
import { ExamsContext, ExamsContextProvider } from "./exams";
import { postTeamsChat } from "../../services/student/chat";
import {
  StudentDetailsContext,
  StudentDetailsContextProvider,
} from "./studentDetails";
import { ChallengesContext, ChallengesContextProvider } from "./challenges";
import { getFlatTopics } from "../../utils/course";
import { RequestOptionsInit } from "umi-request";

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
  imageSvgPrefix?: string;
  initialFetch?: boolean;
  ssrHydration?: boolean;
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
  imageSvgPrefix = `${apiUrl}/storage`,
  initialFetch = true,
  ssrHydration = false,
}) => {
  // interceptors(apiUrl);
  const initialValues = {
    ...defaultConfig,
    ...defaults,
  };

  const getImagePrefix = () => imagePrefix;
  // Prefix for svg files
  // Default: `${apiUrl}/storage`
  const getImageSvgPrefix = () => imageSvgPrefix;

  const {
    token,
    user,
    socialAuthorize,
    changePassword,
    deleteAccount,
    login,
    logout: logoutUser,
    forgot,
    reset,
    fetchProfile,
    updateProfile,
    updateProfileEmail,
    updateAvatar,
    getRefreshedToken,
    emailVerify,
    tokenExpireDate,
    register,
    initAccountDelete,
    confirmAccountDelete,
  } = useContext(UserContext);

  const {
    cart,
    fetchCart,
    addToCart,
    removeFromCart,
    addMissingProducts,
    resetCart,
  } = useContext(CartContext);
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
  const { tasks, fetchTasks, addTask, deleteTask } = useContext(TasksContext);
  const {
    task,
    fetchTask,
    updateTask,
    updateTaskStatus,
    createTaskNote,
    updateTaskNote,
    deleteTaskNote,
  } = useContext(TaskContext);

  const {
    bookmarkNotes,
    createBookmarkNote,
    updateBookmarkNote,
    deleteBookmarkNote,
    fetchBookmarkNotes,
  } = useContext(BookmarkNotesContext);

  const {
    courseAccess,
    fetchCourseAccess,
    addCourseAccess,
    deleteCourseAccess,
    myCourses,
    fetchMyCourses,
  } = useContext(CourseAccessContext);

  const { fetchChallenges, challenges, challenge, fetchChallenge } =
    useContext(ChallengesContext);

  const { fetchConsultationAccessEnquiry, consultationAccessEnquiry } =
    useContext(ConsultationsAccessEnquiryContext);

  const {
    consultationAccess,
    fetchConsultationAccess,
    addConsultationAccess,
    deleteConsultationAccess,
    updateConsultationAccess,
  } = useContext(ConsultationAccessContext);

  const {
    notifications,
    fetchNotifications,
    readNotify,
    readAllNotifications,
  } = useContext(NotificationsContext);

  const {
    fetchQuestionnaires,
    fetchQuestionnaire,
    fetchQuestionnairesAnswers,
    fetchQuestionnaireStars,
    sendQuestionnaireAnswer,
    fetchQuestionnaireStarsByModel,
  } = useContext(QuestionnairesContext);

  const { fetchSubjects, subjects } = useContext(SubjectsContext);

  const { fetchSchedule, schedule } = useContext(ScheduleContext);

  const { fetchScheduleTutors, scheduleTutors } = useContext(
    ScheduleTutorsContext
  );

  const { fetchAttendances, attendances } = useContext(AttendancesContext);

  const { fetchExams, exams } = useContext(ExamsContext);
  const { fetchSemesters, semesters, fetchAcademicYears, academicYears } =
    useContext(StudentDetailsContext);

  const { dictionariesWords, fetchDictionariesWords } = useContext(
    DictionariesWordsContext
  );
  const { dictionariesWord, fetchDictionariesWord } = useContext(
    DictionariesWordContext
  );
  const { dictionariesAccess, fetchDictionariesAccess } = useContext(
    DictionariesAccessContext
  );
  const { dictionariesWordsCategories, fetchDictionariesWordsCategories } =
    useContext(DictionariesWordsCategoriesContext);

  // https://github.com/EscolaLMS/sdk/issues/235
  // FIXME: #235 move consultation logic to separate file

  const [consultation, setConsultation] = useLocalStorage<
    ContextStateValue<API.Consultation>
  >(
    "lms",
    "consultation",
    getDefaultData("consultation", initialValues),
    ssrHydration
  );

  const [userConsultations, setUserConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >(
    "lms",
    "userConsultations",
    getDefaultData("userConsultations", initialValues),
    ssrHydration
  );

  const [tutorConsultations, setTutorConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.AppointmentTerm>
  >(
    "lms",
    "tutorConsultations",
    getDefaultData("tutorConsultations", initialValues),
    ssrHydration
  );

  // Refactor Events. move logic to separate file
  // https://github.com/EscolaLMS/sdk/issues/237

  const [events, setEvents] = useLocalStorage<
    ContextPaginatedMetaState<API.Event>
  >("lms", "events", getDefaultData("events", initialValues), ssrHydration);

  // Refactor UserGroups. move logic to separate file
  // https://github.com/EscolaLMS/sdk/issues/236

  const [userGroup, setUserGroup] = useLocalStorage<
    ContextStateValue<API.UserGroup>
  >(
    "lms",
    "userGroup",
    getDefaultData("userGroup", initialValues),
    ssrHydration
  );

  const [userGroups, setUserGroups] = useLocalStorage<
    ContextPaginatedMetaState<API.UserGroup>
  >(
    "lms",
    "userGroups",
    getDefaultData("userGroups", initialValues),
    ssrHydration
  );

  const [registerableGroups, setRegisterableGroups] = useLocalStorage<
    ContextListState<API.UserGroup>
  >(
    "lms",
    "registerableGroups",
    getDefaultData("registerableGroups", initialValues),
    ssrHydration
  );

  // Refactor. Course & PRogram. Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/238

  const [course, setCourse] = useLocalStorage<
    ContextStateValue<API.CourseListItem>
  >("lms", "course", getDefaultData("course", initialValues), ssrHydration);

  const [program, setProgram] = useLocalStorage<
    ContextStateValue<API.CourseProgram>
  >("lms", "program", getDefaultData("program", initialValues), ssrHydration);

  // Refactor. Settings & Config. Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/239

  const [settings, setSettings] = useLocalStorage<
    ContextStateValue<API.AppSettings>
  >("lms", "settings", getDefaultData("settings", initialValues), ssrHydration);

  const [config, setConfig] = useLocalStorage<ContextStateValue<API.AppConfig>>(
    "lms",
    "config",
    getDefaultData("config", initialValues),
    ssrHydration
  );

  // Refactor. Cart. Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/240

  const [progress, setProgress] = useState<
    ContextStateValue<API.CourseProgress>
  >(getDefaultData("progress", initialValues));

  const [paginatedProgress, setPaginatedProgress] = useState<
    ContextStateValue<API.CourseProgressItem[]>
  >(getDefaultData("paginatedProgress", initialValues));

  const [myAuthoredCourses, setMyAuthoredCourses] = useState<
    ContextPaginatedMetaState<API.Course>
  >(getDefaultData("myAuthoredCourses", initialValues));

  const [courseProgressDetails, setCourseProgressDetails] = useState<
    ContextStateValue<API.CourseProgressDetails>
  >(getDefaultData("courseProgressDetails", initialValues));

  // Refactor. Orders . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/242

  const [orders, setOrders] = useLocalStorage<
    ContextPaginatedMetaState<API.Order>
  >("lms", "orders", getDefaultData("orders", initialValues), ssrHydration);

  // Refactor. Payments . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/243

  const [payments, setPayments] = useLocalStorage<
    ContextPaginatedMetaState<API.Payment>
  >("lms", "payments", getDefaultData("payments", initialValues), ssrHydration);

  // Refactor. Certificates . Move to separate file. Add new backend logic to generate
  // https://github.com/EscolaLMS/sdk/issues/244

  const [certificates, setCertificates] = useLocalStorage<
    ContextPaginatedMetaState<API.Certificate>
  >(
    "lms",
    "certificates",
    getDefaultData("certificates", initialValues),
    ssrHydration
  );

  // Refactor. Mattermost . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/245

  const [mattermostChannels, setMattermostChannels] = useLocalStorage<
    ContextStateValue<API.MattermostData>
  >(
    "lms",
    "mattermostChannels",
    getDefaultData("mattermostChannels", initialValues),
    ssrHydration
  );

  // Refactor. Tutor . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/246

  const [tutor, setTutor] = useState<ContextStateValue<API.UserItem>>(
    getDefaultData("tutor", initialValues)
  );

  // Refactor. Metadata Fields . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/247

  const [fields, setFields] = useLocalStorage<ContextListState<API.Metadata>>(
    "lms",
    "fields",
    getDefaultData("fields", initialValues),
    ssrHydration
  );

  // Refactor. Stationary Events . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/248

  const [stationaryEvents, setStationaryEvents] = useLocalStorage<
    ContextPaginatedMetaState<API.StationaryEvent>
  >(
    "lms",
    "stationaryEvents",
    getDefaultData("stationaryEvents", initialValues),
    ssrHydration
  );

  const [stationaryEvent, setStationaryEvent] = useLocalStorage<
    ContextStateValue<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >(
    "lms",
    "stationaryEvent",
    getDefaultData("stationaryEvent", initialValues),
    ssrHydration
  );

  const [userStationaryEvents, setUserStationaryEvents] = useLocalStorage<
    ContextListState<API.StationaryEvent>
  >(
    "lms",
    "userStationaryEvents",
    getDefaultData("userStationaryEvents", initialValues),
    ssrHydration
  );

  // Refactor. Webinars . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/249

  const [userWebinars, setUserWebinars] = useLocalStorage<
    ContextListState<API.Webinar>
  >(
    "lms",
    "userWebinars",
    getDefaultData("userWebinars", initialValues),
    ssrHydration
  );

  // Refactor. Products . Move to separate file.
  // https://github.com/EscolaLMS/sdk/issues/250

  const [products, setProducts] = useLocalStorage<
    ContextPaginatedMetaState<API.Product>
  >("lms", "products", getDefaultData("products", initialValues), ssrHydration);

  const [userProducts, setUserProducts] = useLocalStorage<
    ContextPaginatedMetaState<API.Product>
  >(
    "lms",
    "userProducts",
    getDefaultData("userProducts", initialValues),
    ssrHydration
  );

  const [product, setProduct] = useLocalStorage<ContextStateValue<API.Product>>(
    "lms",
    "product",
    getDefaultData("product", initialValues),
    ssrHydration
  );

  const abortControllers = useRef<Record<string, AbortController | null>>({});

  // https://github.com/EscolaLMS/sdk/issues/239
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

  // https://github.com/EscolaLMS/sdk/issues/239
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

  // TODO: remove after refactor
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

  // https://github.com/EscolaLMS/sdk/issues/250
  const fetchProducts = useCallback(
    (
      filter: API.PageParams &
        API.PaginationParams & {
          type?: string;
          "tags[]"?: string;
          name?: string;
        }
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

  const fetchMyProducts = useCallback(
    (
      filter: API.PageParams &
        API.PaginationParams & {
          type?: string;
          "tags[]"?: string;
          name?: string;
        }
    ) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.Product>({
              controllers: abortControllers.current,
              controller: `products/my/${JSON.stringify(filter)}`,
              mode: "paginated",
              fetchAction: getMyProducts.bind(null, apiUrl)(filter, token, {
                signal:
                  abortControllers.current[
                    `products/my/${JSON.stringify(filter)}`
                  ]?.signal,
              }),
              setState: setUserProducts,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const attachProduct = useCallback(
    (productableId: number, productableType: string) => {
      return handleNoTokenError(
        token
          ? postAttachProduct
              .bind(null, apiUrl)(productableId, productableType, token)
              .catch((err) => err)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const cancelSubscription = useCallback(
    (productId: number) => {
      return handleNoTokenError(
        token
          ? postCancelSubscription
              .bind(null, apiUrl)(productId, token)
              .catch((err) => err)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // https://github.com/EscolaLMS/sdk/issues/250
  const fetchProduct = useCallback(
    (id: number) =>
      fetchDataType<API.Product>({
        controllers: abortControllers.current,
        controller: `product${id}`,
        id,
        mode: "value",
        fetchAction: getSingleProduct.bind(null, apiUrl)(id, token, {
          signal: abortControllers.current?.[`product${id}`]?.signal,
        }),
        setState: setProduct,
      }),
    [token]
  );

  // https://github.com/EscolaLMS/sdk/issues/247
  const fetchFields = useCallback((filter: API.FieldsParams) => {
    return fetchDataType<API.Metadata>({
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

  // https://github.com/EscolaLMS/sdk/issues/248

  const fetchStationaryEvents = useCallback(
    (filter: API.StationaryEventsParams) => {
      return fetchDataType<API.StationaryEvent>({
        controllers: abortControllers.current,
        controller: `stationaryevents/${JSON.stringify(filter)}`,
        mode: "paginated",
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
  // https://github.com/EscolaLMS/sdk/issues/248

  const fetchStationaryEvent = useCallback((id: number) => {
    return fetchDataType<API.StationaryEvent>({
      controllers: abortControllers.current,
      controller: `stationaryevent${id}`,
      id,
      mode: "value",
      fetchAction: getStationaryEvent.bind(null, apiUrl)(id, token, {
        signal: abortControllers.current?.[`stationaryevent${id}`]?.signal,
      }),
      setState: setStationaryEvent,
    });
  }, []);

  // https://github.com/EscolaLMS/sdk/issues/249
  const fetchUserWebinars = useCallback(() => {
    return token
      ? fetchDataType<API.Webinar>({
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

  // https://github.com/EscolaLMS/sdk/issues/248
  const fetchUserStationaryEvents = useCallback(() => {
    return handleNoTokenError(
      token
        ? fetchDataType<API.StationaryEvent>({
            controllers: abortControllers.current,
            controller: `userstationaryevents`,
            mode: "list",
            fetchAction: getMyStationaryEvents.bind(null, apiUrl)(token, {
              signal: abortControllers.current?.userstationaryevents?.signal,
            }),
            setState: setUserStationaryEvents,
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  const fetchTutorConsultations = useCallback(() => {
    return handleNoTokenError(
      token
        ? fetchDataType<API.AppointmentTerm>({
            controllers: abortControllers.current,
            controller: `tutorconsultation`,
            mode: "paginated",
            fetchAction: getTutorConsultations.bind(null, apiUrl)(token, {
              signal: abortControllers.current?.tutorconsultation?.signal,
            }),
            setState: setTutorConsultations,
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  const approveConsultationTerm = useCallback(
    (id: number, term: string, userId?: number) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.AppointmentTerm>({
              controllers: abortControllers.current,
              controller: `aprovetutorterm${id}`,
              mode: "paginated",
              fetchAction: approveConsultation.bind(null, apiUrl)(
                token,
                id,
                term,
                userId,
                {
                  signal:
                    abortControllers.current?.[`aprovetutorterm${id}`]?.signal,
                }
              ),
              setState: setTutorConsultations,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const rejectConsultationTerm = useCallback(
    (id: number, term: string, userId?: number) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.AppointmentTerm>({
              controllers: abortControllers.current,
              controller: `rejectterm${id}`,
              mode: "paginated",
              fetchAction: rejectConsultation.bind(null, apiUrl)(
                token,
                id,
                term,
                userId,
                {
                  signal: abortControllers.current?.[`rejectterm${id}`]?.signal,
                }
              ),
              setState: setTutorConsultations,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // Refactor Jitsy. Move to separate file
  // https://github.com/EscolaLMS/sdk/issues/251

  const generateConsultationJitsy = useCallback(
    (id: number, term: string) => {
      return handleNoTokenError(
        token
          ? generateJitsy.bind(null, apiUrl)(token, id, term)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const generateWebinarJitsy = useCallback(
    (id: number) => {
      return handleNoTokenError(
        token
          ? generateJitsyWebinar.bind(null, apiUrl)(token, id)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // https://github.com/EscolaLMS/sdk/issues/244

  const fetchCertificates = useCallback(
    (params?: API.CertificateParams) => {
      return handleNoTokenError(
        token
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
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const createTeamsChat = useCallback(
    (id: number) => {
      return handleNoTokenError(
        token ? postTeamsChat(apiUrl, token, id) : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchCertificate = useCallback(
    (id: number) => {
      return handleNoTokenError(
        token
          ? getCertificate.bind(null, apiUrl)(token, id)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const generateCertificate = useCallback(
    (id: number) => {
      return handleNoTokenError(
        token
          ? generateCertificatePdf.bind(null, apiUrl)(token, id)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchMattermostChannels = useCallback(() => {
    return handleNoTokenError(
      token
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
        : Promise.reject("noToken")
    );
  }, [token]);

  const changeConsultationTerm = useCallback(
    (termId: number, newDate: string, term: string, userId?: number) => {
      return handleNoTokenError(
        token
          ? changeTermDate.bind(null, apiUrl)(
              termId,
              newDate,
              term,
              token,
              userId
            )
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchUserConsultations = useCallback(() => {
    return handleNoTokenError(
      token
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
        : Promise.reject("noToken")
    );
  }, [token]);

  const bookConsultationTerm = useCallback(
    (id: number, term: string) => {
      return handleNoTokenError(
        token
          ? bookConsultationDate
              .bind(null, apiUrl)(token, id, term)
              .then((response) => {
                if (response.success) {
                  fetchUserConsultations();
                  return response;
                }
                throw Error("Error occured");
              })
          : Promise.reject("noToken")
      );
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
      return handleNoTokenError(
        token
          ? getSingleProduct.bind(null, apiUrl)(id, token)
          : Promise.reject("noToken")
      );
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

  const fetchCourse = useCallback(
    (id: number) => {
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
        .bind(null, apiUrl)(id, token)
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
          return response;
        });
    },
    [token]
  );

  // TODO each context should have a separate `reset` method
  // https://github.com/EscolaLMS/sdk/issues/252
  const resetState = useCallback(() => {
    logoutUser();

    resetCart();
    setProgram(defaultConfig.program);
    setCertificates(defaultConfig.certificates);
    setMattermostChannels(defaultConfig.mattermostChannels);

    localStorage.removeItem("user");
    localStorage.removeItem("user_token");
    localStorage.removeItem("lms");
  }, [logoutUser]);

  const logout = useCallback(() => {
    // TODO this should be composition of contexts
    // API Call here to destroy token
    resetState();

    return Promise.resolve();
  }, []);

  const payWithStripe = useCallback(
    (payment_method: string, return_url: string) => {
      return handleNoTokenError(
        token
          ? postPayWithStripe
              .bind(null, apiUrl)(payment_method, return_url, token)
              .then((res) => {
                console.log(res);
              })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const payWithP24 = useCallback(
    (email: string, return_url: string, data?: API.InvoiceData) => {
      return handleNoTokenError(
        token
          ? postPayWithP24
              .bind(null, apiUrl)(email, return_url, token, data)
              .then((res) => {
                return res;
              })
              .catch((err) => {
                console.log(err);
                return err;
              })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const subscriptionPayWithP24 = useCallback(
    (
      subId: number,
      email: string,
      return_url: string,
      data?: API.InvoiceData
    ) => {
      return handleNoTokenError(
        token
          ? postSubscriptionPayWithP24
              .bind(null, apiUrl)(subId, email, return_url, token, data)
              .then((res) => {
                return res;
              })
              .catch((err) => {
                console.log(err);
                return err;
              })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchOrderInvoice = useCallback(
    (id: number, options?: RequestOptionsInit) => {
      return handleNoTokenError(
        token
          ? orderInvoice.bind(null, apiUrl)(token, id, options)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // TODO move this do separate file/context
  // https://github.com/EscolaLMS/sdk/issues/238

  const fetchProgram = useCallback(
    (id: number) => {
      setProgram((prevState) => ({
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
      return getCourseProgram
        .bind(null, apiUrl)(id, token)
        .then((response) => {
          if (response.success) {
            const sortedLessons = sortProgram(response.data.lessons);
            setProgram((prevState) => ({
              loading: false,
              value: {
                ...response.data,
                lessons: sortedLessons,
              },
              byId: prevState.byId
                ? {
                    ...prevState.byId,
                    [id]: {
                      value: {
                        ...response.data,
                        lessons: sortedLessons,
                      },
                      loading: false,
                      error: undefined,
                    },
                  }
                : {
                    [id]: {
                      value: {
                        ...response.data,
                        lessons: sortedLessons,
                      },
                      loading: false,
                      error: undefined,
                    },
                  },
            }));
          }
          if (response.success === false) {
            // TODO add errors to by id or just move this to starndard context like everyother stufff
            setProgram((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
          return response;
        })
        .catch((error: API.DefaultResponseError) => {
          setProgram((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
          return error;
        });
    },
    [token]
  );

  // https://github.com/EscolaLMS/sdk/issues/241
  const fetchProgress = useCallback(() => {
    return handleNoTokenError(
      token
        ? fetchDataType<API.CourseProgress>({
            controllers: abortControllers.current,
            controller: `progress`,
            mode: "value",
            fetchAction: getProgress.bind(null, apiUrl)(token, {
              signal: abortControllers.current?.progress?.signal,
            }),
            setState: setProgress,
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  const fetchPaginatedProgress = useCallback(
    (filter: API.PaginatedProgressParams) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.CourseProgressItem>({
              controllers: abortControllers.current,
              controller: `progressPaginated/${JSON.stringify(filter)}`,
              mode: "paginated",
              fetchAction: getProgressPaginated.bind(null, apiUrl)(
                token,
                filter,
                {
                  signal:
                    abortControllers.current[
                      `progressPaginated/${JSON.stringify(filter)}`
                    ]?.signal,
                }
              ),
              setState: setPaginatedProgress,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchMyAuthoredCourses = useCallback(
    (params?: API.PaginationParams) => {
      return handleNoTokenError(
        token
          ? fetchDataType<API.Course>({
              controllers: abortControllers.current,
              controller: `myAuthoredCourses/${JSON.stringify(params)}`,
              mode: "paginated",
              fetchAction: getMyAuthoredCourses.bind(null, apiUrl)(
                token,
                params,
                {
                  signal:
                    abortControllers.current[
                      `myAuthoredCourses/${JSON.stringify(params)}`
                    ]?.signal,
                }
              ),
              setState: setMyAuthoredCourses,
            })
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchCourseProgress = useCallback(
    (id: number) => {
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
    },
    [token]
  );

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
      return handleNoTokenError(
        token
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
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const fetchPayments = useCallback(() => {
    return handleNoTokenError(
      token
        ? fetchDataType<API.Payment>({
            controllers: abortControllers.current,
            controller: "payments",
            mode: "paginated",
            fetchAction: getPayments.bind(null, apiUrl)(token, {
              signal: abortControllers.current?.payments?.signal,
            }),
            setState: setPayments,
          })
        : Promise.reject("noToken")
    );
  }, [token]);

  // https://github.com/EscolaLMS/sdk/issues/241
  const sendProgress = useCallback(
    (courseId: number, data: API.CourseProgressItemElement[]) => {
      return handleNoTokenError(
        token
          ? postSendProgress
              .bind(null, apiUrl)(courseId, data, token)
              .then((res) => {
                setCourseProgressDetails((prevState) => ({
                  ...prevState,
                  byId: {
                    ...prevState.byId,
                    [courseId]: res.success
                      ? {
                          loading: false,
                          value: res.data,
                        }
                      : {
                          loading: false,
                          error: res,
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
                                    (item) =>
                                      item.topic_id === progress.topic_id
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
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // Refactor h5pProgress. Move to h5p `src/react/context/h5p.tsx`
  // https://github.com/EscolaLMS/sdk/issues/254

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

  // https://github.com/EscolaLMS/sdk/issues/241
  const topicPing = useCallback(
    (topicId: number) => {
      return handleNoTokenError(
        token
          ? putTopicPing
              .bind(null, apiUrl)(topicId, token)
              .catch((err) => err)
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  // https://github.com/EscolaLMS/sdk/issues/241
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

  // https://github.com/EscolaLMS/sdk/issues/241

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

  // https://github.com/EscolaLMS/sdk/issues/241

  const courseProgress = useCallback(
    (courseId: number) =>
      progressMap && progressMap.coursesProcProgress[courseId]
        ? progressMap.coursesProcProgress[courseId]
        : 0,
    [progressMap]
  );

  // Refactored. Added getFlatTopics function with return flatted topics from lessons
  // https://github.com/EscolaLMS/sdk/issues/255

  const getNextPrevTopic = useCallback(
    (topicId: number, next: boolean = true) => {
      if (program.value === undefined) {
        return null;
      }

      const flatTopics = getFlatTopics(program.value.lessons);
      const currentTopicIndex = flatTopics?.findIndex(
        (fTopic) => fTopic.id === topicId
      );

      if (currentTopicIndex === undefined || currentTopicIndex === -1) {
        return null;
      }

      if (next) {
        if (Array.isArray(flatTopics) && flatTopics[currentTopicIndex + 1]) {
          return flatTopics[currentTopicIndex + 1] || null;
        }
      } else {
        if (Array.isArray(flatTopics) && flatTopics[currentTopicIndex - 1]) {
          return flatTopics[currentTopicIndex - 1] || null;
        }
      }

      return null;
    },
    [program]
  );

  // Refactor voucher. move to separate file
  // https://github.com/EscolaLMS/sdk/issues/256

  const realizeVoucher = useCallback(
    (voucher: string) => {
      return handleNoTokenError(
        token
          ? postVoucher
              .bind(null, apiUrl)(voucher, token)
              .finally(() => fetchCart())
          : Promise.reject("noToken")
      );
    },
    [token]
  );

  const removeVoucher = useCallback(() => {
    return handleNoTokenError(
      token
        ? deleteVoucher
            .bind(
              null,
              apiUrl
            )(token)
            .finally(() => fetchCart())
        : Promise.reject("noToken")
    );
  }, [token]);

  return (
    <EscolaLMSContext.Provider
      value={{
        confirmAccountDelete,
        initAccountDelete,
        token,
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
        resetCart,
        cart,
        payWithStripe,
        fetchProgress,
        fetchPaginatedProgress,
        paginatedProgress,
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
        updateProfileEmail,
        updateAvatar,
        topicPing,
        topicIsFinished,
        courseProgress,
        getNextPrevTopic,
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
        readAllNotifications,
        certificates,
        fetchCertificates,
        fetchCertificate,
        generateCertificate,
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
        subscriptionPayWithP24,
        getProductInfo,
        fetchTutorConsultations,
        approveConsultationTerm,
        generateConsultationJitsy,
        rejectConsultationTerm,
        tutorConsultations,
        fetchEvents,
        events,
        changePassword,
        deleteAccount,
        stationaryEvent,
        webinar,
        userWebinars,
        userProducts,
        fetchUserWebinars,
        generateWebinarJitsy,
        realizeVoucher,
        removeVoucher,
        products,
        product,
        fetchQuestionnaires,
        fetchQuestionnaire,
        fetchQuestionnairesAnswers,
        fetchQuestionnaireStars,
        fetchQuestionnaireStarsByModel,
        sendQuestionnaireAnswer,
        fetchUserStationaryEvents,
        userStationaryEvents,
        fetchOrderInvoice,
        addMissingProducts,
        getImagePrefix,
        getImageSvgPrefix,
        changeConsultationTerm,
        fetchProducts,
        fetchProduct,
        fetchMyProducts,
        attachProduct,
        cancelSubscription,
        courseAccess,
        fetchCourseAccess,
        addCourseAccess,
        deleteCourseAccess,
        myCourses,
        fetchMyCourses,
        fetchMyAuthoredCourses,
        myAuthoredCourses,

        challenges,
        fetchChallenges,
        challenge,
        fetchChallenge,

        consultationAccessEnquiry,
        fetchConsultationAccessEnquiry,

        consultationAccess,
        fetchConsultationAccess,
        addConsultationAccess,
        deleteConsultationAccess,
        updateConsultationAccess,

        tasks,
        fetchTasks,
        addTask,
        deleteTask,
        task,
        fetchTask,
        updateTask,
        updateTaskStatus,
        createTaskNote,
        updateTaskNote,
        deleteTaskNote,

        bookmarkNotes,
        createBookmarkNote,
        updateBookmarkNote,
        deleteBookmarkNote,
        fetchBookmarkNotes,

        fetchSubjects,
        subjects,

        fetchSchedule,
        schedule,

        fetchScheduleTutors,
        scheduleTutors,

        fetchAttendances,
        attendances,

        fetchExams,
        exams,
        createTeamsChat,

        fetchSemesters,
        semesters,
        fetchAcademicYears,
        academicYears,

        dictionariesWords,
        fetchDictionariesWords,
        dictionariesWord,
        fetchDictionariesWord,
        dictionariesAccess,
        fetchDictionariesAccess,
        dictionariesWordsCategories,
        fetchDictionariesWordsCategories,
      }}
    >
      {children}
    </EscolaLMSContext.Provider>
  );
};

export const EscolaLMSContextProvider: FunctionComponent<
  PropsWithChildren<EscolaLMSContextProviderType>
> = ({ children, ...props }) => {
  const contextProps = {
    defaults: props.defaults,
    apiUrl: props.apiUrl,
    ssrHydration: props.ssrHydration,
  };

  const wrappers: React.FunctionComponent<React.PropsWithChildren<any>>[] = [
    UserContextProvider,
    CoursesContextProvider,
    CategoriesContextProvider,
    TagsContextProvider,
    TutorsContextProvider,
    WebinarsContextProvider,
    WebinarContextProvider,
    H5pContextProvider,
    ConsultationsContextProvider,
    PagesContextProvider,
    PageContextProvider,
    ConsultationAccessContextProvider,
    ConsultationAccessEnquiryContextProvider,
    NotificationsContextProvider,
    CourseAccessContextProvider,
    TasksContextProvider,
    TaskContextProvider,
    BookmarkNotesContextProvider,
    CartContextProvider,
    QuestionnairesContextProvider,
    SubjectsContextProvider,
    ScheduleContextProvider,
    ScheduleTutorsContextProvider,
    AttendancesContextProvider,
    ExamsContextProvider,
    StudentDetailsContextProvider,
    ChallengesContextProvider,
    DictionariesWordsContextProvider,
    DictionariesWordContextProvider,
    DictionariesAccessContextProvider,
    DictionariesWordsCategoriesContextProvider,
  ].reverse();

  const C = wrappers.reduce((acc, curr, i) => {
    return React.createElement(curr, contextProps, acc);
  }, React.createElement(EscolaLMSContextProviderInner, props, children));

  return C;
};
