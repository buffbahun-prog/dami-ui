import templateHTML from "./qrcode.html?raw";
import { IQrcodeAttr, QrErrorCorrection } from "./qrcode.types";
import { QrcodeBit, encodeQr } from "./utils/encoding";

const template = document.createElement("template");
template.innerHTML = templateHTML;

const svgns = "http://www.w3.org/2000/svg";

const svgRelativeX = 0;
const svgRelativeY = 0;
const svgRelativeWidth = 300;
const svgRelativeHeight = svgRelativeWidth;

const viewBoxValue = `${svgRelativeX} ${svgRelativeY} ${svgRelativeWidth} ${svgRelativeHeight}`;

const xTotalPadding = 64;
const yTotalPadding = xTotalPadding;

class Qrcode extends HTMLElement {
    static observedAttributes: (keyof IQrcodeAttr)[] = ["errorcorrection", "value"];
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
        this.onQrcodeAttrChange();
    }

    attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null
    ) {
        this.onQrcodeAttrChange();
    }

    onQrcodeAttrChange() {
        try {
            const qrCodeBitMatrix = this.getQrcodeBits();
            this.drawQrcode(qrCodeBitMatrix);
        } catch (e: any) {
            this.drawQrcode([], e.message);
            throw e;
        }
    }

    getQrcodeBits(): QrcodeBit[][] {
        try {
            const errorCorrection = (this.getAttribute("errorcorrection") || null) as IQrcodeAttr["errorcorrection"];
            const value: IQrcodeAttr["value"] = this.getAttribute("value") || null;
            
            return encodeQr(value, errorCorrection ?? QrErrorCorrection.M);
        } catch (e) {
            throw e;
        }
    }

    drawQrcode(bitMatrix: QrcodeBit[][], errMessage?: string) {
        if (this.svgElm === null) return;

        const totalWidth = 300;
        this.svgElm.innerHTML = "";

        if (errMessage) {
            const textNode = document.createElementNS(svgns, "text");
            textNode.textContent = errMessage;
            textNode.setAttribute("textLength", `${totalWidth - xTotalPadding}`);
            textNode.setAttribute("lengthAdjust", "spacingAndGlyphs");
            textNode.setAttribute("x", `${xTotalPadding / 2}`);
            textNode.setAttribute("y", `${totalWidth / 2}`);
            textNode.setAttribute("fill", "red");
            this.svgElm.appendChild(textNode);
            this.svgElm.style.borderColor = "red";
        } else {
            this.svgElm.style.borderColor = "black";
        }

        const qrcodeWidth = totalWidth - xTotalPadding;

        const moduleSize = (qrcodeWidth / bitMatrix.length);

        const startX = xTotalPadding / 2;
        const startY = yTotalPadding / 2;

        const module0Color = 'white';
        const module1Color = 'black';

        let xPos = startX; 
        let yPos = startY;

        for (const row of bitMatrix) {
            const rectWidth = moduleSize;
            const rectHeight = moduleSize;

            for (const bitModule of row) {
                const rectElm = document.createElementNS(svgns, 'rect');

                rectElm.setAttribute("x", `${xPos}`);
                rectElm.setAttribute("y", `${yPos}`);

                rectElm.setAttribute("width", `${rectWidth}`);
                rectElm.setAttribute("height", `${rectHeight}`);

                rectElm.setAttribute("fill", bitModule > 0 ? module1Color : module0Color);
                rectElm.setAttribute("stroke", bitModule > 0 ? module1Color : module0Color);
                if (bitModule === null) rectElm.setAttribute("fill", "grey");

                this.svgElm.appendChild(rectElm);
                xPos += rectWidth;
            }
            yPos += rectHeight;
            xPos = startX;
        }
    }
}

customElements.define("dami-qrcode", Qrcode);