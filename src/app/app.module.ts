import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth.guard';
import { AuthStateGuard } from './auth-state.guard';
import { TokenInterceptorService } from './token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthGuard,AuthStateGuard, 
  {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
