import { Link } from '@dsh/app/shared';
import { IconName } from '@dsh/components/indicators/colored-icon/icon-name';

export interface NavigationLinkNodeMeta extends Link {
    icon?: IconName;
}
