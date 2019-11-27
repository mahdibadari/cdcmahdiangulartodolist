import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumenthostComponent } from './documenthost.component';

describe('DocumenthostComponent', () => {
  let component: DocumenthostComponent;
  let fixture: ComponentFixture<DocumenthostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumenthostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumenthostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
