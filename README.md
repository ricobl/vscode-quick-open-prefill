# quick-open-prefill

Provides a command to prefill VSCode's quick open dialog with the current selection.

## Features

In order to maximize chances to find a match, the extension will replace
non-word characters with spaces, benefiting from VScode's fuzzy match.

This might help:

* jumping to the file containing a module/class definition
* jumping to a file referenced in your code

## Extension Settings

Add the following to your [keybindings.json](https://code.visualstudio.com/docs/getstarted/keybindings#_advanced-customization) to override current quick open behaviour:

```json
{
  "key": "cmd+p",
  "command": "quick-open-prefill.quickOpenWithSelection",
  "when": "editorTextFocus && editorHasSelection && !editorHasMultipleSelections"
}
```

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).
