'use strict';

var LoadingScreen = require('../loading-screen');

describe('LoadingScreen View', function() {

  beforeEach(function() {
    this.loadingScreen = new LoadingScreen();
  });

  it('Should run a few assertions', function() {
    expect(this.loadingScreen);
  });

});
