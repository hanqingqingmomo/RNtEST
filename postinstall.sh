if [ ! -d "./node_modules/react-native-payments-addon-braintree/Carthage" ]; then
  cd ./node_modules/react-native-payments-addon-braintree && carthage update --platform ios
fi
