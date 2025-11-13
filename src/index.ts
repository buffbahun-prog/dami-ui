import { ean13CalcChecksum, encodeEan13 } from "./components/barcode/utils/encoding";

console.log(ean13CalcChecksum([8,7,1,1,2,5,3,0,0,1,2,0]));
encodeEan13([8,7,1,1,2,5,3,0,0,1,2,0]);