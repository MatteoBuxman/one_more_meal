import type { Timestamp } from "firebase/firestore";

export interface AddedPaymentCard{
    cardName: string;
    tokenID: string;
    added: Timestamp;
    default: boolean;
}

export interface Bill{
    amount: number;
    reason: string;
    timestamp: Timestamp;
}