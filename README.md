# YWCA (PbA) - React Native

## Configuration
Application can run in 3 different environments:

* **dev:** local development environment. Used for development and debugging purposes.
* **beta:** QA environment, connected to QA/beta/staging services (e.g. testing REST API, bug reporting, ...)
* **prod:** production environment, connected to production services (e.g. live REST API, bug reporting, ...)



Configuration files loaded for particular environments:

* dev: **.env.dev**
* beta: **.env.beta**
* prod: **.env.prod**

You can find configuration example in `.env.example` file at project root.

## Launching application
### Android

We will use `react-native` CLI to launch application on Android simulator, or device if connected.
RN CLI allows us to launch application in specific environment using `--variant` flag.

Make sure configuration file for selected environment exists before launching!

**1. Run application in development environment:**

```shell
react-native run-android --variant devDebug
```

**2. Run application in other environments:**

```shell
react-native run-android --variant {environment}Debug
```



### iOS
Unfortunately, RN CLI does not work correctly with `--scheme` flag as of now. We will be using xCode in order to launch application in other than development environment.

Make sure configuration file for selected environment exists before launching!

Also, after selecting different schema, do "Clean (Shift + Cmd + K)" before running build task. If you skip this step, configuration file will be ignored.

**1. Run application in development environment:**

```shell
react-native run-ios
```
**2. Run application in other environments:**

* Open `ios/app.xcodeproj` in xCode
* Select desired product schema and device
* Press "Build"