import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendHome } from './friend-home';

describe('FriendHome', () => {
  let component: FriendHome;
  let fixture: ComponentFixture<FriendHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
