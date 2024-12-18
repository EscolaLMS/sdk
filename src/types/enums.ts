export enum TopicType {
  Unselected = "",
  RichText = "EscolaLms\\TopicTypes\\Models\\TopicContent\\RichText",
  OEmbed = "EscolaLms\\TopicTypes\\Models\\TopicContent\\OEmbed",
  Audio = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Audio",
  Video = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Video",
  H5P = "EscolaLms\\TopicTypes\\Models\\TopicContent\\H5P",
  Image = "EscolaLms\\TopicTypes\\Models\\TopicContent\\Image",
  Pdf = "EscolaLms\\TopicTypes\\Models\\TopicContent\\PDF",
  Scorm = "EscolaLms\\TopicTypes\\Models\\TopicContent\\ScormSco",
  Project = "EscolaLms\\TopicTypeProject\\Models\\Project",
  GiftQuiz = "EscolaLms\\TopicTypeGift\\Models\\GiftQuiz",
}

export enum BookmarkableType {
  Course = "EscolaLms\\Courses\\Models\\Course",
  Lesson = "EscolaLms\\Courses\\Models\\Lesson",
  Topic = "EscolaLms\\Courses\\Models\\Topic",
}

export enum PaymentStatusType {
  NEW = "new",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export type IEvent =
  | "http://adlnet.gov/expapi/verbs/experienced"
  | "http://adlnet.gov/expapi/verbs/attended"
  | "http://adlnet.gov/expapi/verbs/attempted"
  | "http://adlnet.gov/expapi/verbs/completed"
  | "http://adlnet.gov/expapi/verbs/passed"
  | "http://adlnet.gov/expapi/verbs/failed"
  | "http://adlnet.gov/expapi/verbs/answered"
  | "http://adlnet.gov/expapi/verbs/interacted"
  | "http://adlnet.gov/expapi/verbs/imported"
  | "http://adlnet.gov/expapi/verbs/created"
  | "http://adlnet.gov/expapi/verbs/shared"
  | "http://adlnet.gov/expapi/verbs/voided"
  | "http://activitystrea.ms/schema/1.0/consume"
  | "http://adlnet.gov/expapi/verbs/mastered";

export enum EventTypes {
  UserLogged = "EscolaLms\\Auth\\Events\\UserLogged",
  StationaryEventAssigned = "EscolaLms\\StationaryEvents\\Events\\StationaryEventAssigned",
  StationaryEventUnassigned = "EscolaLms\\StationaryEvents\\Events\\StationaryEventUnassigned",
  StationaryEventAuthorAssigned = "EscolaLms\\StationaryEvents\\Events\\StationaryEventAuthorAssigned",
  StationaryEventAuthorUnassigned = "EscolaLms\\StationaryEvents\\Events\\StationaryEventAuthorUnassigned",
  AbandonedCartEvent = "EscolaLms\\Cart\\Events\\AbandonedCartEvent",
  OrderCancelled = "EscolaLms\\Cart\\Events\\OrderCancelled",
  OrderCreated = "EscolaLms\\Cart\\Events\\OrderCreated",
  OrderPaid = "EscolaLms\\Cart\\Events\\OrderPaid",
  ProductableAttached = "EscolaLms\\Cart\\Events\\ProductableAttached",
  ProductableDetached = "EscolaLms\\Cart\\Events\\ProductableDetached",
  ProductAddedToCart = "EscolaLms\\Cart\\Events\\ProductAddedToCart",
  ProductAttached = "EscolaLms\\Cart\\Events\\ProductAttached",
  ProductBought = "EscolaLms\\Cart\\Events\\ProductBought",
  ProductDetached = "EscolaLms\\Cart\\Events\\ProductDetached",
  ProductRemovedFromCart = "EscolaLms\\Cart\\Events\\ProductRemovedFromCart",
  PaymentCancelled = "EscolaLms\\Payments\\Events\\PaymentCancelled",
  PaymentFailed = "EscolaLms\\Payments\\Events\\PaymentFailed",
  PaymentRegistered = "EscolaLms\\Payments\\Events\\PaymentRegistered",
  PaymentSuccess = "EscolaLms\\Payments\\Events\\PaymentSuccess",
  CourseAccessFinished = "EscolaLms\\Courses\\Events\\CourseAccessFinished",
  CourseAccessStarted = "EscolaLms\\Courses\\Events\\CourseAccessStarted",
  CourseAssigned = "EscolaLms\\Courses\\Events\\CourseAssigned",
  CourseDeadlineSoon = "EscolaLms\\Courses\\Events\\CourseDeadlineSoon",
  CoursedPublished = "EscolaLms\\Courses\\Events\\CoursedPublished",
  CourseFinished = "EscolaLms\\Courses\\Events\\CourseFinished",
  CourseStarted = "EscolaLms\\Courses\\Events\\CourseStarted",
  CourseStatusChanged = "EscolaLms\\Courses\\Events\\CourseStatusChanged",
  CourseTutorAssigned = "EscolaLms\\Courses\\Events\\CourseTutorAssigned",
  CourseTutorUnassigned = "EscolaLms\\Courses\\Events\\CourseTutorUnassigned",
  CourseUnassigned = "EscolaLms\\Courses\\Events\\CourseUnassigned",
  TopicFinished = "EscolaLms\\Courses\\Events\\TopicFinished",
  TopicTypeChanged = "EscolaLms\\TopicTypes\\Events\\TopicTypeChanged",
  ApprovedTerm = "EscolaLms\\Consultations\\Events\\ApprovedTerm",
  ApprovedTermWithTrainer = "EscolaLms\\Consultations\\Events\\ApprovedTermWithTrainer",
  ChangeTerm = "EscolaLms\\Consultations\\Events\\ChangeTerm",
  RejectTerm = "EscolaLms\\Consultations\\Events\\RejectTerm",
  RejectTermWithTrainer = "EscolaLms\\Consultations\\Events\\RejectTermWithTrainer",
  ReminderAboutTerm = "EscolaLms\\Consultations\\Events\\ReminderAboutTerm",
  ReminderTrainerAboutTerm = "EscolaLms\\Consultations\\Events\\ReminderTrainerAboutTerm",
  ReportTerm = "EscolaLms\\Consultations\\Events\\ReportTerm",
  WebinarReminderAboutTerm = "EscolaLms\\Webinar\\Events\\ReminderAboutTerm",
  WebinarTrainerAssigned = "EscolaLms\\Webinar\\Events\\WebinarTrainerAssigned",
  WebinarTrainerUnassigned = "EscolaLms\\Webinar\\Events\\WebinarTrainerUnassigned",
  ProcessVideoFailed = "ProcessVideoFailed",
  ProcessVideoStarted = "ProcessVideoStarted",
  ImportedNewUserTemplateEvent = "EscolaLms\\CsvUsers\\Events\\EscolaLmsImportedNewUserTemplateEvent",
  AssignToProduct = "AssignToProduct", // ASSIGN WITHOUT ACCONT
  AssignToProductable = "AssignToProductable", // ASSIGN WITHOUT ACCONT
  FileDeleted = "FileDeleted",
  FileStored = "FileStored",
  SettingPackageConfigUpdated = "EscolaLms\\Settings\\Events\\SettingPackageConfigUpdated",
  AccountBlocked = "EscolaLms\\Auth\\Events\\AccountBlocked",
  AccountConfirmed = "EscolaLms\\Auth\\Events\\AccountConfirmed",
  AccountDeleted = "EscolaLms\\Auth\\Events\\AccountDeleted",
  AccountMustBeEnableByAdmin = "EscolaLms\\Auth\\Events\\AccountMustBeEnableByAdmin",
  AccountRegistered = "EscolaLms\\Auth\\Events\\AccountRegistered",
  ForgotPassword = "EscolaLms\\Auth\\Events\\ForgotPassword",
  Login = "EscolaLms\\Auth\\Events\\Login",
  Logout = "EscolaLms\\Auth\\Events\\Logout",
  PasswordChanged = "EscolaLms\\Auth\\Events\\PasswordChanged",
  ResetPassword = "EscolaLms\\Auth\\Events\\ResetPassword",
  UserAddedToGroup = "EscolaLms\\Auth\\Events\\UserAddedToGroup",
  UserRemovedFromGroup = "EscolaLms\\Auth\\Events\\UserRemovedFromGroup",
  BulkNotification = "EscolaLms\\BulkNotifications\\Events\\NotificationSent",
  PushNotification = "EscolaLms\\BulkNotifications\\Channels\\PushNotificationChannel",
  // new and missed event types
  WebinarUserAssigned = "EscolaLms\\Webinar\\Events\\WebinarUserAssigned",
  EscolaLmsCartOrderSuccessTemplateEvent = "EscolaLms\\Cart\\Events\\EscolaLmsCartOrderSuccessTemplateEvent",
  EscolaLmsLoginTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsLoginTemplateEvent",
  EscolaLmsAccountBlockedTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsAccountBlockedTemplateEvent",
  EscolaLmsCourseFinishedTemplateEvent = "EscolaLms\\Courses\\Events\\EscolaLmsCourseFinishedTemplateEvent",
  EscolaLmsImportedNewUserTemplateEvent = "EscolaLms\\CsvUsers\\Events\\EscolaLmsImportedNewUserTemplateEvent",
  TaskUpdatedEvent = "EscolaLms\\Tasks\\Events\\TaskUpdatedEvent",
  CartOrderPaid = "EscolaLms\\Cart\\Events\\CartOrderPaid",
  EscolaLmsUserRemovedFromGroupTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsUserRemovedFromGroupTemplateEvent",
  EscolaLmsUserAddedToGroupTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsUserAddedToGroupTemplateEvent",
  ProjectSolutionCreatedEvent = "EscolaLms\\TopicTypeProject\\Events\\ProjectSolutionCreatedEvent",
  QuizAttemptFinishedEvent = "EscolaLms\\TopicTypeGift\\Events\\QuizAttemptFinishedEvent",
  EscolaLmsTopicTypeChangedTemplateEvent = "EscolaLms\\TopicTypes\\Events\\EscolaLmsTopicTypeChangedTemplateEvent",
  EscolaLmsCourseUnassignedTemplateEvent = "EscolaLms\\Courses\\Events\\EscolaLmsCourseUnassignedTemplateEvent",
  EscolaLmsAccountDeletedTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsAccountDeletedTemplateEvent",
  TaskOverdueEvent = "EscolaLms\\Tasks\\Events\\TaskOverdueEvent",
  TaskNoteCreatedEvent = "EscolaLms\\Tasks\\Events\\TaskNoteCreatedEvent",
  TaskAssignedEvent = "EscolaLms\\Tasks\\Events\\TaskAssignedEvent",
  EscolaLmsCoursedPublishedTemplateEvent = "EscolaLms\\Courses\\Events\\EscolaLmsCoursedPublishedTemplateEvent",
  EscolaLmsResetPasswordTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsResetPasswordTemplateEvent",
  EscolaLmsForgotPasswordTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsForgotPasswordTemplateEvent",
  EscolaLmsCourseAssignedTemplateEvent = "EscolaLms\\Courses\\Events\\EscolaLmsCourseAssignedTemplateEvent",
  EscolaLmsPaymentRegisteredTemplateEvent = "EscolaLms\\Payments\\Events\\EscolaLmsPaymentRegisteredTemplateEvent",
  EscolaLmsPermissionRoleChangedTemplateEvent = "EscolaLms\\Permissions\\Events\\EscolaLmsPermissionRoleChangedTemplateEvent",
  EscolaLmsPermissionRoleRemovedTemplateEvent = "EscolaLms\\Permissions\\Events\\EscolaLmsPermissionRoleRemovedTemplateEvent",
  EscolaLmsAccountConfirmedTemplateEvent = "EscolaLms\\Auth\\Events\\EscolaLmsAccountConfirmedTemplateEvent",
  EscolaLmsCartOrderPaidTemplateEvent = "EscolaLms\\Cart\\Events\\EscolaLmsCartOrderPaidTemplateEvent",
  PdfCreated = "EscolaLms\\TemplatesPdf\\Events\\PdfCreated",
  LessonFinished = "EscolaLms\\Courses\\Events\\LessonFinished",
  CourseAccessEnquiryStudentCreatedEvent = "EscolaLms\\CourseAccess\\Events\\CourseAccessEnquiryStudentCreatedEvent",
}

export enum AttendanceStatus {
  PRESENT = "present",
  PRESENT_NOT_EXERCISING = "present_not_exercising",
  ABSENT = "absent",
  EXCUSED_ABSENCE = "excused_absence",
}

export enum CompetencyChallengeType {
  Simple = "simple",
  Complex = "complex",
}

export enum CourseProgressItemElementStatus {
  INCOMPLETE = 0,
  COMPLETE = 1,
  IN_PROGRESS = 2,
}

export enum CertificateAssignableTypes {
  Course = "EscolaLms\\Courses\\Models\\Course",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  MULTIPLE_CHOICE_WITH_MULTIPLE_RIGHT_ANSWERS = "multiple_choice_with_multiple_right_answers",
  TRUE_FALSE = "true_false",
  SHORT_ANSWERS = "short_answers",
  MATCHING = "matching",
  NUMERICAL_QUESTION = "numerical_question",
  ESSAY = "essay",
  DESCRIPTION = "description",
}
