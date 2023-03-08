import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFollowerComponent } from './last-follower.component';

describe('LastFollowerComponent', () => {
  let component: LastFollowerComponent;
  let fixture: ComponentFixture<LastFollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastFollowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
