import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinProjectComponent } from './within-project.component';

describe('WithinProjectComponent', () => {
  let component: WithinProjectComponent;
  let fixture: ComponentFixture<WithinProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
