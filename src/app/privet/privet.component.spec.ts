import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivetComponent } from './privet.component';

describe('PrivetComponent', () => {
  let component: PrivetComponent;
  let fixture: ComponentFixture<PrivetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivetComponent]
    });
    fixture = TestBed.createComponent(PrivetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
