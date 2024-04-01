import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatComponent } from './live-chat.component';

describe('LiveChatComponent', () => {
  let component: LiveChatComponent;
  let fixture: ComponentFixture<LiveChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
