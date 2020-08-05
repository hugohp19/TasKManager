import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IndTaskInterface } from '../taskbyid/IndTask';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-select-task',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.css'],
})
export class SelectTaskComponent implements OnInit {
  taskInfo: IndTaskInterface;
  taskInfoObj: IndTaskInterface;
  taskId = 'noId';
  test = '';
  inputError = '';
  buttonClicked = false;

  constructor(private route: ActivatedRoute, private task: TasksService) { }

  getTaskById(): void{
    this.task.getTaskByIdServ(this.test).subscribe(
      response => {
        if (this.test === ''){
          this.inputError = 'Please enter a number for the Task Id';
        }
        else {
          //console.log(response);
          this.taskInfo = response;
          //console.log(this.taskInfo);
          this.buttonClicked = true;
        }
      },
      error => {
        //console.log(error);
        if (error.status === 400) {
          this.inputError = 'You must enter a number for the Task Id';
        }
        else {
          this.inputError = error.error.error;
        }
        this.buttonClicked = false;
      }
    );
  }

  updateTask(todoSub: FormGroup){
    const form = JSON.stringify(todoSub.value);
    this.task.postTask(form).subscribe(
      response => {
        //console.log('success');
        //this.successtext = true;
      }
    );
  }

  ngOnInit(): void {

  }

}
