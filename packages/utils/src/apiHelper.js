/**
 * JSON fetch with optional timeout and retries for flaky networks.
 *
 * @param {string} url
 * @param {RequestInit & { body?: unknown; timeoutMs?: number; retries?: number }} [options]
 */
export async function apiHelper(url, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    timeoutMs = 15000,
    retries = 0,
    signal: userSignal,
    ...rest
  } = options;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await apiHelperOnce(url, {
        method,
        headers,
        body,
        timeoutMs,
        signal: userSignal,
        ...rest,
      });
    } catch (err) {
      lastError = err;
      const retryable = shouldRetry(err, attempt, retries);
      if (!retryable) {
        throw err;
      }
      await sleep(250 * (attempt + 1));
    }
  }
  throw lastError;
}

/**
 * @param {unknown} err
 * @param {number} attempt
 * @param {number} retries
 */
function shouldRetry(err, attempt, retries) {
  if (attempt >= retries) {
    return false;
  }
  if (err && typeof err === "object" && "status" in err) {
    const s = /** @type {{ status?: number }} */ (err).status;
    if (typeof s === "number" && s >= 500 && s < 600) {
      return true;
    }
  }
  if (err instanceof TypeError) {
    return true;
  }
  return false;
}

/** @param {number} ms */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * @param {string} url
 * @param {RequestInit & { body?: unknown; timeoutMs?: number; signal?: AbortSignal }} opts
 */
async function apiHelperOnce(url, opts) {
  const {
    method = "GET",
    headers = {},
    body,
    timeoutMs = 15000,
    signal: userSignal,
    ...rest
  } = opts;

  const combined = new AbortController();
  if (userSignal) {
    if (userSignal.aborted) {
      combined.abort();
    } else {
      userSignal.addEventListener("abort", () => combined.abort(), { once: true });
    }
  }

  let timeoutId;
  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      combined.abort(new Error("Request timeout"));
    }, timeoutMs);
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body != null ? JSON.stringify(body) : undefined,
      signal: combined.signal,
      ...rest,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const message =
        typeof data === "object" && data !== null && "message" in data
          ? String(data.message)
          : res.statusText;
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
