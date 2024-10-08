import { Prize } from './ScoreManager';
// 점수 목록
export const ScoreList = [
  1, 2, 4, 5, 7, 8, 10, 14, 20, 35, 40, 50, 70, 80, 100, 120, 160, 200, 240, 250, 320, 400, 480, 500, 600, 640, 800,
  960, 1000, 1200, 1250, 1600, 2000, 2400, 2500, 3200, 4000, 4800, 5000,
];

// 점수 별 시상정보
export const PrizeSet = () => {
  return {
    1: [
      { prize: Prize.e1Cherry, center: true, dividend: 1, baseScore: 1 },
      { prize: Prize.e1Cherry, center: false, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Target, center: true, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Target, center: false, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Star, center: true, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Star, center: false, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Seven, center: true, dividend: 1, baseScore: 1 },
      { prize: Prize.e2Seven, center: false, dividend: 1, baseScore: 1 },
    ],
    2: [
      { prize: Prize.e1Cherry, center: true, dividend: 2, baseScore: 1 },
      { prize: Prize.e1Cherry, center: false, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Cherry, center: true, dividend: 1, baseScore: 2 },
      { prize: Prize.e2Cherry, center: false, dividend: 1, baseScore: 2 },
      { prize: Prize.e2Target, center: true, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Target, center: false, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Star, center: true, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Star, center: false, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Seven, center: true, dividend: 2, baseScore: 1 },
      { prize: Prize.e2Seven, center: false, dividend: 2, baseScore: 1 },
    ],
    4: [
      { prize: Prize.e2Cherry, center: true, dividend: 2, baseScore: 2 },
      { prize: Prize.e2Cherry, center: false, dividend: 2, baseScore: 2 },
      { prize: Prize.e3Cherry, center: true, dividend: 1, baseScore: 4 },
      { prize: Prize.e3Cherry, center: false, dividend: 1, baseScore: 4 },
      { prize: Prize.e3Orange, center: true, dividend: 1, baseScore: 4 },
      { prize: Prize.e3Orange, center: false, dividend: 1, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: true, dividend: 1, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: false, dividend: 1, baseScore: 4 },
    ],
    5: [
      { prize: Prize.e1Cherry, center: true, dividend: 5, baseScore: 1 },
      { prize: Prize.e1Cherry, center: false, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Target, center: true, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Target, center: false, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Star, center: true, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Star, center: false, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Seven, center: true, dividend: 5, baseScore: 1 },
      { prize: Prize.e2Seven, center: false, dividend: 5, baseScore: 1 },
    ],
    7: [
      { prize: Prize.e4Cherry, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e4Cherry, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e4Orange, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e4Orange, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Bell, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Bell, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Target, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Target, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Star, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Star, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Seven, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e3Seven, center: false, dividend: 1, baseScore: 7 },
      { prize: Prize.e3BarN, center: true, dividend: 1, baseScore: 7 },
      { prize: Prize.e3BarN, center: false, dividend: 1, baseScore: 7 },
    ],
    8: [
      { prize: Prize.e3Cherry, center: true, dividend: 2, baseScore: 4 },
      { prize: Prize.e3Cherry, center: false, dividend: 2, baseScore: 4 },
      { prize: Prize.e3Orange, center: true, dividend: 2, baseScore: 4 },
      { prize: Prize.e3Orange, center: false, dividend: 2, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: true, dividend: 2, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: false, dividend: 2, baseScore: 4 },
    ],
    10: [
      { prize: Prize.e1Cherry, center: true, dividend: 10, baseScore: 1 },
      { prize: Prize.e1Cherry, center: false, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Cherry, center: true, dividend: 5, baseScore: 2 },
      { prize: Prize.e2Cherry, center: false, dividend: 5, baseScore: 2 },
      { prize: Prize.e2Target, center: true, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Target, center: false, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Star, center: true, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Star, center: false, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Seven, center: true, dividend: 10, baseScore: 1 },
      { prize: Prize.e2Seven, center: false, dividend: 10, baseScore: 1 },
      { prize: Prize.e4BarN, center: true, dividend: 1, baseScore: 10 },
      { prize: Prize.e4BarN, center: false, dividend: 1, baseScore: 10 },
    ],
    14: [
      { prize: Prize.e4Cherry, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e4Cherry, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e4Orange, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e4Orange, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Bell, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Bell, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Target, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Target, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Star, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Star, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Seven, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e3Seven, center: false, dividend: 2, baseScore: 7 },
      { prize: Prize.e3BarN, center: true, dividend: 2, baseScore: 7 },
      { prize: Prize.e3BarN, center: false, dividend: 2, baseScore: 7 },
    ],
    20: [
      { prize: Prize.e2Cherry, center: true, dividend: 10, baseScore: 2 },
      { prize: Prize.e2Cherry, center: false, dividend: 10, baseScore: 2 },
      { prize: Prize.e3Cherry, center: true, dividend: 5, baseScore: 4 },
      { prize: Prize.e3Cherry, center: false, dividend: 5, baseScore: 4 },
      { prize: Prize.e3Orange, center: true, dividend: 5, baseScore: 4 },
      { prize: Prize.e3Orange, center: false, dividend: 5, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: true, dividend: 5, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: false, dividend: 5, baseScore: 4 },
      { prize: Prize.e4Bell, center: false, dividend: 1, baseScore: 20 },
      { prize: Prize.e3Bar1, center: false, dividend: 1, baseScore: 20 },
      { prize: Prize.e4BarN, center: true, dividend: 2, baseScore: 10 },
      { prize: Prize.e4BarN, center: false, dividend: 2, baseScore: 10 },
    ],
    35: [
      { prize: Prize.e4Cherry, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e4Cherry, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e4Orange, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e4Orange, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Bell, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Bell, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Target, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Target, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Star, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Star, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Seven, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e3Seven, center: false, dividend: 5, baseScore: 7 },
      { prize: Prize.e3BarN, center: true, dividend: 5, baseScore: 7 },
      { prize: Prize.e3BarN, center: false, dividend: 5, baseScore: 7 },
    ],
    40: [
      { prize: Prize.e3Cherry, center: true, dividend: 10, baseScore: 4 },
      { prize: Prize.e3Cherry, center: false, dividend: 10, baseScore: 4 },
      { prize: Prize.e3Orange, center: true, dividend: 10, baseScore: 4 },
      { prize: Prize.e3Orange, center: false, dividend: 10, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: true, dividend: 10, baseScore: 4 },
      { prize: Prize.e3WaterMelon, center: false, dividend: 10, baseScore: 4 },
      { prize: Prize.e4Bell, center: true, dividend: 1, baseScore: 40 },
      { prize: Prize.e4Bell, center: false, dividend: 2, baseScore: 20 },
      { prize: Prize.e3Bar1, center: true, dividend: 1, baseScore: 40 },
      { prize: Prize.e3Bar1, center: false, dividend: 2, baseScore: 20 },
    ],
    50: [
      { prize: Prize.e3Bar2, center: false, dividend: 1, baseScore: 50 },
      { prize: Prize.e4BarN, center: true, dividend: 5, baseScore: 10 },
      { prize: Prize.e4BarN, center: false, dividend: 5, baseScore: 10 },
    ],
    70: [
      { prize: Prize.e4Cherry, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e4Cherry, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e4Orange, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e4Orange, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e4WaterMelon, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Bell, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Bell, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Target, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Target, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Star, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Star, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Seven, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e3Seven, center: false, dividend: 10, baseScore: 7 },
      { prize: Prize.e3BarN, center: true, dividend: 10, baseScore: 7 },
      { prize: Prize.e3BarN, center: false, dividend: 10, baseScore: 7 },
    ],
    80: [
      { prize: Prize.e4Bell, center: true, dividend: 2, baseScore: 40 },
      { prize: Prize.e3Bar1, center: true, dividend: 2, baseScore: 40 },
    ],
    100: [
      { prize: Prize.e4Bell, center: false, dividend: 5, baseScore: 20 },
      { prize: Prize.e3Bar1, center: false, dividend: 5, baseScore: 20 },
      { prize: Prize.e3Bar2, center: true, dividend: 1, baseScore: 100 },
      { prize: Prize.e3Bar2, center: false, dividend: 2, baseScore: 50 },
      { prize: Prize.e3Bar3, center: false, dividend: 1, baseScore: 100 },
      { prize: Prize.e4BarN, center: true, dividend: 10, baseScore: 10 },
      { prize: Prize.e4BarN, center: false, dividend: 10, baseScore: 10 },
    ],
    120: [
      { prize: Prize.e4Target, center: false, dividend: 1, baseScore: 120 },
      { prize: Prize.e4Star, center: false, dividend: 1, baseScore: 120 },
      { prize: Prize.e4Seven, center: false, dividend: 1, baseScore: 120 },
      { prize: Prize.e4Joker, center: false, dividend: 1, baseScore: 120 },
    ],
    160: [{ prize: Prize.e4Bar1, center: false, dividend: 1, baseScore: 160 }],
    200: [
      { prize: Prize.e4Bell, center: true, dividend: 5, baseScore: 40 },
      { prize: Prize.e4Bell, center: false, dividend: 10, baseScore: 20 },
      { prize: Prize.e3Bar1, center: true, dividend: 5, baseScore: 40 },
      { prize: Prize.e3Bar1, center: false, dividend: 10, baseScore: 20 },
      { prize: Prize.e3Bar2, center: true, dividend: 2, baseScore: 100 },
      { prize: Prize.e4Bar2, center: false, dividend: 1, baseScore: 200 },
      { prize: Prize.e3Bar3, center: true, dividend: 1, baseScore: 200 },
      { prize: Prize.e3Bar3, center: false, dividend: 2, baseScore: 100 },
    ],
    240: [
      { prize: Prize.e4Target, center: true, dividend: 1, baseScore: 240 },
      { prize: Prize.e4Target, center: false, dividend: 2, baseScore: 120 },
      { prize: Prize.e4Star, center: true, dividend: 1, baseScore: 240 },
      { prize: Prize.e4Star, center: false, dividend: 2, baseScore: 120 },
      { prize: Prize.e4Seven, center: true, dividend: 1, baseScore: 240 },
      { prize: Prize.e4Seven, center: false, dividend: 2, baseScore: 120 },
      { prize: Prize.e4Bar3, center: false, dividend: 1, baseScore: 240 },
      { prize: Prize.e4Joker, center: true, dividend: 1, baseScore: 240 },
      { prize: Prize.e4Joker, center: false, dividend: 2, baseScore: 120 },
    ],
    250: [
      { prize: Prize.e3Bar2, center: false, dividend: 5, baseScore: 50 },
      { prize: Prize.e37ST, center: false, dividend: 1, baseScore: 250 },
    ],
    320: [
      { prize: Prize.e4Bar1, center: true, dividend: 1, baseScore: 320 },
      { prize: Prize.e4Bar1, center: false, dividend: 2, baseScore: 160 },
    ],
    400: [
      { prize: Prize.e4Bell, center: true, dividend: 10, baseScore: 40 },
      { prize: Prize.e3Bar1, center: true, dividend: 10, baseScore: 40 },
      { prize: Prize.e4Bar2, center: true, dividend: 1, baseScore: 400 },
      { prize: Prize.e4Bar2, center: false, dividend: 2, baseScore: 200 },
      { prize: Prize.e3Bar3, center: true, dividend: 2, baseScore: 200 },
    ],
    480: [
      { prize: Prize.e4Target, center: true, dividend: 2, baseScore: 240 },
      { prize: Prize.e4Star, center: true, dividend: 2, baseScore: 240 },
      { prize: Prize.e4Seven, center: true, dividend: 2, baseScore: 240 },
      { prize: Prize.e4Bar3, center: true, dividend: 1, baseScore: 480 },
      { prize: Prize.e4Bar3, center: false, dividend: 2, baseScore: 240 },
      { prize: Prize.e4Joker, center: true, dividend: 2, baseScore: 240 },
    ],
    500: [
      { prize: Prize.e3Bar2, center: true, dividend: 5, baseScore: 100 },
      { prize: Prize.e3Bar2, center: false, dividend: 10, baseScore: 50 },
      { prize: Prize.e3Bar3, center: false, dividend: 5, baseScore: 100 },
      { prize: Prize.e37ST, center: true, dividend: 1, baseScore: 500 },
      { prize: Prize.e37ST, center: false, dividend: 2, baseScore: 250 },
    ],
    600: [
      { prize: Prize.e4Target, center: false, dividend: 5, baseScore: 120 },
      { prize: Prize.e4Star, center: false, dividend: 5, baseScore: 120 },
      { prize: Prize.e4Seven, center: false, dividend: 5, baseScore: 120 },
      { prize: Prize.e4Joker, center: false, dividend: 5, baseScore: 120 },
    ],
    640: [{ prize: Prize.e4Bar1, center: true, dividend: 2, baseScore: 320 }],
    800: [
      { prize: Prize.e4Bar1, center: false, dividend: 5, baseScore: 160 },
      { prize: Prize.e4Bar2, center: true, dividend: 2, baseScore: 400 },
    ],
    960: [{ prize: Prize.e4Bar3, center: true, dividend: 2, baseScore: 480 }],
    1000: [
      { prize: Prize.e3Bar2, center: true, dividend: 10, baseScore: 100 },
      { prize: Prize.e4Bar2, center: false, dividend: 5, baseScore: 200 },
      { prize: Prize.e3Bar3, center: true, dividend: 5, baseScore: 200 },
      { prize: Prize.e3Bar3, center: false, dividend: 10, baseScore: 100 },
      { prize: Prize.e37ST, center: true, dividend: 2, baseScore: 500 },
    ],
    1200: [
      { prize: Prize.e4Target, center: true, dividend: 5, baseScore: 240 },
      { prize: Prize.e4Target, center: false, dividend: 10, baseScore: 120 },
      { prize: Prize.e4Star, center: true, dividend: 5, baseScore: 240 },
      { prize: Prize.e4Star, center: false, dividend: 10, baseScore: 120 },
      { prize: Prize.e4Seven, center: true, dividend: 5, baseScore: 240 },
      { prize: Prize.e4Seven, center: false, dividend: 10, baseScore: 120 },
      { prize: Prize.e4Bar3, center: false, dividend: 5, baseScore: 240 },
      { prize: Prize.e4Joker, center: true, dividend: 5, baseScore: 240 },
      { prize: Prize.e4Joker, center: false, dividend: 10, baseScore: 120 },
    ],
    1250: [{ prize: Prize.e37ST, center: false, dividend: 5, baseScore: 250 }],
    1600: [
      { prize: Prize.e4Bar1, center: true, dividend: 5, baseScore: 320 },
      { prize: Prize.e4Bar1, center: false, dividend: 10, baseScore: 160 },
    ],
    2000: [
      { prize: Prize.e4Bar2, center: true, dividend: 5, baseScore: 400 },
      { prize: Prize.e4Bar2, center: false, dividend: 10, baseScore: 200 },
      { prize: Prize.e3Bar3, center: true, dividend: 10, baseScore: 200 },
    ],
    2400: [
      { prize: Prize.e4Target, center: true, dividend: 10, baseScore: 240 },
      { prize: Prize.e4Star, center: true, dividend: 10, baseScore: 240 },
      { prize: Prize.e4Seven, center: true, dividend: 10, baseScore: 240 },
      { prize: Prize.e4Bar3, center: true, dividend: 5, baseScore: 480 },
      { prize: Prize.e4Bar3, center: false, dividend: 10, baseScore: 240 },
      { prize: Prize.e4Joker, center: true, dividend: 10, baseScore: 240 },
    ],
    2500: [
      { prize: Prize.e37ST, center: true, dividend: 5, baseScore: 500 },
      { prize: Prize.e37ST, center: false, dividend: 10, baseScore: 250 },
    ],
    3200: [{ prize: Prize.e4Bar1, center: true, dividend: 10, baseScore: 320 }],
    4000: [{ prize: Prize.e4Bar2, center: true, dividend: 10, baseScore: 400 }],
    4800: [{ prize: Prize.e4Bar3, center: true, dividend: 10, baseScore: 480 }],
    5000: [{ prize: Prize.e37ST, center: true, dividend: 10, baseScore: 500 }],
  };
};
