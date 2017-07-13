import { TestBed, async, ComponentFixture } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { DebugElement } from "@angular/core/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("AppComponent", () => {
  const expectedTitle = "the basic angular project";

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,  // <-- import the FormsModule before binding with [(ngModel)]
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the app", async(() => fixture.whenStable().then(() =>
    expect(component).toBeTruthy()
  )));

  it(`should have as expected title`, async(() => {
    expect(component.title).toEqual(expectedTitle);
  }));

  it("should render todo list", async(() => {
    expect(element.querySelector("todo-list")).toBeTruthy();
  }));
});
