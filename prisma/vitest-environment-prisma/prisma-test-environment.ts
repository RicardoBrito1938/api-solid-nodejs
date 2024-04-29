import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Setting up Prisma test environment')

    return {
      async teardown() {
        console.log('Tearing down Prisma test environment')
      },
    }
  },
  transformMode: 'ssr',
}
