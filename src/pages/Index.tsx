import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Activity, Wallet, Play, Zap, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConnectWallet from '@/components/ConnectWallet'
import AlertsList from '@/components/AlertsList'
import StatsCard from '@/components/StatsCard'

const Index = () => {
  const { activeAddress } = useWallet()
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [scanCount, setScanCount] = useState(0)

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const runMonitoring = async () => {
    if (!activeAddress) return
    setIsMonitoring(true)

    // Simulated monitoring - replace with real contract client calls
    try {
      await new Promise((r) => setTimeout(r, 1500))
      const score = Math.floor(Math.random() * 20)
      setScanCount((c) => c + 1)

      let alert = ''
      if (score > 10) {
        alert = `🚨 High Risk Detected (Score: ${score}) — Suspicious activity flagged`
      } else {
        alert = `✅ System Safe (Score: ${score}) — No anomalies detected`
      }
      setAlerts((prev) => [alert, ...prev])
    } catch (err) {
      console.error(err)
      setAlerts((prev) => ['❌ Error fetching blockchain data', ...prev])
    } finally {
      setIsMonitoring(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">DeFi Shield</span>
          </div>

          <Button
            variant={activeAddress ? 'outline' : 'wallet'}
            size="sm"
            onClick={() => setOpenWalletModal(true)}
          >
            <Wallet className="h-4 w-4" />
            {activeAddress ? truncateAddress(activeAddress) : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            DeFi Monitoring Agent
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            AI-powered blockchain risk detection on Algorand. Monitor smart contracts,
            detect anomalies, and stay ahead of threats.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatsCard
            title="Scans Run"
            value={scanCount}
            subtitle="Total monitoring scans"
            icon={BarChart3}
            delay={0.1}
          />
          <StatsCard
            title="Alerts"
            value={alerts.length}
            subtitle="Total alerts generated"
            icon={Activity}
            delay={0.2}
          />
          <StatsCard
            title="Status"
            value={activeAddress ? 'Connected' : 'Disconnected'}
            subtitle={activeAddress ? 'Wallet active' : 'Connect to start'}
            icon={Zap}
            delay={0.3}
          />
        </div>

        {/* Action + Alerts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Controls
              </h2>
              <Button
                className="w-full"
                size="lg"
                onClick={runMonitoring}
                disabled={!activeAddress || isMonitoring}
              >
                <Play className="h-4 w-4" />
                {isMonitoring ? 'Scanning...' : 'Run Monitoring'}
              </Button>
              {!activeAddress && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Connect your wallet to start monitoring
                </p>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Alerts
                </h2>
                {alerts.length > 0 && (
                  <button
                    onClick={() => setAlerts([])}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <AlertsList alerts={alerts} />
            </div>
          </div>
        </div>
      </main>

      {/* Wallet Modal */}
      <ConnectWallet open={openWalletModal} onClose={() => setOpenWalletModal(false)} />
    </div>
  )
}

export default Index
