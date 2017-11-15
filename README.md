Beacon Demo
=====================

A starting project for ranging/region monitoring with Estimote beacons and Salesforce data.

This project was piggy-backed off the great [Cordova Proximity Plugin](https://github.com/petermetz/cordova-plugin-ibeacon) app built by Peter Metz.

* After launching the app, you can start ranging or region monitoring beacons by pressing the similarly named buttons on the
second and third tabs of the application.

* The first tab will provide summary information given your selection above.
 
* The event log produced by iOS will get populated on the fourth tab.

* To see any of the aforementioned in action, you have to edit the properties of the ranged/monitored beacon on the
second/third tab, or by modifying the default values in the source code (see the .html files).

## Prerequisites

* [Buy estimotes](http://estimote.com/) :-)

* [Create a Salesforce Developer Org](https://developer.salesforce.com/signup)

* Import Salesforce Apex REST Service from [partner repository](https://github.com/scottbcovert/salesforce-beacon-demo-apex)

* [Setup Salesforce Apex REST Endpoint with Sites](http://www.wadewegner.com/2013/03/creating-anonymous-rest-apis-with-salesforce-com/)

* [Create a OneSignal account and an iOS push certificate](https://documentation.onesignal.com/v3.0/docs/generate-an-ios-push-certificate)

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

After a clean checkout, you should update HomeCtrl.js with your own custom REST Url and a corresponding contact id from your Salesforce org that is tied to an open opportunity. You can also update the Ranging.html and Monitoring.html pages to automatically load with default values that match your estimotes.
    
    # Setup proper custom REST endpoint and create a mock customer using the id of a Salesforce contact that relates to an opportunity in HomeCtrl.js

    # Enter your OneSignal app id in app.js

    # Optionally update the Ranging.html and Monitoring.html pages to automatically load with default values that match your estimotes

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