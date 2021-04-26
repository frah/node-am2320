node-am2320
===========

Module for reading the raw data from AM2320. Extended frah-am2320 and added a bulk read function. 

Install
-------
```
$ npm install am2320b
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
sensor.readBulk()
  .then(function(result){
    console.log('Humidity: '+ result.hum + ' % Temperature:'+ result.temp); 
});
```
