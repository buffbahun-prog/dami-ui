export type BarcodeType = "ean13" | "ean8" | "upca" | "upce";

export interface IBarcodeAttr {
    type: BarcodeType | null;
    value: string | null;
}