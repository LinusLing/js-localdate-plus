var LocalDate = require('../localdate.js');
var assert = require('assert');

describe('Valid', function () {

  it('new', function () {
    var l = new LocalDate(983, 12, 31);

    assert.equal(l.getYear(), 983);
    assert.equal(l.getMonth(), 12);
    assert.equal(l.getDay(), 31);

    assert.ok(l.isValid());
  });

  it('leap day', function () {
    var l = new LocalDate(2004, 2, 29);

    assert.equal(l.getYear(), 2004);
    assert.equal(l.getMonth(), 2);
    assert.equal(l.getDay(), 29);

    assert.ok(l.isValid());
  });

  it('centenary leap day', function () {
    var l = new LocalDate(2000, 2, 29);

    assert.equal(l.getYear(), 2000);
    assert.equal(l.getMonth(), 2);
    assert.equal(l.getDay(), 29);

    assert.ok(l.isValid());
  });

  it('today', function () {
    var l = new LocalDate();
    var d = new Date;

    assert.equal(l.getYear(), d.getFullYear());
    assert.equal(l.getMonth(), d.getMonth()+1);
    assert.equal(l.getDay(), d.getDate());

    assert.ok(l.isValid());
  });

});

describe('From other objects', function () {

  it('from string', function () {
    var l = new LocalDate('2014-01-11');

    assert.equal(l.getYear(), 2014);
    assert.equal(l.getMonth(), 1);
    assert.equal(l.getDay(), 11);

    assert.ok(l.isValid());
  });

  it('from date', function () {
    var l = new LocalDate(new Date(2014, 0, 11));

    assert.equal(l.getYear(), 2014);
    assert.equal(l.getMonth(), 1);
    assert.equal(l.getDay(), 11);

    assert.ok(l.isValid());
  });

  it('from julian day', function () {
    var l = new LocalDate(2451545);

    assert.equal(l.getYear(), 2000);
    assert.equal(l.getMonth(), 1);
    assert.equal(l.getDay(), 1);

    assert.ok(l.isValid());
  });

});

describe('Invalid', function () {

  it('invalid month', function () {
    assert.ok(!new LocalDate(2015, 13, 3).isValid());
  });

  it('invalid leap day', function () {
    assert.ok(!new LocalDate(2003, 2, 29).isValid());
  });

  it('invalid day', function () {
    assert.ok(!new LocalDate(1, 6, 31).isValid());
  });

  it('invalid year', function () {
    assert.ok(!new LocalDate(0, 6, 30).isValid());
  });

});

describe('Add', function () {

  it('add 7 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addMonths(7);

    assert.equal(c.getYear(), 2000);
    assert.equal(c.getMonth(), 9);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('add 40 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addMonths(40);

    assert.equal(c.getYear(), 2003);
    assert.equal(c.getMonth(), 6);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('add 1 month', function () {
    var l = new LocalDate(2015, 1, 31);
    var c = l.addMonths(1);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 28);

    assert.ok(c.isValid());
  });

  it('add 10 days', function () {
    var l = new LocalDate(2015, 1, 31);
    var c = l.addDays(10);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 10);

    assert.ok(c.isValid());
  });

  it('add 1500 days', function () {
    var l = new LocalDate(2000, 10, 5);
    var c = l.addDays(1500);

    assert.equal(c.getYear(), 2004);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 13);

    assert.ok(c.isValid());
  });

  it('add 5 years', function () {
    var l = new LocalDate(2000, 10, 5);
    var c = l.addYears(5);

    assert.equal(c.getYear(), 2005);
    assert.equal(c.getMonth(), 10);
    assert.equal(c.getDay(), 5);

    assert.ok(c.isValid());
  });

  it('add 1 year, leap year', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addYears(1);

    assert.equal(c.getYear(), 2001);
    assert.equal(c.getMonth(), 2);
    assert.equal(c.getDay(), 28);

    assert.ok(c.isValid());
  });

  it('add 1 year with gap day', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.addYearsWithGap(1);

    assert.equal(c.getYear(), 2001);
    assert.equal(c.getMonth(), 3);
    assert.equal(c.getDay(), 1);

    assert.ok(c.isValid());
  });

  it('add 1 month with gap day, leap year', function () {
    var l = new LocalDate(2000, 1, 31);
    var c = l.addMonthsWithGap(1);

    assert.equal(c.getYear(), 2001);
    assert.equal(c.getMonth(), 3);
    assert.equal(c.getDay(), 2);

    assert.ok(c.isValid());
  });

  it('add 1 month with gap day', function () {
    var l = new LocalDate(2001, 1, 31);
    var c = l.addMonthsWithGap(1);

    assert.equal(c.getYear(), 2001);
    assert.equal(c.getMonth(), 3);
    assert.equal(c.getDay(), 3);

    assert.ok(c.isValid());
  });
});

describe('Subtract', function () {

  it('subtract 1 month', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.subtractMonths(1);

    assert.equal(c.getYear(), 2000);
    assert.equal(c.getMonth(), 1);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('subtract 7 months', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = l.subtractMonths(7);

    assert.equal(c.getYear(), 1999);
    assert.equal(c.getMonth(), 7);
    assert.equal(c.getDay(), 29);

    assert.ok(c.isValid());
  });

  it('subtract 18 months', function () {
    var l = new LocalDate(2015, 5, 31);
    var c = l.subtractMonths(18);

    assert.equal(c.getYear(), 2013);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 30);

    assert.ok(c.isValid());
  });

  it('subtract 8 days', function () {
    var l = new LocalDate(2015, 5, 31);
    var c = l.subtractDays(8);

    assert.equal(c.getYear(), 2015);
    assert.equal(c.getMonth(), 5);
    assert.equal(c.getDay(), 23);

    assert.ok(c.isValid());
  });

  it('subtract 120 days', function () {
    var l = new LocalDate(2000, 3, 20);
    var c = l.subtractDays(120);

    assert.equal(c.getYear(), 1999);
    assert.equal(c.getMonth(), 11);
    assert.equal(c.getDay(), 21);

    assert.ok(c.isValid());
  });

  it('subtract 5 years', function () {
    var l = new LocalDate(2000, 10, 5);
    var c = l.subtractYears(5);

    assert.equal(c.getYear(), 1995);
    assert.equal(c.getMonth(), 10);
    assert.equal(c.getDay(), 5);

    assert.ok(c.isValid());
  });

});

describe('Compare', function () {

  it('is after by year', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = new LocalDate(1999, 2, 27);

    assert.ok(l.isAfter(c));
  });

  it('is after by month', function () {
    var l = new LocalDate(2000, 2, 29);
    var c = new LocalDate(2000, 1, 27);

    assert.ok(l.isAfter(c));
  });

  it('is after by month', function () {
    var l = new LocalDate(2008, 1, 28);
    var c = new LocalDate(2008, 1, 27);

    assert.ok(l.isAfter(c));
  });

  it('is equal', function () {
    var l = new LocalDate(2008, 1, 28);
    var c = new LocalDate(2008, 1, 28);

    assert.ok(l.equals(c));
  });

  it('is before by year', function () {
    var l = new LocalDate(2007, 1, 28);
    var c = new LocalDate(2008, 1, 28);

    assert.ok(l.isBefore(c));
  });

  it('is before by month', function () {
    var l = new LocalDate(2007, 1, 28);
    var c = new LocalDate(2007, 2, 28);

    assert.ok(l.isBefore(c));
  });

  it('is before by day', function () {
    var l = new LocalDate(2007, 1, 27);
    var c = new LocalDate(2007, 1, 28);

    assert.ok(l.isBefore(c));
  });

  it('diff', function () {
    assert.ok(new LocalDate(2007, 1, 27).diff('2007-11-01') < 0);
    assert.ok(new LocalDate(2009, 1, 27).diff(new Date(2007, 10, 1)) > 0);
    assert.ok(new LocalDate(2007, 11, 1).diff(new LocalDate(2008, 11, 1)) < 0);
    assert.equal(new LocalDate(2007, 11, 1).diff(2454406), 0);
  });

});

describe('Convert', function () {

  it('to string', function () {
    var l = new LocalDate(2005, 4, 10);

    assert.equal(l.toString(), '2005-04-10');
  });

  it('to JSON', function () {
    var l = new LocalDate(2005, 5, 10);

    assert.equal(JSON.stringify(l), '"2005-05-10"');
  });

  it('to date', function () {
    var l = new LocalDate(2005, 4, 10);
    var c = l.toDate();

    assert.equal(c.getFullYear(), 2005);
    assert.equal(c.getMonth(), 3);
    assert.equal(c.getDate(), 10);
  });

  it('to julian day', function () {
    assert.equal(new LocalDate(2005, 4, 10).toJulianDay(), 2453471);
    assert.equal(new LocalDate(2015, 5, 28).toJulianDay(), 2457171);
    assert.equal(new LocalDate(1918, 11, 11).toJulianDay(), 2421909);
  });

});

describe('Utility', function () {

  it('day of year', function () {
    assert.equal(new LocalDate(2005, 4, 10).getDayOfYear(), 100);
    assert.equal(new LocalDate(2000, 1, 20).getDayOfYear(), 20);
    assert.equal(new LocalDate(2004, 12, 31).getDayOfYear(), 366);
  });

  it('day of week', function () {
    assert.equal(new LocalDate(2005, 4, 10).getDayOfWeek(), 0);
    assert.equal(new LocalDate(2000, 11, 30).getDayOfWeek(), 4);
    assert.equal(new LocalDate(1918, 11, 11).getDayOfWeek(), 1);
  });

});