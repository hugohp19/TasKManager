import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IndTaskInterface } from './IndTask';


@Component({
  selector: 'app-taskbyid',
  templateUrl: './taskbyid.component.html',
  styleUrls: ['./taskbyid.component.css']
})
export class TaskbyidComponent implements OnInit {
  taskInfo: IndTaskInterface;
  taskId = 'noId';
  isDataAvailable = false;

  taskById = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    completed: new FormControl()
  });

  constructor(private route: ActivatedRoute, private task: TasksService, private _router: Router) { }

  getTaskById(): void{
    this.task.getTaskByIdServ(this.taskId).subscribe(
      response => {
        //console.log(response);
        this.taskInfo = response;
        //console.log(this.taskInfo);
        this.isDataAvailable = true; // this makes the html page load after we run and get the values
      }
    );
  }

  completeTask(taskById:FormGroup){
    const form = taskById.get('id').value;
    this.task.patchTask(form).subscribe(
      response => {
        //console.log('success');
        //console.log(form);
        // this._router.navigate(['/view']);
      }
    );
  }

  updateTask(taskById: FormGroup){
    const form = JSON.stringify(taskById.value);
    //console.log('this is what JSON' + form);
    const completed = taskById.get('completed').value;
    //console.log(completed);
    if (completed === true) {
      this.task.postTask(form).subscribe(
        response => {
          this.completeTask(taskById);
          //console.log('success');
          //console.log(this.taskById);
          setTimeout(() => { this._router.navigate(['/view']);}, 500);
          // this.successtext = true;
        }
      );
   } else {
    this.task.postTask(form).subscribe(
      response => {
        //console.log('success');
        //console.log(this.taskById);
        this._router.navigate(['/view']);
      }
    );
   }
  }

  deleteTaskById(taskById: FormGroup){
    const form = taskById.get('id').value;
    this.task.deleteTodos(form).subscribe(
        response => {
          //console.log('success');
          this._router.navigate(['/view']);
        }
      );
    }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.getTaskById();
  }

}
