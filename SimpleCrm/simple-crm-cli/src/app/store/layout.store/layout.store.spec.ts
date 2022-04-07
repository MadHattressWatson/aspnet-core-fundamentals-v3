import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout.StoreComponent } from './layout.store';

describe('Layout.StoreComponent', () => {
  let component: Layout.StoreComponent;
  let fixture: ComponentFixture<Layout.StoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layout.StoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout.StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
