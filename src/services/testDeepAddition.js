/**
 * Created by felyciagunawan on 5/4/2018.
 */
const R = require('ramda');
const moment = require('moment');

const data = [
    {
        "AP_id": "ctlg1",
        "Count_timestamp": [
            {
                "Day": "2018-02-28T16:00:00.000Z",
                "Hour_minute_count": {
                    "0": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139bd"
                    },
                    "1": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139be"
                    },
                    "2": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139bf"
                    },
                    "3": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c0"
                    },
                    "4": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c1"
                    },
                    "5": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c2"
                    },
                    "6": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c3"
                    },
                    "7": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c4"
                    },
                    "8": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7b3a69b6ed40a139c5"
                    },
                    "10": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 166,
                        "50": 194,
                        "_id": "5ac1fb7b3a69b6ed40a139c6"
                    },
                    "11": {
                        "0": 171,
                        "10": 143,
                        "20": 130,
                        "30": 143,
                        "40": 180,
                        "50": 235,
                        "_id": "5ac1fb7b3a69b6ed40a139c7"
                    },
                    "12": {
                        "0": 281,
                        "10": 334,
                        "20": 402,
                        "30": 368,
                        "40": 365,
                        "50": 407,
                        "_id": "5ac1fb7b3a69b6ed40a139c8"
                    },
                    "13": {
                        "0": 354,
                        "10": 384,
                        "20": 387,
                        "30": 375,
                        "40": 418,
                        "50": 434,
                        "_id": "5ac1fb7b3a69b6ed40a139c9"
                    },
                    "14": {
                        "0": 389,
                        "10": 345,
                        "20": 303,
                        "30": 218,
                        "40": 177,
                        "50": 170,
                        "_id": "5ac1fb7b3a69b6ed40a139ca"
                    },
                    "15": {
                        "0": 123,
                        "10": 132,
                        "20": 156,
                        "30": 153,
                        "40": 120,
                        "50": 87,
                        "_id": "5ac1fb7b3a69b6ed40a139cb"
                    },
                    "16": {
                        "0": 83,
                        "10": 70,
                        "20": 83,
                        "30": 85,
                        "40": 98,
                        "50": 93,
                        "_id": "5ac1fb7b3a69b6ed40a139cc"
                    },
                    "17": {
                        "0": 88,
                        "10": 92,
                        "20": 94,
                        "30": 108,
                        "40": 130,
                        "50": 154,
                        "_id": "5ac1fb7b3a69b6ed40a139cd"
                    },
                    "18": {
                        "0": 203,
                        "10": 284,
                        "20": 385,
                        "30": 414,
                        "40": 354,
                        "50": 328,
                        "_id": "5ac1fb7b3a69b6ed40a139ce"
                    },
                    "19": {
                        "0": 275,
                        "10": 239,
                        "20": 225,
                        "30": 224,
                        "40": 225,
                        "50": 198,
                        "_id": "5ac1fb7b3a69b6ed40a139cf"
                    },
                    "20": {
                        "0": 192,
                        "10": 172,
                        "20": 125,
                        "30": 105,
                        "40": 78,
                        "50": 78,
                        "_id": "5ac1fb7b3a69b6ed40a139d0"
                    },
                    "21": {
                        "0": 41,
                        "10": 37,
                        "20": 29,
                        "30": 24,
                        "40": 15,
                        "50": 16,
                        "_id": "5ac1fb7b3a69b6ed40a139d1"
                    },
                    "22": {
                        "0": 13,
                        "10": 7,
                        "20": 16,
                        "30": 13,
                        "40": 9,
                        "50": 17,
                        "_id": "5ac1fb7b3a69b6ed40a139d2"
                    },
                    "23": {
                        "0": 22,
                        "10": 12,
                        "20": 12,
                        "30": 9,
                        "40": 14,
                        "50": 11,
                        "_id": "5ac1fb7b3a69b6ed40a139d3"
                    },
                    "_id": "5ac1fb7b3a69b6ed40a139d4"
                },
                "_id": "5ac1fb7b3a69b6ed40a139d5"
            }
        ]
    },
    {
        "AP_id": "ctlg5",
        "Count_timestamp": [
            {
                "Day": "2018-02-28T16:00:00.000Z",
                "Hour_minute_count": {
                    "0": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a85"
                    },
                    "1": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a86"
                    },
                    "2": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a87"
                    },
                    "3": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a88"
                    },
                    "4": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a89"
                    },
                    "5": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a8a"
                    },
                    "6": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a8b"
                    },
                    "7": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a8c"
                    },
                    "8": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 0,
                        "50": 0,
                        "_id": "5ac1fb7c3a69b6ed40a13a8d"
                    },
                    "10": {
                        "0": 0,
                        "10": 0,
                        "20": 0,
                        "30": 0,
                        "40": 142,
                        "50": 131,
                        "_id": "5ac1fb7c3a69b6ed40a13a8e"
                    },
                    "11": {
                        "0": 131,
                        "10": 122,
                        "20": 128,
                        "30": 129,
                        "40": 127,
                        "50": 152,
                        "_id": "5ac1fb7c3a69b6ed40a13a8f"
                    },
                    "12": {
                        "0": 149,
                        "10": 195,
                        "20": 200,
                        "30": 226,
                        "40": 227,
                        "50": 216,
                        "_id": "5ac1fb7c3a69b6ed40a13a90"
                    },
                    "13": {
                        "0": 219,
                        "10": 233,
                        "20": 215,
                        "30": 211,
                        "40": 245,
                        "50": 227,
                        "_id": "5ac1fb7c3a69b6ed40a13a91"
                    },
                    "14": {
                        "0": 201,
                        "10": 211,
                        "20": 215,
                        "30": 212,
                        "40": 186,
                        "50": 159,
                        "_id": "5ac1fb7c3a69b6ed40a13a92"
                    },
                    "15": {
                        "0": 169,
                        "10": 172,
                        "20": 157,
                        "30": 156,
                        "40": 143,
                        "50": 138,
                        "_id": "5ac1fb7c3a69b6ed40a13a93"
                    },
                    "16": {
                        "0": 130,
                        "10": 140,
                        "20": 125,
                        "30": 124,
                        "40": 126,
                        "50": 123,
                        "_id": "5ac1fb7c3a69b6ed40a13a94"
                    },
                    "17": {
                        "0": 128,
                        "10": 130,
                        "20": 123,
                        "30": 121,
                        "40": 111,
                        "50": 120,
                        "_id": "5ac1fb7c3a69b6ed40a13a95"
                    },
                    "18": {
                        "0": 129,
                        "10": 163,
                        "20": 174,
                        "30": 155,
                        "40": 155,
                        "50": 136,
                        "_id": "5ac1fb7c3a69b6ed40a13a96"
                    },
                    "19": {
                        "0": 135,
                        "10": 127,
                        "20": 102,
                        "30": 95,
                        "40": 73,
                        "50": 82,
                        "_id": "5ac1fb7c3a69b6ed40a13a97"
                    },
                    "20": {
                        "0": 56,
                        "10": 59,
                        "20": 64,
                        "30": 60,
                        "40": 58,
                        "50": 58,
                        "_id": "5ac1fb7c3a69b6ed40a13a98"
                    },
                    "21": {
                        "0": 57,
                        "10": 55,
                        "20": 73,
                        "30": 89,
                        "40": 73,
                        "50": 66,
                        "_id": "5ac1fb7c3a69b6ed40a13a99"
                    },
                    "22": {
                        "0": 59,
                        "10": 53,
                        "20": 70,
                        "30": 109,
                        "40": 112,
                        "50": 95,
                        "_id": "5ac1fb7c3a69b6ed40a13a9a"
                    },
                    "23": {
                        "0": 89,
                        "10": 106,
                        "20": 104,
                        "30": 98,
                        "40": 89,
                        "50": 80,
                        "_id": "5ac1fb7c3a69b6ed40a13a9b"
                    },
                    "_id": "5ac1fb7c3a69b6ed40a13a9c"
                },
                "_id": "5ac1fb7c3a69b6ed40a13a9d"
            }
        ]
    }];
/*
    Gets {Day: XX, Hour_minute_count: {}}
 */


