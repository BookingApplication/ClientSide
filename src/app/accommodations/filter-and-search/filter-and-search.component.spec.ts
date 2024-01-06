import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSearchComponent } from './filter-and-search.component';

describe('FilterAndSearchComponent', () => {
  let component: FilterAndSearchComponent;
  let fixture: ComponentFixture<FilterAndSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAndSearchComponent]
    });
    fixture = TestBed.createComponent(FilterAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
