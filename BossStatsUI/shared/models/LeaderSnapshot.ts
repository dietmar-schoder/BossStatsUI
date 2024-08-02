import { LeaderDataEntry } from "./LeaderDataEntry.js";

export interface LeaderSnapshot {
    id: string | undefined;
    daysSince2000: number | undefined;
    leaderDataEntries: Array<LeaderDataEntry> | undefined;
}
