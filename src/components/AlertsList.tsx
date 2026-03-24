import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, XCircle, Bell } from 'lucide-react'

interface AlertsListProps {
  alerts: string[]
}

const getAlertStyle = (alert: string) => {
  if (alert.includes('🚨') || alert.includes('High Risk'))
    return { icon: AlertTriangle, bg: 'bg-destructive/5 border-destructive/20', iconColor: 'text-destructive' }
  if (alert.includes('✅') || alert.includes('Safe'))
    return { icon: CheckCircle2, bg: 'bg-success/5 border-success/20', iconColor: 'text-success' }
  return { icon: XCircle, bg: 'bg-warning/5 border-warning/20', iconColor: 'text-warning' }
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Bell className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No alerts yet</p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Run monitoring to detect blockchain risks
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert, i) => {
          const style = getAlertStyle(alert)
          const Icon = style.icon
          return (
            <motion.div
              key={`${alert}-${i}`}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`flex items-start gap-3 rounded-xl border p-4 ${style.bg}`}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.iconColor}`} />
              <p className="text-sm text-foreground">{alert}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default AlertsList
