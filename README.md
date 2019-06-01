# JS-LocalDate-Plus
js-localdate-plus is a JS library inspired by [LocalDate](https://github.com/knockout-tech/localdate). Fix bugs and add some new temporal features. 

## Installation

Add **js-localdate-plus** as a dependency to *package.json*:

```bash
$ npm install --save js-localdate-plus
```

Or via bower

```bash
$ bower install js-localdate-plus
```

then 

```javascript
import LocalDate from 'js-localdate-plus'
```

## New Feature

### Add Years/Months with Gap Day

```javascript
var date_with_gap = (new LocalDate(2001, 1, 31)).addMonthsWithGap(1);
// date_with_gap will be 2001-3-3
```

WithGap means: When adding years/months, if the original day of the month is greater than the number of days in the final month, the final month will change to the next month and the final day will be **the first day plus gap days** in the final month. It's similar to the conception of Carry in arithmetic.

### Fix bugs from [LocalDate](https://github.com/knockout-tech/localdate)

addYears() and substractYears() do not check whether a year is a leap year. [The issue with details](https://github.com/knockout-tech/localdate/issues/1).


## Original Usage from [LocalDate](https://github.com/knockout-tech/localdate)

Creating a LocalDate object

```javascript
var today = new LocalDate();
var epoch = new LocalDate(1970, 1, 1);
```

A LocalDate can be instantiated with a String, Date or Julian day.

```javascript
new LocalDate('1984-05-02');
new LocalDate(new Date(1984, 4, 2));
new LocalDate(2445823);
```

The basic value of LocalDate tracks the Julian Day. Think of it like the Unix epoch, number of (milli)seconds since 1.1.1970, except for days since 4714 BC.

> The Julian Day is the integer assigned to a whole solar day in the Julian day count starting from noon Greenwich Mean Time, with Julian day number 0 assigned to the day starting at noon on January 1, 4713 BC, proleptic Julian calendar (November 24, 4714 BC, in the proleptic Gregorian calendar).

For whole (integer) Julian days the time is assumed to be 12:00 GMT. LocalDate doesn't keep time or timezones, so the Julian day value is not representative of the point in time (noon), rather the whole solar day.

### Converters

```javascript
today.toDate();
epoch.toString();
today.toJulianDay(); //same as today.valueOf()
```

### Clone

```javascript
var another = today.clone();
```

### Getters & Setters

Setters return new LocalDate instances, they do not modify the existing instance;

```javascript
today.getYear();
today.getMonth();
today.getDay();

var past = today.setYear(2000).setMonth(2).setDay(29);
```

### Comparators

You can compare two LocalDate objects, or a LocalDate to a String.

```javascript
birth.isBefore(today); // true
today.isAfter(past); // true
today.equals(new Date); // true

past.isBefore('1923-02-22'); // false
```

### Utility

There are lots of utility methods.

```javascript
today.getDayOfWeek();
today.getDayOfYear();

birth.isLeapYear();
birth.isValid();

today.lengthOfMonth();
today.lengthOfYear();
```

### Add & Subtract

You can add or subtract years, months and days.

```javascript
var again = another.addMonths(22).subtractDays(10);
```

When adding months, if the original day of the month is greater than the number of days in the final month, the day will become the last day in the calculated month.