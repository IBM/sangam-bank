import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thefuture.bank',
  appName: 'the-future',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // cleartext: true
  }
};

export default config;
