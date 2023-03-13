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

export function optionalIntEnv(defaultValue: number) {
    return function (target: any, key: string) {
        const value = loadConfig(key);
        if (!!value) {
            target[key] = parseInt(value);
        } else {
            target[key] = defaultValue;
        }
    }
}

export function optionalStringEnv(defaultValue: number) {
    return function (target: any, key: string) {
        const value = loadConfig(key);
        if (!!value) {
            target[key] = value;
        } else {
            target[key] = defaultValue;
        }
    }
}

export function optionalEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!!value) {
        target[key] = value;
    }
}

export function optionalBooleanEnv(target: any, key: any) {
    const value = loadConfig(key);
    target[key] = value === 'true';
}

export function requiredEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!value && process.env.TEST !== 'true') {
        console.error('Config', key + ' not found, terminating process.');
        process.exit(1);
    } else {
        target[key] = value || '';
    }
}



export function requiredJsonEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!value) {
        console.error('Config', key + ' not found, terminating process.');
        process.exit(1);
    } else {
        try {
            target[key] = JSON.parse(value);
        } catch (err) {
            console.error('Error parsing JSON env for ' + key + ': ', err);
            console.error('Tried to parse: ', value);
            process.exit(1)
        }
    }
}

export function requiredIntEnv(target: any, key: any) {
    const value = loadConfig(key);
    if (!value) {
        console.error('Config', key + ' not found, terminating process.');
        process.exit(1);
    } else {
        target[key] = parseInt(value);
    }
}
