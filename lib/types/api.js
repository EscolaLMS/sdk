"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseProgressItemElementStatus = exports.TopicType = void 0;
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
var CourseProgressItemElementStatus;
(function (CourseProgressItemElementStatus) {
    CourseProgressItemElementStatus[CourseProgressItemElementStatus["INCOMPLETE"] = 0] = "INCOMPLETE";
    CourseProgressItemElementStatus[CourseProgressItemElementStatus["COMPLETE"] = 1] = "COMPLETE";
    CourseProgressItemElementStatus[CourseProgressItemElementStatus["IN_PROGRESS"] = 2] = "IN_PROGRESS";
})(CourseProgressItemElementStatus = exports.CourseProgressItemElementStatus || (exports.CourseProgressItemElementStatus = {}));
