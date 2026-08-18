import { release } from './modules/infrastructure/config/release.js';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log(`[OpsAcademy] runtime boot ${release.version} · ${release.channel} · Next ${release.next} · Node ${process.version}`);
  }
}
