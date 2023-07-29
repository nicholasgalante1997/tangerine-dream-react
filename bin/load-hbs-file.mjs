import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { resolve as pathResolve } from 'path';
import { getDirname } from './__dirname.mjs';
import { logger } from './logger.mjs';

const { compile } = Handlebars;

export function loadHbsFileTemplate (hbsFilePath, hbsOptions) {
  try {
    const path = pathResolve(getDirname(), 'project', hbsFilePath);
    const options = { encoding: 'utf-8' };
    const loadedTemplateFile = readFileSync(path, options);
    return compile(loadedTemplateFile)(hbsOptions);
  } catch (e) {
    logger.error({ error: e });
    return null;
  }
}
