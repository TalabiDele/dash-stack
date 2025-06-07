import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/server/schema'
import { config } from 'dotenv'

console.log(process.env.POSTGRES_URL)

config({ path: '.env.local' })

const sql = neon(process.env.POSTGRES_URL!)
export const db = drizzle({ client: sql, schema, logger: true })
