import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentsComponent } from './fragments.component';

describe('FragmentsComponent', () => {
  let component: FragmentsComponent;
  let fixture: ComponentFixture<FragmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
