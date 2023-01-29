type Period = {
  start: Date
  end: Date | null
}

type SerializedPeriod = {
  start: string
  end: string | null
}

type SerializedSprint = Omit<Sprint, 'period'> & { period: SerializedPeriod }

type Sprint = {
  id: string
  name: string
  period: Period
}

export type { Period, SerializedPeriod, SerializedSprint, Sprint }
