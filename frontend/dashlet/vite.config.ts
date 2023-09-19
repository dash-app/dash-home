import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: env.PORT ? parseInt(env.PORT) : undefined,
    },
    define: {
      _API_ADDRESS_: JSON.stringify(process.env.API_ADDRESS),
      _RELEASE_VERSION_: JSON.stringify(process.env.RELEASE_VERSION),
    }
  };
});
