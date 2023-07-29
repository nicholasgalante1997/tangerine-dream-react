import { fileURLToPath } from 'url';
import path from 'path';

/**
 * -----------------------------------------------------
 * @function getDirname
 * @arguments
 * @returns {String}
 * @summary gets local ES6 Safe dirname
 * -----------------------------------------------------
 */
export function getDirname() {
  return path.dirname(fileURLToPath(import.meta.url));
}
