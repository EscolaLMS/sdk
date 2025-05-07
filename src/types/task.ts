import { DefaultMetaResponse, PageParams, PaginationParams } from "./core";
import { TaskRelatedType } from "./enums";

export type TaskNote = EscolaLms.Tasks.Models.TaskNote & {
  note: string;
};

type AbstractTask = EscolaLms.Tasks.Models.Task & {
  title: string;
  due_date?: string;
  notes?: TaskNote[];
};

export type Task =
  | AbstractTask
  | (AbstractTask & {
      related_type: TaskRelatedType;
      related_id: number;
    });

export type TaskParams = PageParams &
  PaginationParams & {
    title?: string;
    type?: string;
    user_id?: number;
    created_by_id?: number;
    related_type?: TaskRelatedType;
    related_id?: number;
    due_date_from?: Date | string;
    due_date_to?: Date | string;
  };
export type TasksList = DefaultMetaResponse<Task>;
