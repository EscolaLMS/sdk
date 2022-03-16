import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
} from 'react';

import { interceptors } from './../../services/request';
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
} from './../../services/courses';
import { consultations as getConsultations, getConsultation } from './../../services/consultations';
import { settings as getSettings, config as getConfig } from './../../services/settings';
import { uniqueTags as getUniqueTags } from './../../services/tags';
import { categoryTree as getCategoryTree } from './../../services/categories';
import { getNotifications, readNotification } from '../../services/notify';
import { getCertificates, getCertificate } from '../../services/certificates';
import { getMattermostChannels } from '../../services/mattermost';
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
} from './../../services/auth';
import { pages as getPages, page as getPage } from './../../services/pages';
import {
  cart as getCart,
  addToCart as postAddToCart,
  removeFromCart as deleteRemoveFromCart,
  payWithStripe as postPayWithStripe,
  orders as getOrders,
  payments as getPayments,
} from './../../services/cart';
import {
  userGroups as getUserGroups,
  userGroup as getUserGroup,
  registerableGroups as getRegisterableGroups,
} from './../../services/user_groups';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EditorContextProvider } from '@escolalms/h5p-react';
import * as API from './../../types/api';
import { getH5p } from '../../services/h5p';
import {
  ContextPaginatedMetaState,
  ContextListState,
  ContextStateValue,
  FontSize,
  EscolaLMSContextReadConfig,
  EscolaLMSContextConfig,
  SortProgram,
} from './types';

import {
  defaultConfig,
  attempted,
  guessTheAnswer,
  blackList,
  completed,
  questionSet,
} from './defaults';

import { fields as getFields } from '../../services/fields';
import { stationaryEvents as getEvents } from '../../services/stationary_events';

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
      typeof lessonA.order === 'number' && typeof lessonB.order === 'number'
        ? lessonA.order - lessonB.order
        : 0,
    )
    .map((lesson) => ({
      ...lesson,
      topics: [...(lesson.topics || [])].sort((topicA, topicB) =>
        typeof topicA.order === 'number' && typeof topicB.order === 'number'
          ? topicA.order - topicB.order
          : 0,
      ),
    }));
};

interface EscolaLMSContextProviderType {
  children?: React.ReactElement[] | React.ReactElement;
  apiUrl: string;
  defaults?: Partial<EscolaLMSContextReadConfig>;
}

export const EscolaLMSContextProvider: FunctionComponent<EscolaLMSContextProviderType> = ({
  children,
  apiUrl,
  defaults,
}) => {
  interceptors(apiUrl);

  const initialValues = {
    ...defaultConfig,
    ...defaults,
  };

  const getDefaultData = <K extends keyof EscolaLMSContextReadConfig>(
    key: K,
  ): EscolaLMSContextReadConfig[K] => {
    return initialValues[key];
  };

  const [courses, setCourses] = useLocalStorage<ContextPaginatedMetaState<API.CourseListItem>>(
    'lms',
    'courses',
    getDefaultData('courses'),
  );

  const [consultations, setConsultations] = useLocalStorage<
    ContextPaginatedMetaState<API.Consultation>
  >('lms', 'consultations', getDefaultData('consultations'));

  const [consultation, setConsultation] = useLocalStorage<ContextStateValue<API.Consultation>>(
    'lms',
    'consultation',
    getDefaultData('consultation'),
  );

  const [userGroup, setUserGroup] = useLocalStorage<ContextStateValue<API.UserGroupRow>>(
    'lms',
    'userGroup',
    getDefaultData('userGroup'),
  );

  const [userGroups, setUserGroups] = useLocalStorage<ContextListState<API.UserGroup>>(
    'lms',
    'userGroups',
    getDefaultData('userGroups'),
  );

  const [registerableGroups, setRegisterableGroups] = useLocalStorage<
    ContextListState<API.UserGroup>
  >('lms', 'registerableGroups', getDefaultData('registerableGroups'));

  const [course, setCourse] = useLocalStorage<ContextStateValue<API.CourseListItem>>(
    'lms',
    'course',
    getDefaultData('course'),
  );

  const [settings, setSettings] = useLocalStorage<API.AppSettings>(
    'lms',
    'settings',
    getDefaultData('settings'),
  );

  const [config, setConfig] = useLocalStorage<API.AppConfig>(
    'lms',
    'config',
    getDefaultData('config'),
  );

  const [uniqueTags, setUniqueTags] = useLocalStorage<ContextListState<API.Tag>>(
    'lms',
    'tags',
    getDefaultData('uniqueTags'),
  );

  const [categoryTree, setCategoryTree] = useLocalStorage<ContextListState<API.Category>>(
    'lms',
    'categories',
    getDefaultData('categoryTree'),
  );

  const [program, setProgram] = useLocalStorage<ContextStateValue<API.CourseProgram>>(
    'lms',
    'tags',
    getDefaultData('program'),
  );

  const [cart, setCart] = useLocalStorage<ContextStateValue<API.Cart>>(
    'lms',
    'cart',
    getDefaultData('cart'),
  );

  const [token, setToken] = useLocalStorage<string | null>('lms', 'token', null);

  const [tokenExpireDate, setTokenExpireDate] = useLocalStorage<string | null>(
    'lms',
    'tokenExpireDate',
    null,
  );

  const [user, setUser] = useLocalStorage<ContextStateValue<API.UserItem>>(
    'lms',
    'user',
    getDefaultData('user'),
  );

  const [progress, setProgress] = useState<ContextStateValue<API.CourseProgress>>(
    getDefaultData('progress'),
  );

  const [tutors, setTutors] = useLocalStorage<ContextListState<API.UserItem>>(
    'lms',
    'tutors',
    getDefaultData('tutors'),
  );

  const [orders, setOrders] = useLocalStorage<ContextListState<API.Order>>(
    'lms',
    'orders',
    getDefaultData('orders'),
  );

  const [payments, setPayments] = useLocalStorage<ContextPaginatedMetaState<API.Payment>>(
    'lms',
    'payments',
    getDefaultData('payments'),
  );

  const [certificates, setCertificates] = useLocalStorage<
    ContextPaginatedMetaState<API.Certificate>
  >('lms', 'certificates', getDefaultData('certificates'));

  const [mattermostChannels, setMattermostChannels] = useLocalStorage<
    ContextStateValue<API.MattermostData>
  >('lms', 'mattermostChannels', getDefaultData('mattermostChannels'));

  const [tutor, setTutor] = useState<ContextStateValue<API.UserItem>>(getDefaultData('tutor'));

  const [pages, setPages] = useLocalStorage<ContextPaginatedMetaState<API.PageListItem>>(
    'lms',
    'pages',
    getDefaultData('pages'),
  );

  const [page, setPage] = useLocalStorage<ContextStateValue<API.Page>>(
    'lms',
    'page',
    getDefaultData('page'),
  );

  const [fontSize, setFontSize] = useLocalStorage<FontSize>(
    'lms',
    'fontSize',
    getDefaultData('fontSize'),
  );

  const [h5p, setH5P] = useLocalStorage<ContextStateValue<API.H5PObject>>(
    'lms',
    'h5p',
    getDefaultData('h5p'),
  );

  const [notifications, setNotifications] = useLocalStorage<ContextListState<API.Notification>>(
    'lms',
    'notifications',
    getDefaultData('notifications'),
  );

  const [fields, setFields] = useLocalStorage<
    ContextListState<EscolaLms.ModelFields.Models.Metadata>
  >('lms', 'fields', getDefaultData('fields'));

  const [stationaryEvents, setStationaryEvents] = useLocalStorage<
    ContextListState<EscolaLms.StationaryEvents.Models.StationaryEvent>
  >('lms', 'stationaryEvents', getDefaultData('stationaryEvents'));

  const abortControllers = useRef<{
    cart: AbortController | null;
  }>({
    cart: null,
  });

  const fetchConfig = useCallback(() => {
    return getConfig().then((resposne) => {
      setConfig(resposne.data);
    });
  }, []);

  useEffect(() => {
    getSettings().then((response) => {
      setSettings(response.data);
    });
    fetchConfig();
    setUniqueTags((prevState) => ({ ...prevState, loading: true }));
    getUniqueTags().then((response) => {
      setUniqueTags({ list: response.data, loading: false });
    });
    setCategoryTree((prevState) => ({ ...prevState, loading: true }));
    getCategoryTree().then((response) => {
      setCategoryTree({ list: response.data, loading: false });
    });
  }, []);

  const fetchFields = useCallback((filter: API.FieldsParams) => {
    setFields((prevState) => ({ ...prevState, loading: true }));

    return getFields(filter)
      .then((response) => {
        if (response.success) {
          setFields({
            loading: false,
            list: response.data,
            error: undefined,
          });
        }
      })
      .catch((error) => {
        setFields((prevState) => ({
          ...prevState,
          loading: false,
          error: error,
        }));
      });
  }, []);

  const fetchStationaryEvents = useCallback((filter: any) => {
    setStationaryEvents((prevState) => ({ ...prevState, loading: true }));

    return getEvents(filter)
      .then((response) => {
        if (response.success) {
          setStationaryEvents({
            loading: false,
            list: response.data,
            error: undefined,
          });
        }
      })
      .catch((error) => {
        setStationaryEvents((prevState) => ({
          ...prevState,
          loading: false,
          error: error,
        }));
      });
  }, []);

  const fetchCertificates = useCallback(() => {
    setCertificates((prevState) => ({ ...prevState, loading: true }));

    return token
      ? getCertificates(token)
          .then((response) => {
            if (response.success) {
              setCertificates({
                loading: false,
                list: response,
                error: undefined,
              });
            }
          })
          .catch((error) => {
            setCertificates((prevState) => ({
              ...prevState,
              loading: false,
              error: error,
            }));
          })
      : Promise.reject();
  }, [token]);

  const fetchCertificate = useCallback(
    (id: number) => {
      return token ? getCertificate(token, id) : Promise.reject();
    },
    [token],
  );

  const fetchMattermostChannels = useCallback(() => {
    setMattermostChannels((prevState) => ({ ...prevState, loading: true }));

    return token
      ? getMattermostChannels(token)
          .then((response) => {
            if (response.success) {
              setMattermostChannels({
                loading: false,
                value: response.data,
                error: undefined,
              });
            }
          })
          .catch((error) => {
            setMattermostChannels((prevState) => ({
              ...prevState,
              loading: false,
              error: error,
            }));
          })
      : Promise.reject();
  }, [token]);

  const fetchNotifications = useCallback(() => {
    setNotifications((prevState) => ({ ...prevState, loading: true }));
    return token
      ? getNotifications(token)
          .then((response) => {
            if (response.success) {
              setNotifications({ list: response.data, loading: false });
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
                      ? prevState.list.filter((item: API.Notification) => item.id !== id)
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
    [token, notifications],
  );

  const fetchCourses = useCallback(
    (filter: API.CourseParams) => {
      setCourses((prevState) => ({ ...prevState, loading: true }));
      return getCourses(filter)
        .then((response) => {
          if (response.success) {
            setCourses({
              loading: false,
              list: response,
              error: undefined,
            });
          }
          if (response.success === false) {
            setCourses((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
        })
        .catch((error) => {
          setCourses((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
        });
    },
    [courses],
  );

  const fetchConsultations = useCallback(
    (filter: API.ConsultationParams) => {
      setConsultations((prevState) => ({ ...prevState, loading: true }));
      return getConsultations(filter)
        .then((response) => {
          if (response.success) {
            setConsultations({
              loading: false,
              list: response,
              error: undefined,
            });
          }
          if (response.success === false) {
            setConsultations((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
        })
        .catch((error) => {
          setConsultations((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
        });
    },
    [consultations],
  );

  const fetchConsultation = useCallback((id) => {
    setConsultation((prevState) => ({ ...prevState, loading: true }));
    return getConsultation(id).then((response) => {
      if (response.success) {
        setConsultation({
          loading: false,
          value: {
            ...response.data,
          },
        });
      }
      if (response.success === false) {
        setConsultation((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
        }));
      }
    });
  }, []);

  const fetchUserGroup = useCallback(
    (id) => {
      setUserGroup((prevState) => ({ ...prevState, loading: true }));
      return getUserGroup(id)
        .then((response) => {
          if (response.success) {
            setUserGroup({
              loading: false,
              value: response,
              error: undefined,
            });
          }
          if (response.success === false) {
            setUserGroup((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
        })
        .catch((error) => {
          setUserGroup((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
        });
    },
    [userGroups],
  );

  const fetchRegisterableGroups = () => {
    setRegisterableGroups((prevState) => ({ ...prevState, loading: true }));
    return getRegisterableGroups()
      .then((response) => {
        if (response.success) {
          setRegisterableGroups({
            loading: false,
            list: response.data,
            error: undefined,
          });
        }
        if (response.success === false) {
          setRegisterableGroups((prevState) => ({
            ...prevState,
            loading: false,
            error: response,
          }));
        }
      })
      .catch((error) => {
        setRegisterableGroups((prevState) => ({
          ...prevState,
          loading: false,
          error: error,
        }));
      });
  };

  const fetchUserGroups = useCallback(
    ({ pageSize, current }) => {
      setUserGroups((prevState) => ({ ...prevState, loading: true }));
      return getUserGroups({ pageSize, current })
        .then((response) => {
          if (response.success) {
            setUserGroups({
              loading: false,
              list: response.data,
              error: undefined,
            });
          }
          if (response.success === false) {
            setUserGroups((prevState) => ({
              ...prevState,
              loading: false,
              error: response,
            }));
          }
        })
        .catch((error) => {
          setUserGroups((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
        });
    },
    [userGroups],
  );

  const fetchCourse = useCallback((id) => {
    setCourse((prevState) => ({ ...prevState, loading: true }));
    return getCourse(id).then((response) => {
      if (response.success) {
        setCourse({
          loading: false,
          value: {
            ...response.data,
            lessons: sortProgram(response.data.lessons || []),
          },
        });
      }
      if (response.success === false) {
        setCourse((prevState) => ({
          ...prevState,
          loading: false,
          error: response,
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

  const fetchCart = useCallback(() => {
    if (!token) {
      return Promise.reject('No token provided');
    }
    setCart((prevState) => ({
      ...prevState,
      loading: true,
    }));

    if (abortControllers.current.cart) {
      abortControllers.current.cart.abort();
    }

    const controller = new AbortController();
    abortControllers.current.cart = controller;

    try {
      return getCart(token, { signal: controller.signal })
        .then((response) => {
          if (response.data.hasOwnProperty('items')) {
            setCart({
              loading: false,
              value: response.data as API.Cart,
            });
          } else {
            setCart((prevState) => ({
              ...prevState,
              loading: false,
            }));
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.log(err);
          }
        });
    } catch (err: any) {
      return Promise.reject(err);
    }
  }, [token, abortControllers]);

  const addToCart = useCallback(
    (productId: number) => {
      if (!token) {
        return Promise.reject('No token provided');
      }
      setCart((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return postAddToCart(productId, token)
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
    [fetchCart],
  );

  const removeFromCart = useCallback(
    (itemId: number) => {
      if (!token) {
        return Promise.reject('No token provided');
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
    [fetchCart],
  );

  const payWithStripe = useCallback(
    (paymentMethodId: string) => {
      return token
        ? postPayWithStripe(paymentMethodId, token).then((res) => {
            console.log(res);
          })
        : Promise.reject();
    },
    [token],
  );

  const fetchProgress = useCallback(() => {
    setProgress((prevState) => ({
      ...prevState,
      loading: true,
    }));
    return token
      ? getProgress(token).then((res) => {
          if (res.success) {
            setProgress({
              loading: false,
              value: res.data,
            });
          }
        })
      : Promise.reject();
  }, [token]);

  const fetchH5P = useCallback(
    (id: string) => {
      setH5P({ loading: true });
      token
        ? getH5p(Number(id))
            .then((response) => {
              if (response.success) {
                setH5P({ loading: false, value: response.data });
              }
            })
            .catch((error) => {
              setH5P((prevState) => ({
                ...prevState,
                loading: false,
                error: error,
              }));
            })
        : Promise.reject();
    },
    [token],
  );

  const fetchProgram = useCallback(
    (id) => {
      setProgram((prevState) => ({ ...prevState, loading: true }));
      return id
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
    [token],
  );

  const fetchTutors = useCallback(() => {
    setTutors((prevState) => ({
      ...prevState,
      loading: true,
    }));
    return getTutors()
      .then((res) => {
        if (res.success) {
          setTutors({
            loading: false,
            list: res.data,
          });
        } else if (res.success === false) {
          {
            setTutors({
              loading: false,
              error: res,
            });
          }
        }
      })
      .catch((error) => {
        setTutors({
          loading: false,
          error: error.data,
        });
      });
  }, []);

  const fetchTutor = useCallback((id: number) => {
    setTutor((prevState) => ({
      ...prevState,
      loading: true,
    }));
    return getTutor(id)
      .then((res) => {
        if (res.success) {
          setTutor({
            loading: false,
            value: res.data,
          });
        } else if (res.success === false) {
          {
            setTutor({
              loading: false,
              error: res,
            });
          }
        }
      })
      .catch((error) => {
        setTutor({
          loading: false,
          error: error.data,
        });
      });
  }, []);

  const fetchOrders = useCallback(() => {
    setOrders((prevState) => ({
      ...prevState,
      loading: true,
    }));
    return token
      ? getOrders(token)
          .then((res) => {
            if (res.success) {
              setOrders({
                loading: false,
                list: res.data,
              });
            } else if (res.success === false) {
              {
                setOrders({
                  loading: false,
                  error: res,
                });
              }
            }
          })
          .catch((error) => {
            setOrders({
              loading: false,
              error: error.data,
            });
          })
      : Promise.reject();
  }, [token]);

  const fetchPayments = useCallback(() => {
    setPayments((prevState) => ({
      ...prevState,
      loading: true,
    }));
    return token
      ? getPayments(token)
          .then((res) => {
            if (res.success) {
              setPayments({
                loading: false,
                list: res,
              });
            }
          })
          .catch((error) => {
            setPayments({
              loading: false,
              error: error.data,
            });
          })
      : Promise.reject();
  }, [token]);

  const fetchPages = useCallback(
    (filter?: API.CourseParams) => {
      setPages((prevState) => ({ ...prevState, loading: true }));
      return getPages(filter)
        .then((response) => {
          if (response.success) {
            setPages({
              loading: false,
              list: response,
              error: undefined,
            });
          }
        })
        .catch((error) => {
          setPages((prevState) => ({
            ...prevState,
            loading: false,
            error: error,
          }));
        });
    },
    [pages],
  );

  const fetchPage = useCallback(
    (slug: string) => {
      setPage((prevState) => ({
        ...prevState,
        loading: true,
      }));
      return getPage(slug)
        .then((res) => {
          if (res.success) {
            setPage({
              loading: false,
              value: res.data,
            });
          } else if (res.success === false) {
            {
              setPage({
                loading: false,
                error: res,
              });
            }
          }
        })
        .catch((error) => {
          setPage({
            loading: false,
            error: error.data,
          });
        });
    },
    [token],
  );

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
                            const el = data.find((item) => item.topic_id === progress.topic_id);
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
    [token],
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
          (!hasParent && statementCategory && !statementCategory[0]?.id.includes(questionSet)) ||
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

      return token ? postSendh5pProgress(topicId, statementId, statement, token) : null;
    },
    [token],
  );

  const updateProfile = useCallback(
    (body: API.UserItem) => {
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
    [token],
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
    [token],
  );

  const topicPing = useCallback(
    (topicId: number) => {
      return token ? putTopicPing(topicId, token).catch((err) => err) : Promise.reject();
    },
    [token],
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
        acc.coursesProcProgress[typeof course.course.id === 'number' ? course.course.id : 0] =
          course.progress.reduce((sum, item) => sum + item.status, 0) / course.progress.length;
        acc.finishedTopics = acc.finishedTopics.concat(
          course.progress.filter((item) => item.status !== 0).map((item) => item.topic_id),
        );
        return acc;
      }, defaultMap);
    }
    return defaultMap;
  }, [progress]);

  const topicIsFinished = useCallback(
    (topicId) => progressMap && progressMap.finishedTopics.includes(topicId),
    [progressMap],
  );

  const courseProgress = useCallback(
    (courseId) =>
      progressMap && progressMap.coursesProcProgress[courseId]
        ? progressMap.coursesProcProgress[courseId]
        : 0,
    [progressMap],
  );

  const getNextPrevTopic = useCallback(
    (topicId: number, next: boolean = true) => {
      const lesson: API.Lesson | undefined = program.value?.lessons.find(
        (lesson) => !!lesson.topics?.find((topic) => topicId === topic.id),
      );

      if (program.value === undefined) {
        return null;
      }

      if (!lesson) {
        return null;
      }

      const currentLessonIndex = program.value.lessons.findIndex(
        (fLesson) => lesson.id === fLesson.id,
      );
      if (currentLessonIndex === undefined) {
        return null;
      }

      const currentTopicIndex = (
        program.value && program.value.lessons ? program.value.lessons : []
      )[currentLessonIndex].topics?.findIndex((topic) => Number(topic.id) === Number(topicId));

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
            return (newLesson.topics && newLesson.topics[newLesson.topics.length - 1]) || null;
          }
        }
      }

      return null;
    },
    [program],
  );

  const fontSizeToggle = useCallback(
    (bigger) => {
      const newFontSize = (fontSize + (bigger ? 1 : -1)) % 4;
      return setFontSize(newFontSize);
    },
    [fontSize],
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
        settings,
        config,
        fetchConfig,
        uniqueTags,
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
      }}
    >
      <EditorContextProvider url={`${apiUrl}/api/hh5p`}>{children}</EditorContextProvider>
    </EscolaLMSContext.Provider>
  );
};
