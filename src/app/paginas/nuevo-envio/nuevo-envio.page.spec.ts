import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoEnvioPage } from './nuevo-envio.page';

describe('NuevoEnvioPage', () => {
  let component: NuevoEnvioPage;
  let fixture: ComponentFixture<NuevoEnvioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEnvioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
