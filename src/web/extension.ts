/**
 * Copyright (C) 2023 Arm Limited
 */

import * as vscode from 'vscode';
import { TestWaswm } from '../test-wasm';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    const testWasm = new TestWaswm();
    await testWasm.activate(context);
};

export const deactivate = async (): Promise<void> => {
    // Do nothing for now
};
