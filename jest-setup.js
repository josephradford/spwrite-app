// Jest setup file to handle Expo modules
if (!global.structuredClone) {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

global.__ExpoImportMetaRegistry = {
  register: () => {},
  get: () => undefined,
};
