import pino from 'pino'

export const logger = pino({
  name: 'react-cli-starter-kit',
  base: undefined,
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})
