import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakService } from './auth/keycloak-stub';

import { AppComponent } from './app.component';
import { IconRegistryService } from './icon-registry.service';
import { AuthModule } from './auth';
import { initializer } from './initializer';
import { APIModule } from './api/api.module';
import { ConfigService } from './config/config.service';
import { SectionsModule } from './sections/sections.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, RouterModule, SectionsModule, APIModule, AuthModule],
    providers: [
        IconRegistryService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
