import type { Timestamp } from "firebase/firestore";

export interface AddedPaymentCard{
    card_name: string;
    tokenID: string;
    added: Timestamp;
    default: boolean;
}

export interface Bill{
    amount: number;
    reason: string;
    timestamp: Timestamp;
}