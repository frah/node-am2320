var i2c = require('i2c');

function setTimeoutAsync(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay);
  });
}

function AM2320(address, device) {
  this.device = device || '/dev/i2c-1';
  this.address = address || AM2320.DEFAULT_ADDRESS;
  this.initialize();
}

AM2320.DEFAULT_ADDRESS = 0x5c;

AM2320.prototype.initialize = function(callback) {
  this.wire = new i2c(this.address, {device : this.device});
}

AM2320.prototype.wakeUpDevice = function() {
  this.wire.writeBytes(0x00, [], function(err) {});
}

AM2320.prototype.setResolution = function() {
  this.wire.writeBytes(0x03, [0x00, 0x04], function(err) {
    if (err) {
      console.error(err);
    }
  });
}

AM2320.prototype._readRawResolution = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
  self.wakeUpDevice();
  setTimeoutAsync(3)
    .then(function() {
      self.setResolution();
      setTimeoutAsync(15)
        .then(function() {
          self.wire.readBytes(0x00, 0x06, function(err, res) {
            if (err) {
              reject(err);
              return;
            } else {
              resolve(res);
            }
          });
      });
    });
  });
}

AM2320.prototype.readTemperature = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self._readRawResolution()
      .then(function(value) {
        resolve((value[4] << 8 | value[5])/10.0);
      })
      .catch(function(value) {
        reject(value);
      });
  });
}

AM2320.prototype.readHumidity = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self._readRawResolution()
      .then(function(value) {
        resolve((value[2] << 8 | value[3])/10.0);
      })
      .catch(function(value) {
        reject(value);
      });
  });
}

module.exports = AM2320;

