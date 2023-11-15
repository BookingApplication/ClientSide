import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccomodationDetailsComponent } from './show-accomodation-details.component';

describe('ShowAccomodationDetailsComponent', () => {
  let component: ShowAccomodationDetailsComponent;
  let fixture: ComponentFixture<ShowAccomodationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAccomodationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAccomodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
