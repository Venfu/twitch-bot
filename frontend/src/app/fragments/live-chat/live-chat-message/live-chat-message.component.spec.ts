import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatMessageComponent } from './live-chat-message.component';

describe('LiveChatMessageComponent', () => {
  let component: LiveChatMessageComponent;
  let fixture: ComponentFixture<LiveChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveChatMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
