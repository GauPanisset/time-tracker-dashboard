const isNotNull = <T>(maybe: T | null): maybe is T => maybe !== null

export { isNotNull }
