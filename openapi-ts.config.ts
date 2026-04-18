import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:3000/docs-json',
  output: 'src/client',
  plugins: [
    {
      enums: true,
      name: '@hey-api/typescript',
    },
  ],
});
