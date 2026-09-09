import { environment } from "@/environments/environment";

type Payload = Record<string, string | number | boolean>;

/**
 * Stand-in for the tag manager. Events are buffered so the page never depends
 * on a third-party script having loaded.
 */
class AnalyticsService {
  private queue: Array<{ event: string; payload: Payload; at: number }> = [];

  track(event: string, payload: Payload = {}) {
    this.queue.push({ event, payload, at: Date.now() });
    if (!environment.production) {
      console.info(`[analytics] ${event}`, payload);
    }
  }

  drain() {
    const events = this.queue;
    this.queue = [];
    return events;
  }
}

export const analyticsService = new AnalyticsService();
