// This script can be used to create a downloadable archive of the project
// Run with: node download-helper.js

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Creating project archive...');

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(__dirname, 'project-archive.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Archive created successfully!');
  console.log(`Total size: ${archive.pointer()} bytes`);
  console.log('File saved as project-archive.zip in the project root directory');
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories to the archive
// Excluding node_modules and other large/unnecessary directories
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    '.git/**',
    'dist/**',
    '*.zip',
    'download-helper.js'
  ]
});

// Finalize the archive
archive.finalize();