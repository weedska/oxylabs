import { TestBed } from '@angular/core/testing';

import { CommentLikesService } from './comment-likes.service';

describe('CommentLikesService', () => {
  let service: CommentLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
