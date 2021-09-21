"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscolaLMSContextProvider = exports.sortProgram = exports.EscolaLMSContext = exports.SCORMPlayer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var umi_request_1 = __importDefault(require("umi-request"));
var courses_1 = require("./../services/courses");
var settings_1 = require("./../services/settings");
var tags_1 = require("./../services/tags");
var categories_1 = require("./../services/categories");
var auth_1 = require("./../services/auth");
var pages_1 = require("./../services/pages");
var cart_1 = require("./../services/cart");
var useLocalStorage_1 = require("./../hooks/useLocalStorage");
var h5p_headless_player_1 = require("h5p-headless-player");
var FontSize;
(function (FontSize) {
    FontSize[FontSize["small"] = 0] = "small";
    FontSize[FontSize["regular"] = 1] = "regular";
    FontSize[FontSize["bigger"] = 2] = "bigger";
    FontSize[FontSize["big"] = 3] = "big";
})(FontSize || (FontSize = {}));
// npm test
var blackList = [
    "http://adlnet.gov/expapi/verbs/attended",
    "http://adlnet.gov/expapi/verbs/attempted",
    "http://adlnet.gov/expapi/verbs/interacted",
    "http://adlnet.gov/expapi/verbs/imported",
    "http://adlnet.gov/expapi/verbs/created",
];
var completed = [
    "http://adlnet.gov/expapi/verbs/completed",
    "http://adlnet.gov/expapi/verbs/answered",
    "http://activitystrea.ms/schema/1.0/consume",
];
var attempted = "http://adlnet.gov/expapi/verbs/attempted";
var consume = "http://activitystrea.ms/schema/1.0/consume";
var guessTheAnswer = "GuessTheAnswer";
var questionSet = "QuestionSet";
var defaultConfig = {
    apiUrl: "",
    courses: {
        loading: false,
    },
    fetchCourses: function () { return Promise.reject(); },
    course: {
        loading: false,
    },
    fetchCourse: function (id) { return Promise.reject(); },
    program: {
        loading: false,
    },
    fetchProgram: function (id) { return Promise.reject(); },
    login: function (body) { return Promise.reject(); },
    logout: function () { return Promise.reject(); },
    settings: {
        currencies: {
            default: "EUR",
            enum: ["EUR", "USD"],
        },
        env: "local",
        stripe: {
            publishable_key: "pk_test_51Ig8icJ9tg9t712TnCR6sKY9OXwWoFGWH4ERZXoxUVIemnZR0B6Ei0MzjjeuWgOzLYKjPNbT8NbG1ku1T2pGCP4B00GnY0uusI",
        },
    },
    uniqueTags: {
        loading: false,
        list: [],
    },
    categoryTree: {
        loading: false,
        list: [],
    },
    user: {
        loading: false,
    },
    register: function () {
        return Promise.reject({
            success: false,
            message: "register method not implemented",
        });
    },
    forgot: function (body) { return Promise.reject(); },
    reset: function (body) { return Promise.reject(); },
    addToCart: function (id) { return Promise.reject(id); },
    removeFromCart: function (id) { return Promise.reject(id); },
    fetchCart: function () { return Promise.reject(); },
    cart: {
        loading: false,
        value: { total: 0, subtotal: 0, tax: 0, items: [] },
    },
    payWithStripe: function (paymentMethodId) { return Promise.reject(paymentMethodId); },
    fetchProgress: function () { return Promise.reject(); },
    progress: {
        loading: false,
        value: [],
    },
    sendProgress: function (courseId, data) {
        return Promise.reject();
    },
    h5pProgress: function (courseId, topicId, statement) {
        return Promise.reject();
    },
    tutors: {
        loading: false,
        list: [],
    },
    fetchTutors: function () { return Promise.reject(); },
    tutor: {
        loading: false,
    },
    fetchTutor: function (id) { return Promise.reject(id); },
    orders: {
        loading: false,
        list: [],
    },
    fetchOrders: function () { return Promise.reject(); },
    payments: {
        loading: false,
    },
    pages: {
        loading: false,
    },
    fetchPages: function () { return Promise.reject(); },
    page: {
        loading: false,
    },
    fetchPage: function (slug) { return Promise.reject(); },
    fetchPayments: function () { return Promise.reject(); },
    updateProfile: function (data) { return Promise.reject(data); },
    updateAvatar: function (avatar) { return Promise.reject(avatar); },
    topicPing: function (topicId) { return Promise.reject(topicId); },
    topicIsFinished: function (topicId) { return false; },
    courseProgress: function (courseId) { return 0; },
    getNextPrevTopic: function (topicId, next) { return null; },
    fontSizeToggle: function (bigger) { return 0; },
    fontSize: FontSize.regular,
};
var SCORMPlayer = function (_a) {
    var uuid = _a.uuid;
    var apiUrl = (0, react_1.useContext)(exports.EscolaLMSContext).apiUrl;
    return (0, jsx_runtime_1.jsx)("iframe", { src: apiUrl + "/api/scorm/play/" + uuid }, void 0);
};
exports.SCORMPlayer = SCORMPlayer;
exports.EscolaLMSContext = react_1.default.createContext(defaultConfig);
var sortProgram = function (lessons) {
    return __spreadArray([], lessons, true).sort(function (lessonA, lessonB) {
        return typeof lessonA.order === "number" && typeof lessonB.order === "number"
            ? lessonA.order - lessonB.order
            : 0;
    })
        .map(function (lesson) { return (__assign(__assign({}, lesson), { topics: __spreadArray([], (lesson.topics || []), true).sort(function (topicA, topicB) {
            return typeof topicA.order === "number" && typeof topicB.order === "number"
                ? topicA.order - topicB.order
                : 0;
        }) })); });
};
exports.sortProgram = sortProgram;
var interceptors = function (apiUrl, fire) {
    if (fire === void 0) { fire = false; }
    if (!fire) {
        return;
    }
    umi_request_1.default.interceptors.request.use(function (url, options) {
        if (url.includes(apiUrl)) {
            return {
                url: "" + url,
                options: options,
            };
        }
        return {
            url: "" + apiUrl + url,
            options: __assign(__assign({}, options), { interceptors: true }),
        };
    });
};
/**
 *
 *
 */
var EscolaLMSContextProvider = function (_a) {
    var children = _a.children, apiUrl = _a.apiUrl;
    var shouldFire = (0, react_1.useRef)(true);
    interceptors(apiUrl, shouldFire.current);
    shouldFire.current = false;
    var _b = (0, useLocalStorage_1.useLocalStorage)("lms", "courses", defaultConfig.courses), courses = _b[0], setCourses = _b[1];
    var _c = (0, useLocalStorage_1.useLocalStorage)("lms", "course", defaultConfig.course), course = _c[0], setCourse = _c[1];
    var _d = (0, useLocalStorage_1.useLocalStorage)("lms", "settings", defaultConfig.settings), settings = _d[0], setSettings = _d[1];
    var _e = (0, useLocalStorage_1.useLocalStorage)("lms", "tags", defaultConfig.uniqueTags), uniqueTags = _e[0], setUniqueTags = _e[1];
    var _f = (0, useLocalStorage_1.useLocalStorage)("lms", "categories", defaultConfig.categoryTree), categoryTree = _f[0], setCategoryTree = _f[1];
    var _g = (0, useLocalStorage_1.useLocalStorage)("lms", "tags", defaultConfig.program), program = _g[0], setProgram = _g[1];
    var _h = (0, useLocalStorage_1.useLocalStorage)("lms", "cart", defaultConfig.cart), cart = _h[0], setCart = _h[1];
    var _j = (0, useLocalStorage_1.useLocalStorage)("lms", "token", null), token = _j[0], setToken = _j[1];
    var _k = (0, useLocalStorage_1.useLocalStorage)("lms", "user", defaultConfig.user), user = _k[0], setUser = _k[1];
    var _l = (0, react_1.useState)(defaultConfig.progress), progress = _l[0], setProgress = _l[1];
    var _m = (0, useLocalStorage_1.useLocalStorage)("lms", "tutors", defaultConfig.tutors), tutors = _m[0], setTutors = _m[1];
    var _o = (0, useLocalStorage_1.useLocalStorage)("lms", "orders", defaultConfig.orders), orders = _o[0], setOrders = _o[1];
    var _p = (0, useLocalStorage_1.useLocalStorage)("lms", "payments", defaultConfig.payments), payments = _p[0], setPayments = _p[1];
    var _q = (0, react_1.useState)(defaultConfig.tutor), tutor = _q[0], setTutor = _q[1];
    var _r = (0, useLocalStorage_1.useLocalStorage)("lms", "pages", defaultConfig.pages), pages = _r[0], setPages = _r[1];
    var _s = (0, useLocalStorage_1.useLocalStorage)("lms", "page", defaultConfig.page), page = _s[0], setPage = _s[1];
    var _t = (0, useLocalStorage_1.useLocalStorage)("lms", "fontSize", defaultConfig.fontSize), fontSize = _t[0], setFontSize = _t[1];
    var abortControllers = (0, react_1.useRef)({
        cart: null,
    });
    (0, react_1.useEffect)(function () {
        (0, settings_1.settings)().then(function (response) {
            setSettings(response.data);
        });
        setUniqueTags(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        (0, tags_1.uniqueTags)().then(function (response) {
            setUniqueTags({ list: response.data, loading: false });
        });
        setCategoryTree(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        (0, categories_1.categoryTree)().then(function (response) {
            setCategoryTree({ list: response.data, loading: false });
        });
    }, []);
    var fetchCourses = (0, react_1.useCallback)(function (filter) {
        setCourses(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, courses_1.course)(filter)
            .then(function (response) {
            if (response.success) {
                setCourses({
                    loading: false,
                    list: response,
                    error: undefined,
                });
            }
            if (response.success === false) {
                setCourses(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: response })); });
            }
        })
            .catch(function (error) {
            setCourses(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: error })); });
        });
    }, [courses]);
    var fetchCourse = (0, react_1.useCallback)(function (id) {
        setCourse(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, courses_1.getCourse)(id).then(function (response) {
            if (response.success) {
                setCourse({
                    loading: false,
                    value: __assign(__assign({}, response.data), { lessons: (0, exports.sortProgram)(response.data.lessons || []) }),
                });
            }
            if (response.success === false) {
                setCourses(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: response })); });
            }
        });
    }, []);
    var fetchProgram = (0, react_1.useCallback)(function (id) {
        setProgram(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return token
            ? (0, courses_1.getCourseProgram)(id, token)
                .then(function (response) {
                if (response.success) {
                    setProgram({
                        loading: false,
                        value: __assign(__assign({}, response.data), { lessons: (0, exports.sortProgram)(response.data.lessons) }),
                    });
                }
                if (response.success === false) {
                    setProgram(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: response })); });
                }
            })
                .catch(function (error) {
                setProgram(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: error.data })); });
            })
            : Promise.reject();
    }, [token]);
    var logout = (0, react_1.useCallback)(function () {
        // API Call here to destroy token
        setToken(null);
        setUser({
            loading: false,
        });
        setCart(defaultConfig.cart);
        return Promise.resolve();
    }, []);
    var register = (0, react_1.useCallback)(function (body) {
        return (0, auth_1.register)(body);
    }, []);
    (0, react_1.useEffect)(function () {
        if (token) {
            setUser(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
            (0, auth_1.profile)(token)
                .then(function (response) {
                if (response.success) {
                    setUser({
                        loading: false,
                        value: response.data,
                    });
                }
                if (response.success === false) {
                    setUser(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: response })); });
                }
            })
                .catch(function () {
                logout();
            });
        }
    }, [token, logout]);
    var login = (0, react_1.useCallback)(function (body) {
        return (0, auth_1.login)(body).then(function (response) {
            if (response.success) {
                setToken(response.data.token);
            }
        });
    }, []);
    var fetchCart = (0, react_1.useCallback)(function () {
        if (!token) {
            return Promise.reject("No token provided");
        }
        setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        if (abortControllers.current.cart) {
            abortControllers.current.cart.abort();
        }
        var controller = new AbortController();
        abortControllers.current.cart = controller;
        try {
            return (0, cart_1.cart)(token, { signal: controller.signal })
                .then(function (response) {
                if (response.data.hasOwnProperty("items")) {
                    setCart({
                        loading: false,
                        value: response.data,
                    });
                }
                else {
                    setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: false })); });
                }
            })
                .catch(function (err) {
                if (err.name !== "AbortError") {
                    console.log(err);
                }
            });
        }
        catch (err) {
            return Promise.reject(err);
            if (typeof err === "object" && err && err.name !== "AbortError") {
                console.log(err);
            }
        }
    }, [token, abortControllers]);
    var addToCart = (0, react_1.useCallback)(function (courseId) {
        if (!token) {
            return Promise.reject("No token provided");
        }
        setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, cart_1.addToCart)(courseId, token)
            .then(function (response) {
            fetchCart();
        })
            .catch(function (error) {
            setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: error.data })); });
        });
    }, [fetchCart]);
    var removeFromCart = (0, react_1.useCallback)(function (courseId) {
        if (!token) {
            return Promise.reject("No token provided");
        }
        setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, cart_1.removeFromCart)(courseId, token)
            .then(function (response) {
            setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, value: __assign(__assign({}, prevState.value), { items: prevState && prevState.value
                        ? prevState.value.items.filter(function (item) { return item.id !== courseId; })
                        : [] }) })); });
            fetchCart();
        })
            .catch(function (error) {
            setCart(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: error.data })); });
        });
    }, [fetchCart]);
    var payWithStripe = (0, react_1.useCallback)(function (paymentMethodId) {
        return token
            ? (0, cart_1.payWithStripe)(paymentMethodId, token).then(function (res) {
                console.log(res);
            })
            : Promise.reject();
    }, [token]);
    var fetchProgress = (0, react_1.useCallback)(function () {
        setProgress(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return token
            ? (0, courses_1.progress)(token).then(function (res) {
                if (res.success) {
                    setProgress({
                        loading: false,
                        value: res.data,
                    });
                }
            })
            : Promise.reject();
    }, [token]);
    var fetchTutors = (0, react_1.useCallback)(function () {
        setTutors(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, courses_1.tutors)()
            .then(function (res) {
            if (res.success) {
                setTutors({
                    loading: false,
                    list: res.data,
                });
            }
            else if (res.success === false) {
                {
                    setTutors({
                        loading: false,
                        error: res,
                    });
                }
            }
        })
            .catch(function (error) {
            setTutors({
                loading: false,
                error: error.data,
            });
        });
    }, []);
    var fetchTutor = (0, react_1.useCallback)(function (id) {
        setTutor(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, courses_1.tutor)(id)
            .then(function (res) {
            if (res.success) {
                setTutor({
                    loading: false,
                    value: res.data,
                });
            }
            else if (res.success === false) {
                {
                    setTutor({
                        loading: false,
                        error: res,
                    });
                }
            }
        })
            .catch(function (error) {
            setTutor({
                loading: false,
                error: error.data,
            });
        });
    }, []);
    var fetchOrders = (0, react_1.useCallback)(function () {
        setOrders(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return token
            ? (0, cart_1.orders)(token)
                .then(function (res) {
                if (res.success) {
                    setOrders({
                        loading: false,
                        list: res.data,
                    });
                }
                else if (res.success === false) {
                    {
                        setOrders({
                            loading: false,
                            error: res,
                        });
                    }
                }
            })
                .catch(function (error) {
                setOrders({
                    loading: false,
                    error: error.data,
                });
            })
            : Promise.reject();
    }, [token]);
    var fetchPayments = (0, react_1.useCallback)(function () {
        setPayments(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return token
            ? (0, cart_1.payments)(token)
                .then(function (res) {
                if (res.success) {
                    setPayments({
                        loading: false,
                        list: res,
                    });
                }
            })
                .catch(function (error) {
                setPayments({
                    loading: false,
                    error: error.data,
                });
            })
            : Promise.reject();
    }, [token]);
    var fetchPages = (0, react_1.useCallback)(function (filter) {
        setPages(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, pages_1.pages)(filter)
            .then(function (response) {
            if (response.success) {
                setPages({
                    loading: false,
                    list: response,
                    error: undefined,
                });
            }
        })
            .catch(function (error) {
            setPages(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, error: error })); });
        });
    }, [pages]);
    var fetchPage = (0, react_1.useCallback)(function (slug) {
        setPage(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return (0, pages_1.page)(slug)
            .then(function (res) {
            if (res.success) {
                setPage({
                    loading: false,
                    value: res.data,
                });
            }
            else if (res.success === false) {
                {
                    setPage({
                        loading: false,
                        error: res,
                    });
                }
            }
        })
            .catch(function (error) {
            setPage({
                loading: false,
                error: error.data,
            });
        });
    }, [token]);
    var sendProgress = (0, react_1.useCallback)(function (courseId, data) {
        return token
            ? (0, courses_1.sendProgress)(courseId, data, token).then(function (res) {
                setProgress(function (prevState) { return (__assign(__assign({}, prevState), { value: prevState && prevState.value
                        ? prevState.value.map(function (courseProgress) {
                            if (courseProgress.course.id === courseId) {
                                return __assign(__assign({}, courseProgress), { progress: courseProgress.progress.map(function (progress) {
                                        var el = data.find(function (item) { return item.topic_id === progress.topic_id; });
                                        if (el) {
                                            return el;
                                        }
                                        return progress;
                                    }) });
                            }
                            return courseProgress;
                        })
                        : [] })); });
            })
            : Promise.reject();
    }, [token]);
    var h5pProgress = (0, react_1.useCallback)(function (courseId, topicId, statement) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var statementId = (_a = statement === null || statement === void 0 ? void 0 : statement.verb) === null || _a === void 0 ? void 0 : _a.id;
        var statementCategory = (_c = (_b = statement === null || statement === void 0 ? void 0 : statement.context) === null || _b === void 0 ? void 0 : _b.contextActivities) === null || _c === void 0 ? void 0 : _c.category;
        var result = statement === null || statement === void 0 ? void 0 : statement.result;
        var hasParent = ((_e = (_d = statement === null || statement === void 0 ? void 0 : statement.context) === null || _d === void 0 ? void 0 : _d.contextActivities) === null || _e === void 0 ? void 0 : _e.parent) &&
            ((_h = (_g = (_f = statement === null || statement === void 0 ? void 0 : statement.context) === null || _f === void 0 ? void 0 : _f.contextActivities) === null || _g === void 0 ? void 0 : _g.parent) === null || _h === void 0 ? void 0 : _h.length) > 0;
        if (attempted === statementId &&
            statementCategory &&
            statementCategory[0].id.includes(guessTheAnswer)) {
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
            if ((!hasParent && !statementCategory[0].id.includes(questionSet)) ||
                (statementCategory[0].id.includes(questionSet) &&
                    result &&
                    ((_j = result === null || result === void 0 ? void 0 : result.score) === null || _j === void 0 ? void 0 : _j.max) === ((_k = result === null || result === void 0 ? void 0 : result.score) === null || _k === void 0 ? void 0 : _k.raw))) {
                sendProgress(Number(courseId), [
                    {
                        topic_id: topicId,
                        status: 1,
                    },
                ]);
            }
        }
        return token
            ? (0, courses_1.h5pProgress)(topicId, statementId, statement, token)
            : null;
    }, [token]);
    var updateProfile = (0, react_1.useCallback)(function (body) {
        setUser(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        return token
            ? (0, auth_1.updateProfile)(body, token).then(function (res) {
                if (res.success === true) {
                    setUser(function (prevState) { return ({
                        value: __assign({}, res.data),
                        loading: false,
                    }); });
                }
                else if (res.success === false) {
                    setUser(function (prevState) { return (__assign(__assign({}, prevState), { error: res, loading: false })); });
                }
            })
            : Promise.reject();
    }, [token]);
    var updateAvatar = (0, react_1.useCallback)(function (file) {
        setUser(function (prevState) {
            return __assign(__assign({}, prevState), { loading: true });
        });
        return token
            ? (0, auth_1.updateAvatar)(file, token).then(function (res) {
                if (res.success === true) {
                    setUser(function (prevState) { return (__assign(__assign({}, prevState), { value: __assign(__assign({}, res.data), { avatar: res.data.avatar, path_avatar: res.data.path_avatar }), loading: false })); });
                }
            })
            : Promise.reject();
    }, [token]);
    var topicPing = (0, react_1.useCallback)(function (topicId) {
        return token
            ? (0, courses_1.topicPing)(topicId, token).catch(function (err) { return err; })
            : Promise.reject();
    }, [token]);
    var progressMap = (0, react_1.useMemo)(function () {
        var defaultMap = {
            coursesProcProgress: {},
            finishedTopics: [],
        };
        if (progress.value) {
            progress.value.reduce(function (acc, course) {
                acc.coursesProcProgress[typeof course.course.id === "number" ? course.course.id : 0] =
                    course.progress.reduce(function (sum, item) { return sum + item.status; }, 0) /
                        course.progress.length;
                acc.finishedTopics = acc.finishedTopics.concat(course.progress
                    .filter(function (item) { return item.status !== 0; })
                    .map(function (item) { return item.topic_id; }));
                return acc;
            }, defaultMap);
        }
        return defaultMap;
    }, [progress]);
    var topicIsFinished = (0, react_1.useCallback)(function (topicId) { return progressMap && progressMap.finishedTopics.includes(topicId); }, [progressMap]);
    var courseProgress = (0, react_1.useCallback)(function (courseId) {
        return progressMap && progressMap.coursesProcProgress[courseId]
            ? progressMap.coursesProcProgress[courseId]
            : 0;
    }, [progressMap]);
    var getNextPrevTopic = (0, react_1.useCallback)(function (topicId, next) {
        var _a, _b;
        if (next === void 0) { next = true; }
        var lesson = (_a = program.value) === null || _a === void 0 ? void 0 : _a.lessons.find(function (lesson) { var _a; return !!((_a = lesson.topics) === null || _a === void 0 ? void 0 : _a.find(function (topic) { return topicId === topic.id; })); });
        if (program.value === undefined) {
            return null;
        }
        if (!lesson) {
            return null;
        }
        var currentLessonIndex = program.value.lessons.findIndex(function (fLesson) { return lesson.id === fLesson.id; });
        if (currentLessonIndex === undefined) {
            return null;
        }
        var currentTopicIndex = (_b = (program.value && program.value.lessons ? program.value.lessons : [])[currentLessonIndex].topics) === null || _b === void 0 ? void 0 : _b.findIndex(function (topic) { return Number(topic.id) === Number(topicId); });
        if (currentTopicIndex === undefined) {
            return null;
        }
        var topics = program.value.lessons[currentLessonIndex].topics;
        if (next) {
            if (Array.isArray(topics) && topics[currentTopicIndex + 1]) {
                return topics[currentTopicIndex + 1] || null;
            }
            else {
                if (program.value.lessons[currentLessonIndex + 1]) {
                    var newLesson = program.value.lessons[currentLessonIndex + 1];
                    return (newLesson.topics && newLesson.topics[0]) || null;
                }
            }
        }
        else {
            if (Array.isArray(topics) && topics[currentTopicIndex - 1]) {
                return topics[currentTopicIndex - 1] || null;
            }
            else {
                if (program.value.lessons[currentLessonIndex - 1]) {
                    var newLesson = program.value.lessons[currentLessonIndex - 1];
                    return ((newLesson.topics &&
                        newLesson.topics[newLesson.topics.length - 1]) ||
                        null);
                }
            }
        }
        return null;
    }, [program]);
    var fontSizeToggle = (0, react_1.useCallback)(function (bigger) {
        var newFontSize = (fontSize + (bigger ? 1 : -1)) % 4;
        return setFontSize(newFontSize);
    }, [fontSize]);
    return ((0, jsx_runtime_1.jsx)(exports.EscolaLMSContext.Provider, __assign({ value: {
            apiUrl: apiUrl,
            courses: courses,
            course: course,
            program: program,
            fetchCourses: fetchCourses,
            fetchCourse: fetchCourse,
            fetchProgram: fetchProgram,
            settings: settings,
            uniqueTags: uniqueTags,
            categoryTree: categoryTree,
            login: login,
            logout: logout,
            forgot: auth_1.forgot,
            reset: auth_1.reset,
            user: user,
            register: register,
            fetchCart: fetchCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            cart: cart,
            payWithStripe: payWithStripe,
            fetchProgress: fetchProgress,
            progress: progress,
            sendProgress: sendProgress,
            fetchTutors: fetchTutors,
            tutors: tutors,
            fetchTutor: fetchTutor,
            tutor: tutor,
            fetchOrders: fetchOrders,
            orders: orders,
            fetchPayments: fetchPayments,
            payments: payments,
            pages: pages,
            fetchPages: fetchPages,
            page: page,
            fetchPage: fetchPage,
            updateProfile: updateProfile,
            updateAvatar: updateAvatar,
            topicPing: topicPing,
            topicIsFinished: topicIsFinished,
            courseProgress: courseProgress,
            getNextPrevTopic: getNextPrevTopic,
            fontSize: fontSize,
            fontSizeToggle: fontSizeToggle,
            h5pProgress: h5pProgress,
        } }, { children: (0, jsx_runtime_1.jsx)(h5p_headless_player_1.EditorContextProvider, __assign({ url: apiUrl + "/api/hh5p" }, { children: children }), void 0) }), void 0));
};
exports.EscolaLMSContextProvider = EscolaLMSContextProvider;
