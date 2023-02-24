import * as fs from "fs";

function loadConfig(key: string) {
    if (process.env[key] !== undefined) {
        return process.env[key];
    }
    try {
        return fs.readFileSync('/etc/env/' + key, 'utf-8');
    } catch (err) {
        try {
            return fs.readFileSync('/etc/sec/' + key, 'utf-8');
        } catch (err) {
            return undefined;
        }
    }
}

export function optionalEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!!value) {
        target[key] = value || '';
    }
}

export function requiredEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!value && process.env.TEST !== 'true') {
        console.error('Config', key + 'not found, terminating process.');
        process.exit(1);
    } else {
        target[key] = value || '';
    }
}



export function requiredJsonEnv(target: any, key: any) {
    if (!process.env[key]) {
        console.error('Config', key + 'not found, terminating process.');
        process.exit(1);
    } else {
        try {
            target[key] = JSON.parse(process.env[key]!);
        } catch (err) {
            console.error('Error parsing JSON env for ' + key + ': ', err);
            process.exit(1)
        }
    }
}

export function requiredIntEnv(target: any, key: any) {
    if (!process.env[key]) {
        console.error('Config', key + 'not found, terminating process.');
        process.exit(1);
    } else {
        target[key] = parseInt(process.env[key]!);
    }
}
