import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverwatchDefaultComponent } from './overwatch-default.component';

describe('OverwatchDefaultComponent', () => {
  let component: OverwatchDefaultComponent;
  let fixture: ComponentFixture<OverwatchDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverwatchDefaultComponent]
    });
    fixture = TestBed.createComponent(OverwatchDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
