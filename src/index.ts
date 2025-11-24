import "./components/barcode/barcode";
import { code11CalcChecksum, ean13CalcChecksum } from "./components/barcode/utils/encoding";

console.log(ean13CalcChecksum([6,5,4,3,2,1]));
console.log(ean13CalcChecksum([0,6,5,1,0,0,0,0,4,3,2]));
console.log(code11CalcChecksum([6,3,3,6,3,7,10,3,6,5]));
// console.log(encodeCharCode39(26));