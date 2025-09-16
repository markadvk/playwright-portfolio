// Utility functions for file operations in tests
import path from 'path';

export function getTestFilePath(filename: string): string {
  return path.resolve(process.cwd(), 'src/utils/filesToUpload', filename);
}