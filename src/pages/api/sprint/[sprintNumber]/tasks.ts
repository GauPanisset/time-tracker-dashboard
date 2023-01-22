// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { TaskService } from '@/services/task'
import type { Task } from '@/types/task'

const taskService = new TaskService()

const handler = async (req: NextApiRequest, res: NextApiResponse<Task[]>) => {
  const { method, query } = req

  const sprintNumber =
    typeof query.sprintNumber === 'string'
      ? parseInt(query.sprintNumber, 10)
      : null

  if (sprintNumber === null) {
    res.status(400).end(`Sprint number should be provided`)
    return
  }

  switch (method) {
    case 'GET':
      const tasks = await taskService.getTasksBySprint(sprintNumber)
      res.status(200).json(tasks)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
