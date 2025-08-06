/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DetectedIde {
  VSCode = 'vscode',
  VSCodium = 'vscodium',
  Cursor = 'cursor',
  CloudShell = 'cloudshell',
  Codespaces = 'codespaces',
}

export function getIdeDisplayName(ide: DetectedIde): string {
  switch (ide) {
    case DetectedIde.VSCode:
      return 'VS Code';
    case DetectedIde.VSCodium:
      return 'VSCodium';
    case DetectedIde.Cursor:
      return 'Cursor';
    case DetectedIde.CloudShell:
      return 'Cloud Shell';
    case DetectedIde.Codespaces:
      return 'GitHub Codespaces';
    default: {
      // This ensures that if a new IDE is added to the enum, we get a compile-time error.
      const exhaustiveCheck: never = ide;
      return exhaustiveCheck;
    }
  }
}

export function detectIde(): DetectedIde | undefined {
  if (process.env.CURSOR_TRACE_ID) {
    return DetectedIde.Cursor;
  }
  if (process.env.CODESPACES) {
    return DetectedIde.Codespaces;
  }
  if (process.env.EDITOR_IN_CLOUD_SHELL === 'true') {
    return DetectedIde.CloudShell;
  }
  if (process.env.PATH?.includes('vscodium')) {
    return DetectedIde.VSCodium;
  }
  if (process.env.TERM_PROGRAM === 'vscode') {
    return DetectedIde.VSCode;
  }
  return undefined;
}
