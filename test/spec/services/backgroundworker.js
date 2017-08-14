'use strict';

describe('Service: backgroundworker', function () {

  // load the service's module
  beforeEach(module('angularMultipartSmallerChunksApp'));

  // instantiate service
  var backgroundworker;
  beforeEach(inject(function (_backgroundworker_) {
    backgroundworker = _backgroundworker_;
  }));

  it('should do something', function () {
    expect(!!backgroundworker).toBe(true);
  });

});
