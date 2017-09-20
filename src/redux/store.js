// @flow

export function initStore() {
  return __DEV__
    ? require('./store.development').initStore()
    : require('./store.production').initStore();
}
