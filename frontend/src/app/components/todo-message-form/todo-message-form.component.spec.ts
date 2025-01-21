import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMessageFormComponent } from './todo-message-form.component';

describe('TodoMessageFormComponent', () => {
  let component: TodoMessageFormComponent;
  let fixture: ComponentFixture<TodoMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoMessageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
