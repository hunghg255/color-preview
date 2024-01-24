<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=hunghg255.color-preview">
<img src="https://github.com/hunghg255/color-preview/blob/main/res/logo.webp?raw=true" alt="logo" width='100'/>
</a>
</p>

<p align="center">
  A vscode extension preview color
</p>

<p align="center">
  <a href="https://github.com/hunghg255/color-preview/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/color-preview/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/color-preview" alt="License" /></a>
</p>

### Preview

<p align='center'>
  <img src="https://github.com/hunghg255/color-preview/blob/main/screenshots/preview-1.png?raw=true" alt='preview'>
</p>


### Features

- Inline display corresponding color
- Hover

## Config `.vscode/settings.json`

```json
// reload
  "color-preview.annotations": true,
 "color-preview.colorDirectoryPath": "./public/styles/color.json"
```

```json
// color.json
{
  "light: {
    "primary": "#000",
    "secondary": "#fff"
  },
  "dark": {
    "primary": "#fff",
    "secondary": "#000"
  }
}
```
