import type { IBarcodeAttr } from "./barcode.types";

declare global {
    interface HTMLElementTagNameMap {
        "dami-barcode": BarcodeElement
    }

    interface BarcodeElement extends HTMLElement, IBarcodeAttr {}
}

export {};