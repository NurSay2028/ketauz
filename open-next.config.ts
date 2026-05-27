// @opennextjs/cloudflare configuration
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

// No KV namespace required for basic deployment.
// To enable incremental caching, create a KV binding named "NEXT_INC_CACHE_KV"
// in Cloudflare dashboard, then uncomment below:
//
// import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
// export default defineCloudflareConfig({ incrementalCache: kvIncrementalCache });

export default defineCloudflareConfig();
