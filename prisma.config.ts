import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  // Tentukan lokasi file schema Anda
  schema: 'prisma/schema.prisma',

  datasource: {
    /** * Gunakan URL NON_POOLING untuk perintah CLI (db pull/push).
     * Tanda '!' memberi tahu TS bahwa variabel ini pasti ada di .env.
     */
    url: process.env.POSTGRES_URL_NON_POOLING!,
  },
});
