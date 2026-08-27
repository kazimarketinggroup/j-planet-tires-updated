// Session-scoped stale-while-revalidate fetch cache.
//
// On repeat visits within the same browser session, `apply` is called
// immediately with the cached data (instant render), then again with fresh
// data once the network responds — so pages like the Tires catalogue don't
// show a loading skeleton every time the user navigates back to them.
//
// If the network fails but a cached copy was already applied, the error is
// swallowed (the user keeps seeing the cached data). With no cache, the error
// propagates so callers can show their normal error state.
const PREFIX = 'jp_swr:';

export async function swrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  apply: (data: T, fromCache: boolean) => void,
): Promise<void> {
  let hadCache = false;
  try {
    const raw = sessionStorage.getItem(PREFIX + key);
    if (raw !== null) {
      apply(JSON.parse(raw) as T, true);
      hadCache = true;
    }
  } catch {
    // Unreadable cache entry — fall through to the network.
  }

  try {
    const fresh = await fetcher();
    apply(fresh, false);
    try {
      sessionStorage.setItem(PREFIX + key, JSON.stringify(fresh));
    } catch {
      // Storage full/unavailable — caching is best-effort.
    }
  } catch (err) {
    if (!hadCache) throw err;
  }
}
