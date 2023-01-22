/**
 * Possible tasks activity.
 */
enum Activity {
  Break = 'Break',
  Development = 'Development',
  Documentation = 'Documentation',
  Fix = 'Fix',
  Formation = 'Formation',
  Meeting = 'Meeting',
  Process = 'Process',
  Specification = 'Specification',
}

/**
 * Check whether a given activity is valid or not.
 * @param maybeActivity activity to check
 */
const isActivity = (maybeActivity: unknown): maybeActivity is Activity => {
  const typedActivity = maybeActivity as Activity

  return (
    typeof typedActivity === 'string' &&
    Object.values(Activity).includes(typedActivity)
  )
}

export { Activity, isActivity }
