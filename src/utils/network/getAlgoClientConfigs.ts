interface AlgodConfig {
  server: string
  port: string | number
  token: string
  network: string
}

interface KmdConfig {
  server: string
  port: string | number
  token: string
}

export function getAlgodConfigFromViteEnvironment(): AlgodConfig {
  return {
    server: import.meta.env.VITE_ALGOD_SERVER || 'https://testnet-api.algonode.cloud',
    port: import.meta.env.VITE_ALGOD_PORT || '',
    token: import.meta.env.VITE_ALGOD_TOKEN || '',
    network: import.meta.env.VITE_ALGOD_NETWORK || 'testnet',
  }
}

export function getKmdConfigFromViteEnvironment(): KmdConfig {
  return {
    server: import.meta.env.VITE_KMD_SERVER || 'http://localhost',
    port: import.meta.env.VITE_KMD_PORT || '4002',
    token: import.meta.env.VITE_KMD_TOKEN || 'a'.repeat(64),
  }
}
