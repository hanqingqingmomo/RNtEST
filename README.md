# YWCA (PbA) - React Native

## Launching application

To run application on simulator, please run one of following commands:

```shell
yarn run:ios
// or
yarn run:android
```

You are then asked to pick configuration file as described in **Configuration** section

## Configuration

Application supports static configuration via **_env_** file. Configuration module loads environment variables from a .env file into **_Config_** object available from **_react-native-config_** package.

You can create as many env files as you need. You are asked which file should be used before running application.

**Requirements:**

* follow format as described in `.env.example` file.
  You can find configuration example in `.env.example` file at project root.
* prefix files with `.env` prefix, e.g.:
  `.env.dev`
  `.env.production`

**Usage:**

* run `yarn env:activate` to initiate activation process.
  CLI finds available env files and you are asked to confirm your selection.
  When you - `yarn env:activate` is run together with `yarn run:(ios|android)`.
  We suggest this approach in order to run app right away.
* use `yarn env:generate` to generate content of env file from loaded system environment variables.
  Only variables prefixed with `RN_` will be picked.
* use `import Config from 'react-native-config';` to access loaded variables.
