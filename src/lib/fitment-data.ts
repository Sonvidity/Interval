import type { WheelFitment } from './types';

type FitmentData = {
  [key: string]: WheelFitment;
};

export const FITMENT_DATA: FitmentData = {
    'ford-falcon-fg-turbo': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '19x8', tyre: '245/35R19', offset: '+36' },
        options: [
            { wheel: '18x8', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+30 to +40' },
            { wheel: '19x8.5', minTyre: '245/35R19', maxTyre: '255/35R19', offset: '+30 to +38' },
            { wheel: '19x9.5', minTyre: '255/35R19', maxTyre: '275/30R19', offset: '+35 to +45' },
            { wheel: '20x9', minTyre: '245/30R20', maxTyre: '255/30R20', offset: '+30 to +38' },
            { wheel: '20x10', minTyre: '275/30R20', maxTyre: '285/25R20', offset: '+40 to +50' },
        ],
    },
    'toyota-86': {
        pcd: '5x100',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '17x7', tyre: '215/45R17', offset: '+48' },
        options: [
            { wheel: '17x8', minTyre: '225/45R17', maxTyre: '235/45R17', offset: '+35 to +45' },
            { wheel: '17x9', minTyre: '245/40R17', maxTyre: '255/40R17', offset: '+35 to +42' },
            { wheel: '18x8.5', minTyre: '225/40R18', maxTyre: '245/35R18', offset: '+35 to +45' },
            { wheel: '18x9.5', minTyre: '245/35R18', maxTyre: '265/35R18', offset: '+38 to +45' },
        ],
    },
    'sv6-commodore': {
        pcd: '5x120',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '18x8', tyre: '245/45R18', offset: '+48' },
        options: [
            { wheel: '19x8.5', minTyre: '245/40R19', maxTyre: '255/40R19', offset: '+40 to +48' },
            { wheel: '20x9', minTyre: '245/35R20', maxTyre: '255/35R20', offset: '+40 to +45' },
            { wheel: '20x10', minTyre: '275/30R20', maxTyre: '285/30R20', offset: '+40 to +50 (Rear)' },
        ],
    },
    'nissan-skyline-r32-gtst': {
        pcd: '4x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '16x6.5', tyre: '205/55R16', offset: '+40' },
        options: [
            { wheel: '17x8', minTyre: '215/45R17', maxTyre: '235/40R17', offset: '+30 to +38' },
            { wheel: '17x9', minTyre: '235/40R17', maxTyre: '245/40R17', offset: '+30 to +35' },
            { wheel: '18x9.5', minTyre: '235/40R18', maxTyre: '245/35R18', offset: '+20 to +30' },
        ],
    },
    'nissan-skyline-r32-gtr': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '16x8', tyre: '225/50R16', offset: '+30' },
        options: [
            { wheel: '17x9', minTyre: '245/40R17', maxTyre: '255/40R17', offset: '+20 to +30' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+12 to +22' },
            { wheel: '18x10', minTyre: '265/35R18', maxTyre: '275/35R18', offset: '+15 to +20' },
            { wheel: '18x10.5', minTyre: '275/35R18', maxTyre: '285/30R18', offset: '+15' },
        ],
    },
    'nissan-skyline-r33-gtst': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '17x7', tyre: '215/50R17', offset: '+40' },
        options: [
            { wheel: '18x8.5', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+30 to +38' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+30 to +38' },
            { wheel: '19x9.5', minTyre: '255/30R19', maxTyre: '265/30R19', offset: '+25 to +35' },
        ],
    },
    'nissan-skyline-r34-gtt': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '17x7.5', tyre: '225/45R17', offset: '+40' },
        options: [
            { wheel: '18x9', minTyre: '245/40R18', maxTyre: '255/35R18', offset: '+30 to +38' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+30 to +38' },
            { wheel: '19x9.5', minTyre: '255/30R19', maxTyre: '265/30R19', offset: '+22 to +30' },
        ],
    },
    'nissan-skyline-r34-gtr': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '18x9', tyre: '245/40R18', offset: '+30' },
        options: [
            { wheel: '18x10', minTyre: '265/35R18', maxTyre: '275/35R18', offset: '+15 to +22' },
            { wheel: '18x10.5', minTyre: '275/35R18', maxTyre: '295/30R18', offset: '+12 to +18' },
            { wheel: '19x10.5', minTyre: '275/30R19', maxTyre: '285/30R19', offset: '+12 to +15' },
        ],
    },
    'ford-falcon-au': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '15x6', tyre: '205/65R15', offset: '+6' },
        options: [
            { wheel: '17x8', minTyre: '235/45R17', maxTyre: '245/45R17', offset: '+4 to +10' },
            { wheel: '18x8', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+4 to +10' },
        ],
    },
    'ford-falcon-ba-bf': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '17x7.5', tyre: '235/45R17', offset: '+36.5' },
        options: [
            { wheel: '18x8', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+30 to +40' },
            { wheel: '19x8.5', minTyre: '245/35R19', maxTyre: '255/35R19', offset: '+30 to +38' },
        ],
    },
    'vw-golf-r-mk5': {
        pcd: '5x112',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '18x7.5', tyre: '225/40R18', offset: '+51' },
        options: [
            { wheel: '18x8', minTyre: '225/40R18', maxTyre: '235/40R18', offset: '+45 to +50' },
            { wheel: '19x8.5', minTyre: '225/35R19', maxTyre: '235/35R19', offset: '+45' },
        ],
    },
    'vw-golf-r-mk6': {
        pcd: '5x112',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '18x7.5', tyre: '225/40R18', offset: '+51' },
        options: [
            { wheel: '18x8', minTyre: '225/40R18', maxTyre: '235/40R18', offset: '+45 to +50' },
            { wheel: '19x8.5', minTyre: '225/35R19', maxTyre: '235/35R19', offset: '+45' },
        ],
    },
    'vw-golf-r-mk7': {
        pcd: '5x112',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '19x8', tyre: '235/35R19', offset: '+50' },
        options: [
            { wheel: '18x8.5', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+45' },
            { wheel: '19x8.5', minTyre: '235/35R19', maxTyre: '245/35R19', offset: '+45' },
            { wheel: '20x8.5', minTyre: '235/30R20', maxTyre: '245/30R20', offset: '+45' },
        ],
    },
    'vw-golf-r-mk8': {
        pcd: '5x112',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '19x8', tyre: '235/35R19', offset: '+50' },
        options: [
            { wheel: '19x8.5', minTyre: '235/35R19', maxTyre: '245/35R19', offset: '+45' },
            { wheel: '20x8.5', minTyre: '235/30R20', maxTyre: '245/30R20', offset: '+45' },
        ],
    },
    'mercedes-ml500': {
        pcd: '5x112',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '19x8.5', tyre: '255/50R19', offset: '+58' },
        options: [
            { wheel: '20x9.5', minTyre: '265/45R20', maxTyre: '275/45R20', offset: '+45 to +55' },
            { wheel: '21x10', minTyre: '265/40R21', maxTyre: '295/35R21', offset: '+40 to +50' },
        ],
    },
    'ford-mondeo-mc': {
        pcd: '5x108',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '18x8', tyre: '235/45R18', offset: '+55' },
        options: [
            { wheel: '19x8', minTyre: '235/40R19', maxTyre: '245/40R19', offset: '+50 to +55' },
            { wheel: '20x8.5', minTyre: '235/35R20', maxTyre: '245/35R20', offset: '+45 to +50' },
        ],
    },
    'honda-accord-cl9': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '17x7', tyre: '225/45R17', offset: '+55' },
        options: [
            { wheel: '18x8', minTyre: '225/40R18', maxTyre: '235/40R18', offset: '+45 to +55' },
            { wheel: '18x8.5', minTyre: '235/40R18', maxTyre: '245/40R18', offset: '+40 to +48' },
        ],
    },
    'subaru-wrx-sti-gc8': {
        pcd: '5x100',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '16x7', tyre: '205/50R16', offset: '+53' },
        options: [
            { wheel: '17x8', minTyre: '215/45R17', maxTyre: '225/45R17', offset: '+45 to +53' },
            { wheel: '17x9', minTyre: '235/40R17', maxTyre: '245/40R17', offset: '+35 to +44' },
        ],
    },
    'subaru-wrx-sti-gd': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '17x8', tyre: '225/45R17', offset: '+53' },
        options: [
            { wheel: '17x8.5', minTyre: '235/45R17', maxTyre: '245/40R17', offset: '+45 to +53' },
            { wheel: '18x9', minTyre: '245/40R18', maxTyre: '255/35R18', offset: '+35 to +45' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+38 to +44' },
        ],
    },
    'subaru-wrx-sti-va': {
        pcd: '5x114.3',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '19x8.5', tyre: '245/35R19', offset: '+55' },
        options: [
            { wheel: '18x9.5', minTyre: '255/40R18', maxTyre: '265/35R18', offset: '+38 to +45' },
            { wheel: '19x9.5', minTyre: '255/35R19', maxTyre: '265/35R19', offset: '+38 to +45' },
        ],
    },
    'mitsubishi-evo-8-9': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '17x8', tyre: '235/45R17', offset: '+38' },
        options: [
            { wheel: '17x9', minTyre: '245/40R17', maxTyre: '255/40R17', offset: '+25 to +35' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+22 to +35' },
        ],
    },
    'mitsubishi-evo-10': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '18x8.5', tyre: '245/40R18', offset: '+38' },
        options: [
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+22 to +35' },
            { wheel: '18x10.5', minTyre: '275/35R18', maxTyre: '285/30R18', offset: '+15 to +25' },
        ],
    },
    'mazda-mx5-nd': {
        pcd: '4x100',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '17x7', tyre: '205/45R17', offset: '+45' },
        options: [
            { wheel: '17x8', minTyre: '215/45R17', maxTyre: '235/40R17', offset: '+35 to +45' },
            { wheel: '17x9', minTyre: '235/40R17', maxTyre: '245/40R17', offset: '+40 to +45' },
        ],
    },
    'mazda-rx7-fd': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '16x8', tyre: '225/50R16', offset: '+50' },
        options: [
            { wheel: '17x8.5', minTyre: '235/45R17', maxTyre: '255/40R17', offset: '+40 to +50' },
            { wheel: '17x9.5 (R)', minTyre: '255/40R17', maxTyre: '265/40R17', offset: '+45' },
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+38 to +45' },
            { wheel: '18x10 (R)', minTyre: '265/35R18', maxTyre: '285/30R18', offset: '+40' },
        ],
    },
    'honda-s2000': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '17x7 (F), 17x8.5 (R)', tyre: '215/45R17 (F), 245/40R17 (R)', offset: '+55 (F), +65 (R)' },
        options: [
            { wheel: '17x9', minTyre: '245/40R17', maxTyre: '255/40R17', offset: '+45 to +63' },
            { wheel: '17x10 (R)', minTyre: '255/40R17', maxTyre: '275/40R17', offset: '+45 to +55' },
        ],
    },
    'honda-civic-type-r-fk8': {
        pcd: '5x120',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '20x8.5', tyre: '245/30R20', offset: '+60' },
        options: [
            { wheel: '18x9.5', minTyre: '255/40R18', maxTyre: '265/35R18', offset: '+45 to +58' },
            { wheel: '19x9.5', minTyre: '255/35R19', maxTyre: '265/35R19', offset: '+45 to +55' },
        ],
    },
    'bmw-m3-e46': {
        pcd: '5x120',
        studPattern: 'M12 x 1.5',
        oemSize: { wheel: '18x8 (F), 18x9 (R)', tyre: '225/45R18 (F), 255/40R18 (R)', offset: '+47 (F), +26 (R)' },
        options: [
            { wheel: '18x9.5', minTyre: '255/35R18', maxTyre: '265/35R18', offset: '+22 to +35' },
            { wheel: '19x9.5 (F)', minTyre: '245/35R19', maxTyre: '255/35R19', offset: '+25 to +35' },
            { wheel: '19x10.5 (R)', minTyre: '275/30R19', maxTyre: '285/30R19', offset: '+20 to +25' },
        ],
    },
    'bmw-m2-f87': {
        pcd: '5x120',
        studPattern: 'M14 x 1.25',
        oemSize: { wheel: '19x9 (F), 19x10 (R)', tyre: '245/35R19 (F), 265/35R19 (R)', offset: '+29 (F), +40 (R)' },
        options: [
            { wheel: '19x9.5 (F)', minTyre: '255/35R19', maxTyre: '265/35R19', offset: '+25 to +30' },
            { wheel: '19x10.5 (R)', minTyre: '285/30R19', maxTyre: '295/30R19', offset: '+35 to +45' },
        ],
    },
    'ford-mustang-s550': {
        pcd: '5x114.3',
        studPattern: 'M14 x 1.5',
        oemSize: { wheel: '19x8.5', tyre: '255/40R19', offset: '+45' },
        options: [
            { wheel: '19x10 (F)', minTyre: '275/35R19', maxTyre: '285/35R19', offset: '+35 to +40' },
            { wheel: '19x11 (R)', minTyre: '295/35R19', maxTyre: '305/35R19', offset: '+50 to +55' },
            { wheel: '20x10 (F)', minTyre: '275/35R20', maxTyre: '285/30R20', offset: '+35 to +40' },
            { wheel: '20x11 (R)', minTyre: '305/30R20', maxTyre: '315/30R20', offset: '+50 to +55' },
        ],
    },
    'nissan-350z': {
        pcd: '5x114.3',
        studPattern: 'M12 x 1.25',
        oemSize: { wheel: '18x8 (F), 18x8.5 (R)', tyre: '225/45R18 (F), 245/45R18 (R)', offset: '+30 (F), +33 (R)' },
        options: [
            { wheel: '18x9.5', minTyre: '265/35R18', maxTyre: '275/35R18', offset: '+15 to +25' },
            { wheel: '18x10.5', minTyre: '285/35R18', maxTyre: '295/35R18', offset: '+15 to +22' },
            { wheel: '19x9.5 (F)', minTyre: '255/35R19', maxTyre: '265/35R19', offset: '+22' },
            { wheel: '19x10.5 (R)', minTyre: '275/35R19', maxTyre: '285/35R19', offset: '+22' },
        ],
    },
};
