export function checkStringForLeftoverKeys(str) {
  const keyPattern = new RegExp(/\{\{ [\w\.]+ }}/g);
  if (keyPattern.test(str)) {
    return true;
  }
  return false;
}

export class LeftoverHandlebarsException extends Error {
  constructor() {
    super('There is a key remaining in your handlebars template. Exiting with an error.');
  }
}
