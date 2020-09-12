import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTarjetasComponent } from './list-tarjetas.component';

describe('ListTarjetasComponent', () => {
  let component: ListTarjetasComponent;
  let fixture: ComponentFixture<ListTarjetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTarjetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
