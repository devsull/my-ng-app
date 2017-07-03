import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from "app/models/todo";

describe('models.todo', () => {
  let todo: Todo;

  const expectedTodoName = "Durp so durp.";
  const expectedTodoComplete = true;

  beforeEach(async(() => {
  }));

  beforeEach(() => {
    todo = new Todo(expectedTodoName, expectedTodoComplete);
  });

  it('should be created', () => {
    expect(todo).toBeTruthy();
  });

  it('should be created with the correct name', () => {
    expect(todo.name).toEqual(expectedTodoName);
  });

  it('should be created with the correct complete value', () => {
    expect(todo.complete).toEqual(expectedTodoComplete);
  });

  it('should be created with an id', () => {
    expect(todo.id).toBeTruthy();
  });

  it('should be created with a valid id', () => {
    expect(todo.id).toBeGreaterThanOrEqual(0);
    console.log("WUAT", todo);
  });
});
