import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccomodationComponent } from './create-accomodation.component';

describe('CreateAccomodationComponent', () => {
  let component: CreateAccomodationComponent;
  let fixture: ComponentFixture<CreateAccomodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccomodationComponent]
    });
    fixture = TestBed.createComponent(CreateAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
