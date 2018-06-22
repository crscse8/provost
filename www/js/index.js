/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var geolocation = {};

////////////////////////////////////////////

var app = {
    // Application Constructor
    initialize: function() {
        console.log("provost initializing");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        console.log("provost initializing geolocation");
        app.geolocationWatchStart();

        console.log("provost initializing webserver");
        app.webserverStart();

        var md = cordova.require("cordova/plugin_list").metadata;
        console.log("*** provost cordova.plugins: ");
        console.log(JSON.stringify(md, null, 2));
        positionElement = document.getElementById('cordova_plugins');
        positionElement.setAttribute('style', 'display:block;');
        plugin_names = Object.keys(md);
        positionElement.innerHTML = (plugin_names.join("<br />\n"));

        // console.log("provost window.plugins: " + window.plugins);

        /* Override the back button on Android to go to background instead of closing the app. */
        console.log("provost overrideBackButton");
        cordova.plugins.backgroundMode.overrideBackButton();

        /* Exclude the app from the recent task list */
        console.log("provost excludeFromTaskList");
        cordova.plugins.backgroundMode.excludeFromTaskList();


        runRFsweepBtn = document.querySelector('#runRFsweepBtn');
        runRFsweepBtn.addEventListener('click', function() {
          console.log("provost runRFsweep click");

          cmd = ['/system/xbin/su','-c','"/data/local/nhsystem/kali-armhf/EDGES/hackrf/chroot.sh"'];
          // cmd = ['/system/xbin/su','-c','"/system/bin/chroot /data/local/nhsystem/kali-armhf/ /usr/local/bin/hackrf_sweep -1 -f1:7250 -w 100000 -l32 -g8"'];
          console.log("About to ShellExec: " + cmd);
          window.ShellExec.exec(cmd, function(rtn) {
            console.log("provost ShellExec: " + cmd);
            console.log('exit status: ' + rtn.exitStatus);
            console.log('cmd output: ' + rtn.output);
          });
        });
        console.log("Added Run RF Sweep button handler");

        enableBackgroundBtn = document.querySelector('#enableBackgroundBtn');
        enableBackgroundBtn.addEventListener('click', function() {
          console.log("provost enableBackgroundBtn click");
          cordova.plugins.backgroundMode.moveToBackground();
        });

        quitAppBtn = document.querySelector('#quitAppBtn');
        quitAppBtn.addEventListener('click', function() {
          console.log("provost is exiting now, goodbye!");
          navigator.app.exitApp();
        });


        // console.log("provost hook backgroundMode enable");
        cordova.plugins.backgroundMode.on('enable', function() {
          console.log("provost backgroundMode enable");
          cordova.plugins.backgroundMode.configure({
              text: "Background mode enabled"
          });
        });

        // console.log("provost hook backgroundMode disable");
        cordova.plugins.backgroundMode.on('disable', function() {
          console.log("provost backgroundMode disable");
          cordova.plugins.backgroundMode.configure({
              text: "Background mode disabled"
          });
        });

        // console.log("provost hook backgroundMode activate");
        // cordova.plugins.backgroundMode.on('activate', function() {
        //   console.log("provost backgroundMode activate");
        //   cordova.plugins.backgroundMode.disableWebViewOptimizations();
        //   cordova.plugins.backgroundMode.configure({
        //       text: "Background mode activated"
        //   });
        // });
        //
        // console.log("provost hook backgroundMode deactivate");
        // cordova.plugins.backgroundMode.on('deactivate', function() {
        //   console.log("provost backgroundMode deactivate");
        //   cordova.plugins.backgroundMode.configure({
        //       text: "Background mode deactivated"
        //   });
        // });
        //
        // console.log("provost hook backgroundMode failure");
        // cordova.plugins.backgroundMode.on('failure', function() {
        //   console.log("provost backgroundMode failure");
        //   cordova.plugins.backgroundMode.configure({
        //       text: "Background mode failure"
        //   });
        // });

        console.log("provost initialized");
    },

  webserverOnRequest: function(request) {
      console.log("provost webserverOnRequest request: " + request);
    	var position = geolocation.position;
    	var body;
    	if(position) {
    	    body = JSON.stringify({
    		"success": true,
                    "latitude": position.coords.latitude,
                    "longitude": position.coords.longitude,
                    "locationAccuracy": position.coords.accuracy,
                    "altitude": position.coords.altitude,
                    "altitudeAccuracy": position.coords.altitudeAccuracy,
                    "heading": position.coords.heading,
                    "speed": position.coords.speed,
                    "timestamp": position.timestamp
                });
    	} else {
    	    body = { "success": false, "message": "no position available" }
    	}

            webserver.sendResponse(
                request.requestId,
                {
                    status: 200,
    		body: body,
                    headers: {
                        'Content-Type': 'application/javascript'
                    }
                },
                function() {
                   console.log("provost webserver.sendResponse successful");
                },
                function(err) {
                   console.log("provost webserver.sendResponse error:" + err);
    	    }
            );
    },
    webserverStart: function() {
        webserver.onRequest( app.webserverOnRequest );
        webserver.start(
            function() {
              console.log("provost webserver started successfully");
            },
            function(err) {
              console.log("provost webserver failed to start: " + err);
            },
            3000);
    },

    geolocationWatchSuccess: function(position) {
        geolocation.position = position;

        positionElement = document.getElementById('curpos');
        positionElement.setAttribute('style', 'display:block;');
        positionElement.innerHTML = geolocation.position.coords.latitude + ", " + geolocation.position.coords.longitude;
    },
    geolocationWatchError: function(error) {
        geolocation.error = error;
    },
    geolocationWatchStart: function() {
        geolocation.watchId = navigator.geolocation.watchPosition(
          app.geolocationWatchSuccess,
          app.geolocationWatchError,
          { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
        );
    },
    geolocationWatchStop: function(watchId) {
        if(geolocation.watchId) {
          navigator.geolocation.clearWatch(geolocation.watchId);
          geolocation.watchId = nil;
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

////////////////////////////////////////////

app.initialize();

function channelListener(msg) {
    console.log('[cordova] received: ' + msg);
};

function startupCallback(err) {
    if (err) {
        console.log(err);
    } else {
        console.log ('Node.js Mobile Engine Started');
        nodejs.channel.send('Hello from Cordova!');
    }
};

function startNodeProject() {
    nodejs.channel.setListener(channelListener);
    nodejs.start('main.js', startupCallback);
    // To disable the stdout/stderr redirection to the Android logcat:
    //nodejs.start('main.js', startupCallback, { redirectOutputToLogcat: false });
};
