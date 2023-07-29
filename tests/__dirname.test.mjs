import { getDirname } from '../bin/__dirname.mjs';

describe('getDirname', () => {
  test('it returns the bin executable directory as an absolute path', () => {
    const binDir = '/home/nickgalante/code/react-cli/bin';
    expect(getDirname()).toEqual(binDir);
  })
})
