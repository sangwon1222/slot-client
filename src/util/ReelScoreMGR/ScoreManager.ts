/*
1 체리	1	1
2 체리	2	2
3 체리	4	4
4 체리	7	7
3 오렌지	4	4
4 오렌지	7	7
3 수박	4	4
4 수박	7	7
3 종	7	7
4 종	40	20
2 타겟	1	1
3 타겟	7	7
4 타겟	240	120
2 스타	1	1
3 스타	7	7
4 스타	240	120
2 세븐	1	1
3 세븐	7	7
4 세븐	240	120
3 바1	40	20
4 바1	320	160
3 바2	100	50
4 바2	400	200
3 바3	200	100
4 바3	480	240
3 바N	7	7
4 바N	10	10
4 조커	240	120
삼칠별타	500	250
*/

import { ReelIcon } from './ReelPatternManager';

export enum Prize {
  _first = 0,
  eZeroScore,
  e1Cherry, //1 체리
  e2Cherry, //2 체리
  e3Cherry, //3 체리
  e4Cherry, //4 체리
  e3Orange, //3 오렌지
  e4Orange, //4 오렌지
  e3WaterMelon, //3 수박
  e4WaterMelon, //4 수박
  e3Bell, //3 종
  e4Bell, //4 종
  e2Target, //2 타겟
  e3Target, //3 타겟
  e4Target, //4 타겟
  e2Star, //2 스타
  e3Star, //3 스타
  e4Star, //4 스타
  e2Seven, //2 세븐
  e3Seven, //3 세븐
  e4Seven, //4 세븐
  e3Bar1, //3 바1
  e4Bar1, //4 바1
  e3Bar2, //3 바2
  e4Bar2, //4 바2
  e3Bar3, //3 바3
  e4Bar3, //4 바3
  e3BarN, //3 잡바
  e4BarN, //4 잡바
  e4Joker, //4 조커
  e37ST, //삼칠별타
  _last,
}

export const ReelDividend = [1, 2, 5, 10];

export const PrizeSetScore = [
  { prize: Prize.e1Cherry, center: 1, side: 1 },
  { prize: Prize.e2Cherry, center: 2, side: 2 },
  { prize: Prize.e3Cherry, center: 4, side: 4 },
  { prize: Prize.e4Cherry, center: 7, side: 7 },
  { prize: Prize.e3Orange, center: 4, side: 4 },
  { prize: Prize.e4Orange, center: 7, side: 7 },
  { prize: Prize.e3WaterMelon, center: 4, side: 4 },
  { prize: Prize.e4WaterMelon, center: 7, side: 7 },
  { prize: Prize.e3Bell, center: 7, side: 7 },
  { prize: Prize.e4Bell, center: 40, side: 20 },
  { prize: Prize.e2Target, center: 1, side: 1 },
  { prize: Prize.e3Target, center: 7, side: 7 },
  { prize: Prize.e4Target, center: 240, side: 120 },
  { prize: Prize.e2Star, center: 1, side: 1 },
  { prize: Prize.e3Star, center: 7, side: 7 },
  { prize: Prize.e4Star, center: 240, side: 120 },
  { prize: Prize.e2Seven, center: 1, side: 1 },
  { prize: Prize.e3Seven, center: 7, side: 7 },
  { prize: Prize.e4Seven, center: 240, side: 120 },
  { prize: Prize.e3Bar1, center: 40, side: 20 },
  { prize: Prize.e4Bar1, center: 320, side: 160 },
  { prize: Prize.e3Bar2, center: 100, side: 50 },
  { prize: Prize.e4Bar2, center: 400, side: 200 },
  { prize: Prize.e3Bar3, center: 200, side: 100 },
  { prize: Prize.e4Bar3, center: 480, side: 240 },
  { prize: Prize.e3BarN, center: 7, side: 7 },
  { prize: Prize.e4BarN, center: 10, side: 10 },
  { prize: Prize.e4Joker, center: 240, side: 120 },
  { prize: Prize.e37ST, center: 500, side: 250 },
];

import { PrizeSet, ScoreList } from './ScoreDefine';

export function getPrizeSetName(prize: Prize) {
  switch (prize) {
    case Prize.eZeroScore:
      return '꽝';
    case Prize.e1Cherry:
      return '1 체리';
    case Prize.e2Cherry:
      return '2 체리';
    case Prize.e3Cherry:
      return '3 체리';
    case Prize.e4Cherry:
      return '4 체리';
    case Prize.e3Orange:
      return '3 오렌지';
    case Prize.e4Orange:
      return '4 오렌지';
    case Prize.e3WaterMelon:
      return '3 수박';
    case Prize.e4WaterMelon:
      return '4 수박';
    case Prize.e3Bell:
      return '3 종';
    case Prize.e4Bell:
      return '4 종';
    case Prize.e2Target:
      return '2 타겟';
    case Prize.e3Target:
      return '3 타겟';
    case Prize.e4Target:
      return '4 타겟';
    case Prize.e2Star:
      return '2 스타';
    case Prize.e3Star:
      return '3 스타';
    case Prize.e4Star:
      return '4 스타';
    case Prize.e2Seven:
      return '2 세븐';
    case Prize.e3Seven:
      return '3 세븐';
    case Prize.e4Seven:
      return '4 세븐';
    case Prize.e3Bar1:
      return '3 바1';
    case Prize.e4Bar1:
      return '4 바1';
    case Prize.e3Bar2:
      return '3 바2';
    case Prize.e4Bar2:
      return '4 바2';
    case Prize.e3Bar3:
      return '3 바3';
    case Prize.e4Bar3:
      return '4 바3';
    case Prize.e3BarN:
      return '3 잡바';
    case Prize.e4BarN:
      return '4 잡바';
    case Prize.e4Joker:
      return '4 조커';
    case Prize.e37ST:
      return '삼칠별타';
  }
}

export class ScoreManager {
  getPrizeSet(score: number) {
    // ScoreList에서 가장 가깝게 작은 번호를 고른다.
    const idx = ScoreList.findIndex((v, idx) => v > score);
    const scoreValue = ScoreList[idx - 1];
    const randIDX = Math.floor(Math.random() * (PrizeSet as any)()[scoreValue].length);
    return (PrizeSet as any)()[scoreValue][randIDX];
  }
}
