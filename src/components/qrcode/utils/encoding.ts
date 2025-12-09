import { QrEncoding, QrErrorCorrection } from "../qrcode.types";

export type QrcodeBit = 0 | 1;

interface ErrorLevelCharacter {
    [QrErrorCorrection.L]: number[];
    [QrErrorCorrection.M]: number[];
    [QrErrorCorrection.Q]: number[];
    [QrErrorCorrection.H]: number[];
}

const CharacterCapacityTable: Record<QrEncoding, ErrorLevelCharacter> = {
    [QrEncoding.Numeric]: {
        [QrErrorCorrection.L]: [41, 77, 127, 187, 255, 322, 370, 461, 552, 652, 772, 883, 1022, 1101, 1250, 1408, 1548, 1725, 1903, 2061, 2232, 2409, 2620, 2812, 3057, 3283, 3517, 3669, 3909, 4158, 4417, 4686, 4965, 5253, 5529, 5836, 6153, 6479, 6743, 7089],
        [QrErrorCorrection.M]: [34, 63, 101, 149, 202, 255, 293, 365, 432, 513, 604, 691, 796, 871, 991, 1082, 1212, 1346, 1500, 1600, 1708, 1872, 2059, 2188, 2395, 2544, 2701, 2857, 3035, 3289, 3486, 3693, 3909, 4134, 4343, 4588, 4775, 5039, 5313, 5596],
        [QrErrorCorrection.Q]: [27, 48, 77, 111, 144, 178, 207, 259, 312, 364, 427, 489, 580, 621, 703, 775, 876, 948, 1063, 1159, 1224, 1358, 1468, 1588, 1718, 1804, 1933, 2085, 2181, 2358, 2473, 2670, 2805, 2949, 3081, 3244, 3417, 3599, 3791, 3993],
        [QrErrorCorrection.H]: [17, 34, 58, 82, 106, 139, 154, 202, 235, 288, 331, 374, 427, 468, 530, 602, 674, 746, 813, 919, 969, 1056, 1108, 1228, 1286, 1425, 1501, 1581, 1677, 1782, 1897, 2022, 2157, 2301, 2361, 2524, 2625, 2735, 2927, 3057],
    },
    [QrEncoding.AlphaNumeric]: {
        [QrErrorCorrection.L]: [25, 47, 77, 114, 154, 195, 224, 279, 335, 395, 468, 535, 619, 667, 758, 854, 938, 1046, 1153, 1249, 1352, 1460, 1588, 1704, 1853, 1990, 2132, 2223, 2369, 2520, 2677, 2840, 3009, 3183, 3351, 3537, 3729, 3927, 4087, 4296],
        [QrErrorCorrection.M]: [20, 38, 61, 90, 122, 154, 178, 221, 262, 311, 366, 419, 483, 528, 600, 656, 734, 816, 909, 970, 1035, 1134, 1248, 1326, 1451, 1542, 1637, 1732, 1839, 1994, 2113, 2238, 2369, 2506, 2632, 2780, 2894, 3054, 3220, 3391],
        [QrErrorCorrection.Q]: [16, 29, 47, 67, 87, 108, 125, 157, 189, 221, 259, 296, 352, 376, 426, 470, 531, 574, 644, 702, 742, 823, 890, 963, 1041, 1094, 1172, 1263, 1322, 1429, 1499, 1618, 1700, 1787, 1867, 1966, 2071, 2181, 2298, 2420],
        [QrErrorCorrection.H]: [10, 20, 35, 50, 64, 84, 93, 122, 143, 174, 200, 227, 259, 283, 321, 365, 408, 452, 493, 557, 587, 640, 672, 744, 779, 864, 910, 958, 1016, 1080, 1150, 1226, 1307, 1394, 1431, 1530, 1591, 1658, 1774, 1852],
    },
    [QrEncoding.Byte]: {
        [QrErrorCorrection.L]: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953],
        [QrErrorCorrection.M]: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331],
        [QrErrorCorrection.Q]: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663],
        [QrErrorCorrection.H]: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273],
    },
    [QrEncoding.Utf8]: {
        [QrErrorCorrection.L]: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953],
        [QrErrorCorrection.M]: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331],
        [QrErrorCorrection.Q]: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663],
        [QrErrorCorrection.H]: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273],
    },
};

const ModeIndicator: Record<QrEncoding, QrcodeBit[]> = {
    [QrEncoding.Numeric]: [0, 0, 0, 1],
    [QrEncoding.AlphaNumeric]: [0, 0, 1, 0],
    [QrEncoding.Byte]: [0, 1, 0, 0],
    [QrEncoding.Utf8]: [0, 1, 1, 1],
}

const CharacterCountIndicator: Record<QrEncoding, number>[] = [
    {[QrEncoding.Numeric]: 10, [QrEncoding.AlphaNumeric]: 9,  [QrEncoding.Byte]: 8, [QrEncoding.Utf8]: 8}, // v 1-9
    {[QrEncoding.Numeric]: 12, [QrEncoding.AlphaNumeric]: 11, [QrEncoding.Byte]: 16, [QrEncoding.Utf8]: 16}, // v 10-26
    {[QrEncoding.Numeric]: 14, [QrEncoding.AlphaNumeric]: 13, [QrEncoding.Byte]: 16, [QrEncoding.Utf8]: 16}, // v 27-40
]

interface ErrorCorrectCode {
    dataCapacity: number;
    errorPerBlock: number;
    g1Blocks: number;
    g1BlockCapacity: number;
    g2Blocks: number;
    g2BlockCapacity: number;
}

interface QrBlocks {
    g1: QrcodeBit[][][],
    g2?: QrcodeBit[][][],
}

interface Antilog {
    integer: number;
    exponent: number;
}

type PolynomialWithAexp = {
    xexp: number;
    aexp: number;
}

type PolynomialWithAint = {
    xexp: number;
    aint: number;
}

const AntilogTable: Antilog[] = [];

const ErrorCorrectionCodeTable: Record<QrErrorCorrection, ErrorCorrectCode[]> = {
    [QrErrorCorrection.L]: [{dataCapacity:19,errorPerBlock:7,g1Blocks:1,g1BlockCapacity:19,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:34,errorPerBlock:10,g1Blocks:1,g1BlockCapacity:34,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:55,errorPerBlock:15,g1Blocks:1,g1BlockCapacity:55,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:80,errorPerBlock:20,g1Blocks:1,g1BlockCapacity:80,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:108,errorPerBlock:26,g1Blocks:1,g1BlockCapacity:108,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:136,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:68,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:156,errorPerBlock:20,g1Blocks:2,g1BlockCapacity:78,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:194,errorPerBlock:24,g1Blocks:2,g1BlockCapacity:97,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:232,errorPerBlock:30,g1Blocks:2,g1BlockCapacity:116,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:274,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:68,g2Blocks:2,g2BlockCapacity:69},{dataCapacity:324,errorPerBlock:20,g1Blocks:4,g1BlockCapacity:81,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:370,errorPerBlock:24,g1Blocks:2,g1BlockCapacity:92,g2Blocks:2,g2BlockCapacity:93},{dataCapacity:428,errorPerBlock:26,g1Blocks:4,g1BlockCapacity:107,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:461,errorPerBlock:30,g1Blocks:3,g1BlockCapacity:115,g2Blocks:1,g2BlockCapacity:116},{dataCapacity:523,errorPerBlock:22,g1Blocks:5,g1BlockCapacity:87,g2Blocks:1,g2BlockCapacity:88},{dataCapacity:589,errorPerBlock:24,g1Blocks:5,g1BlockCapacity:98,g2Blocks:1,g2BlockCapacity:99},{dataCapacity:647,errorPerBlock:28,g1Blocks:1,g1BlockCapacity:107,g2Blocks:5,g2BlockCapacity:108},{dataCapacity:721,errorPerBlock:30,g1Blocks:5,g1BlockCapacity:120,g2Blocks:1,g2BlockCapacity:121},{dataCapacity:795,errorPerBlock:28,g1Blocks:3,g1BlockCapacity:113,g2Blocks:4,g2BlockCapacity:114},{dataCapacity:861,errorPerBlock:28,g1Blocks:3,g1BlockCapacity:107,g2Blocks:5,g2BlockCapacity:108},{dataCapacity:932,errorPerBlock:28,g1Blocks:4,g1BlockCapacity:116,g2Blocks:4,g2BlockCapacity:117},{dataCapacity:1006,errorPerBlock:28,g1Blocks:2,g1BlockCapacity:111,g2Blocks:7,g2BlockCapacity:112},{dataCapacity:1094,errorPerBlock:30,g1Blocks:4,g1BlockCapacity:121,g2Blocks:5,g2BlockCapacity:122},{dataCapacity:1174,errorPerBlock:30,g1Blocks:6,g1BlockCapacity:117,g2Blocks:4,g2BlockCapacity:118},{dataCapacity:1276,errorPerBlock:26,g1Blocks:8,g1BlockCapacity:106,g2Blocks:4,g2BlockCapacity:107},{dataCapacity:1370,errorPerBlock:28,g1Blocks:10,g1BlockCapacity:114,g2Blocks:2,g2BlockCapacity:115},{dataCapacity:1468,errorPerBlock:30,g1Blocks:8,g1BlockCapacity:122,g2Blocks:4,g2BlockCapacity:123},{dataCapacity:1531,errorPerBlock:30,g1Blocks:3,g1BlockCapacity:117,g2Blocks:10,g2BlockCapacity:118},{dataCapacity:1631,errorPerBlock:30,g1Blocks:7,g1BlockCapacity:116,g2Blocks:7,g2BlockCapacity:117},{dataCapacity:1735,errorPerBlock:30,g1Blocks:5,g1BlockCapacity:115,g2Blocks:10,g2BlockCapacity:116},{dataCapacity:1843,errorPerBlock:30,g1Blocks:13,g1BlockCapacity:115,g2Blocks:3,g2BlockCapacity:116},{dataCapacity:1955,errorPerBlock:30,g1Blocks:17,g1BlockCapacity:115,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:2071,errorPerBlock:30,g1Blocks:17,g1BlockCapacity:115,g2Blocks:1,g2BlockCapacity:116},{dataCapacity:2191,errorPerBlock:30,g1Blocks:13,g1BlockCapacity:115,g2Blocks:6,g2BlockCapacity:116},{dataCapacity:2306,errorPerBlock:30,g1Blocks:12,g1BlockCapacity:121,g2Blocks:7,g2BlockCapacity:122},{dataCapacity:2434,errorPerBlock:30,g1Blocks:6,g1BlockCapacity:121,g2Blocks:14,g2BlockCapacity:122},{dataCapacity:2566,errorPerBlock:30,g1Blocks:17,g1BlockCapacity:122,g2Blocks:4,g2BlockCapacity:123},{dataCapacity:2702,errorPerBlock:30,g1Blocks:4,g1BlockCapacity:122,g2Blocks:18,g2BlockCapacity:123},{dataCapacity:2812,errorPerBlock:30,g1Blocks:20,g1BlockCapacity:117,g2Blocks:4,g2BlockCapacity:118},{dataCapacity:2956,errorPerBlock:30,g1Blocks:19,g1BlockCapacity:118,g2Blocks:6,g2BlockCapacity:119}],
    [QrErrorCorrection.M]: [{dataCapacity:16,errorPerBlock:10,g1Blocks:1,g1BlockCapacity:16,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:28,errorPerBlock:16,g1Blocks:1,g1BlockCapacity:28,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:44,errorPerBlock:26,g1Blocks:1,g1BlockCapacity:44,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:64,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:32,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:86,errorPerBlock:24,g1Blocks:2,g1BlockCapacity:43,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:108,errorPerBlock:16,g1Blocks:4,g1BlockCapacity:27,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:124,errorPerBlock:18,g1Blocks:4,g1BlockCapacity:31,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:154,errorPerBlock:22,g1Blocks:2,g1BlockCapacity:38,g2Blocks:2,g2BlockCapacity:39},{dataCapacity:182,errorPerBlock:22,g1Blocks:3,g1BlockCapacity:36,g2Blocks:2,g2BlockCapacity:37},{dataCapacity:216,errorPerBlock:26,g1Blocks:4,g1BlockCapacity:43,g2Blocks:1,g2BlockCapacity:44},{dataCapacity:254,errorPerBlock:30,g1Blocks:1,g1BlockCapacity:50,g2Blocks:4,g2BlockCapacity:51},{dataCapacity:290,errorPerBlock:22,g1Blocks:6,g1BlockCapacity:36,g2Blocks:2,g2BlockCapacity:37},{dataCapacity:334,errorPerBlock:22,g1Blocks:8,g1BlockCapacity:37,g2Blocks:1,g2BlockCapacity:38},{dataCapacity:365,errorPerBlock:24,g1Blocks:4,g1BlockCapacity:40,g2Blocks:5,g2BlockCapacity:41},{dataCapacity:415,errorPerBlock:24,g1Blocks:5,g1BlockCapacity:41,g2Blocks:5,g2BlockCapacity:42},{dataCapacity:453,errorPerBlock:28,g1Blocks:7,g1BlockCapacity:45,g2Blocks:3,g2BlockCapacity:46},{dataCapacity:507,errorPerBlock:28,g1Blocks:10,g1BlockCapacity:46,g2Blocks:1,g2BlockCapacity:47},{dataCapacity:563,errorPerBlock:26,g1Blocks:9,g1BlockCapacity:43,g2Blocks:4,g2BlockCapacity:44},{dataCapacity:627,errorPerBlock:26,g1Blocks:3,g1BlockCapacity:44,g2Blocks:11,g2BlockCapacity:45},{dataCapacity:669,errorPerBlock:26,g1Blocks:3,g1BlockCapacity:41,g2Blocks:13,g2BlockCapacity:42},{dataCapacity:714,errorPerBlock:26,g1Blocks:17,g1BlockCapacity:42,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:782,errorPerBlock:28,g1Blocks:17,g1BlockCapacity:46,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:860,errorPerBlock:28,g1Blocks:4,g1BlockCapacity:47,g2Blocks:14,g2BlockCapacity:48},{dataCapacity:914,errorPerBlock:28,g1Blocks:6,g1BlockCapacity:45,g2Blocks:14,g2BlockCapacity:46},{dataCapacity:1000,errorPerBlock:28,g1Blocks:8,g1BlockCapacity:47,g2Blocks:13,g2BlockCapacity:48},{dataCapacity:1062,errorPerBlock:28,g1Blocks:19,g1BlockCapacity:46,g2Blocks:4,g2BlockCapacity:47},{dataCapacity:1128,errorPerBlock:28,g1Blocks:22,g1BlockCapacity:45,g2Blocks:3,g2BlockCapacity:46},{dataCapacity:1193,errorPerBlock:28,g1Blocks:3,g1BlockCapacity:45,g2Blocks:23,g2BlockCapacity:46},{dataCapacity:1267,errorPerBlock:28,g1Blocks:21,g1BlockCapacity:45,g2Blocks:7,g2BlockCapacity:46},{dataCapacity:1373,errorPerBlock:28,g1Blocks:19,g1BlockCapacity:47,g2Blocks:10,g2BlockCapacity:48},{dataCapacity:1455,errorPerBlock:28,g1Blocks:2,g1BlockCapacity:46,g2Blocks:29,g2BlockCapacity:47},{dataCapacity:1541,errorPerBlock:28,g1Blocks:10,g1BlockCapacity:46,g2Blocks:23,g2BlockCapacity:47},{dataCapacity:1631,errorPerBlock:28,g1Blocks:14,g1BlockCapacity:46,g2Blocks:21,g2BlockCapacity:47},{dataCapacity:1725,errorPerBlock:28,g1Blocks:14,g1BlockCapacity:46,g2Blocks:23,g2BlockCapacity:47},{dataCapacity:1812,errorPerBlock:28,g1Blocks:12,g1BlockCapacity:47,g2Blocks:26,g2BlockCapacity:48},{dataCapacity:1914,errorPerBlock:28,g1Blocks:6,g1BlockCapacity:47,g2Blocks:34,g2BlockCapacity:48},{dataCapacity:1992,errorPerBlock:28,g1Blocks:29,g1BlockCapacity:46,g2Blocks:14,g2BlockCapacity:47},{dataCapacity:2102,errorPerBlock:28,g1Blocks:13,g1BlockCapacity:46,g2Blocks:32,g2BlockCapacity:47},{dataCapacity:2216,errorPerBlock:28,g1Blocks:40,g1BlockCapacity:47,g2Blocks:7,g2BlockCapacity:48},{dataCapacity:2334,errorPerBlock:28,g1Blocks:18,g1BlockCapacity:47,g2Blocks:31,g2BlockCapacity:48}],
    [QrErrorCorrection.Q]: [{dataCapacity:13,errorPerBlock:13,g1Blocks:1,g1BlockCapacity:13,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:22,errorPerBlock:22,g1Blocks:1,g1BlockCapacity:22,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:34,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:17,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:48,errorPerBlock:26,g1Blocks:2,g1BlockCapacity:24,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:62,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:15,g2Blocks:2,g2BlockCapacity:16},{dataCapacity:76,errorPerBlock:24,g1Blocks:4,g1BlockCapacity:19,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:88,errorPerBlock:18,g1Blocks:2,g1BlockCapacity:14,g2Blocks:4,g2BlockCapacity:15},{dataCapacity:110,errorPerBlock:22,g1Blocks:4,g1BlockCapacity:18,g2Blocks:2,g2BlockCapacity:19},{dataCapacity:132,errorPerBlock:20,g1Blocks:4,g1BlockCapacity:16,g2Blocks:4,g2BlockCapacity:17},{dataCapacity:154,errorPerBlock:24,g1Blocks:6,g1BlockCapacity:19,g2Blocks:2,g2BlockCapacity:20},{dataCapacity:180,errorPerBlock:28,g1Blocks:4,g1BlockCapacity:22,g2Blocks:4,g2BlockCapacity:23},{dataCapacity:206,errorPerBlock:26,g1Blocks:4,g1BlockCapacity:20,g2Blocks:6,g2BlockCapacity:21},{dataCapacity:244,errorPerBlock:24,g1Blocks:8,g1BlockCapacity:20,g2Blocks:4,g2BlockCapacity:21},{dataCapacity:261,errorPerBlock:20,g1Blocks:11,g1BlockCapacity:16,g2Blocks:5,g2BlockCapacity:17},{dataCapacity:295,errorPerBlock:30,g1Blocks:5,g1BlockCapacity:24,g2Blocks:7,g2BlockCapacity:25},{dataCapacity:325,errorPerBlock:24,g1Blocks:15,g1BlockCapacity:19,g2Blocks:2,g2BlockCapacity:20},{dataCapacity:367,errorPerBlock:28,g1Blocks:1,g1BlockCapacity:22,g2Blocks:15,g2BlockCapacity:23},{dataCapacity:397,errorPerBlock:28,g1Blocks:17,g1BlockCapacity:22,g2Blocks:1,g2BlockCapacity:23},{dataCapacity:445,errorPerBlock:26,g1Blocks:17,g1BlockCapacity:21,g2Blocks:4,g2BlockCapacity:22},{dataCapacity:485,errorPerBlock:30,g1Blocks:15,g1BlockCapacity:24,g2Blocks:5,g2BlockCapacity:25},{dataCapacity:512,errorPerBlock:28,g1Blocks:17,g1BlockCapacity:22,g2Blocks:6,g2BlockCapacity:23},{dataCapacity:568,errorPerBlock:30,g1Blocks:7,g1BlockCapacity:24,g2Blocks:16,g2BlockCapacity:25},{dataCapacity:614,errorPerBlock:30,g1Blocks:11,g1BlockCapacity:24,g2Blocks:14,g2BlockCapacity:25},{dataCapacity:664,errorPerBlock:30,g1Blocks:11,g1BlockCapacity:24,g2Blocks:16,g2BlockCapacity:25},{dataCapacity:718,errorPerBlock:30,g1Blocks:7,g1BlockCapacity:24,g2Blocks:22,g2BlockCapacity:25},{dataCapacity:754,errorPerBlock:28,g1Blocks:28,g1BlockCapacity:22,g2Blocks:6,g2BlockCapacity:23},{dataCapacity:808,errorPerBlock:30,g1Blocks:8,g1BlockCapacity:23,g2Blocks:26,g2BlockCapacity:24},{dataCapacity:871,errorPerBlock:30,g1Blocks:4,g1BlockCapacity:24,g2Blocks:31,g2BlockCapacity:25},{dataCapacity:911,errorPerBlock:30,g1Blocks:1,g1BlockCapacity:23,g2Blocks:37,g2BlockCapacity:24},{dataCapacity:985,errorPerBlock:30,g1Blocks:15,g1BlockCapacity:24,g2Blocks:25,g2BlockCapacity:25},{dataCapacity:1033,errorPerBlock:30,g1Blocks:42,g1BlockCapacity:24,g2Blocks:1,g2BlockCapacity:25},{dataCapacity:1115,errorPerBlock:30,g1Blocks:10,g1BlockCapacity:24,g2Blocks:35,g2BlockCapacity:25},{dataCapacity:1171,errorPerBlock:30,g1Blocks:29,g1BlockCapacity:24,g2Blocks:19,g2BlockCapacity:25},{dataCapacity:1231,errorPerBlock:30,g1Blocks:44,g1BlockCapacity:24,g2Blocks:7,g2BlockCapacity:25},{dataCapacity:1286,errorPerBlock:30,g1Blocks:39,g1BlockCapacity:24,g2Blocks:14,g2BlockCapacity:25},{dataCapacity:1354,errorPerBlock:30,g1Blocks:46,g1BlockCapacity:24,g2Blocks:10,g2BlockCapacity:25},{dataCapacity:1426,errorPerBlock:30,g1Blocks:49,g1BlockCapacity:24,g2Blocks:10,g2BlockCapacity:25},{dataCapacity:1502,errorPerBlock:30,g1Blocks:48,g1BlockCapacity:24,g2Blocks:14,g2BlockCapacity:25},{dataCapacity:1582,errorPerBlock:30,g1Blocks:43,g1BlockCapacity:24,g2Blocks:22,g2BlockCapacity:25},{dataCapacity:1666,errorPerBlock:30,g1Blocks:34,g1BlockCapacity:24,g2Blocks:34,g2BlockCapacity:25}],
    [QrErrorCorrection.H]: [{dataCapacity:9,errorPerBlock:17,g1Blocks:1,g1BlockCapacity:9,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:16,errorPerBlock:28,g1Blocks:1,g1BlockCapacity:16,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:26,errorPerBlock:22,g1Blocks:2,g1BlockCapacity:13,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:36,errorPerBlock:16,g1Blocks:4,g1BlockCapacity:9,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:46,errorPerBlock:22,g1Blocks:2,g1BlockCapacity:11,g2Blocks:2,g2BlockCapacity:12},{dataCapacity:60,errorPerBlock:28,g1Blocks:4,g1BlockCapacity:15,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:66,errorPerBlock:26,g1Blocks:4,g1BlockCapacity:13,g2Blocks:1,g2BlockCapacity:14},{dataCapacity:86,errorPerBlock:26,g1Blocks:4,g1BlockCapacity:14,g2Blocks:2,g2BlockCapacity:15},{dataCapacity:100,errorPerBlock:24,g1Blocks:4,g1BlockCapacity:12,g2Blocks:4,g2BlockCapacity:13},{dataCapacity:122,errorPerBlock:28,g1Blocks:6,g1BlockCapacity:15,g2Blocks:2,g2BlockCapacity:16},{dataCapacity:140,errorPerBlock:24,g1Blocks:3,g1BlockCapacity:12,g2Blocks:8,g2BlockCapacity:13},{dataCapacity:158,errorPerBlock:28,g1Blocks:7,g1BlockCapacity:14,g2Blocks:4,g2BlockCapacity:15},{dataCapacity:180,errorPerBlock:22,g1Blocks:12,g1BlockCapacity:11,g2Blocks:4,g2BlockCapacity:12},{dataCapacity:197,errorPerBlock:24,g1Blocks:11,g1BlockCapacity:12,g2Blocks:5,g2BlockCapacity:13},{dataCapacity:223,errorPerBlock:24,g1Blocks:11,g1BlockCapacity:12,g2Blocks:7,g2BlockCapacity:13},{dataCapacity:253,errorPerBlock:30,g1Blocks:3,g1BlockCapacity:15,g2Blocks:13,g2BlockCapacity:16},{dataCapacity:283,errorPerBlock:28,g1Blocks:2,g1BlockCapacity:14,g2Blocks:17,g2BlockCapacity:15},{dataCapacity:313,errorPerBlock:28,g1Blocks:2,g1BlockCapacity:14,g2Blocks:19,g2BlockCapacity:15},{dataCapacity:341,errorPerBlock:26,g1Blocks:9,g1BlockCapacity:13,g2Blocks:16,g2BlockCapacity:14},{dataCapacity:385,errorPerBlock:28,g1Blocks:15,g1BlockCapacity:15,g2Blocks:10,g2BlockCapacity:16},{dataCapacity:406,errorPerBlock:30,g1Blocks:19,g1BlockCapacity:16,g2Blocks:6,g2BlockCapacity:17},{dataCapacity:442,errorPerBlock:24,g1Blocks:34,g1BlockCapacity:13,g2Blocks:0,g2BlockCapacity:0},{dataCapacity:464,errorPerBlock:30,g1Blocks:16,g1BlockCapacity:15,g2Blocks:14,g2BlockCapacity:16},{dataCapacity:514,errorPerBlock:30,g1Blocks:30,g1BlockCapacity:16,g2Blocks:2,g2BlockCapacity:17},{dataCapacity:538,errorPerBlock:30,g1Blocks:22,g1BlockCapacity:15,g2Blocks:13,g2BlockCapacity:16},{dataCapacity:596,errorPerBlock:30,g1Blocks:33,g1BlockCapacity:16,g2Blocks:4,g2BlockCapacity:17},{dataCapacity:628,errorPerBlock:30,g1Blocks:12,g1BlockCapacity:15,g2Blocks:28,g2BlockCapacity:16},{dataCapacity:661,errorPerBlock:30,g1Blocks:11,g1BlockCapacity:15,g2Blocks:31,g2BlockCapacity:16},{dataCapacity:701,errorPerBlock:30,g1Blocks:19,g1BlockCapacity:15,g2Blocks:26,g2BlockCapacity:16},{dataCapacity:745,errorPerBlock:30,g1Blocks:23,g1BlockCapacity:15,g2Blocks:25,g2BlockCapacity:16},{dataCapacity:793,errorPerBlock:30,g1Blocks:23,g1BlockCapacity:15,g2Blocks:28,g2BlockCapacity:16},{dataCapacity:845,errorPerBlock:30,g1Blocks:19,g1BlockCapacity:15,g2Blocks:35,g2BlockCapacity:16},{dataCapacity:901,errorPerBlock:30,g1Blocks:11,g1BlockCapacity:15,g2Blocks:46,g2BlockCapacity:16},{dataCapacity:961,errorPerBlock:30,g1Blocks:59,g1BlockCapacity:16,g2Blocks:1,g2BlockCapacity:17},{dataCapacity:986,errorPerBlock:30,g1Blocks:22,g1BlockCapacity:15,g2Blocks:41,g2BlockCapacity:16},{dataCapacity:1054,errorPerBlock:30,g1Blocks:2,g1BlockCapacity:15,g2Blocks:64,g2BlockCapacity:16},{dataCapacity:1096,errorPerBlock:30,g1Blocks:24,g1BlockCapacity:15,g2Blocks:46,g2BlockCapacity:16},{dataCapacity:1142,errorPerBlock:30,g1Blocks:42,g1BlockCapacity:15,g2Blocks:32,g2BlockCapacity:16},{dataCapacity:1222,errorPerBlock:30,g1Blocks:10,g1BlockCapacity:15,g2Blocks:67,g2BlockCapacity:16},{dataCapacity:1276,errorPerBlock:30,g1Blocks:20,g1BlockCapacity:15,g2Blocks:61,g2BlockCapacity:16}],
}

const getCharCountIndicatorLen = (version: number, encodeMode: QrEncoding): number => {
    if (version < 1 || version > 40) throw Error("Version number not correct.");
    if (version >= 1 && version <= 9) {
        return CharacterCountIndicator[0][encodeMode];
    } else if (version >= 10 && version <= 26) {
        return CharacterCountIndicator[1][encodeMode];
    } else {
        return CharacterCountIndicator[2][encodeMode];
    }
}

const getCharCodeList = (value: string, encodeMode: QrEncoding): number[] => {
    if (encodeMode === QrEncoding.Utf8) {
        return [...(new TextEncoder().encode(value))];
    }
    return [...value].map(chr => chr.codePointAt(0) ?? 0);
}

const getPaddedQrBits = (decimalVal: number, totalLen: number): QrcodeBit[] => {
    const binaryVal = decimalVal.toString(2).padStart(totalLen, "0");
    return [...binaryVal].map(bin => Number(bin) as QrcodeBit);
}

const getCharacterCountIndicator = (value: string, version: number, encodeMode: QrEncoding): QrcodeBit[] => {
    const reqLen = getCharCountIndicatorLen(version, encodeMode);
    const charCodesLen = getCharCodeList(value, encodeMode).length;
    return getPaddedQrBits(charCodesLen, reqLen);
}

const getVersionNumber = (value: string, encodeMode: QrEncoding, errorCorrectionLevel: QrErrorCorrection): number => {
    const charCodesLen = getCharCodeList(value, encodeMode).length;
    const version = CharacterCapacityTable[encodeMode][errorCorrectionLevel].findIndex(vr => vr >= charCodesLen) + 1;
    if (version === undefined) throw Error("Version is not correct.");
    return version;
}

const getQrEncodingMode = (value: string): QrEncoding => {
    const chars = [...value];

    if (chars.every(char => (
        (char.codePointAt(0) ?? 0) >= 48 && (char.codePointAt(0) ?? 0) <= 57))
    ) {
        return QrEncoding.Numeric;
    }

    if (chars.every(char => (
        ((char.codePointAt(0) ?? 0) >= 48 && (char.codePointAt(0) ?? 0) <= 57) || // 0-9
        ((char.codePointAt(0) ?? 0) >= 65 && (char.codePointAt(0) ?? 0) <= 90) || // A-Z
        ((char.codePointAt(0) ?? 0) === 36) || // $
        ((char.codePointAt(0) ?? 0) === 37) || // %
        ((char.codePointAt(0) ?? 0) === 42) || // *
        ((char.codePointAt(0) ?? 0) === 43) || // +
        ((char.codePointAt(0) ?? 0) === 45) || // -
        ((char.codePointAt(0) ?? 0) === 46) || // .
        ((char.codePointAt(0) ?? 0) === 47) || // /
        ((char.codePointAt(0) ?? 0) === 58) || // :
        ((char.codePointAt(0) ?? 0) === 32)    // [space]
        )
    )) {
        return QrEncoding.AlphaNumeric;
    }

    if (chars.every(char => (
        ((char.codePointAt(0) ?? 0) >= 32 && (char.codePointAt(0) ?? 0) <= 127) ||
        ((char.codePointAt(0) ?? 0) >= 160 && (char.codePointAt(0) ?? 0) <= 225)
    ))) {
        return QrEncoding.Byte;
    }

    // TODO: Kanji mode

    return QrEncoding.Utf8;
}

const encodeNumericModePayload = (value: string): QrcodeBit[] => {
    const data: QrcodeBit[] = [];
    for (let indx = 0; indx < value.length; indx += 3) {
        const digit = parseInt(value.slice(indx, indx + 3));
        if (isNaN(digit)) throw Error("Numeric mode should only contain numbers.");
        let totalLen = 4;
        if ((digit / 100) >= 1) {
            totalLen = 10;
        }
        else if ((digit / 10) >= 1) {
            totalLen = 7;
        }
        data.push(...getPaddedQrBits(digit, totalLen));
    }
    return data;
}

const encodeAlphaNumericModePayload = (value: string): QrcodeBit[] => {
    const data: QrcodeBit[] = [];
    const dataVals = [..."0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"];
    for (let indx = 0; indx < value.length; indx += 2) {
        const valPair = value.slice(indx, indx + 2);
        if (valPair.length > 1) {
            const char1Val = dataVals.indexOf(valPair[0]);
            const char2Val = dataVals.indexOf(valPair[1]);
            if (char1Val < 0 || char2Val < 0) throw Error("Alphanumeric mode data not correct.");
            const computedVal = (45 * char1Val) + char2Val;
            data.push(...getPaddedQrBits(computedVal, 11));
        } else {
           const char1Val = dataVals.indexOf(valPair[0]);
           if (char1Val < 0) throw Error("Alphanumeric mode data not correct.");
           data.push(...getPaddedQrBits(char1Val, 6));
        }
    }
    return data;
}

const encodeByteModePayload = (value: string, encodeMode: (QrEncoding.Byte | QrEncoding.Utf8)): QrcodeBit[] => {
    const codeList = getCharCodeList(value, encodeMode);
    const byteList = codeList.flatMap(cd => getPaddedQrBits(cd, 8));
    return byteList;
}

const encodePayload = (value: string, encodeMode: QrEncoding): QrcodeBit[] => {
    let data: QrcodeBit[] = [];
    if (encodeMode === QrEncoding.Numeric) {
        data = encodeNumericModePayload(value);
    } else if (encodeMode === QrEncoding.AlphaNumeric) {
        data = encodeAlphaNumericModePayload(value);
    } else if (encodeMode === QrEncoding.Byte) {
        data = encodeByteModePayload(value, QrEncoding.Byte);
    } else if (encodeMode === QrEncoding.Utf8) {
        data = encodeByteModePayload(value, QrEncoding.Utf8);
    }

    return data;
}

const transformBitsToBlocks = (encodedData: QrcodeBit[], g1Blocks: number, g1BlockCapacity: number, g2Blocks: number, g2BlockCapacity: number): QrBlocks => {
    if (g1Blocks < 1 || g1BlockCapacity < 1) throw Error("Block capacity group 1 not correct.");
    const qrBytes = Array.from({length: encodedData.length / 8}, (_, ind) => encodedData.slice(ind * 8, (ind + 1) * 8));

    const grpAndBlocks: QrBlocks =  {
        g1: [],
    }
    const block1Bytes = qrBytes.slice(0, g1Blocks * g1BlockCapacity);
    grpAndBlocks.g1 = Array.from({length: g1Blocks}, (_, indx) => block1Bytes.slice(indx * g1BlockCapacity, (indx + 1) * g1BlockCapacity));
    if (g2Blocks > 0 && g2BlockCapacity > 0) {
        const block2Bytes = qrBytes.slice(g1Blocks * g1BlockCapacity);
        grpAndBlocks.g2 = Array.from({length: g2Blocks}, (_, indx) => block2Bytes.slice(indx * g2BlockCapacity, (indx + 1) * g2BlockCapacity));
    }

    return grpAndBlocks;
}

const getTwosExponent = (num: number): number => {
    num = Math.abs(num);
    let pow = 0;
    if (num === 0) throw Error("Incorrect number given for 2's power.");
    while (num > 1) {
        if (num % 2 !== 0) throw Error("Number should be power of 2.");
        num = num / 2;
        pow++;
    }
    return pow;
}

const transformToGF = (exponent: number): number => {
    if (exponent >= 256) exponent = exponent % 255;
    let gfNum = 1;
    for (let exp = 0; exp < exponent; exp++) {
        gfNum = gfNum * 2;
        if (gfNum >= 256) gfNum = gfNum ^ 285;
    }

    return gfNum;
}

const genAntilogTable = () => {
    if (AntilogTable.length !== 0) return;
    for (let exp = 0; exp <= 255; exp++) {
        AntilogTable.push({
            exponent: exp,
            integer: transformToGF(exp)
        })
    }
}

const getExp = (int: number): number => {
    if (AntilogTable.length <= 0) genAntilogTable();
    if (int < 1 || int > 255) throw Error("Integer value for antilog table not correct.");
    const exp =  AntilogTable.find(obj => obj.integer === int)?.exponent;
    if (exp === undefined) throw Error("Cant find exponent value for integer.");
    return exp;
}

const getInt = (exp: number): number => {
    if (AntilogTable.length <= 0) genAntilogTable();
    if (exp < 0 || exp > 255) throw Error("Exponent value for antilog table not correct.");
    const int =  AntilogTable.find(obj => obj.exponent === exp)?.integer;
    if (int === undefined) throw Error("Cant find integer value for exponent.");
    return int;
}

const getMessagePolynomial = (errorCodeware: number, encodedData: QrcodeBit[]): PolynomialWithAint[] => {
    const byteSize = 8;
    const bytesAry: string[] = [];
    for (let indx = 0; indx < (encodedData.length / byteSize); indx++) {
        bytesAry.push(encodedData.slice(indx * byteSize, (indx + 1) * byteSize).join(""));
    }
    const decimalVals = bytesAry.map(byt => parseInt(byt, 2));
    
    return decimalVals.map((vl, i) => {
        return {
            aint: vl,
            xexp: decimalVals.length - 1 - i + errorCodeware
        }
    })
}

const genErrorCode = (errorCodeware: number, encodedData: QrcodeBit[]): PolynomialWithAint[] => {
    const msgPoly = getMessagePolynomial(errorCodeware, encodedData);
    const genPoly = getGeneratorPolynomial(errorCodeware);
    const xexpDiff = msgPoly[0].xexp - genPoly[0].xexp;
    genPoly.forEach(p => {
        p.xexp = p.xexp + xexpDiff;
    });

    return polynomialDivision(msgPoly, genPoly, msgPoly.length);
}

const polynomialDivision = (msgPoly: PolynomialWithAint[], genPoly: PolynomialWithAexp[], steps: number): PolynomialWithAint[] => {
    if (steps <= 0) return msgPoly;
    const leadMsgAExp = getExp(msgPoly[0].aint);
    const newGenPoly = genPoly.map(p => {
        const newAexp = (p.aexp + leadMsgAExp) > 255 ? (p.aexp + leadMsgAExp) % 255 : (p.aexp + leadMsgAExp);
        return {
            xexp: p.xexp,
            aexp: newAexp,
        } as PolynomialWithAexp
    });

    const remainder: PolynomialWithAint[] = [];
    for (let indx = 0; indx < Math.max(msgPoly.length, newGenPoly.length); indx++) {
        const genPolyAIntVal = newGenPoly[indx] !== undefined ? getInt(newGenPoly[indx].aexp) : 0;
        const msgPolyAIntVal = msgPoly[indx] !== undefined ? msgPoly[indx].aint : 0;
        const xorVal = msgPolyAIntVal ^ genPolyAIntVal;
        remainder.push({
            xexp: msgPoly.length > newGenPoly.length ? msgPoly[indx].xexp : newGenPoly[indx].xexp,
            aint: xorVal
        });
    };
    const remainderLeadAInt = remainder.shift();

    if (remainderLeadAInt?.aint !== 0) throw Error("Error while generating error polynomial.");
    genPoly.forEach(p => {
        p.xexp = p.xexp - 1
    })
    return polynomialDivision(remainder, genPoly, steps - 1);
}

const getGeneratorPolynomial = (errorCodeware: number, n1: PolynomialWithAexp[] = [{aexp: 0, xexp: 1}, {aexp: 0, xexp: 0}], n2: PolynomialWithAexp[] = [{aexp: 0, xexp: 1}, {aexp: 1, xexp: 0}]): PolynomialWithAexp[] => {
    if (n2[1].aexp >= errorCodeware) return n1;
    const newN1: PolynomialWithAexp[] = [];
    for (const n1i of n1) {
        for (const n2i of n2) {
            const xexp = n1i.xexp + n2i.xexp;
            const aexp = (n1i.aexp + n2i.aexp) > 255 ? ((n1i.aexp + n2i.aexp) % 256) + Math.floor((n1i.aexp + n2i.aexp) / 256) : (n1i.aexp + n2i.aexp);
            newN1.push({xexp, aexp});
        }
    }

    const newN1Ary = newN1.reduce((acc: {aexp: number, xexp: number}[], cur) => acc.some(c => c.xexp === cur.xexp) ? acc : [...acc, cur],[]).map(n => newN1.filter(nw => n.xexp === nw.xexp));
    const result = newN1Ary.map(nwN1=> {
        return {
            xexp: nwN1[0].xexp,
            aexp: getExp(
                nwN1.map(n => n.aexp).reduce((acc, cur) => acc ^ getInt(cur),0)
            )
        }
    })
    n2[1].aexp = n2[1].aexp + 1;
    return getGeneratorPolynomial(errorCodeware, result, n2);
}

export const encodeQr = (value: string | null, errorLevel: QrErrorCorrection) => {
    try {
        if (!value) throw Error("Value must be present.");
        const encodeMode = getQrEncodingMode(value);
        const version = getVersionNumber(value, encodeMode, errorLevel);
        const modeIndicator = ModeIndicator[encodeMode];
        const charCountIndicator = getCharacterCountIndicator(value, version, encodeMode);
        
        const encodedPayload = encodePayload(value, encodeMode);

        const encodedData: QrcodeBit[] = [];

        if (encodeMode === QrEncoding.Utf8) {
            const utf8ECI = [0, 0, 0, 1, 1, 0, 1, 0] as QrcodeBit[];
            const byteMode = ModeIndicator[QrEncoding.Byte];
            encodedData.push(
                ...modeIndicator,
                ...utf8ECI,
                ...byteMode,
                ...charCountIndicator,
                ...encodedPayload
            );
        } else {
            encodedData.push(
                ...modeIndicator,
                ...charCountIndicator,
                ...encodedPayload
            );
        }

        const {dataCapacity, errorPerBlock, g1Blocks, g1BlockCapacity, g2Blocks, g2BlockCapacity} = ErrorCorrectionCodeTable[errorLevel][version - 1];
        if (!dataCapacity) throw Error("total bit required lendth not correct, check error-correct-level and version.");
        const reqTotalBitLen = dataCapacity * 8;
        if (encodedData.length > reqTotalBitLen) throw Error("");

        const terminatorCount = (reqTotalBitLen - encodedData.length) < 4 ? (reqTotalBitLen - encodedData.length) : 4;
        const terminatorBits: QrcodeBit[] = Array(terminatorCount).fill(0);
        encodedData.push(...terminatorBits);

        const remainder = (encodedData.length % 8) === 0 ? 0 : 8 - (encodedData.length % 8)
        const paddedBits: QrcodeBit[] = Array(remainder).fill(0);
        encodedData.push(...paddedBits);

        const padBytes: QrcodeBit[][] = [[1,1,1,0,1,1,0,0], [0,0,0,1,0,0,0,1]];
        let indx = 0;
        while (encodedData.length < reqTotalBitLen) {
            encodedData.push(...padBytes[indx % 2]);
            indx++;
        }

        transformBitsToBlocks(encodedData, g1Blocks, g1BlockCapacity, g2Blocks, g2BlockCapacity);

        const errorPoly = genErrorCode(errorPerBlock, encodedData);
    } catch (e) {
        throw e;
    }
}