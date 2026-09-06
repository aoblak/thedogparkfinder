// OOS read-only adapter for The Dog Park Finder.
// Security rule: browser is untrusted. No secrets, admin tokens, or privileged capabilities here.

(function () {
  const DEFAULT_TIMEOUT_MS = 1800;
  const READ_ONLY_CAPABILITIES = new Set(["parks.search", "parks.rank", "parks.read"]);

  function config() {
    const c = window.OOS_CONFIG || {};
    return {
      enabled: c.enabled === true,
      gatewayUrl: typeof c.gatewayUrl === "string" ? c.gatewayUrl.replace(/\/$/, "") : "",
      timeoutMs: Number.isFinite(c.timeoutMs) ? c.timeoutMs : DEFAULT_TIMEOUT_MS
    };
  }

  function assertCapability(capability) {
    if (!READ_ONLY_CAPABILITIES.has(capability)) {
      throw new Error(`OOS capability not allowed in browser pilot: ${capability}`);
    }
  }

  function withTimeout(ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return { controller, clear: () => clearTimeout(timer) };
  }

  async function call(capability, payload) {
    const cfg = config();
    assertCapability(capability);

    if (!cfg.enabled || !cfg.gatewayUrl) {
      return { ok: false, skipped: true, reason: "disabled" };
    }

    const timeout = withTimeout(cfg.timeoutMs);
    try {
      const response = await fetch(`${cfg.gatewayUrl}/v1/capabilities/${encodeURIComponent(capability)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        cache: "no-store",
        signal: timeout.controller.signal,
        body: JSON.stringify(payload || {})
      });

      if (!response.ok) throw new Error(`OOS gateway HTTP ${response.status}`);

      const data = await response.json();
      if (!data || typeof data !== "object") throw new Error("Invalid OOS response");

      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error) };
    } finally {
      timeout.clear();
    }
  }

  window.OOS = Object.freeze({
    search: (query, limit = 20) => call("parks.search", { query, limit }),
    rank: (parks, context = {}) => call("parks.rank", { parks, context }),
    read: (id) => call("parks.read", { id })
  });
})();
