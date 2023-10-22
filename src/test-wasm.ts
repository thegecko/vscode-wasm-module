/**
 * Copyright (C) 2023 Arm Limited
 */

import * as vscode from 'vscode';
import { Wasm } from '@vscode/wasm-wasi';

export class TestWaswm {

    public async activate(context: vscode.ExtensionContext): Promise<void> {
        const wasm = await Wasm.load();
        const uri = vscode.Uri.joinPath(context.extensionUri, 'hello.wasm');

        context.subscriptions.push(
            vscode.commands.registerCommand('wasm.test', () => this.run(wasm, uri))
        );
    }

    public async run(wasm: Wasm, uri: vscode.Uri) {
        // Create a pseudoterminal to provide stdio to the WASM process.
        const pty = wasm.createPseudoterminal();
        const terminal = vscode.window.createTerminal({
            name: 'WASM Test',
            pty,
            isTransient: true
        });
        terminal.show(true);

        try {
            // Load the WASM module. It is stored alongside the extension's JS code.
            // So we can use VS Code's file system API to load it. Makes it
            // independent of whether the code runs in the desktop or the web.
            const bits = await vscode.workspace.fs.readFile(uri);
            const module = await WebAssembly.compile(bits);
            // Create a WASM process.
            const process = await wasm.createProcess('hello', module, { stdio: pty.stdio });
            // Run the process and wait for its result.
            const result = await process.run();
            if (result !== 0) {
                await vscode.window.showErrorMessage(`Process hello ended with error: ${result}`);
            }
        } catch (error) {
            // Show an error message if something goes wrong.
            await vscode.window.showErrorMessage((error as Error).message);
        }
    }
}
