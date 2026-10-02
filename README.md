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