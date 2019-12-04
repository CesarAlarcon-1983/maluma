'use strict';

var Propiedad = require('../propiedad');

describe('Propiedad View', function() {

  beforeEach(function() {
    this.propiedad = new Propiedad();
  });

  it('Should run a few assertions', function() {
    expect(this.propiedad);
  });

});
