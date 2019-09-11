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
    isLoading: boolean;
    subheading: string;
    actionBtnContent: ActionBtnContent;
    testEnvBtnContent: TestEnvBtnContent;
}
