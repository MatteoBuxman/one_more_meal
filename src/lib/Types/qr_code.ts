export interface Point {
    x: number;
    y: number;
}

export type SuccessfulQRCodeScanCallback =  (scanData : string) => void;
