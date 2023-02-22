# Hypercolor Envconfig

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
The team at Hypercolor uses this package to parse and annotate environment variables into a shared module. Linkage is made with `process.env`

## Installation
- NPM
    - `npm i @hypercolor/envconfig`
- Yarn
    - `yarn add @hypercolor/envconfig`


## Prerequisites
- `.env` file in the root of your project

#### *Compatible API Routing Architecture Overview*
- In order for the programmatic parsing of API routes and their associated documentation, routes need to be mounted into a specific format. Please visit the [example](#examples) section for more information and code examples.


## Usage
### `.env` file:
``` bash
ENVIRONMENT_NAME=development
```
### Parsed Config Variables:
```javascript
import {required} from '@hypercolor/envconfig';

export class ConfigVariables {
    @required() public ENVIRONMENT_NAME: string;
}

```
### Invocation:
```javascript
import ConfigVariables from './ConfigVariables';

export class Server {
    public static async start() {
        await DatabaseManager.connect({
          name: ConfigVariables.ENVIRONMENT_NAME,
          ...
        });
    }
}
```


## More Information
#### Toolchain
- Node.js
- TypeScript

#### [Project Repository](https://github.com/hypercolor/envconfig)

#### [Organization Repository](https://github.com/hypercolor/)
