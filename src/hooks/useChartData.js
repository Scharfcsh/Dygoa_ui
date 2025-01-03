

import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'

export function useEnergyData(data) {
  return useMemo(() => {
    return data.map(item => ({
      time: format(parseISO(item.timestamp), 'HH:mm'),
      total_demand_kwh: item.total_demand_kwh,
      energy_produced_kwh: item.energy_produced_kwh
    }))
  }, [data])
}

