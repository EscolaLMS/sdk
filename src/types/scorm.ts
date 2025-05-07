export type SCORM = {
  id: number;
  resource_type: null;
  resource_id: number;
  version: "scorm_12" | "scorm_2004";
  hash_name: string;
  origin_file: string;
  origin_file_mime: string;
  ratio: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  scos: SCORM_SCO[];
};

export type SCORM_SCO = {
  id: number;
  scorm_id: number;
  uuid: string;
  sco_parent_id: number;
  entry_url: string;
  identifier: string;
  title: string;
  visible?: 1 | 0;
  sco_parameters: any;
  launch_data?: any;
  max_time_allowed?: number;
  time_limit_action?: number;
  block?: number;
  score_int?: number;
  score_decimal?: number;
  completion_threshold?: number;
  prerequisites?: any;
  created_at?: string;
  updated_at?: string;
};
