import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log("copy-past: ExtensionContext activated");
    let disposable = vscode.commands.registerCommand('extension.copyText', () => {
        const editor = vscode.window.activeTextEditor;
        console.log("copy-past: extension.copyText called");
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            vscode.env.clipboard.writeText(text);
            vscode.window.showInformationMessage('Text copied to clipboard!');
        }
    });

    context.subscriptions.push(disposable);

    vscode.commands.registerCommand('extension.pasteText', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = await vscode.env.clipboard.readText();
            editor.edit(editBuilder => {
                editor.selections.forEach(selection => {
                    editBuilder.replace(selection, text);
                });
            });
            vscode.window.showInformationMessage('Text pasted from clipboard!');
        }
    });

    vscode.commands.registerTextEditorCommand('editor.action.clipboardCopyAction', () => {
        vscode.commands.executeCommand('extension.copyText');
    });

    vscode.commands.registerTextEditorCommand('editor.action.clipboardPasteAction', () => {
        vscode.commands.executeCommand('extension.pasteText');
    });
}
