import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplatoonDefaultComponent } from './splatoon-default.component';

describe('SplatoonDefaultComponent', () => {
  let component: SplatoonDefaultComponent;
  let fixture: ComponentFixture<SplatoonDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplatoonDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplatoonDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
