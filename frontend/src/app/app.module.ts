import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { LastFollowerComponent } from './fragments/last-follower/last-follower.component';
import { ColorizeDirective } from './directives/colorize.directive';

// Verify that backend is authenticated before running app
function initilizeApp(http: HttpClient): () => Promise<any> {
  const URL_IS_AUTHENTICATED = environment.URL_BACKEND + '/connected';
  return () =>
    new Promise((res, rej) => {
      const verifyAppIsAuthenticated = () => {
        http
          .get<{ connected: boolean }>(URL_IS_AUTHENTICATED)
          .subscribe((isAuth: { connected: boolean }) => {
            if (isAuth.connected) res(true);
            else setTimeout(verifyAppIsAuthenticated, 500);
          });
      };
      verifyAppIsAuthenticated();
    });
}

@NgModule({
  declarations: [AppComponent, LastFollowerComponent, ColorizeDirective],
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
