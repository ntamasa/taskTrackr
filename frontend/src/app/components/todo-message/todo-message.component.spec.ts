import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMessageComponent } from './todo-message.component';

describe('TodoMessageComponent', () => {
  let component: TodoMessageComponent;
  let fixture: ComponentFixture<TodoMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
