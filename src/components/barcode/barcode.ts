import templateHTML from "./barcode.html?raw";
import { IBarcodeAttr } from "./barcode.types";
import { BarcodeBit, Code11Digit, Digit, bitMapTransform, code39Or93ExtendedNormalize, encodeCode11, encodeCode39, encodeCode93, encodeEan13, encodeEan8, encodeUpca, encodeUpce, getEan13LongTailPos, getEan8LongTailPos, getUpcaLongTailPos, getUpceLongTailPos, isValidCode11, isValidCode39Or93, isValidCode93, mapValueToCode39Or93Digits } from "./utils/encoding";

const template = document.createElement("template");
template.innerHTML = templateHTML;

const svgns = "http://www.w3.org/2000/svg";

const svgRelativeX = 0;
const svgRelativeY = 0;
const svgRelativeWidth = 300;
const svgRelativeHeight = 150;

const viewBoxValue = `${svgRelativeX} ${svgRelativeY} ${svgRelativeWidth} ${svgRelativeHeight}`;

const xTotalPadding = 64;
const yTotalPadding = 52;

class Barcode extends HTMLElement {
    static observedAttributes: (keyof IBarcodeAttr)[] = ["type", "value"];
    svgElm: SVGSVGElement | null;
    constructor() {
        super();
        this.svgElm = null;
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(template.content.cloneNode(true));
        this.svgElm = shadow.querySelector("svg");
        this.svgElm?.setAttribute("viewBox", viewBoxValue);
        this.onBarcodeAttrChange();
    }

    attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null
    ) {
        this.onBarcodeAttrChange();
    }

    onBarcodeAttrChange() {
        try {
            const barcodeBitAry = this.getBarcodeBits();
            const value = this.getAttribute("value") ?? '';
            this.drawBarcode(...barcodeBitAry, value);
        } catch (e) {
            throw e;
        }
    }

    getBarcodeBits(): [BarcodeBit[], number[]] {
        try {
            const type = (this.getAttribute("type") || null) as IBarcodeAttr["type"];
            const value: IBarcodeAttr["value"] = this.getAttribute("value") || null;
            if (type === "ean13" || type === null) {
                const regex = /^\d{12}$/;
                if (value === null || !regex.test(value.trim())) throw Error("12 digits required.");
                const digitValue = value.trim().split("").
                                    map(dgStr => parseInt(dgStr)).
                                    filter(dg => !isNaN(dg)) as Digit[];
                return [encodeEan13(digitValue), getEan13LongTailPos()];
            } else if (type === "ean8") {
                const regex = /^\d{7}$/;
                if (value === null || !regex.test(value.trim())) throw Error("7 digits required.");
                const digitValue = value.trim().split("").
                                    map(dgStr => parseInt(dgStr)).
                                    filter(dg => !isNaN(dg)) as Digit[];
                return [encodeEan8(digitValue), getEan8LongTailPos()];
            } else if (type === "upca") {
                const regex = /^\d{11}$/;
                if (value === null || !regex.test(value.trim())) throw Error("11 digits required.");
                const digitValue = value.trim().split("").
                                    map(dgStr => parseInt(dgStr)).
                                    filter(dg => !isNaN(dg)) as Digit[];
                return [encodeUpca(digitValue), getUpcaLongTailPos()];
            } else if (type === "upce") {
                const regex = /^\d{6}$/;
                if (value === null || !regex.test(value.trim())) throw Error("6 digits required.");
                const digitValue = value.trim().split("").
                                    map(dgStr => parseInt(dgStr)).
                                    filter(dg => !isNaN(dg)) as Digit[];
                return [encodeUpce(digitValue), getUpceLongTailPos()];
            } else if (type === "code11") {
                const [isValid, message] = isValidCode11(value);
                if (value === null || !isValid) throw Error(message);
                const digitValue = value.trim().split("").
                                    map(dgStr => dgStr === "-" ? 10 : parseInt(dgStr)).
                                    filter(dg => !isNaN(dg)) as Code11Digit[];
                return [encodeCode11(digitValue), []];
            } else if (type === "code39") {
                const [isValid, message] = isValidCode39Or93(value);
                if (value === null || !isValid) throw Error(message);
                const digitValue = mapValueToCode39Or93Digits(value);
                return [encodeCode39(digitValue), []];
            } else if (type === "code39Extended") {
                const isValid = /^[\x00-\x7F]*$/.test(value ?? "");
                if (!isValid) throw Error("Only ASCII characters are allowed for code-39 (extended)");
                const mappedValue = code39Or93ExtendedNormalize(value ?? "");
                const digitValue = mapValueToCode39Or93Digits(mappedValue);
                return [encodeCode39(digitValue), []];
            } else if (type === "code93") {
                const [isValid, message] = isValidCode39Or93(value);
                if (value === null || !isValid) throw Error(message);
                const digitValue = mapValueToCode39Or93Digits(value, true);
                return [encodeCode93(digitValue), []];
            } else if (type === "code93Extended") {
                const isValid = /^[\x00-\x7F]*$/.test(value ?? "");
                if (!isValid) throw Error("Only ASCII characters are allowed for code-93 (extended)");
                const mappedValue = code39Or93ExtendedNormalize(value ?? "", true);
                const digitValue = mapValueToCode39Or93Digits(mappedValue, true);
                return [encodeCode93(digitValue), []];
            } else {
              throw Error("Give proper barcode type and its respective value to encode");   
            }
        } catch (e) {
            throw e;
        }
    }

    drawBarcode(bitAry: BarcodeBit[], longTailPos: number[] = [], displayText: string) {
        if (this.svgElm === null || bitAry.length <= 0) return;

        const totalWidth = 300;
        const totalHeight = 150;

        const barcodeWidth = totalWidth - xTotalPadding;
        const barcodeHeight = totalHeight - yTotalPadding;

        const barWidth = (barcodeWidth / bitAry.length);

        const barcodeTopMargin = -20;
        const startX = xTotalPadding / 2;
        const startY = (yTotalPadding + barcodeTopMargin) / 2;

        const bar0Color = 'white';
        const bar1Color = 'black';
        const longTailExtraHeight = 10;

        const barWidthMap = bitMapTransform(bitAry);

        let xPos = startX; 

        for (const [indx, bitWidth] of barWidthMap.entries()) {
            const rectWidth = barWidth * Math.abs(bitWidth);
            const rectHeight = barcodeHeight + (longTailPos.includes(barWidthMap.slice(0, indx + 1).reduce((acc, cur) => acc + Math.abs(cur), 0) - 1) ? longTailExtraHeight : 0);
            const rectElm = document.createElementNS(svgns, 'rect');

            rectElm.setAttribute("x", `${xPos}`);
            rectElm.setAttribute("y", `${startY}`);

            rectElm.setAttribute("width", `${rectWidth}`);
            rectElm.setAttribute("height", `${rectHeight}`);

            rectElm.setAttribute("fill", bitWidth < 0 ? bar0Color : bar1Color);

            this.svgElm.appendChild(rectElm);
            xPos += rectWidth;
        }

        const textElm = document.createElementNS(svgns, 'text');
        textElm.setAttribute("dominant-baseline", "text-before-edge");
        textElm.textContent = displayText;
        this.svgElm.appendChild(textElm);

        const textTopMargin = 5;
        const textWidth = textElm.clientWidth;
        const textXPos = (totalWidth / 2) - (textWidth);
        const textYPos = startY + barcodeHeight + longTailExtraHeight + textTopMargin;
        textElm.setAttribute("x", `${textXPos}`);
        textElm.setAttribute("y", `${textYPos}`);
    }
}

customElements.define("dami-barcode", Barcode);