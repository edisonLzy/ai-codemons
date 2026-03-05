#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const CONFIG_DIR = join(dirname(process.argv[1]), '../store');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

interface Config {
  [key: string]: string | number | boolean | null;
}

function loadConfig(): Config {
  if (!existsSync(CONFIG_FILE)) {
    return {};
  }
  try {
    const content = readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function saveConfig(config: Config): void {
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n');
}

function init(): void {
  if (!existsSync(CONFIG_DIR)) {
    console.error('Store directory does not exist');
    process.exit(1);
  }
  if (!existsSync(CONFIG_FILE)) {
    saveConfig({});
    console.log('Initialized empty config file');
  } else {
    console.log('Config file already exists');
  }
}

function get(key: string): void {
  const config = loadConfig();
  const value = config[key];
  if (value === undefined) {
    console.log('');
  } else {
    console.log(value);
  }
}

function set(key: string, value: string): void {
  const config = loadConfig();
  config[key] = value;
  saveConfig(config);
  console.log(`Set ${key} = ${value}`);
}

function list(): void {
  const config = loadConfig();
  console.log(JSON.stringify(config, null, 2));
}

function remove(key: string): void {
  const config = loadConfig();
  delete config[key];
  saveConfig(config);
  console.log(`Deleted ${key}`);
}

function check(key: string): void {
  const config = loadConfig();
  const exists = config[key] !== undefined && config[key] !== null && config[key] !== '';
  console.log(
    JSON.stringify({
      exists,
      key,
      value: exists ? config[key] : null,
    })
  );
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'init':
    init();
    break;
  case 'get':
    if (!arg1) {
      console.error('Usage: config-manager.ts get <key>');
      process.exit(1);
    }
    get(arg1);
    break;
  case 'set':
    if (!arg1 || !arg2) {
      console.error('Usage: config-manager.ts set <key> <value>');
      process.exit(1);
    }
    set(arg1, arg2);
    break;
  case 'list':
    list();
    break;
  case 'delete':
    if (!arg1) {
      console.error('Usage: config-manager.ts delete <key>');
      process.exit(1);
    }
    remove(arg1);
    break;
  case 'check':
    if (!arg1) {
      console.error('Usage: config-manager.ts check <key>');
      process.exit(1);
    }
    check(arg1);
    break;
  default:
    console.log('Usage: config-manager.ts <command> [args]');
    console.log('');
    console.log('Commands:');
    console.log('  init              Initialize config file');
    console.log('  get <key>         Get config value');
    console.log('  set <key> <value> Set config value');
    console.log('  list              List all config');
    console.log('  delete <key>     Delete config key');
    console.log('  check <key>      Check if config exists (JSON output)');
}
