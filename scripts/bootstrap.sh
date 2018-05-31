#!/bin/sh

rm -rf "./node_modules";
yarn cache clean;
rm -rf "~/.rncache";
#rm -rf "ios/build";
#rm -rf "ios/Pods";
#rm -rf "ios/Carthage/Build";
yarn install;
cd ios;
#pod install;
#carthage bootstrap --cache-builds --platform iOS;
yarn run env:activate
