import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MaterializeModule } from "angular2-materialize";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";

import "hammerjs";

import { MdDataTableModule } from "ng2-md-datatable";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from "./app.component";
import { AppService } from "./app.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NgxDatatableModule,
    MdDataTableModule,
  ],
  providers: [
    { provide: AppService, useClass: AppService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
