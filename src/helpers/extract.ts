import { Status } from '@/enums/status'
import parse from '@/helpers/parse'
import { PageObjectResponse } from '@/types/notion'
import { Period } from '@/types/sprint'

const date = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): Date | null => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'date'))
    throw new Error(
      `The property must be of type 'date' in order to extract the date`
    )

  const { date } = property

  if (!date) return null

  return new Date(date.start)
}

const formula = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): string | number | boolean | Period | null => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'formula'))
    throw new Error(
      `The property must be of type 'formula' in order to extract the formula`
    )

  const { formula } = property

  if (!formula) return null

  if (formula.type === 'boolean') return formula.boolean
  if (formula.type === 'date') {
    const { date } = formula

    if (!date) return null

    return {
      start: new Date(date.start),
      end: date.end ? new Date(date.end) : null,
    }
  }

  if (formula.type === 'number') return formula.number
  if (formula.type === 'string') return formula.string

  return null
}

const name = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): string | null => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'title'))
    throw new Error(
      `The property must be of type 'title' in order to extract the name`
    )

  const { title } = property

  if (!title) return null

  return parse.richText(title)
}

const number = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): number | null => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'number'))
    throw new Error(
      `The property must be of type 'number' in order to extract the number`
    )

  const { number } = property

  if (Number.isNaN(number)) return null

  return number
}

const period = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): Period | null => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'date'))
    throw new Error(
      `The property must be of type 'date' in order to extract the period`
    )

  const { date } = property

  if (!date) return null

  return {
    start: new Date(date.start),
    end: date.end ? new Date(date.end) : null,
  }
}

const relation = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): string[] => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'relation'))
    throw new Error(
      `The property must be of type 'relation' in order to extract the relation`
    )

  const { relation } = property

  return relation.map((r) => r.id)
}

const status = (
  properties: PageObjectResponse['properties'],
  propertyKey: string
): Status => {
  const { [propertyKey]: property } = properties

  if (!property)
    throw new Error(`The property named ${propertyKey} can't be found.`)

  if (!(property.type === 'status'))
    throw new Error(
      `The property must be of type 'status' in order to extract the status`
    )

  const { status: maybeStatus } = property

  if (!maybeStatus || !maybeStatus.name)
    throw new Error(`Missing 'status' or 'status.name' field in th property`)

  const status = maybeStatus.name as Status

  if (!Object.values(Status).includes(status))
    throw new Error(`Unknown status found: ${status}`)

  return status
}

/**
 * Helpers extracting the value of a page property given its type.
 */
const extract = { date, formula, name, number, period, relation, status }

export default extract
