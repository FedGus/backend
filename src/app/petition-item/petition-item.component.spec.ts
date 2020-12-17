import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionItemComponent } from './petition-item.component';

describe('PetitionItemComponent', () => {
  let component: PetitionItemComponent;
  let fixture: ComponentFixture<PetitionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
