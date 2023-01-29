import { Activity } from '@/enums/activity'

const backgroundColorByActivity = {
  [Activity.Break]: 'bg-light',
  [Activity.Development]: 'bg-yellow-500',
  [Activity.Documentation]: 'bg-blue-500',
  [Activity.Fix]: 'bg-orange-500',
  [Activity.Formation]: 'bg-amber-900',
  [Activity.Meeting]: 'bg-purple-500',
  [Activity.Process]: 'bg-red-500',
  [Activity.Specification]: 'bg-green-500',
}

export { backgroundColorByActivity }
