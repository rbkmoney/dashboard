import { ResourceScopeId, RoleId } from '../../../../api-codegen/organizations';

export type ResourceId = string;

export interface RoleGroup {
    id: RoleId;
    scopes: { id: ResourceScopeId; resourcesIds: ResourceId[] }[];
}
