import { LinkId } from './link-id';

export interface ToolbarLink {
    id: LinkId;
    path: string;
    exact?: boolean;
}
