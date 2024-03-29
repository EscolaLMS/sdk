import nock from "nock";
import { generateDataResponse, secretOrPublicKey } from "./jwt";
import jwt from "jsonwebtoken";

export const dataSuccess = {
  success: true,
  message: "My profile",
  data: {
    id: 2,
    name: "Admin Kowalski",
    first_name: "Admin",
    last_name: "Kowalski",
    email: "admin@escola-lms.com",
    is_active: true,
    created_at: "2021-10-14T15:50:26.000000Z",
    onboarding_completed: 0,
    email_verified: true,
    interests: [],
    avatar: "https://api-stage.escolalms.com//storage/avatars/2/avatar.png",
    roles: ["student", "tutor", "admin"],
    permissions: [
      "access dashboard",
      "user manage",
      "user_create",
      "user_delete",
      "user_update",
      "user_update_self",
      "user_read",
      "user_read_self",
      "user_read_course-authored",
      "user_list",
      "user_list_course-authored",
      "user_verify_account",
      "user-group_create",
      "user-group_delete",
      "user-group_list",
      "user-group_list_self",
      "user-group_member-add",
      "user-group_member-remove",
      "user-group_read",
      "user-group_read_self",
      "user-group_update",
      "user-interest_update",
      "user-interest_update_self",
      "user-setting_update",
      "user-setting_update_self",
      "cart_order_list",
      "products_list",
      "products_manage",
      "products_list_purchasable",
      "products_buy",
      "file_list",
      "file_delete",
      "file_update",
      "file_create",
      "course_list",
      "course_update",
      "course_delete",
      "course_create",
      "course_read",
      "course_update_authored",
      "course_delete_authored",
      "course_read_authored",
      "payment_list",
      "payment_read",
      "category_list",
      "category_update",
      "category_create",
      "category_delete",
      "pages_list",
      "pages_read",
      "pages_delete",
      "pages_update",
      "pages_create",
      "scorm_list",
      "scorm_read",
      "scorm_create",
      "scorm_update",
      "scorm_delete",
      "scorm_track-update",
      "scorm_track-read",
      "settings_manage",
      "settings_create",
      "settings_delete",
      "settings_update",
      "settings_read",
      "settings_list",
      "settings_config_list",
      "settings_config_update",
      "report_list",
      "course-import-export_export",
      "course-import-export_import",
      "course-import-export_export_authored",
      "course-import-export_clone",
      "permission_role_manage",
      "permission_role_list",
      "permission_role_read",
      "permission_role_create",
      "permission_role_update",
      "permission_role_delete",
      "dashboard-app_notification-list_access",
      "dashboard-app_notification-list_access_self",
      "template_create",
      "template_delete",
      "template_update",
      "template_list",
      "template_read",
      "events_trigger",
      "csv-users_export",
      "csv-users_import",
      "tags_create",
      "tags_update",
      "tags_delete",
      "h5p_list",
      "h5p_read",
      "h5p_delete",
      "h5p_update",
      "h5p_create",
      "h5p_library_list",
      "h5p_library_read",
      "h5p_library_delete",
      "h5p_library_update",
      "h5p_library_create",
      "questionnaire_list",
      "questionnaire_read",
      "questionnaire_delete",
      "questionnaire_update",
      "questionnaire_create",
      "question_list",
      "question_read",
      "question_delete",
      "question_update",
      "question_create",
      "consultation_list",
      "consultation_update",
      "consultation_delete",
      "consultation_create",
      "consultation_read",
      "assign-without-account_user-submission_list",
      "assign-without-account_user-submission_create",
      "assign-without-account_user-submission_update",
      "assign-without-account_user-submission_delete",
      "stationary-event_list",
      "stationary-event_create",
      "stationary-event_read",
      "stationary-event_update",
      "stationary-event_delete",
      "webinar_list",
      "webinar_update",
      "webinar_delete",
      "webinar_create",
      "webinar_read",
      "tracker_route-list",
      "metadata_create_update",
      "metadata_delete",
      "metadata_list",
      "coupon_list",
      "coupon_create",
      "coupon_read",
      "coupon_update",
      "coupon_delete",
      "coupon_use",
      "consultation_change_term",
      "fabricjs_pdf_read_all",
      "fabricjs_list",
      "file_list_self",
      "lrs_statement-list",
      "cmi5_upload",
      "cmi5_list",
      "cmi5_read",
      "translation_list",
      "translation_create",
      "translation_read",
      "translation_update",
      "translation_delete",
    ],
    path_avatar: "avatars/2/avatar.png",
    contact: "Kontakt do mnie to blabla",
    "Terms of Service": true,
    "Privacy Policy": true,
    bio: "Praktyk z 15 letnim doświadczeniem w zarządzaniu zarówno mikro jak i makro przedsiębiorstwami",
    address: "Jakis adres",
    notification_channels: null,
  },
};

// 401 Unauthorized
export const dataFail = {
  message: "Unauthenticated.",
};

export default (scope: nock.Scope) =>
  scope.get("/api/profile/me").reply(function (uri, requestBody) {
    const token = this.req.headers.authorization.toString().split(" ")[1];

    if (token) {
      try {
        if (jwt.verify(token, secretOrPublicKey)) {
          return [200, dataSuccess];
        }
      } catch (err) {
        return [422, dataFail];
      }
    }

    return [422, dataFail];
  });
