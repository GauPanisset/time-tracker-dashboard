type Period = {
  start: Date
  end: Date | null
}

type Sprint = {
  id: string
  name: string
  period: Period
}

export type { Period, Sprint }
