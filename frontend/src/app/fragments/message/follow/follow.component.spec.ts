import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowComponent } from './follow.component';

describe('FollowComponent', () => {
  let component: FollowComponent;
  let fixture: ComponentFixture<FollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
