import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  todos = new FormGroup({
    title: new FormControl
  });

  constructor(private route: ActivatedRoute, private update: TasksService, private _router: Router) { }

  createTask(todoSub: FormGroup){
    const form = JSON.stringify(todoSub.value);
    this.update.postTask(form).subscribe(
      response => {
        //console.log('success');
        this._router.navigate(['/view']);
      }
    );
  }

  ngOnInit(): void {
  }

}
