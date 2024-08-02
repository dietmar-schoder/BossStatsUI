import { OneToOneQuartiles } from "./OneToOneQuartiles.js";

export interface LeaderDataEntry {
    id: string;
    name: string;
    oneToOneQuartiles: OneToOneQuartiles;
}
