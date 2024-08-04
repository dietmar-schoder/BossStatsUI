import { OneToOneQuartiles } from "./OneToOneQuartiles.js";

export interface LeaderDataEntry {
    id: string;
    personId: string;
    name: string;
    oneToOneQuartiles: OneToOneQuartiles;
}
