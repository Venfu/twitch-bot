import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BackendService } from './backend.service';
import { FollowerInfo } from '@venfu-bot/shared';

describe('BackendService', () => {
  let service: BackendService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService]
    });
    service = TestBed.inject(BackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the last follower', () => {
    const mockFollowerInfo: FollowerInfo = { user_login: 'John Doe', user_name: 'John Doe', user_id: '123', followed_at: '2021-01-01'};

    service.getLastFollower().subscribe((followerInfo: FollowerInfo) => {
      expect(followerInfo).toEqual(mockFollowerInfo);
    });

    const req = httpMock.expectOne(service.URL_LAST_FOLLOWER);
    expect(req.request.method).toBe('GET');
    req.flush(mockFollowerInfo);
  });
});