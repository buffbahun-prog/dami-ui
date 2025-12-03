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
    Code93StartEnd = 6,
    MSIStart = 7,
    MSIEnd = 8,
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
    [Markers.Code93StartEnd]: BarcodeBit[];
    [Markers.MSIStart]: BarcodeBit[];
    [Markers.MSIEnd]: BarcodeBit[];
}

const markersBits: IMarkersEncode = {
    [Markers.Start]: [1,0,1],
    [Markers.End]: [1,0,1],
    [Markers.Center]: [0,1,0,1,0],
    [Markers.UpceEnd]: [0,1,0,1,0,1],
    [Markers.Code11StartEnd]: [1,0,1,1,0,0,1],
    [Markers.Code39StartEnd]: [1,0,0,1,0,1,1,0,1,1,0,1],
    [Markers.Code93StartEnd]: [1,0,1,0,1,1,1,1,0],
    [Markers.MSIStart]: [1, 1, 0],
    [Markers.MSIEnd]: [1, 0, 0, 1],
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

export const code93Encode: Record<number, BarcodeBit[]> = {
    0: [1,0,0,0,1,0,1,0,0],
    1: [1,0,1,0,0,1,0,0,0],
    2: [1,0,1,0,0,0,1,0,0],
    3: [1,0,1,0,0,0,0,1,0],
    4: [1,0,0,1,0,1,0,0,0],
    5: [1,0,0,1,0,0,1,0,0],
    6: [1,0,0,1,0,0,0,1,0],
    7: [1,0,1,0,1,0,0,0,0],
    8: [1,0,0,0,1,0,0,1,0],
    9: [1,0,0,0,0,1,0,1,0],
    10: [1,1,0,1,0,1,0,0,0],
    11: [1,1,0,1,0,0,1,0,0],
    12: [1,1,0,1,0,0,0,1,0],
    13: [1,1,0,0,1,0,1,0,0],
    14: [1,1,0,0,1,0,0,1,0],
    15: [1,1,0,0,0,1,0,1,0],
    16: [1,0,1,1,0,1,0,0,0],
    17: [1,0,1,1,0,0,1,0,0],
    18: [1,0,1,1,0,0,0,1,0],
    19: [1,0,0,1,1,0,1,0,0],
    20: [1,0,0,0,1,1,0,1,0],
    21: [1,0,1,0,1,1,0,0,0],
    22: [1,0,1,0,0,1,1,0,0],
    23: [1,0,1,0,0,0,1,1,0],
    24: [1,0,0,1,0,1,1,0,0],
    25: [1,0,0,0,1,0,1,1,0],
    26: [1,1,0,1,1,0,1,0,0],
    27: [1,1,0,1,1,0,0,1,0],
    28: [1,1,0,1,0,1,1,0,0],
    29: [1,1,0,1,0,0,1,1,0],
    30: [1,1,0,0,1,0,1,1,0],
    31: [1,1,0,0,1,1,0,1,0],
    32: [1,0,1,1,0,1,1,0,0],
    33: [1,0,1,1,0,0,1,1,0],
    34: [1,0,0,1,1,0,1,1,0],
    35: [1,0,0,1,1,1,0,1,0],
    36: [1,0,0,1,0,1,1,1,0],
    37: [1,1,1,0,1,0,1,0,0],
    38: [1,1,1,0,1,0,0,1,0],
    39: [1,1,1,0,0,1,0,1,0],
    40: [1,0,1,1,0,1,1,1,0],
    41: [1,0,1,1,1,0,1,1,0],
    42: [1,1,0,1,0,1,1,1,0],
    43: [1,0,0,1,0,0,1,1,0],
    44: [1,1,1,0,1,1,0,1,0],
    45: [1,1,1,0,1,0,1,1,0],
    46: [1,0,0,1,1,0,0,1,0],
};

export const code128Encode: Record<number, BarcodeBit[]> = {
    0: [1,1,0,1,1,0,0,1,1,0,0],
    1: [1,1,0,0,1,1,0,1,1,0,0],
    2: [1,1,0,0,1,1,0,0,1,1,0],
    3: [1,0,0,1,0,0,1,1,0,0,0],
    4: [1,0,0,1,0,0,0,1,1,0,0],
    5: [1,0,0,0,1,0,0,1,1,0,0],
    6: [1,0,0,1,1,0,0,1,0,0,0],
    7: [1,0,0,1,1,0,0,0,1,0,0],
    8: [1,0,0,0,1,1,0,0,1,0,0],
    9: [1,1,0,0,1,0,0,1,0,0,0],
    10: [1,1,0,0,1,0,0,0,1,0,0],
    11: [1,1,0,0,0,1,0,0,1,0,0],
    12: [1,0,1,1,0,0,1,1,1,0,0],
    13: [1,0,0,1,1,0,1,1,1,0,0],
    14: [1,0,0,1,1,0,0,1,1,1,0],
    15: [1,0,1,1,1,0,0,1,1,0,0],
    16: [1,0,0,1,1,1,0,1,1,0,0],
    17: [1,0,0,1,1,1,0,0,1,1,0],
    18: [1,1,0,0,1,1,1,0,0,1,0],
    19: [1,1,0,0,1,0,1,1,1,0,0],
    20: [1,1,0,0,1,0,0,1,1,1,0],
    21: [1,1,0,1,1,1,0,0,1,0,0],
    22: [1,1,0,0,1,1,1,0,1,0,0],
    23: [1,1,1,0,1,1,0,1,1,1,0],
    24: [1,1,1,0,1,0,0,1,1,0,0],
    25: [1,1,1,0,0,1,0,1,1,0,0],
    26: [1,1,1,0,0,1,0,0,1,1,0],
    27: [1,1,1,0,1,1,0,0,1,0,0],
    28: [1,1,1,0,0,1,1,0,1,0,0],
    29: [1,1,1,0,0,1,1,0,0,1,0],
    30: [1,1,0,1,1,0,1,1,0,0,0],
    31: [1,1,0,1,1,0,0,0,1,1,0],
    32: [1,1,0,0,0,1,1,0,1,1,0],
    33: [1,0,1,0,0,0,1,1,0,0,0],
    34: [1,0,0,0,1,0,1,1,0,0,0],
    35: [1,0,0,0,1,0,0,0,1,1,0],
    36: [1,0,1,1,0,0,0,1,0,0,0],
    37: [1,0,0,0,1,1,0,1,0,0,0],
    38: [1,0,0,0,1,1,0,0,0,1,0],
    39: [1,1,0,1,0,0,0,1,0,0,0],
    40: [1,1,0,0,0,1,0,1,0,0,0],
    41: [1,1,0,0,0,1,0,0,0,1,0],
    42: [1,0,1,1,0,1,1,1,0,0,0],
    43: [1,0,1,1,0,0,0,1,1,1,0],
    44: [1,0,0,0,1,1,0,1,1,1,0],
    45: [1,0,1,1,1,0,1,1,0,0,0],
    46: [1,0,1,1,1,0,0,0,1,1,0],
    47: [1,0,0,0,1,1,1,0,1,1,0],
    48: [1,1,1,0,1,1,1,0,1,1,0],
    49: [1,1,0,1,0,0,0,1,1,1,0],
    50: [1,1,0,0,0,1,0,1,1,1,0],
    51: [1,1,0,1,1,1,0,1,0,0,0],
    52: [1,1,0,1,1,1,0,0,0,1,0],
    53: [1,1,0,1,1,1,0,1,1,1,0],
    54: [1,1,1,0,1,0,1,1,0,0,0],
    55: [1,1,1,0,1,0,0,0,1,1,0],
    56: [1,1,1,0,0,0,1,0,1,1,0],
    57: [1,1,1,0,1,1,0,1,0,0,0],
    58: [1,1,1,0,1,1,0,0,0,1,0],
    59: [1,1,1,0,0,0,1,1,0,1,0],
    60: [1,1,1,0,1,1,1,1,0,1,0],
    61: [1,1,0,0,1,0,0,0,0,1,0],
    62: [1,1,1,1,0,0,0,1,0,1,0],
    63: [1,0,1,0,0,1,1,0,0,0,0],
    64: [1,0,1,0,0,0,0,1,1,0,0],
    65: [1,0,0,1,0,1,1,0,0,0,0],
    66: [1,0,0,1,0,0,0,0,1,1,0],
    67: [1,0,0,0,0,1,0,1,1,0,0],
    68: [1,0,0,0,0,1,0,0,1,1,0],
    69: [1,0,1,1,0,0,1,0,0,0,0],
    70: [1,0,1,1,0,0,0,0,1,0,0],
    71: [1,0,0,1,1,0,1,0,0,0,0],
    72: [1,0,0,1,1,0,0,0,0,1,0],
    73: [1,0,0,0,0,1,1,0,1,0,0],
    74: [1,0,0,0,0,1,1,0,0,1,0],
    75: [1,1,0,0,0,0,1,0,0,1,0],
    76: [1,1,0,0,1,0,1,0,0,0,0],
    77: [1,1,1,1,0,1,1,1,0,1,0],
    78: [1,1,0,0,0,0,1,0,1,0,0],
    79: [1,0,0,0,1,1,1,1,0,1,0],
    80: [1,0,1,0,0,1,1,1,1,0,0],
    81: [1,0,0,1,0,1,1,1,1,0,0],
    82: [1,0,0,1,0,0,1,1,1,1,0],
    83: [1,0,1,1,1,1,0,0,1,0,0],
    84: [1,0,0,1,1,1,1,0,1,0,0],
    85: [1,0,0,1,1,1,1,0,0,1,0],
    86: [1,1,1,1,0,1,0,0,1,0,0],
    87: [1,1,1,1,0,0,1,0,1,0,0],
    88: [1,1,1,1,0,0,1,0,0,1,0],
    89: [1,1,0,1,1,0,1,1,1,1,0],
    90: [1,1,0,1,1,1,1,0,1,1,0],
    91: [1,1,1,1,0,1,1,0,1,1,0],
    92: [1,0,1,0,1,1,1,1,0,0,0],
    93: [1,0,1,0,0,0,1,1,1,1,0],
    94: [1,0,0,0,1,0,1,1,1,1,0],
    95: [1,0,1,1,1,1,0,1,0,0,0],
    96: [1,0,1,1,1,1,0,0,0,1,0],
    97: [1,1,1,1,0,1,0,1,0,0,0],
    98: [1,1,1,1,0,1,0,0,0,1,0],
    99: [1,0,1,1,1,0,1,1,1,1,0], // Code C
    100: [1,0,1,1,1,1,0,1,1,1,0],// Code B, FNC 4
    101: [1,1,1,0,1,0,1,1,1,1,0],// Code A
    102: [1,1,1,1,0,1,0,1,1,1,0],// FNC 1
    103: [1,1,0,1,0,0,0,0,1,0,0],// Start Code A
    104: [1,1,0,1,0,0,1,0,0,0,0],// Start Code B
    105: [1,1,0,1,0,0,1,1,1,0,0],// Start Code C
    106: [1,1,0,0,0,1,1,1,0,1,0],// Stop
}

export interface AIDef {
    fixed: boolean;
    length?: number;
    min?: number;
    max?: number;
    format: "numeric" | "alphanumeric";
    title: string;
  }
  
  export const GS1_AI_REGISTRY: Record<string, AIDef> = {
    // ---------------------------
    // 0–19 IDENTIFICATION
    // ---------------------------
    "00": { fixed: true, length: 18, format: "numeric", title: "SSCC" },
    "01": { fixed: true, length: 14, format: "numeric", title: "GTIN" },
    "02": { fixed: true, length: 14, format: "numeric", title: "GTIN of Contained Trade Items" },
    "10": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Batch/Lot Number" },
    "11": { fixed: true, length: 6, format: "numeric", title: "Production Date" },
    "12": { fixed: true, length: 6, format: "numeric", title: "Due Date" },
    "13": { fixed: true, length: 6, format: "numeric", title: "Packaging Date" },
    "15": { fixed: true, length: 6, format: "numeric", title: "Best Before Date" },
    "16": { fixed: true, length: 6, format: "numeric", title: "Sell By Date" },
    "17": { fixed: true, length: 6, format: "numeric", title: "Expiration Date" },
    "20": { fixed: true, length: 2, format: "numeric", title: "Variant" },
    "21": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Serial Number" },
    "22": { fixed: false, min: 1, max: 29, format: "alphanumeric", title: "Consumer Product Variant" },
    "23": { fixed: false, min: 1, max: 29, format: "alphanumeric", title: "Lot/Batch Subdivision" },
    "240": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Additional Product ID" },
    "241": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Customer Part Number" },
    "242": { fixed: false, min: 1, max: 6, format: "numeric", title: "Made-to-order Number" },
    "243": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Packaging Component Number" },
    "250": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Secondary Serial Number" },
    "251": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Reference to Source Entity" },
    "253": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "GDTI" },
    "254": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "GLN Extension" },
    "255": { fixed: false, min: 1, max: 13, format: "numeric", title: "GCN" },
  
    // ---------------------------
    // 30–39 QUANTITY & MEASURE
    // ---------------------------
    "30": { fixed: false, min: 1, max: 8, format: "numeric", title: "Count" },
  
    // 310n – 316n (weights & volumes)
    "3100": { fixed: true, length: 6, format: "numeric", title: "Net Weight (kg, 0 decimals)" },
    "3101": { fixed: true, length: 6, format: "numeric", title: "Net Weight (kg, 1 decimal)" },
    "3102": { fixed: true, length: 6, format: "numeric", title: "Net Weight (kg, 2 decimals)" },
    "3103": { fixed: true, length: 6, format: "numeric", title: "Net Weight (kg, 3 decimals)" },
  
    "3110": { fixed: true, length: 6, format: "numeric", title: "Length (m)" },
    "3120": { fixed: true, length: 6, format: "numeric", title: "Width (m)" },
    "3130": { fixed: true, length: 6, format: "numeric", title: "Height (m)" },
    "3140": { fixed: true, length: 6, format: "numeric", title: "Area (m²)" },
    "3150": { fixed: true, length: 6, format: "numeric", title: "Volume (L)" },
    "3160": { fixed: true, length: 6, format: "numeric", title: "Volume (m³)" },
  
    "3200": { fixed: true, length: 6, format: "numeric", title: "Weight (lb)" },
    "3300": { fixed: true, length: 6, format: "numeric", title: "Logistics Weight (kg)" },
  
    "3370": { fixed: true, length: 6, format: "numeric", title: "Fat Content (%)" },
  
    "3900": { fixed: false, min: 1, max: 15, format: "numeric", title: "Amount Payable" },
    "3901": { fixed: false, min: 1, max: 15, format: "numeric", title: "Amount Payable" },
    "3902": { fixed: false, min: 1, max: 15, format: "numeric", title: "Amount Payable" },
    "3903": { fixed: false, min: 1, max: 15, format: "numeric", title: "Amount Payable" },
  
    "3910": { fixed: false, min: 1, max: 18, format: "numeric", title: "Amount Payable (ISO Currency)" },
  
    "3920": { fixed: false, min: 1, max: 15, format: "numeric", title: "Unit Price" },
    "3930": { fixed: false, min: 1, max: 18, format: "numeric", title: "Unit Price (ISO Currency)" },
  
    // ---------------------------
    // 4XX — LOCATION & LOGISTICS
    // ---------------------------
    "400": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Order Number" },
    "401": { fixed: true, length: 17, format: "numeric", title: "GSIN" },
    "402": { fixed: true, length: 17, format: "numeric", title: "GINC" },
    "403": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Routing Code" },
  
    "410": { fixed: true, length: 13, format: "numeric", title: "Ship To GLN" },
    "411": { fixed: true, length: 13, format: "numeric", title: "Bill To GLN" },
    "412": { fixed: true, length: 13, format: "numeric", title: "Purchased From GLN" },
    "413": { fixed: true, length: 13, format: "numeric", title: "Ship For/Deliver For GLN" },
    "414": { fixed: true, length: 13, format: "numeric", title: "GLN of Production Location" },
    "415": { fixed: true, length: 13, format: "numeric", title: "GLN of Invoicing Party" },
    "416": { fixed: true, length: 13, format: "numeric", title: "GLN of Ship To" },
    "417": { fixed: true, length: 13, format: "numeric", title: "GLN of Return Location" },
  
    "420": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Ship To Postal Code" },
    "421": { fixed: false, min: 3, max: 12, format: "alphanumeric", title: "Postal Code + Country" },
    "422": { fixed: true, length: 3, format: "numeric", title: "Country of Origin" },
    "423": { fixed: false, min: 4, max: 15, format: "numeric", title: "Country Subdivision" },
  
    // ---------------------------
    // 7XX — HEALTHCARE
    // ---------------------------
    "7001": { fixed: true, length: 13, format: "numeric", title: "NHRN" },
    "7002": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "NHRN Additional" },
    "7003": { fixed: false, min: 1, max: 10, format: "numeric", title: "Expiration Time" },
    "7004": { fixed: false, min: 1, max: 4, format: "numeric", title: "Active Potency" },
  
    // ---------------------------
    // 8XX — SPECIAL USE / DIGITAL LINK
    // ---------------------------
    "8001": { fixed: true, length: 14, format: "numeric", title: "Roll Products" },
    "8002": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Cellulose Content" },
    "8003": { fixed: false, min: 14, max: 30, format: "alphanumeric", title: "GRAI" },
    "8004": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "GIAI" },
    "8005": { fixed: true, length: 6, format: "numeric", title: "Price per UOM" },
    "8006": { fixed: true, length: 18, format: "numeric", title: "Identification of Component" },
    "8007": { fixed: false, min: 1, max: 34, format: "numeric", title: "IBAN" },
    "8008": { fixed: true, length: 12, format: "numeric", title: "Date/Time of Processing" },
  
    "8010": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Component Serial Number" },
    "8011": { fixed: true, length: 13, format: "numeric", title: "GSRN" },
    "8012": { fixed: false, min: 1, max: 20, format: "alphanumeric", title: "Software Version" },
    "8013": { fixed: true, length: 12, format: "numeric", title: "GMN" },
  
    "8110": { fixed: false, min: 1, max: 70, format: "alphanumeric", title: "Coupon Code ID" },
    "8112": { fixed: false, min: 1, max: 70, format: "alphanumeric", title: "Paperless Coupon ID" },
  
    "8200": { fixed: false, min: 1, max: 70, format: "alphanumeric", title: "GPS Coordinates" },
    "8201": { fixed: false, min: 1, max: 70, format: "alphanumeric", title: "Global Location Coordinates" },
    "8202": { fixed: false, min: 1, max: 2000, format: "alphanumeric", title: "GS1 Digital Link URL" },
    "8203": { fixed: false, min: 1, max: 2000, format: "alphanumeric", title: "Digital Link Extended" },
  
    // ---------------------------
    // 9XX — INTERNAL USE
    // ---------------------------
    "90": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "91": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "92": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "93": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "94": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "95": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "96": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "97": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "98": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" },
    "99": { fixed: false, min: 1, max: 30, format: "alphanumeric", title: "Internal Code" }
  };

export const gs128Parser = (value: string): number[] => {
    const charList = [...value];
    const ai_pos_start = getAllIndexes(charList, "(").map(i => i + 1);
    const ai_pos_end = getAllIndexes(charList, ")").map(i => i - 1);
    if (ai_pos_start.length !== ai_pos_end.length) throw Error("GS1-128 format is not correct.");
    const ai_req_lens = [2,3,4];
    const FNC1 = 102;

    const encodedData: number[] = [];
    encodedData.push(FNC1);
    let concatedNewValue = "";
    
    for (let i = 0; i < ai_pos_start.length; i++) {
        const start = ai_pos_start[i];
        const end = ai_pos_end[i];
        const ai_len = (end - start) + 1;
        
        if (!ai_req_lens.includes(ai_len)) throw Error("GS1-128 format is not correct.");
        const ai = charList.slice(start, end + 1);
        const aiObj = GS1_AI_REGISTRY[ai.join("")];
        if (!aiObj) throw Error(`GS1-128 AI not recognized for (${ai.join("")}).`);
        const data = charList.slice(end + 2, ai_pos_start[i+ 1] ? ai_pos_start[i+ 1] - 1 : undefined);
        const format = aiObj.format;

        if (aiObj.fixed && aiObj.length) {
            const reqLen = aiObj.length;
            if (data.length !== reqLen) throw Error(`GS1-128 AI (${ai.join("")}) data length not correct.`);
        } else if (!aiObj.fixed && aiObj.min && aiObj.max) {
            const minLen = aiObj.min;
            const maxLen = aiObj.max;
            if (data.length < minLen || data.length > maxLen) throw Error(`GS1-128 AI (${ai.join("")}) data length not correct.`);
        }
        if (format === "numeric") {
            if (data.some(ch => ch.charCodeAt(0) < 48 || ch.charCodeAt(0) > 57)) throw Error(`GS1-128 AI (${ai.join("")}) data format not correct.`);
        } else if (format === "alphanumeric") {
            if (!data.every(ch => (ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57) ||
            (ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 90))) throw Error(`GS1-128 AI (${ai.join("")}) data format not correct.`);
        }
        concatedNewValue += (ai.join("") + data.join(""));
        if (!aiObj.fixed) {
            encodedData.push(...mapValueToCode128(concatedNewValue), FNC1);
            concatedNewValue = "";
        }
    }

    if (concatedNewValue) encodedData.push(...mapValueToCode128(concatedNewValue));
    else encodedData.pop();

    return encodedData;
}

export const mapValueToCode128 = (valueStr: string): number[] => {
    const encodedList: number[] = [];
    const charList = [...valueStr];
    for (let indx = 0; indx < charList.length; indx++) {
        const char = charList[indx];
        const isDigit = !isNaN(parseInt(char));

        if (char.charCodeAt(0) >= 160 && char.charCodeAt(0) <= 255) {
            const fnc4Code = 100;
            const value = (char.charCodeAt(0) - 128) - 32;
            encodedList.push(fnc4Code, value);
            continue;
        }

        if (!isDigit) {
            const value = char.charCodeAt(0) - 32;
            encodedList.push(value);
            continue;
        }

        const digitSeq: number[] = [];
        for (let j = indx; j < charList.length; j++) {
            const jChar = charList[j];
            const isJDigit = !isNaN(parseInt(jChar));
            if (isJDigit) digitSeq.push(parseInt(jChar));
            else break;
        }
        if (digitSeq.length >= 6) {
            const evenLen = digitSeq.length - (digitSeq.length % 2);
            const digitPairs: number[] = [];
            for (let k = 0; k < evenLen - 1; k = k + 2) {
                digitPairs.push((digitSeq[k] * 10) + digitSeq[k + 1])
            }
            encodedList.push(99, ...(digitPairs), 100);
            indx = indx + evenLen - 1;
        } else {
            const value = char.charCodeAt(0) - 32;
            encodedList.push(value);
        }
    }

    return encodedList;
}

export const code128Checksum = (digitList: number[]): number => {
    const startBDigit = 104; // always start with B as it has complete ascii characters
    let weightedSum = 0;
    for (let i = 0; i < digitList.length; i++) {
        const weight = i + 1;
        weightedSum += (digitList[i] * weight);
    }

    weightedSum += (startBDigit * 1);

    return weightedSum % 103;
}

export const encodeCode128 = (digitList: number[], isGS1 = false): BarcodeBit[] => {
    if (digitList.length <= 0) throw Error("Atleat one value is required for Code-128");
    const checksumVal = code128Checksum(digitList);
    digitList.push(checksumVal);

    const encodeBitsAry: BarcodeBit[] = [];
    for (const digit of digitList) {
        encodeBitsAry.push(...code128Encode[digit]);
    }

    const startBDigit = 104;
    const stopDigit = 106;
    return [
            ...code128Encode[startBDigit],
            ...encodeBitsAry,
            ...code128Encode[stopDigit],
            1,
            0,
            1,
    ]
}

export type MSImods = "10" | "11" | "1010" | "1110";

export const msiCalcChecksum = (digitList: Digit[], mod: MSImods): Digit[] => {
    digitList = digitList.toReversed();
    const mods = mod.length === 4 ? [mod.slice(0, 2), mod.slice(2,4)] : [mod];
    const chkSm: Digit[] = [];
    for (const md of mods) {
        let partialSum = 0;
        if (md === "11") {
            for (let i = 0; i < digitList.length; i++) {
                const weight = (i % 6) + 2;
                partialSum += (digitList[i] * weight);
            }
            const cs = (11 - (partialSum % 11)) % 11 as Digit;
            chkSm.push(cs);
            digitList.unshift(cs);
        }
        else if (md === "10") {
            for (let i = 0; i < digitList.length; i++) {
                const position = i + 1;
                if (position % 2 > 0) {
                    let doubledVal = digitList[i] * 2;
                    if (doubledVal > 9) doubledVal = doubledVal - 9;
                    partialSum += doubledVal;
                } else {
                    partialSum += (digitList[i] * 1);
                }
            }
            const cs = (10 - (partialSum % 10)) % 10 as Digit;
            chkSm.push(cs);
            digitList.unshift(cs);
        }
    }
    return chkSm;
}

export const encodeMSI = (digitList: Digit[], mod: MSImods): BarcodeBit[] => {
    if (digitList.length <= 0) throw Error("Atleat one value is required for MSI");
    const checkSum = msiCalcChecksum(digitList, mod);
    digitList.push(...checkSum);

    const bitMap: Record<"0" | "1", BarcodeBit[]> = {
        "0": [1,0,0],
        "1": [1,1,0],
    };

    const encodeBitsAry: BarcodeBit[] = [];
    for (const digit of digitList) {
        const barStruct = digit.toString(2).padStart(4, '0').split("") as ("0" | "1")[];
        const encodedDigit = barStruct.map(br => bitMap[br]).flat();
        encodeBitsAry.push(...encodedDigit);
    }

    return [
        ...markersBits[Markers.MSIStart],
        ...encodeBitsAry,
        ...markersBits[Markers.MSIEnd],
    ]
}

export const encodePostnet = (digitList: Digit[]): [BarcodeBit[], number[]] => {
    const partialSm = (digitList as number[]).reduce((acc, cur) => acc + cur, 0);
    const checkSum = (10 - (partialSm % 10)) % 10 as Digit;
    digitList.push(checkSum);

    const encodedBitsAry: number[] = [];

    const barNumericEquvalence = [7, 4, 2, 1, 0];
    for (let indx = 0; indx < digitList.length; indx++) {
        let codeValue: number = digitList[indx];
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

        const bitEncode = barNumericEquvalence.flatMap(br => wideBarPos.includes(br) ? [1, 0] : [-1, 0]);
        encodedBitsAry.push(...bitEncode);
    }
    const encodedBits = [
        1,
        0,
        ...encodedBitsAry,
        1,
    ];
    const widePosIndx = encodedBits.map((bts, indx) => bts > 0 ? indx : null).filter(bts => bts !== null) as number[];
    return [
        encodedBits.map(bt => bt < 0 ? 1 : bt) as BarcodeBit[],
        widePosIndx,
    ]
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

export const mapValueToCode39Or93Digits = (valueStr: string, isCode93: boolean = false): number[] => {
    const digitList: number[] = [];
    let isOnSpecialChar = false;
    for (const [index, char] of [...valueStr].entries()) {
        if (isCode93) {
            const specialChar = valueStr.slice(index, index + 3);
            if (specialChar === "($)") {
                digitList.push(43);
                isOnSpecialChar = true;
            } else if (specialChar === "(%)") {
                digitList.push(44);
                isOnSpecialChar = true;
            } else if (specialChar === "(/)") {
                digitList.push(45);
                isOnSpecialChar = true;
            } else if (specialChar === "(+)") {
                digitList.push(46);
                isOnSpecialChar = true;
            }
        }

        if (isOnSpecialChar) {
            if (char === ")") {
                isOnSpecialChar = false;
            }
            continue;
        }

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

export const code39Or93ExtendedNormalize = (valueStr: string, is93Extended = false): string => {
    const encodeAry: string[] = [];
    if (valueStr === "") {
        encodeAry.push(is93Extended ? "(%)" : "%", "U");
    }
    for (let char of valueStr) {
        const charCode = char.charCodeAt(0);
        if (isNaN(charCode)) return "";
        if (charCode >= 48 && charCode <= 57) {
            encodeAry.push(char);
        } else if (charCode >= 65 && charCode <= 90) {
            encodeAry.push(char);
        } else if (charCode >= 97 && charCode <= 122) {
            encodeAry.push(is93Extended ? "(+)" : "+",String.fromCharCode(charCode - 32));
        } else if (char === "!") {
            encodeAry.push(is93Extended ? "(/)" : "/", "A");
        } else if (char === "\"") {
            encodeAry.push(is93Extended ? "(/)" : "/", "B");
        } else if (char === "#") {
            encodeAry.push(is93Extended ? "(/)" : "/", "C");
        } else if (char === "&") {
            encodeAry.push(is93Extended ? "(/)" : "/", "F");
        } else if (char === "'") {
            encodeAry.push(is93Extended ? "(/)" : "/", "G");
        } else if (char === "(") {
            encodeAry.push(is93Extended ? "(/)" : "/", "H");
        } else if (char === ")") {
            encodeAry.push(is93Extended ? "(/)" : "/", "I");
        } else if (char === "*") {
            encodeAry.push(is93Extended ? "(/)" : "/", "J");
        } else if (char === ",") {
            encodeAry.push(is93Extended ? "(/)" : "/", "L");
        } else if (char === ":") {
            encodeAry.push(is93Extended ? "(/)" : "/", "Z");
        } else if (char === ";") {
            encodeAry.push(is93Extended ? "(%)" : "%", "F");
        } else if (char === "<") {
            encodeAry.push(is93Extended ? "(%)" : "%", "G");
        } else if (char === "=") {
            encodeAry.push(is93Extended ? "(%)" : "%", "H");
        } else if (char === ">") {
            encodeAry.push(is93Extended ? "(%)" : "%", "I");
        } else if (char === "?") {
            encodeAry.push(is93Extended ? "(%)" : "%", "J");
        } else if (char === "@") {
            encodeAry.push(is93Extended ? "(%)" : "%", "V");
        } else if (char === "[") {
            encodeAry.push(is93Extended ? "(%)" : "%", "K");
        } else if (char === "\\") {
            encodeAry.push(is93Extended ? "(%)" : "%", "L");
        } else if (char === "]") {
            encodeAry.push(is93Extended ? "(%)" : "%", "M");
        } else if (char === "^") {
            encodeAry.push(is93Extended ? "(%)" : "%", "N");
        } else if (char === "_") {
            encodeAry.push(is93Extended ? "(%)" : "%", "O");
        } else if (char === "`") {
            encodeAry.push(is93Extended ? "(%)" : "%", "W");
        } else if (char === "{") {
            encodeAry.push(is93Extended ? "(%)" : "%", "P");
        } else if (char === "|") {
            encodeAry.push(is93Extended ? "(%)" : "%", "Q");
        } else if (char === "}") {
            encodeAry.push(is93Extended ? "(%)" : "%", "R");
        } else if (char === "~") {
            encodeAry.push(is93Extended ? "(%)" : "%", "S");
        } else {
            encodeAry.push(char);
        }
    }

    return encodeAry.join("");
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

export const calcCode93Checksum = (digitList: number[]): number[] => {
    digitList = digitList.toReversed();
    const repeatorModulo = [20, 15];
    const checkSum: number[] = [];
    for (const modulo of repeatorModulo) {
        let partialSum = 0;
        for (let indx = 0; indx < digitList.length; indx++) {
            const pos = (indx % modulo) + 1;
            const digit = digitList[indx];
            partialSum += (digit * pos);
        }
        const ck = (partialSum % 47);
        checkSum.push(ck);
        digitList.unshift(ck);
    }
    return checkSum;
}

export const encodeCode93 = (digitList: number[]): BarcodeBit[] => {
    if (digitList.length <= 0) throw Error("Atleat one value is required for Code-93");
    const checksumVal: number[] = calcCode93Checksum(digitList);
    digitList.push(...checksumVal);

    const encodeBitAry: BarcodeBit[] = [];
    for (const digit of digitList) {
        const bitAry = code93Encode[digit];
        encodeBitAry.push(...bitAry);
    }

    return [...markersBits[Markers.Code93StartEnd],
            ...encodeBitAry,
            ...markersBits[Markers.Code93StartEnd],
            1,
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

export const isValidCode39Or93 = (value: string | null): [boolean, string] => {
    if (value !== null) value = value.trim();
    // Must be non-empty
    if (!value || value.length === 0) return [false, "Value must be non-empty."];

    if (value !== value.toUpperCase()) return [false, "Value must be uppercase only."]
  
    if (!/^[A-Z0-9.\- $/+%]+$/.test(value)) return [false, "Only Uppercase albhabets, digits and characters(.,/,[space],$,-,+,%) are allowed."];
  
    return [true, ""];
}

export const isValidCode93 = (value: string | null): [boolean, string] => {
    if (value !== null) value = value.trim();
    // Must be non-empty
    if (!value || value.length === 0) return [false, "Value must be non-empty."];

    if (value !== value.toUpperCase()) return [false, "Value must be uppercase only."]
  
    // if (!/^(?:[A-Z0-9.\- $\/+%]|\(\$\)|\(/\)|\(\+\)|\(%\))+$/.test(value)) return [false, "Only Uppercase albhabets, digits and characters(.,/,[space],$,-,+,%) are allowed."];
    const singleCharSet = new Set([
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ...'0123456789',
        '-', '.', ' ', '$', '/', '+', '%',
    ]);

    const specialCharSet = new Set([
        '($)','(/)', '(+)', '(%)',
    ]);

    const message = "Only Uppercase albhabets, digits, characters(.,/,[space],$,-,+,%) and special characters(($) ,(/) ,(+) ,(%)) are allowed.";
    let specialCharacterCount = 0;
    for (const [index, char] of [...value].entries()) {
        if (specialCharacterCount > 0) {
            specialCharacterCount--;
            continue;
        }
        if (char === '(') {
            const specialChar = value.slice(index, index + 3);
            if (!specialCharSet.has(specialChar)) return [false, message];
            specialCharacterCount = 3;
            specialCharacterCount--;
            continue;
        }
        if (char === ')') {
            return [false, message];
        }
        if (!singleCharSet.has(char)) {
            return [false, message];
        }
    }
  
    return [true, ""];
}

export const isValidCode128 = (valueStr: string | null): [boolean, string] => {
    if (valueStr === null) return [false, "Code128 value must not be empty."];
    if (!/^[\x20-\x7E\xA0-\xFF]+$/.test(valueStr)) return [false, "Code128 must only contain printable ASCII and Latin-1 (ISO-8859-1)."];
    return [true, ""]
}

function getAllIndexes<T>(arr: T[], val: T): number[] {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }