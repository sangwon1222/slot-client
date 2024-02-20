import { PrizePatternInfo, ReelIcon, ReelPatternManager, getReelIconName } from './ReelPatternManager';
import { Prize, ReelDividend, ScoreManager } from './ScoreManager';

export { ScoreList } from './ScoreDefine';

export interface ReelPatternInfo {
  prize: Prize; // 당첨 시상 세트 이름
  score: number; // 최종 스코어
  baseScore: number; // 바닥 점수
  dividend: number; // 바닥 배당
  priceLineIDX: 0 | 1 | 2 | 3; //0: 시상 없음, 1: 상단, 2:중단, 3: 하단
  useJoker: boolean; // 조커를 사용하는 것인가?(iconTable과 displayIconTable이 다름)
  iconTable: Array<Array<ReelIcon>>; // 최종 릴 아이콘
  displayIconTable: Array<Array<string>>; // 조커사용시 조커모양으로 가려진 아이콘 정보
  iconAniFlag: Array<Array<boolean>>; // 당첨시 애니해야할 아이콘 flag정보
}

const scoreMGR = new ScoreManager();
const patternMGR = new ReelPatternManager();

function shuffle(array: Array<any>) {
  array.sort(() => Math.random() - 0.5);
}
export function getReelPatturnInfo(score: number): ReelPatternInfo {
  if (score == 0) {
    const divdend = [...ReelDividend];
    shuffle(divdend);
    const line1 = patternMGR.makePrizeLine0(null);
    const line2 = patternMGR.makePrizeLine0(line1.iconTable);
    const line3 = patternMGR.makePrizeLine0(line2.iconTable);
    return {
      prize: Prize.eZeroScore,
      score: 0,
      baseScore: 0,
      dividend: divdend[0],
      priceLineIDX: 0,
      useJoker: false,
      iconTable: [
        [line1.iconTable[0], line2.iconTable[0], line3.iconTable[0]],
        [line1.iconTable[1], line2.iconTable[1], line3.iconTable[1]],
        [line1.iconTable[2], line2.iconTable[2], line3.iconTable[2]],
        [line1.iconTable[3], line2.iconTable[3], line3.iconTable[3]],
      ],
      displayIconTable: iconToName([
        [line1.displayIconTable[0], line2.displayIconTable[0], line3.displayIconTable[0]],
        [line1.displayIconTable[1], line2.displayIconTable[1], line3.displayIconTable[1]],
        [line1.displayIconTable[2], line2.displayIconTable[2], line3.displayIconTable[2]],
        [line1.displayIconTable[3], line2.displayIconTable[3], line3.displayIconTable[3]],
      ]),
      iconAniFlag: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    };
  } else {
    let useJoker = Math.random() > 0.7;
    const scoreInfo = scoreMGR.getPrizeSet(score);
    let prizeLine: any = {};
    switch (scoreInfo.prize) {
      case Prize.e1Cherry:
        {
          prizeLine = patternMGR.make1CherryLine(null);
        }
        break;
      case Prize.e2Cherry:
        {
          prizeLine = patternMGR.make2CherryLine(null);
        }
        break;
      case Prize.e3Cherry:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eCherry, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Cherry:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eCherry, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3Orange:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eOrange, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Orange:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eOrange, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3WaterMelon:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eWaterMelon, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4WaterMelon:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eWaterMelon, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3Bell:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eBell, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Bell:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eBell, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e2Target:
        {
          prizeLine = patternMGR.make2PrizeLine(ReelIcon.eTarget, null);
        }
        break;
      case Prize.e3Target:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eTarget, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Target:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eTarget, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e2Star:
        {
          prizeLine = patternMGR.make2PrizeLine(ReelIcon.eStar, null);
        }
        break;
      case Prize.e3Star:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eStar, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Star:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eStar, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e2Seven:
        {
          prizeLine = patternMGR.make2PrizeLine(ReelIcon.eSeven, null);
        }
        break;
      case Prize.e3Seven:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eSeven, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Seven:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eSeven, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3Bar1:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eBar1, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Bar1:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eBar1, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3Bar2:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eBar2, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Bar2:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eBar2, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3Bar3:
        {
          prizeLine = patternMGR.make3PrizeLine(ReelIcon.eBar3, null, useJoker ? 1 : 0);
        }
        break;
      case Prize.e4Bar3:
        {
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eBar3, useJoker ? Math.floor(Math.random() * 3) : 0);
        }
        break;
      case Prize.e3BarN:
        {
          useJoker = false;
          prizeLine = patternMGR.make3BarNLine(null);
        }
        break;
      case Prize.e4BarN:
        {
          prizeLine = patternMGR.make4BarNLine(useJoker ? Math.floor(Math.random() * 2) : 0);
        }
        break;
      case Prize.e4Joker:
        {
          useJoker = false;
          prizeLine = patternMGR.make4PrizeLine(ReelIcon.eJoker, 0);
        }
        break;
      case Prize.e37ST:
        {
          prizeLine = patternMGR.make37stPrizeLine(useJoker ? 1 + Math.floor(Math.random() * 2) : 0);
        }
        break;
    }
    // 시상 라인위치 결정
    let pricelineIDX: 0 | 1 | 2 | 3 = 0;
    if (scoreInfo.center) pricelineIDX = 2;
    else {
      pricelineIDX = Math.round(Math.random()) < 0.5 ? 1 : 3;
    }
    let line1!: PrizePatternInfo;
    let line2!: PrizePatternInfo;
    let line3!: PrizePatternInfo;

    if (pricelineIDX == 1) {
      line1 = prizeLine;
      line2 = patternMGR.makePrizeLine0(prizeLine.iconTable);
      line3 = patternMGR.makePrizeLine0(line2.iconTable);
    } else if (pricelineIDX == 2) {
      line1 = patternMGR.makePrizeLine0(prizeLine.iconTable);
      line2 = prizeLine;
      line3 = patternMGR.makePrizeLine0(prizeLine.iconTable);
    } else if (pricelineIDX == 3) {
      line2 = patternMGR.makePrizeLine0(prizeLine.iconTable);
      line1 = patternMGR.makePrizeLine0(line2.iconTable);
      line3 = prizeLine;
    }

    const result: ReelPatternInfo = {
      prize: scoreInfo.prize,
      score: scoreInfo.dividend * scoreInfo.baseScore,
      baseScore: scoreInfo.baseScore,
      dividend: scoreInfo.dividend,
      priceLineIDX: pricelineIDX,
      useJoker: useJoker,
      iconTable: [
        [line1.iconTable[0], line2.iconTable[0], line3.iconTable[0]],
        [line1.iconTable[1], line2.iconTable[1], line3.iconTable[1]],
        [line1.iconTable[2], line2.iconTable[2], line3.iconTable[2]],
        [line1.iconTable[3], line2.iconTable[3], line3.iconTable[3]],
      ],
      displayIconTable: iconToName([
        [line1.displayIconTable[0], line2.displayIconTable[0], line3.displayIconTable[0]],
        [line1.displayIconTable[1], line2.displayIconTable[1], line3.displayIconTable[1]],
        [line1.displayIconTable[2], line2.displayIconTable[2], line3.displayIconTable[2]],
        [line1.displayIconTable[3], line2.displayIconTable[3], line3.displayIconTable[3]],
      ]),
      iconAniFlag: [
        [line1.iconAniFlag[0], line2.iconAniFlag[0], line3.iconAniFlag[0]],
        [line1.iconAniFlag[1], line2.iconAniFlag[1], line3.iconAniFlag[1]],
        [line1.iconAniFlag[2], line2.iconAniFlag[2], line3.iconAniFlag[2]],
        [line1.iconAniFlag[3], line2.iconAniFlag[3], line3.iconAniFlag[3]],
      ],
    };
    return result;
  }
}

function iconToName(icon: ReelIcon[][]) {
  const ary = [[], [], [], []];
  for (let i = 0; i < icon.length; i++) {
    for (let j = 0; j < icon[i].length; j++) {
      ary[i].push(getReelIconName(icon[i][j]));
    }
  }
  return ary;
}
