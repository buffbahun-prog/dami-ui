enum WeightValue {
    Odd = 3,
    Even = 1,
}

enum EncodingType {
    L = 0,
    G = 1,
    R = 2,
}

enum Markers {
    Start = 0,
    End = 1,
    Center = 2,
}

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type BarcodeBit = 0 | 1;

interface IMarkersEncode {
    [Markers.Start]: BarcodeBit[];
    [Markers.End]: BarcodeBit[];
    [Markers.Center]: BarcodeBit[];
}

const markersBits: IMarkersEncode = {
    [Markers.Start]: [1,0,1],
    [Markers.End]: [1,0,1],
    [Markers.Center]: [0,1,0,1,0],
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

export const encodeEan13 = (digitList: Digit[]): BarcodeBit[] => {
    if (digitList.length !== 12) throw Error("12 digits required for EAN-13.");
    const checksum = ean13CalcChecksum(digitList);
    const firstDigit = digitList.shift();
    if (firstDigit === undefined) return [];
    digitList.push(checksum);
    const encodeStructure = encodeStruct[firstDigit];

    const firstDigitGrp = digitList.slice(0, 6);
    const lastDigitGrp = digitList.slice(6,12);
    
    const firstGrpEncBitsAry: (0 | 1)[] = [];
    const lastGrpEncBitsAry: (0 | 1)[] = [];
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
    // const firstDigit = digitList.shift();
    // if (firstDigit === undefined) return [];
    digitList.push(checksum);
    const encodeStructure = ean8EncodeStruct;

    const firstDigitGrp = digitList.slice(0, 4);
    const lastDigitGrp = digitList.slice(4,12);
    
    const firstGrpEncBitsAry: (0 | 1)[] = [];
    const lastGrpEncBitsAry: (0 | 1)[] = [];
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