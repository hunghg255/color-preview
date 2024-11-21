<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=hunghg255.color-preview">
<img src="https://github.com/hunghg255/color-preview/blob/main/res/logo.webp?raw=true" alt="logo" width='100'/>
</a>
</p>

<p align="center">
  A vscode extension preview color
</p>

<p align="center">
    <a href="https://github.com/hunghg255/color-preview/stargazers"><img src="https://img.shields.io/github/stars/hunghg255/color-preview?colorA=363a4f&colorB=f9c35a&style=for-the-badge"></a>
    <a href="https://marketplace.visualstudio.com/items?itemName=hunghg255.color-preview"><img src="https://img.shields.io/visual-studio-marketplace/azure-devops/installs/total/hunghg255.color-preview?colorA=363a4f&colorB=5BDfff&style=for-the-badge"></a>
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
