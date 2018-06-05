cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-background-mode.BackgroundMode",
    "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
    "pluginId": "cordova-plugin-background-mode",
    "clobbers": [
      "cordova.plugins.backgroundMode",
      "plugin.backgroundMode"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "id": "cordova-plugin-webserver.webserver",
    "file": "plugins/cordova-plugin-webserver/webserver.js",
    "pluginId": "cordova-plugin-webserver",
    "clobbers": [
      "webserver"
    ]
  },
  {
    "id": "org.apache.cordova.shell-exec.shell-exec",
    "file": "plugins/org.apache.cordova.shell-exec/www/shell-exec.js",
    "pluginId": "org.apache.cordova.shell-exec",
    "clobbers": [
      "shell-exec"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-background-mode": "0.7.2",
  "cordova-plugin-geolocation": "4.0.1",
  "cordova-plugin-whitelist": "1.3.3",
  "newrelic-cordova-plugin": "5.0.0",
  "cordova-plugin-webserver": "1.0.1",
  "org.apache.cordova.shell-exec": "1.0.0"
};
// BOTTOM OF METADATA
});