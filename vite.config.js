import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        favorites: resolve(__dirname, 'src/favorites/index.html'),
        'activity-details': resolve(__dirname, 'src/activity-details/index.html'),
        'add-activity': resolve(__dirname, 'src/add-activity/index.html'),
        success: resolve(__dirname, 'src/add-activity/success.html'),
        activity: resolve(__dirname, 'src/activity/index.html'),
        admin: resolve(__dirname, 'src/admin/index.html'),
        developers: resolve(__dirname, 'src/developers/index.html'),
        profile: resolve(__dirname, 'src/profile/index.html')
      }
    }
  }
});
