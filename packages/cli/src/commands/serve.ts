import path from 'path'
import { Command } from 'commander'
import { serve } from '../../../api/src/index'
import { error } from 'console'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p --port <number>', 'port to run serve on', '4005')
  .action(async function (filename, options: { port: string }) {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      await serve(parseInt(options.port), path.basename(filename), dir)
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port')
      } else {
        console.log("Here's the problem: ", error.message)
      }
      process.exit(1)
    }
  })
