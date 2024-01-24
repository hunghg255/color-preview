import type { CompletionItemProvider, ExtensionContext, TextDocument } from 'vscode'
import { CompletionItem, CompletionItemKind, Position, Range, languages } from 'vscode'
import { colorStore, config } from './config'
import { getColorInfoMarkdown } from './markdown'

export function RegisterCompletion(ctx: ExtensionContext) {
  const REGEX_COLLECTION = /(color|class|className)=['"][\w-]*$/
  const REGEX_COLLECTION_CSS = /var\([\w-]*$/
  let provider: any

  const start = () => {
    const collectionProvider: CompletionItemProvider = {
      provideCompletionItems(document: TextDocument, position: Position) {
        const line = document.getText(new Range(new Position(position.line, 0), new Position(position.line, position.character)))
        const match = REGEX_COLLECTION.test(line)
        if (!match)
          return null

        const key = Object.keys(colorStore.value)[0]

        return Object.keys(colorStore.value[key]).filter(v => !v.startsWith('--')).map((c: any) => new CompletionItem(c, CompletionItemKind.Text))
      },

      async resolveCompletionItem(item: CompletionItem) {
        return {
          ...item,
          documentation: await getColorInfoMarkdown(colorStore.value, item.label as string),
        }
      },
    }

    const collectionProviderCss: CompletionItemProvider = {
      provideCompletionItems(document: TextDocument, position: Position) {
        const line = document.getText(new Range(new Position(position.line, 0), new Position(position.line, position.character)))
        const match = REGEX_COLLECTION_CSS.test(line)
        if (!match)
          return null

        const key = Object.keys(colorStore.value)[0]

        return Object.keys(colorStore.value[key]).filter(v => v.startsWith('--')).map((c: any) => new CompletionItem(c, CompletionItemKind.Text))
      },

      async resolveCompletionItem(item: CompletionItem) {
        return {
          ...item,
          documentation: await getColorInfoMarkdown(colorStore.value, item.label as string),
        }
      },
    }

    provider = languages.registerCompletionItemProvider(
      config.languageIds,
      collectionProvider,
      ...['"', '\''],
    )

    const providerCss = languages.registerCompletionItemProvider(
      ['css', 'scss', 'sass', 'less'],
      collectionProviderCss,
      ...['--'],
    )

    ctx.subscriptions.push(provider)
    ctx.subscriptions.push(providerCss)
  }

  // on start up
  start()
}
