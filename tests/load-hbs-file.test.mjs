import { loadHbsFileTemplate } from '../bin/load-hbs-file.mjs';

describe('loadHbsFileTemplate', () => {
  test('loadHbsFileTemplate reads a handlebars file from bin/project and replaces any hbs variables', () => {
    const str = 'This is a test handlebars file. It can do things like replace nested text. It can also show text conditionally.';
    const keyDict = {
      handlebars: 'handlebars',
      nested: { text: 'nested text' },
      canShow: true
    }
    expect(loadHbsFileTemplate('test.hbs', keyDict)).toEqual(str);
  });
})
