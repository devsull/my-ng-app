import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { FormsModule } from "@angular/forms";
import { Todo } from "app/models/todo";

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoInput: Todo;

  const expectedTodoName = "Durp so durp.";
  const expectedTodoComplete = true;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
      ],
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    todoInput = new Todo(expectedTodoName, expectedTodoComplete);
    
    component.item = todoInput;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
