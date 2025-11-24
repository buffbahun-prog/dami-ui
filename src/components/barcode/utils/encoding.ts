enum WeightValue {
    Odd = 3,
    Even = 1,
}

enum EncodingType {
    L = 0,
    G = 1,
    R = 2,
}

enum UpceEncodingType {
    E = 0,
    O = 1
}

enum Markers {
    Start = 0,
    End = 1,
    Center = 2,
    UpceEnd = 3,
    Code11StartEnd = 4,
    Code39StartEnd = 5,
}

enum BarType {
    WB = 0, // wide-bar
    NB = 1, // narrow-bar
    WS = 2, // wide-space
    NS = 3, // narrow-space
}

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Code11Digit = Digit | 10;
export type BarcodeBit = 0 | 1;

interface IMarkersEncode {
    [Markers.Start]: BarcodeBit[];
    [Markers.End]: BarcodeBit[];
    [Markers.Center]: BarcodeBit[];
    [Markers.UpceEnd]: BarcodeBit[];
    [Markers.Code11StartEnd]: BarcodeBit[];
    [Markers.Code39StartEnd]: BarcodeBit[];
}

const markersBits: IMarkersEncode = {
    [Markers.Start]: [1,0,1],
    [Markers.End]: [1,0,1],
    [Markers.Center]: [0,1,0,1,0],
    [Markers.UpceEnd]: [0,1,0,1,0,1],
    [Markers.Code11StartEnd]: [1,0,1,1,0,0,1],
    [Markers.Code39StartEnd]: [1,0,0,1,0,1,1,0,1,1,0,1],
}

interface IEncodeStruct {
    firstGroup: EncodingType[];
    lastGroup: EncodingType[];
}

interface IDigitEncode {
    [EncodingType.L]: BarcodeBit[];
    [EncodingType.G]: BarcodeBit[];
    [EncodingType.R]: BarcodeBit[];
}

interface IUpceDigitEncode {
    [UpceEncodingType.E]: BarcodeBit[];
    [UpceEncodingType.O]: BarcodeBit[];
}

const encodeStruct: Record<Digit, IEncodeStruct> = {
    0: {
        firstGroup: [EncodingType.L, EncodingType.L, EncodingType.L, EncodingType.L, EncodingType.L, EncodingType.L],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    1: {
        firstGroup: [EncodingType.L, EncodingType.L, EncodingType.G, EncodingType.L, EncodingType.G, EncodingType.G],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    2: {
        firstGroup: [EncodingType.L, EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.L, EncodingType.G],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    3: {
        firstGroup: [EncodingType.L, EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.G, EncodingType.L],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    4: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.L, EncodingType.L, EncodingType.G, EncodingType.G],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    5: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.L, EncodingType.L, EncodingType.G],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    6: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.G, EncodingType.L, EncodingType.L],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    7: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.L, EncodingType.G, EncodingType.L, EncodingType.G],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    8: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.L],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
    9: {
        firstGroup: [EncodingType.L, EncodingType.G, EncodingType.G, EncodingType.L, EncodingType.G, EncodingType.L],
        lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
    },
}

const ean8EncodeStruct: IEncodeStruct = {
    firstGroup: [EncodingType.L, EncodingType.L, EncodingType.L, EncodingType.L],
    lastGroup: [EncodingType.R, EncodingType.R, EncodingType.R, EncodingType.R]
}

const upcaEncodeStruct: IEncodeStruct = encodeStruct[0];

const digitEncode: Record<Digit, IDigitEncode> = {
    0: {[EncodingType.L]: [0,0,0,1,1,0,1], [EncodingType.G]: [0,1,0,0,1,1,1], [EncodingType.R]: [1,1,1,0,0,1,0]},
    1: {[EncodingType.L]: [0,0,1,1,0,0,1], [EncodingType.G]: [0,1,1,0,0,1,1], [EncodingType.R]: [1,1,0,0,1,1,0]},
    2: {[EncodingType.L]: [0,0,1,0,0,1,1], [EncodingType.G]: [0,0,1,1,0,1,1], [EncodingType.R]: [1,1,0,1,1,0,0]},
    3: {[EncodingType.L]: [0,1,1,1,1,0,1], [EncodingType.G]: [0,1,0,0,0,0,1], [EncodingType.R]: [1,0,0,0,0,1,0]},
    4: {[EncodingType.L]: [0,1,0,0,0,1,1], [EncodingType.G]: [0,0,1,1,1,0,1], [EncodingType.R]: [1,0,1,1,1,0,0]},
    5: {[EncodingType.L]: [0,1,1,0,0,0,1], [EncodingType.G]: [0,1,1,1,0,0,1], [EncodingType.R]: [1,0,0,1,1,1,0]},
    6: {[EncodingType.L]: [0,1,0,1,1,1,1], [EncodingType.G]: [0,0,0,0,1,0,1], [EncodingType.R]: [1,0,1,0,0,0,0]},
    7: {[EncodingType.L]: [0,1,1,1,0,1,1], [EncodingType.G]: [0,0,1,0,0,0,1], [EncodingType.R]: [1,0,0,0,1,0,0]},
    8: {[EncodingType.L]: [0,1,1,0,1,1,1], [EncodingType.G]: [0,0,0,1,0,0,1], [EncodingType.R]: [1,0,0,1,0,0,0]},
    9: {[EncodingType.L]: [0,0,0,1,0,1,1], [EncodingType.G]: [0,0,1,0,1,1,1], [EncodingType.R]: [1,1,1,0,1,0,0]},
}

const upceEncodeStruct: Record<Digit, UpceEncodingType[]> = {
    0: [UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.O],
    1: [UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O],
    2: [UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O],
    3: [UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E],
    4: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O],
    5: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.E, UpceEncodingType.O],
    6: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.E],
    7: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O],
    8: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E],
    9: [UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.O, UpceEncodingType.E, UpceEncodingType.O, UpceEncodingType.E],
}

const upceDigitEncode: Record<Digit, IUpceDigitEncode> = {
    0: {[UpceEncodingType.E]: [0,1,0,0,1,1,1], [UpceEncodingType.O]: [0,0,0,1,1,0,1]},
    1: {[UpceEncodingType.E]: [0,1,1,0,0,1,1], [UpceEncodingType.O]: [0,0,1,1,0,0,1]},
    2: {[UpceEncodingType.E]: [0,0,1,1,0,1,1], [UpceEncodingType.O]: [0,0,1,0,0,1,1]},
    3: {[UpceEncodingType.E]: [0,1,0,0,0,0,1], [UpceEncodingType.O]: [0,1,1,1,1,0,1]},
    4: {[UpceEncodingType.E]: [0,0,1,1,1,0,1], [UpceEncodingType.O]: [0,1,0,0,0,1,1]},
    5: {[UpceEncodingType.E]: [0,1,1,1,0,0,1], [UpceEncodingType.O]: [0,1,1,0,0,0,1]},
    6: {[UpceEncodingType.E]: [0,0,0,0,1,0,1], [UpceEncodingType.O]: [0,1,0,1,1,1,1]},
    7: {[UpceEncodingType.E]: [0,0,1,0,0,0,1], [UpceEncodingType.O]: [0,1,1,1,0,1,1]},
    8: {[UpceEncodingType.E]: [0,0,0,1,0,0,1], [UpceEncodingType.O]: [0,1,1,0,1,1,1]},
    9: {[UpceEncodingType.E]: [0,0,1,0,1,1,1], [UpceEncodingType.O]: [0,0,0,1,0,1,1]},
}

const code11Encode: Record<Code11Digit, BarcodeBit[]> = {
    0: [1,0,1,0,1,1],
    1: [1,1,0,1,0,1,1],
    2: [1,0,0,1,0,1,1],
    3: [1,1,0,0,1,0,1],
    4: [1,0,1,1,0,1,1],
    5: [1,1,0,1,1,0,1],
    6: [1,0,0,1,1,0,1],
    7: [1,0,1,0,0,1,1],
    8: [1,1,0,1,0,0,1],
    9: [1,1,0,1,0,1,],
    10: [1,0,1,1,0,1],
}

export const ean13CalcChecksum = (digitList: Digit[]): Digit => {
    digitList = digitList.toReversed();
    let partialSum = 0;
    for (let i = 0; i < digitList.length; i++) {
        const position = i + 1;
        if (position % 2 > 0) {
            partialSum += (digitList[i] * WeightValue.Odd);
        } else {
            partialSum += (digitList[i] * WeightValue.Even);
        }
    }
    return (partialSum % 10 === 0) ? 0 : (10 - (partialSum % 10)) as Digit;
}

export const code11CalcChecksum = (digitList: Code11Digit[]): Code11Digit[] => {
    digitList = digitList.toReversed();
    const originalLen = digitList.length;
    const repeatorModulo = [10, 9];
    const checkSum: Code11Digit[] = [];
    for (const modulo of repeatorModulo) {
        let partialSum = 0;
        for (let indx = 0; indx < digitList.length; indx++) {
            const pos = (indx % modulo) + 1;
            const digit = digitList[indx];
            partialSum += (digit * pos);
        }
        const ck = (partialSum % (modulo === 10 ? 11 : 9)) as Code11Digit;
        checkSum.push(ck);
        if (originalLen < 10) break;
        digitList.unshift(ck);
    }
    return checkSum;
}

export const encodeCode11 = (digitList: Code11Digit[]): BarcodeBit[] => {
    if (digitList.length <= 0) throw Error("Atleat one value is required for Code-11");
    const checkSum = code11CalcChecksum(digitList);
    digitList.push(...checkSum);
    
    const encodeBitsAry: BarcodeBit[] = [];
    encodeBitsAry.push(0);
    for (const digit of digitList) {
        encodeBitsAry.push(...code11Encode[digit]);
        encodeBitsAry.push(0);
    }

    return [
        ...markersBits[Markers.Code11StartEnd],
        ...encodeBitsAry,
        ...markersBits[Markers.Code11StartEnd],
    ]
}

export const encodeEan13 = (digitList: Digit[]): BarcodeBit[] => {
    if (digitList.length !== 12) throw Error("12 digits required for EAN-13.");
    const checksum = ean13CalcChecksum(digitList);
    const firstDigit = digitList.shift();
    if (firstDigit === undefined) return [];
    digitList.push(checksum);
    const encodeStructure = encodeStruct[firstDigit];

    const firstDigitGrp = digitList.slice(0, digitList.length / 2);
    const lastDigitGrp = digitList.slice(digitList.length / 2, digitList.length);
    
    const firstGrpEncBitsAry: BarcodeBit[] = [];
    const lastGrpEncBitsAry: BarcodeBit[] = [];
    for (let indx = 0; indx < encodeStructure.firstGroup.length; indx++) {
        const firstGrpEncType = encodeStructure.firstGroup[indx];
        const lastGrpEncType = encodeStructure.lastGroup[indx];

        const encBitsFirst = digitEncode[firstDigitGrp[indx]][firstGrpEncType];
        firstGrpEncBitsAry.push(...encBitsFirst);

        const encBitsLast = digitEncode[lastDigitGrp[indx]][lastGrpEncType];
        lastGrpEncBitsAry.push(...encBitsLast);
    }

    return [...markersBits[Markers.Start],
            ...firstGrpEncBitsAry,
            ...markersBits[Markers.Center],
            ...lastGrpEncBitsAry,
            ...markersBits[Markers.End]
           ];
}

export const encodeEan8 = (digitList: Digit[]): BarcodeBit[] => {
    if (digitList.length !== 7) throw Error("7 digits required for EAN-8.");
    const checksum = ean13CalcChecksum(digitList);
    digitList.push(checksum);
    const encodeStructure = ean8EncodeStruct;

    const firstDigitGrp = digitList.slice(0, digitList.length / 2);
    const lastDigitGrp = digitList.slice(digitList.length / 2, digitList.length);
    
    const firstGrpEncBitsAry: BarcodeBit[] = [];
    const lastGrpEncBitsAry: BarcodeBit[] = [];
    for (let indx = 0; indx < encodeStructure.firstGroup.length; indx++) {
        const firstGrpEncType = encodeStructure.firstGroup[indx];
        const lastGrpEncType = encodeStructure.lastGroup[indx];

        const encBitsFirst = digitEncode[firstDigitGrp[indx]][firstGrpEncType];
        firstGrpEncBitsAry.push(...encBitsFirst);

        const encBitsLast = digitEncode[lastDigitGrp[indx]][lastGrpEncType];
        lastGrpEncBitsAry.push(...encBitsLast);
    }

    return [...markersBits[Markers.Start],
            ...firstGrpEncBitsAry,
            ...markersBits[Markers.Center],
            ...lastGrpEncBitsAry,
            ...markersBits[Markers.End]
           ];
}

export const encodeUpca = (digitList: Digit[]): BarcodeBit[] => {
    if (digitList.length !== 11) throw Error("11 digits required for UPC-A.");
    const checksum = ean13CalcChecksum(digitList);
    digitList.push(checksum);
    const encodeStructure = upcaEncodeStruct;

    const firstDigitGrp = digitList.slice(0, digitList.length / 2);
    const lastDigitGrp = digitList.slice(digitList.length / 2, digitList.length);
    
    const firstGrpEncBitsAry: BarcodeBit[] = [];
    const lastGrpEncBitsAry: BarcodeBit[] = [];
    for (let indx = 0; indx < encodeStructure.firstGroup.length; indx++) {
        const firstGrpEncType = encodeStructure.firstGroup[indx];
        const lastGrpEncType = encodeStructure.lastGroup[indx];

        const encBitsFirst = digitEncode[firstDigitGrp[indx]][firstGrpEncType];
        firstGrpEncBitsAry.push(...encBitsFirst);

        const encBitsLast = digitEncode[lastDigitGrp[indx]][lastGrpEncType];
        lastGrpEncBitsAry.push(...encBitsLast);
    }

    return [...markersBits[Markers.Start],
            ...firstGrpEncBitsAry,
            ...markersBits[Markers.Center],
            ...lastGrpEncBitsAry,
            ...markersBits[Markers.End]
           ];
}

export const encodeUpce = (digitList: Digit[]): BarcodeBit[] => {
    if (digitList.length !== 6) throw Error("6 digits required for UPC-E.");
    const upcaEquivalentDigitList = mapUpceToUpca(digitList);
    const checksum = ean13CalcChecksum(upcaEquivalentDigitList);
    const encodePattern = upceEncodeStruct[checksum];

    const encodeBitsAry: BarcodeBit[] = [];
    for (let i = 0; i < encodePattern.length; i++) {
        const encodeType = encodePattern[i];
        const encodeBits = upceDigitEncode[digitList[i]][encodeType];
        encodeBitsAry.push(...encodeBits);
    }

    return [...markersBits[Markers.Start],
            ...encodeBitsAry,
            ...markersBits[Markers.UpceEnd],
           ];
}

export const mapValueToCode39Digits = (valueStr: string): number[] => {
    const digitList: number[] = [];
    for (let char of valueStr) {
        const charCode = char.charCodeAt(0);
        if (isNaN(charCode)) return [];
        if (charCode >= 48 && charCode <= 57) {
            digitList.push(charCode - 48);
        } else if (charCode >= 65 && charCode <= 90) {
            digitList.push(charCode - 65 + 10);
        } else if (char === "-") {
            digitList.push(36);
        } else if (char === ".") {
            digitList.push(37);
        } else if (char === " ") {
            digitList.push(38);
        } else if (char === "$") {
            digitList.push(39);
        } else if (char === "/") {
            digitList.push(40);
        } else if (char === "+") {
            digitList.push(41);
        } else if (char === "%") {
            digitList.push(42);
        }
    }
    return digitList;
}

export const calcCode39Checksum = (digitList: number[]): number => {
    const sum = digitList.reduce((acc, cur) => acc + cur, 0);
    const ck = sum % 43;
    return ck;
}

const encodeCharCode39 = (char: number): BarType[] => {
    if (char === 39) return [BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB, BarType.NS, BarType.NB];
    if (char === 40) return [BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB, BarType.NS, BarType.NB, BarType.WS, BarType.NB];
    if (char === 41) return [BarType.NB, BarType.WS, BarType.NB, BarType.NS, BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB];
    if (char === 42) return [BarType.NB, BarType.NS, BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB, BarType.WS, BarType.NB];

    const barNumericEquvalence = [1, 2, 4, 7, 0];
    let codeValue = (char + (char >= 10 ? 1 : 0)) % 10;
    if (codeValue === 0) codeValue = 11;
    const wideBarPos: number[] = [];
    for (const numRep1 of barNumericEquvalence.slice(0, 4)) {
        let isBreak = false;
        for (const numRep2 of barNumericEquvalence.slice(1, 5)) {
            if ((numRep1 !== numRep2) && (numRep1 + numRep2 === codeValue)) {
                wideBarPos.push(numRep1, numRep2);
                isBreak = true;
                break;
            }
        }
        if (isBreak) break;
    }

    const spacePos = (Math.floor(char / 10) + 1) % 4;
    return barNumericEquvalence.flatMap((num, indx) => {
        const bar = wideBarPos.includes(num) ? BarType.WB : BarType.NB;
        const space = (indx === spacePos) ? BarType.WS : BarType.NS;
        return (indx >= barNumericEquvalence.length - 1 )? [bar] : [bar, space];
    });
}

export const encodeCode39 = (digitList: number[]): BarcodeBit[] => {
    if (digitList.length <= 0) throw Error("Atleat one value is required for Code-39");
    const checksumVal = calcCode39Checksum(digitList);
    digitList.push(checksumVal);

    const encodeBitAry: BarcodeBit[] = [];
    encodeBitAry.push(0);
    for (const digit of digitList) {
        const bitAry = encodeCharCode39(digit).flatMap(bt => {
            if (bt === BarType.NB) return [1];
            else if (bt === BarType.WB) return [1,1];
            else if (bt === BarType.NS) return [0];
            else if (bt === BarType.WS) return [0,0];
        }) as BarcodeBit[];
        encodeBitAry.push(...bitAry);
        encodeBitAry.push(0);
    }

    return [...markersBits[Markers.Code39StartEnd],
            ...encodeBitAry,
            ...markersBits[Markers.Code39StartEnd],
           ];
}

export const mapUpceToUpca = (digitList: Digit[]): Digit[] => {
    if (digitList.length !== 6) throw Error("6 digits required for UPC-E.");
    const lastDigit = digitList[digitList.length - 1];
    switch (lastDigit) {
        case 0:
            return [0, digitList[0], digitList[1], 0, 0, 0, 0, 0, digitList[2], digitList[3], digitList[4]];
        case 1:
            return [0, digitList[0], digitList[1], 1, 0, 0, 0, 0, digitList[2], digitList[3], digitList[4]];
        case 2:
            return [0, digitList[0], digitList[1], 2, 0, 0, 0, 0, digitList[2], digitList[3], digitList[4]];
        case 3:
            return [0, digitList[0], digitList[1], digitList[2], 0, 0, 0, 0, 0, digitList[3], digitList[4]];
        case 4:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], 0, 0, 0, 0, 0, digitList[4]];
        case 5:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], digitList[4], 0, 0, 0, 0, 5];
        case 6:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], digitList[4], 0, 0, 0, 0, 6];
        case 7:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], digitList[4], 0, 0, 0, 0, 7];
        case 8:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], digitList[4], 0, 0, 0, 0, 8];
        case 9:
            return [0, digitList[0], digitList[1], digitList[2], digitList[3], digitList[4], 0, 0, 0, 0, 9];
    }
}

// transform bar bits to bar widths
export const bitMapTransform = (bits: BarcodeBit[]): number[] => {
    if (bits.length <= 0) return [];
    const mappedAry: number[] = [0];
    let currCmpBit = bits[0];
    for (let i = 0; i < bits.length; i++) {
        if (currCmpBit === bits[i]) {
            mappedAry[mappedAry.length - 1]++;
        } else {
            mappedAry[mappedAry.length - 1] = currCmpBit === 1 ? mappedAry[mappedAry.length - 1] : -(mappedAry[mappedAry.length - 1]);
            currCmpBit = bits[i];
            mappedAry.push(1);
        }
    }
    mappedAry[mappedAry.length - 1] = currCmpBit === 1 ? mappedAry[mappedAry.length - 1] : -(mappedAry[mappedAry.length - 1]);
    return mappedAry;
}

export const getEan13LongTailPos = (): number[] => {
    const markerStartLen = markersBits[Markers.Start].length;
    const markerCenterLen = markersBits[Markers.Center].length;
    const encBitsLen = (encodeStruct[0].firstGroup.length * digitEncode[0][EncodingType.L].length);
    return [
        ...(markersBits[Markers.Start].map((_, indx) => indx)),
        ...(markersBits[Markers.Center].map((_, indx) => markerStartLen + encBitsLen + indx)),
        ...(markersBits[Markers.End].map((_, indx) => markerStartLen + (encBitsLen * 2) + markerCenterLen + indx)),
    ];
}

export const getEan8LongTailPos = (): number[] => {
    const markerStartLen = markersBits[Markers.Start].length;
    const markerCenterLen = markersBits[Markers.Center].length;
    const encBitsLen = (ean8EncodeStruct.firstGroup.length * digitEncode[0][EncodingType.L].length);
    return [
        ...(markersBits[Markers.Start].map((_, indx) => indx)),
        ...(markersBits[Markers.Center].map((_, indx) => markerStartLen + encBitsLen + indx)),
        ...(markersBits[Markers.End].map((_, indx) => markerStartLen + (encBitsLen * 2) + markerCenterLen + indx)),
    ];
}

export const getUpcaLongTailPos = (): number[] => {
    const markerStartLen = markersBits[Markers.Start].length;
    const markerCenterLen = markersBits[Markers.Center].length;
    const encBitsLen = (upcaEncodeStruct.firstGroup.length * digitEncode[0][EncodingType.L].length);
    return [
        ...(markersBits[Markers.Start].map((_, indx) => indx)),
        ...(markersBits[Markers.Center].map((_, indx) => markerStartLen + encBitsLen + indx)),
        ...(markersBits[Markers.End].map((_, indx) => markerStartLen + (encBitsLen * 2) + markerCenterLen + indx)),
    ];
}

export const getUpceLongTailPos = (): number[] => {
    const markerStartLen = markersBits[Markers.Start].length;
    const encBitsLen = (upceEncodeStruct[0].length * upceDigitEncode[0][UpceEncodingType.E].length);
    return [
        ...(markersBits[Markers.Start].map((_, indx) => indx)),
        ...(markersBits[Markers.UpceEnd].map((_, indx) => markerStartLen + encBitsLen + indx)),
    ];
}

export const isValidCode11 = (value: string | null): [boolean, string] => {
    if (value !== null) value = value.trim();
    // Must be non-empty
    if (!value || value.length === 0) return [false, "Value must be non-empty."];
  
    // Must start and end with a digit
    if (!/^\d/.test(value) || !/\d$/.test(value)) return [false, "Must start and end with a digit."];
  
    // Only digits and dash allowed
    if (!/^[0-9-]+$/.test(value)) return [false, "Only digits and dash is allowed."];
  
    // No consecutive dashes
    if (value.includes('--')) return [false, "Cant not include consecutive dashes"];
  
    return [true, ""];
}

export const isValidCode39 = (value: string | null): [boolean, string] => {
    if (value !== null) value = value.trim();
    // Must be non-empty
    if (!value || value.length === 0) return [false, "Value must be non-empty."];

    if (value !== value.toUpperCase()) return [false, "Value must be uppercase only."]
  
    if (!/^[A-Z0-9.\- $/+%]+$/.test(value)) return [false, "Only Uppercase albhabets, digits and characters(.,/,[space],$,-,+,%) are allowed."];
  
    return [true, ""];
}