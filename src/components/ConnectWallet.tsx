import { useWallet } from '@txnlab/use-wallet-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConnectWalletProps {
  open: boolean
  onClose: () => void
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ open, onClose }) => {
  const { wallets, activeAddress } = useWallet()

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {activeAddress ? 'Wallet Connected' : 'Connect Wallet'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeAddress && (
              <div className="mb-4 rounded-xl border border-border bg-muted/50 p-4">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Active Address</p>
                <p className="font-mono text-sm text-foreground">
                  {truncateAddress(activeAddress)}
                </p>
              </div>
            )}

            <div className="space-y-2">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={async () => {
                    if (wallet.isConnected) {
                      await wallet.disconnect()
                    } else {
                      await wallet.connect()
                    }
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    {wallet.metadata?.icon && (
                      <img
                        src={wallet.metadata.icon}
                        alt={wallet.metadata.name}
                        className="h-8 w-8 rounded-lg"
                      />
                    )}
                    <span className="font-medium text-foreground">
                      {wallet.metadata?.name || wallet.id}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      wallet.isConnected
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {wallet.isConnected ? 'Disconnect' : 'Connect'}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConnectWallet
