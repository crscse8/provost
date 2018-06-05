# On the phone:

  * Go to `Settings/System/About phone`
  * Keep tapping on `Build number` until message appears stating `Development settings enabled`
  * Back out to `System`
  * Go to `Developer options`
  * Scroll down to ensure `Android debugging` is enabled

# On Linux Machine:

  * Install [Gradle](https://gradle.org/install)
  * Install [SDK](https://developer.android.com/studio/install). Either Android Studio or just SDK tools
  * In Terminal run:

    sudo apt-get install android-tools-adb

  * Edit bash_profile with the following:

    #adjust according to you installation directories
    export ANDROID_HOME=/opt/android/sdk/24.0.2 
    export ANDROID_NDK=//opt/android/ndk/r12b
    export ANDROID_NDK_HOME=${ANDROID_NDK}
    export ANDROID_SDK_PATH=${ANDROID_HOME}
    export ANDROID_SDK_PLATFORM_TOOLS_PATH=${ANDROID_SDK_PATH}:${ANDROID_SDK_PATH}/tools:${ANDROID_SDK_PATH}/platform-tools
    export PATH=$ANDROID_HOME/tools:$PATH
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    export ANDROID_NDK_PATH=${ANDROID_NDK}
    export NDK_PATH=$ANDROID_NDK
    export PATH=$ANDROID_NDK:$PATH

  * Verify functionality opening Terminal and by typing:
    android
    gradle
    adb

If any command is not recognized, there is an issue with the installation or the .bash_profile file.

  * Clone Provost repo
  * In provost dir type:
    npm install
    cordova run android

If build doesn’t work type: 

    sdkmanager ‘build-tools;19.1.0’

  * In Terminal, to grant full usb privileges to the user, run:

    sudo usermod -aG plugdev “your username” (do not use quotes)

  * Once installation is verified, terminal commands are:

To check which devices are available

    adb devices 

To open a shell on the device

    adb shell

