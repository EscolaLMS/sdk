import * as API from "../types/api";
export declare function registerableGroups(options?: {
    [key: string]: any;
}): Promise<API.UserGroupList>;
export declare function userGroups(params: {
    current?: number;
    pageSize?: number;
    search?: string;
}, options?: {
    [key: string]: any;
}): Promise<API.UserGroupList>;
export declare function userGroup(id: number, options?: {
    [key: string]: any;
}): Promise<API.UserGroupRow>;
export declare function updateUserGroup(id: number, data: Partial<API.UserGroup>, options?: {
    [key: string]: any;
}): Promise<API.UserGroupRow>;
export declare function createUserGroup(data: Partial<API.UserGroup>, options?: {
    [key: string]: any;
}): Promise<API.UserGroupRow>;
export declare function deleteUserGroup(id: number, options?: {
    [key: string]: any;
}): Promise<API.UserGroupRow>;
export declare function addUserToGroup(group_id: number, user_id: number, options?: {
    [key: string]: any;
}): Promise<API.UserGroupAddRow>;
export declare function removeUserFromGroup(group_id: number, user_id: number, options?: {
    [key: string]: any;
}): Promise<API.UserGroupAddRow>;
