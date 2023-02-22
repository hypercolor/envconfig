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

export function required(target: any, key: any) {
    const value = loadConfig(key);
    if (!value && process.env.TEST !== 'true') {
        console.log("Config: ", key + " environment variable not found, terminating server...");
        process.exit(1);
    } else {
        target[key] = value || '';
    }
}
