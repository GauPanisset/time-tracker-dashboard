/**
 * Service implementing a simple cache system.
 */
class CacheService<T> {
  private readonly store: Map<string, T>

  constructor() {
    this.store = new Map<string, T>()
  }

  /**
   * Retrieve the value linked to the given key is it exists.
   * Otherwise it calls the `callback` function supposed to fetch the data.
   * Then it stores the new value in the cache.
   * @param key
   * @param callback
   */
  public async withCache(
    key: string,
    callback: () => Promise<T> | T
  ): Promise<T> {
    const fromCache = this.store.get(key)
    if (fromCache) return fromCache

    const newValue = await callback()
    this.store.set(key, newValue)

    return newValue
  }
}

export { CacheService }
