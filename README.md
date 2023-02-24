# @hypercolor/envconfig

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [License](LICENSE)
- [More Information](#more-information)
    - [Toolchain](#toolchain)
    - [Project Repository](#project-repository)
    - [Organization Repository](#organization-repository)

## Introduction
Use decorators to pull in configuration data from environment variables or volume mounts. Use the "fail fast" principle to ensure that all required variables are present before the application starts.

Adding the `@requiredEnv` or `@optionalEnv` decorator to a variable `HOST_URL` will do the following:
* If `process.env.HOST_URL` is defined, use that value
* If a volume mount is present at `/etc/config/env/HOST_URL`, use that value
* If a volume mount is present at `/etc/config/sec/HOST_URL`, use that value
* For `@requiredEnv`, if none of the above are present, throw an error

## Installation
- NPM
    - `npm i @hypercolor/envconfig`
- Yarn
    - `yarn add @hypercolor/envconfig`

## Usage

```typescript
import {requiredEnv} from '@hypercolor/envconfig';

export class ConfigVariables {
  @requiredEnv() public ENVIRONMENT_NAME: string;
  @requiredJsonEnv() public SOME_PRIVATE_KEY_JSON: IPrivateKeyJson;
  @optionalEnv() public DEBUG?: string;
}

```


## More Information

#### [Project Repository](https://github.com/hypercolor/envconfig)

#### [Organization Repository](https://github.com/hypercolor/)
