import { Component, OnInit } from '@angular/core';
import { Todo } from "app/models/todo";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  newTodoForm: FormGroup;

  formErrors = {
    'name': ""
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    }
  };

  newTodo = new Todo();

  todos = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() { 
    this.buildTodoForm();
  }

  buildTodoForm = () => {
    this.newTodoForm = this.fb.group({
      "name": [this.newTodo.name, [Validators.required]]
    });

    this.newTodoForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.newTodoForm) { return; }
    const form = this.newTodoForm;
 
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = "";
      const control = form.get(field);
 
      // data === true is to check if someone hits enter for no good reason!
      if (control && (control.dirty || data === true) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formIsValid = (): boolean => {
    this.onValueChanged(true);
    return this.newTodoForm.valid;
  }

  addTodo = () => {
    if(this.formIsValid()) {
      this.newTodo = this.newTodoForm.value
      this.todos.push(this.newTodo);
      this.resetAddTodo();
    }
  }

  resetAddTodo = () => {
    this.newTodo = new Todo();
    this.newTodoForm.reset()
  }

  remove = (index) => {
    this.todos.splice(index, 1);
  }
}
