# [WIP] Oxide CUI Designer

## Description
This plugin allows you to design CUIs in Adobe XD and directly export them as C# code.

## Install
1. Launch Adobe XD.
2. Click on the burger button in the top left corner.
3. Navigate to `Plugins > Development` and click on `Show Develop Folder`.
4. Clone this repository into the opened folder and reload the plugins in Adobe XD by either:
    * Navigate to `Plugins > Development` and click on `Reload Plugins`.
    * Press `Ctrl+Shift+R`, which is the shortcut for `Reload Plugins`.
5. You should now see the Oxide CUI Designer in the `Plugins` section. To open the section, click on the brick icon in the bottom left corner.

## Getting Started
TODO

## Cookbook
- Use the predefined elements from the plugin panel to ensure that the design will get converted as expected.
- Only use `Solid Color` as fill. Alpha channels work. Gradients do not work.
- Do not resize the Overlay. CUIs use relative dimensions, so no resizing needed.
- Select a group before adding a new predefined element. The predefined element will be added as a child of the selected group.
- Select the artboard or any element within the artboard before you start to export.

## Planned
### Features
- Automated artboard validation to prevent the export of a corrupted document.
- Round converted numbers (rgba, anchors).
- Add command property to button and input elements.
- **DONE** ~~Show modal to inform the user about warnings, errors, etc.~~
- **DONE** ~~Add text orientation property for label, button and input.~~
- Implement predefined element image.
- **DONE** ~~Create a file with the output.~~
- Add more converter settings (export as function, )

### Other
- Plugin icon
- Short tutorial video
- Examples