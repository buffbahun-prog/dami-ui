import "./components/barcode/barcode";
import { bitMapTransform } from "./components/barcode/utils/encoding";

console.log(bitMapTransform([1,0,1,0,0,0,1,1,0,0,1,0]));