import { OneToOneQuartiles } from "./OneToOneQuartiles";

export interface LeaderDataEntry {
    id: string;
    name: string;
    oneToOneQuartiles: OneToOneQuartiles;
}
