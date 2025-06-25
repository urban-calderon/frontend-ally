import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPageComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
