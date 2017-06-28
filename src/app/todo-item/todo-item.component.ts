import { Component, OnInit, Input } from '@angular/core';
import { Todo } from "app/models/todo";

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {
  @Input() item: Todo;

  constructor() { }

  ngOnInit() {
  }
}
