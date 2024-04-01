import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAnnounceComponent } from './last-announce.component';

describe('LastAnnounceComponent', () => {
  let component: LastAnnounceComponent;
  let fixture: ComponentFixture<LastAnnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastAnnounceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
