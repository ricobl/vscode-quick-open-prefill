import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('quick-open-prefill.quickOpenWithSelection', () => {
    let editor = vscode?.window?.activeTextEditor;
    let document = editor?.document;
    let selection = editor?.selection;

    let text = document && document.getText(selection);
    text = text?.replace(/[^\w]+/, ' ');

    vscode.commands.executeCommand('workbench.action.quickOpen', text);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}
