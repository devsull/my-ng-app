import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let page: Page;

  class Page {
    addTodoSpy:      jasmine.Spy;
    addBtn:      DebugElement;
    form:    HTMLFormElement;
    newTodoInput:    HTMLInputElement;

    constructor(component) {
      this.addTodoSpy = spyOn(component, 'addTodo').and.callThrough();
    }

    // /** Add page elements after <TODO>? arrives */
    addPageElements(fixture: ComponentFixture<TodoListComponent>) {      
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        this.addBtn = buttons[0];
        this.form = fixture.debugElement.query(By.css('form')).nativeElement;        
        this.newTodoInput = fixture.debugElement.query(By.css('input')).nativeElement;
    }

    inputTestTodo = () => {
      const expectedTodo = "TEST TODO";
      page.newTodoInput.value = expectedTodo;
      
      page.newTodoInput.dispatchEvent(new Event("input"));
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
        , ReactiveFormsModule
      ],
      declarations: [ TodoListComponent, TodoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    page = new Page(component);
    fixture.detectChanges();
    fixture.whenStable().then(() => { page.addPageElements(fixture) });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have an addTodo function', () => {
    expect(component.addTodo).toBeTruthy();
  });

  it('should add todo to todos when addTodo called', () => {
    const expected = component.todos.length + 1;
    page.inputTestTodo();
    component.addTodo();
    expect(component.todos.length).toBe(expected);
  });

  it('should have called resetAddTodo when addTodo is invoked', () => {
    spyOn(component, "resetAddTodo");
    page.inputTestTodo();
    component.addTodo();
    expect(component.resetAddTodo).toHaveBeenCalledTimes(1);
  });

  it('should have resetAddTodo function', () => {
    expect(component.resetAddTodo).toBeTruthy();
  });

  it('should add to todo list when user inputs a value', () => {
    const expected = component.todos.length + 1;

    page.inputTestTodo();

    page.addTodoSpy();

    expect(component.todos.length).toBe(expected);
  });

  it('should fail gracefully when remove index is out of bounds', () => {
    expect(component.remove(100));
  });

  it('should remove a todo', () => {
    const expected = component.todos.length;

    page.inputTestTodo();
    page.addTodoSpy();
    const todoToRemove = component.todos[0];
    const idShouldNotExist = todoToRemove.id;

    component.remove(idShouldNotExist);

    expect(component.todos.length).toBe(expected);
    expect(component.todos.filter(t => t.id === idShouldNotExist).length).toBe(0);
  });
});
