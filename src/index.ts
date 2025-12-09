import "./components/barcode/barcode";
import { QrErrorCorrection } from "./components/qrcode/qrcode.types";
import { encodeQr } from "./components/qrcode/utils/encoding";

encodeQr("HELLO WORLD", QrErrorCorrection.M);