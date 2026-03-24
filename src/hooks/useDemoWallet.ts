import { useState, useCallback } from 'react'

const DEMO_ADDRESS = 'DEMO7IXKCEOJR3OLRX5NWG2RN3C4IA5PMZQ7VRA5UXMXCPQHTQ'

export function useDemoWallet() {
  const [demoAddress, setDemoAddress] = useState<string | null>(null)

  const connectDemo = useCallback(() => {
    setDemoAddress(DEMO_ADDRESS)
  }, [])

  const disconnectDemo = useCallback(() => {
    setDemoAddress(null)
  }, [])

  return { demoAddress, connectDemo, disconnectDemo, isDemoMode: !!demoAddress }
}
