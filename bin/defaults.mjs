const tsconfigDefaults = {
  target: 'es6',
  module: 'commonjs'
}

const defaults = {
  tsconfig: tsconfigDefaults,
  express: false,
  static: true,
  zustand: false,
  reactQuery: false,
  reactMarkdown: false,
  gql: false,
  styledComponents: false
}

export { defaults }
