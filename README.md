# ALEPH BOT
Discord.js based Discord bot developed on Android. Honestly, this is my first project ever made. And this bot is for my own server, besides I will learn new things on my own too! :D

## REQUIREMENTS
- Node.js v24
- Discord.js v14
- Dotenv v17
- Eslint v10

# CHANGELOG & VERSION 0.1 DOCUMENTATION

## OVERVIEW
This document summarizes the architectural evolution, structural additions, and environmental configurations established from the initial project setup up to completion of version 0.1 (Preparations Segment: Environment).

## Key Additions & Changes
1. **Environment Setup & Configuration**
- Initialized the project with Node.js and `npm` as the package manager.
- Linked the project to a GitHub repository with proper `.gitignore` configuration.
- Established early `.env` variable controles for environment isolation (`development` and `production`).

2. **Core Architectural Structure**
- Implemented a clean, modular directory tree containing strictly necessary folders:
- `utils/`: Houses pure utility modules.
- `handlers/`: Dedicated file loaders responsible for safe execution and dependancy injection via `require()`.
- `events/`: Reserved for individual event-driven listeners.

3. **Recursive File Utility Development**
- Built a clean and flexible recursive file-scanning utility leveraging native Node.js `fs` and `path` modules.
- Ensured a clean, flat architecture using guard clauses and spread operators, avoiding nested complexity.

# CHANGELOG & VERSION 0.2 DOCUMENTATION

## Overview
This document outlines the architectural refactoring, error handling implementation, and the establishment of the Event Hanlder system completed during version 0.2. The core focus was on applying the Single Responsbility Principle (SRP) and the Singleton Pattern to ensure a robust and crash-resistant backend.

## Key Additions & Changes
1. **Singleton Client Architecture**
- Extracted the Discord Client instantiation into a dedicated module (`client.js`);
- Ensured only a single, globally accessible instance of the bot is created and cached by Node.js itself, preventing memory leaks and redundant logins.

2. **Event Hanlder Implementation (SRP)**
- Developed `handlers/eventLoader.js` dedicated solely to reading and binding event files.
- Integrated the custom recursive file scanner to dynamically load events from `events/` directory without hardcoding.

3. **Entry Point Refactoring**
- Streamlined `index.js` to act strictly as the bootstrapper/ignition switch.
- Its only responsibilities are loading environment varibles, executing the loaders, and calling `client.log()`.

4. **First Lifecycle Event**
- Created `events/ready.js` (executing `once`) to log a confirmation message when the bot successfully connects to the Discord Gateway.

5. **Error Handling & Resilience**
- Enforced strict `try...catch` blocks around dynamic module loading (`require`) to prevent isolated file error from crashing the main forces.
- Designed the blueprint for a global crash handler system (`process.on`) to catch unhandled rejectiojns and uncaught exceptions.

## Errors Encountered & Resolutions
- **Issue Encountered:** `ReferenceError: recursive is not defined` occured at `eventLoader.js` during the initial test run.
- **Root Cause:** A mismatch in variable naming during module import. The loader attempted to call `recursive()`, but the imported utility function had been renamed.
- **Resolution:** Corrected the destructuring correctly to `const { findFiles } = require('../utils/recursive)` and updated the execution logic to use `findFiles(folder)`.
- **Result:** The error was resolved, and the bot successfully authenticated and logged into the Discord Gateway as `Aleph#9927`.