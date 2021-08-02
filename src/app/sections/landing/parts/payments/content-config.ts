export interface ActionBtnContent {
    actionLabel: string;
    routerLink: string;
    disabled: boolean;
}

export interface TestEnvBtnContent {
    routerLink: string;
    disabled: boolean;
}

export interface ContentConfig {
    subheading: string;
    actionBtnContent: ActionBtnContent;
    testEnvBtnContent: TestEnvBtnContent;
}
