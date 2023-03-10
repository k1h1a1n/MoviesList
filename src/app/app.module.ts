import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from './shared/shared.module';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor : '#fff',
  bgsSize : 50,
  bgsType : 'ball-spin-clockwise',
  bgsOpacity : 1,
  bgsPosition : 'center-center',
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
