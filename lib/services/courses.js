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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.h5pProgress = exports.topicPing = exports.tutor = exports.tutors = exports.sendProgress = exports.progress = exports.getCourseProgram = exports.getCourse = exports.course = exports.TopicType = void 0;
// @ts-ignore
/* eslint-disable */
var umi_request_1 = __importDefault(require("umi-request"));
var TopicType;
(function (TopicType) {
    TopicType["Unselected"] = "";
    TopicType["RichText"] = "EscolaLms\\Courses\\Models\\TopicContent\\RichText";
    TopicType["OEmbed"] = "EscolaLms\\Courses\\Models\\TopicContent\\OEmbed";
    TopicType["Audio"] = "EscolaLms\\Courses\\Models\\TopicContent\\Audio";
    TopicType["Video"] = "EscolaLms\\Courses\\Models\\TopicContent\\Video";
    TopicType["H5P"] = "EscolaLms\\Courses\\Models\\TopicContent\\H5P";
    TopicType["Image"] = "EscolaLms\\Courses\\Models\\TopicContent\\Image";
    TopicType["Pdf"] = "EscolaLms\\Courses\\Models\\TopicContent\\PDF";
})(TopicType = exports.TopicType || (exports.TopicType = {}));
/**  GET /api/courses */
function course(params, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses", __assign({ method: "GET", params: params }, (options || {})))];
        });
    });
}
exports.course = course;
/**  GET /api/courses/:id */
function getCourse(id, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/" + id, __assign({ method: "GET" }, (options || {})))];
        });
    });
}
exports.getCourse = getCourse;
/**  GET /api/courses/:id */
function getCourseProgram(id, token, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/" + id + "/program", __assign({ method: "GET", headers: token
                        ? {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        }
                        : {
                            "Content-Type": "application/json",
                        } }, (options || {})))];
        });
    });
}
exports.getCourseProgram = getCourseProgram;
function progress(token, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/progress", __assign({ method: "GET", headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    } }, (options || {})))];
        });
    });
}
exports.progress = progress;
function sendProgress(courseId, data, token, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/progress/" + courseId, __assign({ method: "PATCH", headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }, data: {
                        progress: data,
                    } }, (options || {})))];
        });
    });
}
exports.sendProgress = sendProgress;
function tutors(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/tutors", __assign({ method: "GET" }, (options || {})))];
        });
    });
}
exports.tutors = tutors;
function tutor(id, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/tutors/" + id, __assign({ method: "GET" }, (options || {})))];
        });
    });
}
exports.tutor = tutor;
function topicPing(topicId, token, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/progress/" + topicId + "/ping", __assign({ method: "PUT", headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    } }, (options || {})))];
        });
    });
}
exports.topicPing = topicPing;
function h5pProgress(topicId, statementId, statement, token) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, umi_request_1.default)("/api/courses/progress/" + topicId + "/h5p", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    data: {
                        event: statementId,
                        data: statement.result || {},
                    },
                })];
        });
    });
}
exports.h5pProgress = h5pProgress;
