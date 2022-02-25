import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreDatabaseComponent } from './firestore-database.component';

describe('FirestoreDatabaseComponent', () => {
  let component: FirestoreDatabaseComponent;
  let fixture: ComponentFixture<FirestoreDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirestoreDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestoreDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
