import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // อนุญาตให้เข้าถึงจากเครือข่ายภายใน
    port: 3000,      // กำหนดพอร์ต (สามารถเปลี่ยนได้หากต้องการ)
  }
})
