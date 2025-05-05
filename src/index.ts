import { SanctifyApp } from './app';

async function main() {
  try {
    const app = new SanctifyApp();
    await app.initialize();

    // Example usage
    console.log('Sanctify application is running...');
    console.log('Monitoring sacred spaces and managing application access...');
  } catch (error) {
    console.error('Failed to start Sanctify application:', error);
    process.exit(1);
  }
}

main();