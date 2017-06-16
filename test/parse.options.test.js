var mongoose = require('../');
var assert = require('power-assert');
var sinon = require('sinon');
var util = require('../lib/utils');

describe('parseOptions', function() {
  it('should not mutate user passed options map', function() {
    var db = new mongoose.Connection();
    var now = Date.now();

    var userPassedOptionsMap = Object.create(null, {
      auth: {
        value: {},
        enumerable: true
      },
      prop_num: {
        value: now,
        enumerable: true
      },
      prop_obj: {
        value: {},
        enumerable: true
      }
    });
    var ultimateOptionsMap;

    sinon.spy(util, 'clone');

    ultimateOptionsMap = db.parseOptions(userPassedOptionsMap);

    assert.ok(util.clone.calledWith(userPassedOptionsMap));
    assert.notEqual(ultimateOptionsMap, userPassedOptionsMap);
    assert.deepStrictEqual(userPassedOptionsMap, Object.create(null, {
      auth: {
        value: {},
        enumerable: true
      },
      prop_num: {
        value: now,
        enumerable: true
      },
      prop_obj: {
        value: {},
        enumerable: true
      }
    }));
    assert.notDeepStrictEqual(ultimateOptionsMap, Object.create(null, {
      auth: {
        value: {},
        enumerable: true
      },
      prop_num: {
        value: now,
        enumerable: true
      },
      prop_obj: {
        value: {},
        enumerable: true
      }
    }));

    util.clone.restore();
  });
});