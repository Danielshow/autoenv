// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "autoenv" is now active!');

	let disposable = vscode.commands.registerCommand('autoenv.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		const line = editor.selection.active.line;
        const text = editor.document.lineAt(line).text;
		// Display a message box to the user
		vscode.window.showInformationMessage(text.trim());
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
