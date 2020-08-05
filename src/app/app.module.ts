import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SelectTaskComponent } from './select-task/select-task.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskbyidComponent } from './taskbyid/taskbyid.component';
import { TasksService } from './services/tasks.service';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './home/shared/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ViewTasksComponent,
    CreateTaskComponent,
    SelectTaskComponent,
    TaskbyidComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'view', component: ViewTasksComponent},
      {path: 'create', component: CreateTaskComponent},
      {path: 'select', component: SelectTaskComponent},
      {path: 'select/:id', component: TaskbyidComponent},
      {path: '**', component: HomeComponent}
       ]),
     ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
