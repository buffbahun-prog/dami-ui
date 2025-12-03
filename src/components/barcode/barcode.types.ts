export type BarcodeType = "ean13" | "ean8" | "upca" | "upce" | "code11" | "code39" | "code39Extended" | "code93" | "code93Extended" | "code128" | "GS1-128" | "MSImod10" | "MSImod11" | "MSImod1010" | "MSImod1110" | "postnet";

export interface IBarcodeAttr {
    type: BarcodeType | null;
    value: string | null;
}