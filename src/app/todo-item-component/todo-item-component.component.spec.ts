import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponentComponent } from './todo-item-component.component';

describe('TodoItemComponentComponent', () => {
  let component: TodoItemComponentComponent;
  let fixture: ComponentFixture<TodoItemComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
