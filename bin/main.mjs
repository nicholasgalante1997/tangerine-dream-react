import { Command } from 'commander';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { tsconfig_defaults } from './defaults.mjs';
import { loadHbsFileTemplate } from './load-hbs-file.mjs';
import { logger } from './logger.mjs';

const program = new Command();

program
  .name('@tangerinedream/react')
  .description('an opinionated starter kit for react with minimal dependencies')
  .version('1.0.0');

program
  .command('ssr')
  .description('creates a minimal Node server with a server side rendered React app.')
  .argument('<name>', 'the name of the application')
  .option(
    '-x, --express',
    'add express as a dependency and set the server up to use express. defaults to false.',
    false
  )
  .option(
    '-s, --static',
    'create a script for creating static pages, alongside server prepared pages. Update build script to include static output pages. defaults to false.',
    false
  )
  .option(
    '-z, --zustand',
    'bring in Zustand as a dependency and set up an example zustand global state store. defaults to false',
    false
  )
  .option(
    '--react-query',
    'adds react-query as a dependency and sets up a sample query hook',
    false
  )
  .option('markdown', 'adds react-markdown and sets up a custom markdown page component', false)
  .option(
    '--styled-components',
    'bring in styled-components and set up components using styled-components. defaults to false',
    false
  )
  .option(
    '--gql',
    'sets up an apollo graphql client and a node express http graphql resolver',
    false
  )
  .option(
    '--tsconfig-target',
    'set the tsconfig compiler target option. defaults to es6.',
    tsconfig_defaults.target
  )
  .option(
    '--tsconfig-module',
    'set the tsconfig compiler module option. defaults to commonjs.',
    tsconfig_defaults.module
  )
  .option(
    '--tsconfig-alias-src',
    'set the alias and base path properties to alias "@" to the local src folder.',
    true
  )
  .action((name, options) => {
    logger.info({ nameIs: name, options });
    const {
      express,
      static: oStatic,
      markdown,
      reactQuery,
      zustand,
      styledComponents,
      gql,
      tsconfigTarget,
      tsconfigModule,
      tsconfigAliasSrc,
    } = options;
    try {

      /** --------------------------------------------
       * Make output dir
       ----------------------------------------------- */
       const standardizeDirName = (str) => str.toLowerCase().replace(/\s/g, '-');
       const projectPath = path.resolve(process.cwd(), standardizeDirName(name));
       if (existsSync(projectPath)) {
        throw new Error(standardizeDirName(name) + ' Already Exists.');
       }
       mkdirSync(projectPath);
       
      /** ---------------------------------------------
       * Babel file setup
       ------------------------------------------------ */
      const babelOptions = { styledComponents };
      const babelFile = loadHbsFileTemplate('.babelrc.hbs', babelOptions);
      if (!Boolean(babelFile)) {
        throw new Error('Issue loading babel template.');
      }
      const babelFileOutPath = path.resolve(projectPath, '.babelrc');
      writeFileSync(babelFileOutPath, babelFile, { encoding: 'utf-8' });

      /** ---------------------------------------------
       * tsconfig.json file setup
       ------------------------------------------------ */
      const tsconfigOptions = {
        tsconfig: {
          target: tsconfigTarget,
          module: tsconfigModule,
          alias: tsconfigAliasSrc,
          withGql: gql,
        },
      };
      const tsconfigFile = loadHbsFileTemplate('tsconfig.json.hbs', tsconfigOptions);
      if (!Boolean(tsconfigFile)) {
        throw new Error('Issue loading tsconfig.json template.');
      }
      const tsconfigFileOutPath = path.resolve(projectPath, 'tsconfig.json');
      writeFileSync(tsconfigFileOutPath, tsconfigFile, { encoding: 'utf-8' });

      /** ---------------------------------------------
       * package.json file setup
       ------------------------------------------------ */
      const packageJsonOptions = {
        appName: name,
        express,
        withGql: gql,
        markdown,
        reactQuery,
        zustand,
        styledComponents,
      };
      const packageJson = loadHbsFileTemplate('package.json.hbs', packageJsonOptions);
      if (!Boolean(packageJson)) {
        throw new Error('Issue loading package.json template.');
      }
      const packageJsonOutFile = path.resolve(projectPath, 'package.json');
      writeFileSync(packageJsonOutFile, packageJson, { encoding: 'utf-8' });

      /** ---------------------------------------------
       * jest config file setup
       ------------------------------------------------ */
      const jestConfigOptions = { appName: name };
      const jestConfig = loadHbsFileTemplate('jest.config.js.hbs', jestConfigOptions);
      if (!Boolean(jestConfig)) {
        throw new Error('Issue loading jest.config.js template.');
      }

      logger.info({
        babelFile,
        tsconfigFile,
        packageJson,
      });
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  });

program.parse();
