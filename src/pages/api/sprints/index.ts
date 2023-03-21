import type { NextApiRequest, NextApiResponse } from 'next'

import { SprintService } from '@/services/sprint'
import type { Sprint } from '@/types/sprint'

// import sprints from './mockSprints.json'

const sprintService = new SprintService()

const handler = async (req: NextApiRequest, res: NextApiResponse<Sprint[]>) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const sprints = await sprintService.getSprints()
        res.status(200).json(sprints) //as unknown as Sprint[])
      } catch (error) {
        console.error(error)
        res.status(404).end(`No sprint found`)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
