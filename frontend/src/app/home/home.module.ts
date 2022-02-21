import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Routes, RouterModule } from '@angular/router';
import { BackendService } from 'src/services/backend.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  providers: [BackendService]
})
export class HomePageModule { }
