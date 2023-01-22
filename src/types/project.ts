import { Status } from '@/enums/status'

type Project = {
  id: string
  name: string
  status: Status
  storyPoints: number | null
}

export type { Project }
