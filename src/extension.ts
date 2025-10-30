import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('=== МОЙ ПЛАГИН АКТИВИРОВАН ===');
    
    // Команда 1: Простое приветствие
    let helloCommand = vscode.commands.registerCommand('my-first-plugin.helloWorld', () => {
        vscode.window.showInformationMessage('🎉 ПЛАГИН РАБОТАЕТ! УРА!');
    });

    // Команда 2: Реальная информация о файле
    let fileInfoCommand = vscode.commands.registerCommand('my-first-plugin.showFileInfo', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showWarningMessage('❌ Нет активного файла!');
            return;
        }

        const document = editor.document;
        const fileName = document.fileName.split('/').pop(); // только имя файла
        const lineCount = document.lineCount;
        const language = document.languageId;
        const fileSize = new TextEncoder().encode(document.getText()).length;
        
        const info = `
📄 Файл: ${fileName}
📏 Строк: ${lineCount}
🔤 Язык: ${language}
💾 Размер: ${fileSize} байт
        `.trim();

        vscode.window.showInformationMessage(info);
    });

    // Автоматическое выделение слова
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            const position = editor.selection.active;
            const wordRange = editor.document.getWordRangeAtPosition(position);
            if (wordRange) {
                editor.selection = new vscode.Selection(wordRange.start, wordRange.end);
            }
        }
    });

    context.subscriptions.push(helloCommand, fileInfoCommand);
}

export function deactivate() {}