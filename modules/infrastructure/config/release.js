export const release = Object.freeze({
  product: 'OpsAcademy',
  version: '0.7.0',
  channel: 'V7 Deployment Ready',
  next: '15.5.21',
  react: '19.2.6',
  node: '22.x',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  rootDirectory: './',
  framework: 'Next.js',
  packageManager: 'npm',
  demoBuildRequiresEnvironment: false,
  releasedAt: '2026-08-18'
});

export const deploymentDefaults = Object.freeze({
  frameworkPreset: 'Next.js',
  branch: 'main',
  nodeVersion: '22.x',
  rootDirectory: './',
  buildCommand: 'npm run build',
  packageManager: 'npm',
  outputDirectory: '.next'
});
