import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map.service';
import { MockDataService } from './services/mock-data.service';
import { MineDataService } from './services/mine-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MapComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [MapService, MockDataService, MineDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
