export interface LeaderSnapshot {
    id: string;
    daysSince2000: number;
    date: Date;
    leaderDataEntries: Array<LeaderDataEntry>;
}

export interface LeaderDataEntry {
    id: string;
    daysSince2000: number;
    date: Date;
    personId: string;
    name: string;
    level: number;
    oneToOneQuartiles: OneToOneQuartiles;
}
export interface OneToOneQuartiles {
    n: number;
    minimum: string;
    q1: string;
    median: string;
    q3: string;
    maximum: string;
    iqr: string;
}
