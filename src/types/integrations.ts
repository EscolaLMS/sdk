import { DefaultResponse, DefaultResponseSuccess } from "./core";

export type TeamsChatResponse = DefaultResponse<{
  web_url: string;
}>;

export type MattermostData = {
  server: string;
  teams: MattermostChannels[];
};

export type MattermostChannels = {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  display_name: string;
  name: string;
  description: string;
  email: string;
  type: string;
  company_name: string;
  allowed_domains: string;
  invite_id: string;
  allow_open_invite: boolean;
  scheme_id: string | null;
  group_constrained: boolean | null;
  policy_id: string | null;
  channels: Channel[];
};

export type Channel = {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  team_id: string;
  type: string;
  display_name: string;
  name: string;
  header: string;
  purpose: string;
  last_post_at: number;
  total_msg_count: number;
  extra_update_at: number;
  creator_id: string;
  scheme_id: string | null;
  props: string | null;
  group_constrained: boolean | null;
  shared: string | null;
  total_msg_count_root: number;
  policy_id: string | null;
  last_root_post_at: number;
  url: string;
};

export type MattermostChannelList = DefaultResponseSuccess<MattermostData>;
