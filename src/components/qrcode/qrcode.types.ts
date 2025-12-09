export enum QrEncoding {
    Numeric = "numeric", // 0-9
    AlphaNumeric = "alphanumeric", // 0-9, A-Z, $, %, *, +, -, ., /, and : as well as a space
    Byte = "byte",  // ISO/IEC 8859-1 character set
    // Kanji = "kanji",
    Utf8 = "utf8",
}

export enum QrErrorCorrection {
    L = "L",
    M = "M",
    Q = "Q",
    H = "H",
}

export interface IBarcodeAttr {
    encoding: QrEncoding | null;
    errorCorrection: QrErrorCorrection | null;
    value: string | null;
}