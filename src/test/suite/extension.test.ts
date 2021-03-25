import * as assert from 'assert';
import { before, after } from 'mocha';

import * as vscode from 'vscode';

import * as extension from '../../extension';

suite('Extension Test Suite', () => {
  const createDocumentWithSelection = async (text: string) => {
    const document = await vscode.workspace.openTextDocument({content: text});
    const editor = await vscode.window.showTextDocument(document);
    editor.selection = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(0, text.length)
    );
  };

  before(function(){
    // Stub quick open command
    vscode.commands.registerCommand('workbench.action.quickOpen', (input: string) => {
      this.quickOpenText = input;
    });

    this.context = {subscriptions: []};
    extension.activate(this.context);
  });

  after(function(){
    extension.deactivate();
  });

  test('starts quick open with basic selection', async function() {
    await createDocumentWithSelection('foo');
    vscode.commands.executeCommand('quick-open-prefill.quickOpenWithSelection');
    assert.strictEqual(this.quickOpenText, 'foo');
  });

  test('replaces multiple non-word characters with spaces', async function() {
    await createDocumentWithSelection('Module::Class::Subclass');
    vscode.commands.executeCommand('quick-open-prefill.quickOpenWithSelection');
    assert.strictEqual(this.quickOpenText, 'Module Class Subclass');
  });
});
