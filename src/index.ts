import { type ExtensionContext, workspace } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { LoadColorDirectory, colorStore } from './config'
import { RegisterCompletion } from './completions'
import { RegisterAnnotations } from './annotation'
import { RegisterCommands } from './commands'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)

  if (!workspace.workspaceFolders)
    return

  await LoadColorDirectory()

  if (!Object.keys(colorStore.value).length)
    return

  await RegisterCommands(ctx)
  await RegisterCompletion(ctx)
  await RegisterAnnotations(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
