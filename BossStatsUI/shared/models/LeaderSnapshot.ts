import { LeaderDataEntry } from "./LeaderDataEntry.js";

export interface LeaderSnapshot {
    id: string;
    daysSince2000: number;
    leaderDataEntries: Array<LeaderDataEntry>;
}
