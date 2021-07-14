import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoreNewsComponent } from './edit-store-news.component';

describe('EditStoreNewsComponent', () => {
  let component: EditStoreNewsComponent;
  let fixture: ComponentFixture<EditStoreNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStoreNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoreNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
