# docker-djangoforandroid

## Overview

Design a cloud based network using multiple android phones running a process managing type app that will manage the processes of
certain services like Tor hidden services and geth to use th etherium decentralized network. 

The process managing app, called the "provost", will start and stop different services used for encryption and increased privacy on the network. Any phone with this app installed and running will be included on the network.

## App Structure
![alt text](https://github.com/sofwerx/provost/blob/master/images/Screen%20Shot%202018-05-11%20at%203.03.06%20PM.png "App Diagram")

This diagram shows the directory structure of the app. Provost will be the app itself. This is what the user installs on their phone and executes to start the program. Within the Provost app you have a service pack directory with two directories inside of it: services and root.

Services will house the configuration and start-up scripts for certain services such as Tor and Geth. The configuration and start-up scripts include settings like whether the services is enabled and how to start the process and install it if it is not there already. It will also include settings that govern the behavior of the service. 

The root directory will contain general dependancies, libraries and components that make the service function. It is much easier to install these programs into a linux file system than to some arbitrary place in a phone so replicating a rootfs for this purpose with only the things we need is most efficient. 

## Building

This is based on djangoforandroid and the provost project from that.

To build:

    make

The resultant output `.apk` file will be in the `outputs/` folder.

