node-am2320
===========

Module for reading the raw data from AM2320

Install
-------
```
$ npm install am2320
```

Usage
-----
```javascript
var AM2320 = require('am2320');

var sensor = new AM2320();
sensor.readTemperature()
  .then(function(temp) {
    console.log('Temperature: ' + temp + ' degree');
  });
sensor.readHumidity()
  .then(function(hum) {
    console.log('Humidity: ' + hum + ' %');
  });
```
