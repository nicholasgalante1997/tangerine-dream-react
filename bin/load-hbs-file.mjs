import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { resolve as pathResolve } from 'path';
import { getDirname } from './__dirname.mjs';
import { checkStringForLeftoverKeys, LeftoverHandlebarsException } from './handlebars.mjs';
import { logger } from './logger.mjs';

const { compile } = handlebars;

export function loadHbsFileTemplate(hbsFilePath, hbsOptions) {
  try {
    const path = pathResolve(getDirname(), 'project', hbsFilePath);
    const options = { encoding: 'utf-8' };
    const loadedTemplateFile = readFileSync(path, options);
    const compiledFile = compile(loadedTemplateFile)(hbsOptions);
    if (checkStringForLeftoverKeys(compiledFile)) {
      throw new LeftoverHandlebarsException();
    }
    return compiledFile;
  } catch (e) {
    logger.error({ error: e });
    return null;
  }
}
