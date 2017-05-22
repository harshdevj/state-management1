import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule } from "@angular/router";

import { SubjectComponent } from "./example1/subject.component";
import { NgrxComponent } from "./example2/ngrx.component";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {DataTableModule, SharedModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent, SubjectComponent, NgrxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    SharedModule,
    DataTableModule,
    RouterModule.forRoot([{
      path: 'example1',
      component: SubjectComponent
    }, {
      path: 'example2',
      component: NgrxComponent
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'example1'
    }], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
