import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let page: Page;

  class Page {
    addTodoSpy:      jasmine.Spy;
    addBtn:      DebugElement;
    newTodoInput:    HTMLInputElement;

    constructor(component) {
      this.addTodoSpy = spyOn(component, 'addTodo').and.callThrough();
    }

    // /** Add page elements after <TODO>? arrives */
    addPageElements(fixture: ComponentFixture<TodoListComponent>) {
    //   //console.log("WUT WUT WUT", this);
    //     // have a <TODO>? so these elements are now in the DOM
        const buttons    = fixture.debugElement.queryAll(By.css('button'));
        this.addBtn     = buttons[0];
        this.newTodoInput   = fixture.debugElement.query(By.css('input')).nativeElement;

      //console.log("DONE", this);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule  // <-- import the FormsModule before binding with [(ngModel)]
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
    component.addTodo();
    expect(component.todos.length).toBe(expected);
  });

  it('should have called resetAddTodo when addTodo is invoked', () => {
    spyOn(component, "resetAddTodo");
    component.addTodo();
    expect(component.resetAddTodo).toHaveBeenCalledTimes(1);
  });

  it('should have resetAddTodo function', () => {
    expect(component.resetAddTodo).toBeTruthy();
  });

  it('should add to todo list when user inputs a value', () => {
    const expectedTodo = "TEST TODO";
    const expected = component.todos.length + 1;
    console.info("page", page, page.newTodoInput);
    
    // simulate user entering new todo into the input box
    page.newTodoInput.value = expectedTodo;
    console.log("page after assignment", page.newTodoInput);

    // dispatch a DOM event so that Angular learns of input value change.
    page.newTodoInput.dispatchEvent(new Event("input"));
    console.log("page after input", page.newTodoInput.value);

    // 
    // Tell Angular to update the output span through the pipe
    // fixture.detectChanges();
    page.addTodoSpy();

    expect(component.todos.length).toBe(expected);
  });

  it('should fail gracefully when remove index is out of bounds', () => {
    expect(component.remove(100));
  });
});
