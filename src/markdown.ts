import { MarkdownString } from 'vscode'
import { getSVG, toDataUrl } from './utils/svg'

function getColorValue(arrKeys: Record<string, string>, themeKey: string) {
  return arrKeys[themeKey] ?? ''
}

export async function getColorInfoMarkdown(colors: any, label: string) {
  const localeList = Object.keys(colors)

  const themeList = localeList.map((theme) => {
    const c = getColorValue(
      colors[theme],
      label,
    )
    const icon = toDataUrl(getSVG(c))

    return `| ${theme} | ${c} | ![](${icon}) |`
  })

  return new MarkdownString(
    `${['| Theme | Color |  |', '|:----:|:----:|:----:|', ...themeList].join(
      '\n',
    )}`,
  )
}
