import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { LastFollowerComponent } from './fragments/last-follower/last-follower.component';
import { ColorizeDirective } from './directives/colorize.directive';
import { AnimationsComponent } from './animations/animations.component';
import { SplatoonDefaultComponent } from './animations/splatoon-default/splatoon-default.component';
import { EventMessageComponent } from './fragments/event-message/event-message.component';
import { LastAnnounceComponent } from './fragments/last-announce/last-announce.component';
import { DefaultComponent } from './animations/default/default.component';
import { LiveChatComponent } from './fragments/live-chat/live-chat.component';
import { LiveChatMessageComponent } from './fragments/live-chat/live-chat-message/live-chat-message.component';

// Verify that backend is authenticated before running app
function initilizeApp(http: HttpClient): () => Promise<any> {
  const URL_IS_AUTHENTICATED = environment.URL_BACKEND + '/connected';
  return () =>
    new Promise((res, rej) => {
      const verifyAppIsAuthenticated = () => {
        http.get<{ connected: boolean }>(URL_IS_AUTHENTICATED).subscribe({
          next: (isAuth: { connected: boolean }) => {
            if (isAuth.connected) res(true);
            else setTimeout(verifyAppIsAuthenticated, 500);
          },
          error: (err) => {
            setTimeout(verifyAppIsAuthenticated, 500);
          },
        });
      };
      verifyAppIsAuthenticated();
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LastFollowerComponent,
    ColorizeDirective,
    AnimationsComponent,
    SplatoonDefaultComponent,
    EventMessageComponent,
    LastAnnounceComponent,
    DefaultComponent,
    LiveChatComponent,
    LiveChatMessageComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initilizeApp,
      deps: [HttpClient],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
