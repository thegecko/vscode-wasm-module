/**
 * Copyright (C) 2023 Arm Limited
 */

import * as vscode from 'vscode';

export enum Verbosity {
    off = 0,
    error = 1,
    warn = 2,
    info = 3,
    debug = 4
}

export interface ILogger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(verbosity: Verbosity, message: string | any): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message: string | any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (message: string | any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (message: string | any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (message: string | any) => void;
}

export class Logger implements ILogger {
    public static instance = new Logger();

    protected outputChannel = vscode.window.createOutputChannel('Test WASM');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public log(_verbosity: Verbosity, message: string | any): void {
        if (typeof message !== 'string') {
            message = JSON.stringify(message, undefined, '\t');
        }

        this.outputChannel.appendLine(message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public error = (message: string | any): void => this.log(Verbosity.error, message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public warn = (message: string | any): void => this.log(Verbosity.warn, message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public info = (message: string | any): void => this.log(Verbosity.info, message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public debug = (message: string | any): void => this.log(Verbosity.debug, message);
}

export const logger = Logger.instance;
