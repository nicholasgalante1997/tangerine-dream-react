import { Command } from 'commander';

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
      zustand,
      styledComponents,
      gql,
      tsconfigTarget,
      tsconfigModule,
      tsconfigAliasSrc,
    } = options;
    try {
      const babelOptions = { styledComponents };
      const babelFile = loadHbsFileTemplate('.babelrc.hbs', babelOptions);
      if (!Boolean(babelFile)) {
        throw new Error('Issue loading babel template.');
      }
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
    } catch (e) {
      logger.error(e);
      process.exit(1);
    }
  });

program.parse();
