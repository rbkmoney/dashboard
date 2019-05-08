type AppConfig = typeof import('../../assets/appConfig.json');

// Interface is needed so that you can implement in the class
// tslint:disable-next-line:no-empty-interface
export interface Config extends AppConfig {}
