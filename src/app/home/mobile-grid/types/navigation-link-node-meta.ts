import { IconName } from '@dsh/components/indicators/colored-icon/icon-name';

import { NavigationLink } from '../../navigation';

// export interface NavigationLinkNodeMeta extends Pick<NavigationLink, 'path' | 'navPlace'> {
export interface NavigationLinkNodeMeta extends Pick<NavigationLink, 'path'> {
    icon?: IconName;
}
