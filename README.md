# docker-djangoforandroid

## Overview

Design a cloud based network using multiple android phones running a process managing type app that will manage the processes of
certain services like Tor hidden services and geth to use th etherium decentralized network. 

The process managing app, called the "provost", will start and stop different services used for encryption and increased privacy on the network. Any phone with this app installed and running will be included on the network.

## App Structure
![alt text](https://github.com/sofwerx/provost/blob/master/images/Screen%20Shot%202018-05-11%20at%203.03.06%20PM.png "App Diagram")

## Building

This is based on djangoforandroid and the provost project from that.

To build:

    make

The resultant output `.apk` file will be in the `outputs/` folder.

