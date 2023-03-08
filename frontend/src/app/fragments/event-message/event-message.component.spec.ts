import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMessageComponent } from './event-message.component';

describe('EventMessageComponent', () => {
  let component: EventMessageComponent;
  let fixture: ComponentFixture<EventMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
