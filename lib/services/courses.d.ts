import * as API from "../types/api";
export declare enum TopicType {
    Unselected = "",
    RichText = "EscolaLms\\Courses\\Models\\TopicContent\\RichText",
    OEmbed = "EscolaLms\\Courses\\Models\\TopicContent\\OEmbed",
    Audio = "EscolaLms\\Courses\\Models\\TopicContent\\Audio",
    Video = "EscolaLms\\Courses\\Models\\TopicContent\\Video",
    H5P = "EscolaLms\\Courses\\Models\\TopicContent\\H5P",
    Image = "EscolaLms\\Courses\\Models\\TopicContent\\Image",
    Pdf = "EscolaLms\\Courses\\Models\\TopicContent\\PDF"
}
/**  GET /api/courses */
export declare function course(params: API.CourseParams, options?: {
    [key: string]: any;
}): Promise<API.CourseList>;
/**  GET /api/courses/:id */
export declare function getCourse(id: number, options?: {
    [key: string]: any;
}): Promise<API.DefaultResponse<API.Course>>;
/**  GET /api/courses/:id */
export declare function getCourseProgram(id: number, token?: string, options?: {
    [key: string]: any;
}): Promise<API.DefaultResponse<API.CourseProgram>>;
export declare function progress(token: string, options?: {
    [key: string]: any;
}): Promise<API.CourseProgress>;
export declare function sendProgress(courseId: number, data: API.CourseProgressItemElement[], token: string, options?: {
    [key: string]: any;
}): Promise<API.CourseProgress>;
export declare function tutors(options?: {
    [key: string]: any;
}): Promise<API.TutorList>;
export declare function tutor(id: number, options?: {
    [key: string]: any;
}): Promise<API.TutorSingle>;
export declare function topicPing(topicId: number, token: string, options?: {
    [key: string]: any;
}): Promise<Boolean>;
export declare function h5pProgress(topicId: number, statementId: string, statement: API.IStatement, token: string): Promise<API.SuccessResponse>;
