import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCreatorComponent } from './password-creator.component';

describe('PasswordCreatorComponent', () => {
  let component: PasswordCreatorComponent;
  let fixture: ComponentFixture<PasswordCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
