import { TopicType } from "./enums";
import { H5PContent } from "./h5p-types";

export type TopicBase = {
  id: number;
  lesson_id: number;
  duration?: string;
  title: string;
  topicable_id: number;
  created_at: string;
  updated_at?: string;
  order: number;
  value?: any;
  isNew?: boolean;
  preview?: boolean;
  introduction?: string;
  description?: string;
  summary?: string;
  resources?: TopicResource[];
  can_skip?: boolean;
  json?: Record<string, unknown>;
  /*
        topicable_type?:
          | TopicType.RichText
          | TopicType.OEmbed
          | TopicType.Audio
          | TopicType.H5P
          | TopicType.Unselected
          | TopicType.Video;
          */
};

export type TopicableBase = {
  created_at?: string;
  updated_at?: string;
  id: number;
  value: string;
};

export type TopicResource = {
  id: number;
  name: string;
  path: string;
  topic_id: number;
  url: string;
};

export type TopicRichText = TopicBase & {
  topicable_type: TopicType.RichText;
  topicable: TopicableBase;
};

export type TopicOEmbed = TopicBase & {
  topicable_type: TopicType.OEmbed;
  topicable: TopicableBase;
};

export type TopicAudio = TopicBase & {
  topicable_type: TopicType.Audio;
  topicable: TopicableBase & {
    length: number;
    url: string;
  };
};

export type TopicVideo = TopicBase & {
  topicable_type: TopicType.Video;
  topicable: TopicableBase & {
    height: number;
    poster: string;
    poster_url: string;
    url: string;
    width: number;
  };
};

export type TopicImage = TopicBase & {
  topicable_type: TopicType.Image;
  topicable: TopicableBase & {
    height: number;
    url: string;
    width: number;
  };
};

export type TopicH5P = TopicBase & {
  topicable_type: TopicType.H5P;
  topicable: TopicableBase & {
    content: H5PContent;
  };
};

export type TopicPdf = TopicBase & {
  topicable_type: TopicType.Pdf;
  topicable: TopicableBase & {
    url: string;
  };
};

export type TopicScorm = TopicBase & {
  topicable_type: TopicType.Scorm;
  topicable: TopicableBase & {
    uuid: string;
  };
};

export type TopicProject = TopicBase & {
  topicable_type: TopicType.Project;
  topicable: TopicableBase;
};

export type TopicQuiz = TopicBase & {
  topicable_type: TopicType.GiftQuiz;
  topicable: TopicableBase & {
    max_attempts?: number | null;
    max_execution_time?: number | null;
  };
};

export type TopicUnselected = TopicBase & {
  topicable_type?: TopicType.Unselected;
  topicable?: never;
};

export type Topic =
  | TopicUnselected
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf
  | TopicScorm
  | TopicProject
  | TopicQuiz;

export type TopicNotEmpty =
  | TopicRichText
  | TopicOEmbed
  | TopicAudio
  | TopicVideo
  | TopicH5P
  | TopicImage
  | TopicPdf
  | TopicScorm
  | TopicProject
  | TopicQuiz;
