'use strict';

var Pagination = require('../pagination');

describe('Pagination View', function() {

  beforeEach(function() {
    this.pagination = new Pagination();
  });

  it('Should run a few assertions', function() {
    expect(this.pagination);
  });

});
