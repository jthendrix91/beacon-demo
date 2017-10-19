Beacon Demo
=====================

A starting project for ranging/region monitoring with Estimote beacons.

This project was piggy-backed off the great [Cordova Proximity Plugin](https://github.com/petermetz/cordova-plugin-ibeacon) app built by Peter Metz.

* After launching the app, you can start ranging or region monitoring beacons by pressing the similarly named buttons on the
second and third tabs of the application.

* The first tab will provide summary information given your selection above.
 
* The event log produced by iOS will get populated on the fourth tab.

* To see any of the aforementioned in action, you have to edit the properties of the ranged/monitored beacon on the
second/third tab, or by modifying the default values in the source code (see the .html files).

## Prerequisites

* [Buy estimotes](http://estimote.com/) :-)

* Install node and npm (Note: Due to current issues with npm v5 I'd recommend installing Node v7.10.1 with npm v4.2.0 via nvm).

    ```
    # Install nvm to manage node & npm versions (After running the curl command you will most likely need to restart your terminal)
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
    # Install node v7.10.1 with npm v4.2.0
    nvm install 7.10
    nvm use 7.10
    ```

* Install necessary CLIs on your machine.
    
    ```
    # Install CLI dependencies
    npm install -g ionic ios-sim ios-deploy
    ```
    
## Usage

After a clean checkout, make sure to add one or all of the supported platforms before running.
    
    # Install NPM dependencies
    npm install
    
    # Run the gulp install task which will run bower
    gulp install
    
    # Add iOS as a platform to your project
    ionic cordova platform add ios
    
    # Build the iOS platform files
    ionic cordova build ios

    # Run the app on a connected iOS device (You will need to have an [iOS Provisioning Profile](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/CreatingYourTeamProvisioningProfile/CreatingYourTeamProvisioningProfile.html) recognized by XCode)
    ionic cordova run ios --device
    
## Development

After making a change to the Javascript/SCSS code, execute ``ionic cordova prepare`` in order to compile your styles and copy your changes into the 
platform directories. This is necessary before you'll be able to see the changes on a device.