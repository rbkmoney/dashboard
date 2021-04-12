import { ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';

export type ResourceId = string;

export interface RoleGroupScope {
    id: ResourceScopeId;
    resourcesIds: ResourceId[];
}

export interface RoleGroup {
    id: RoleId;
    scopes: RoleGroupScope[];
}
