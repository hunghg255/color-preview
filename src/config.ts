import { isAbsolute, resolve } from 'node:path'
import { ColorThemeKind, window, workspace } from 'vscode'
import fs from 'fs-extra'
import { computed, reactive, ref } from '@vue/reactivity'
import { EXT_NAMESPACE } from './meta'

const _configState = ref(0)

export const colorStore = ref({} as Record<string, any>)

function getConfig<T = any>(key: string): T | undefined {
  return workspace
    .getConfiguration()
    .get<T>(key)
}

async function setConfig(key: string, value: any, isGlobal = true) {
  // update value
  return await workspace
    .getConfiguration()
    .update(key, value, isGlobal)
}

function createConfigRef<T>(key: string, defaultValue: T, isGlobal = true) {
  return computed({
    get: () => {
      // to force computed update
      // eslint-disable-next-line no-unused-expressions
      _configState.value
      return getConfig<T>(key) ?? defaultValue
    },
    set: (v) => {
      setConfig(key, v, isGlobal)
    },
  })
}

export const config = reactive({
  annotations: createConfigRef(`${EXT_NAMESPACE}.annotations`, true),
  languageIds: createConfigRef(`${EXT_NAMESPACE}.languageIds`, []),
  colorDirectoryPath: createConfigRef(`${EXT_NAMESPACE}.colorDirectoryPath`, null),
})

export async function LoadColorDirectory() {
  if (!config.colorDirectoryPath)
    return
  const colorDirectoryPath = config.colorDirectoryPath as any

  let filePath = ''
  if (isAbsolute(colorDirectoryPath)) {
    filePath = colorDirectoryPath
  }
  else {
    const list: string[] = []
    if (workspace?.workspaceFolders) {
      for (const folder of workspace.workspaceFolders)
        list.push(resolve(folder.uri.fsPath, colorDirectoryPath))
    }
    filePath = list[0]
  }

  if (fs.existsSync(filePath)) {
    const data = await fs.readJSON(filePath)
    colorStore.value = data
  }
}

export async function onConfigUpdated() {
  _configState.value = +new Date()
  await LoadColorDirectory()
}

export const color = computed(() => {
  return isDarkTheme()
    ? '#eee'
    : '#222'
})

// First try the activeColorThemeKind (if available) otherwise apply regex on the color theme's name
function isDarkTheme() {
  const themeKind = window?.activeColorTheme?.kind
  if (themeKind && themeKind === ColorThemeKind?.Dark)
    return true

  const theme = createConfigRef('workbench.colorTheme', '', true)

  // must be dark
  if (theme.value.match(/dark|black/i) != null)
    return true

  // must be light
  if (theme.value.match(/light/i) != null)
    return false

  // IDK, maybe dark
  return true
}
