import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetitionComponent } from './add-petition.component';

describe('AddPetitionComponent', () => {
  let component: AddPetitionComponent;
  let fixture: ComponentFixture<AddPetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
