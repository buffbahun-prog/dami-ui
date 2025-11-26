export type BarcodeType = "ean13" | "ean8" | "upca" | "upce" | "code11" | "code39" | "code39Extended" | "code93" | "code93Extended";

export interface IBarcodeAttr {
    type: BarcodeType | null;
    value: string | null;
}