function shuffle(array: Array<any>) {
  array.sort(() => Math.random() - 0.5);
}

export enum ReelIcon {
  _first = 0,
  eBar1,
  eBar2,
  eBar3,
  eCherry,
  eJoker,
  eBell,
  eWaterMelon,
  eOrange,
  eSeven,
  eStar,
  eTarget,
  _last,
}

export function getReelIconName(icon: ReelIcon) {
  switch (icon) {
    case ReelIcon.eBar1:
      return 'bar1';
    case ReelIcon.eBar2:
      return 'bar2';
    case ReelIcon.eBar3:
      return 'bar3';
    case ReelIcon.eCherry:
      return 'cherry';
    case ReelIcon.eJoker:
      return 'joker';
    case ReelIcon.eBell:
      return 'bell';
    case ReelIcon.eWaterMelon:
      return 'watermelon';
    case ReelIcon.eOrange:
      return 'orange';
    case ReelIcon.eSeven:
      return 'seven';
    case ReelIcon.eStar:
      return 'star';
    case ReelIcon.eTarget:
      return 'target';
    default:
      return 'undefined';
  }
}

export interface PrizePatternInfo {
  iconTable: Array<ReelIcon>; // 릴 아이콘을 무엇을 표시하는지 정보( 조커반영 안된 )
  displayIconTable: Array<ReelIcon>; // 릴 아이콘을 무엇을 표시하는지 정보( 조커반영된 표시할 아이콘들 )
  iconAniFlag: Array<boolean>; // 당첨시 애니해야할 아이콘 flag정보
}

export class ReelPatternManager {
  // 주어진 아이콘의 배열에서 포함 개수 반환
  checkReelIconCount(compare: Array<ReelIcon>, list_: Array<ReelIcon>) {
    let cnt = 0;
    for (const ico of list_) {
      cnt += compare.includes(ico) ? 1 : 0;
    }
    return cnt;
  }
  // avoidList를 제외한 랜덤 아이콘을 반환
  getRandomIcon(avoidList: Array<ReelIcon>): ReelIcon {
    let icon = ReelIcon._first + 1 + Math.floor(Math.random() * (ReelIcon._last - 2));
    do {
      icon = ReelIcon._first + 1 + Math.floor(Math.random() * (ReelIcon._last - 2));
    } while (avoidList.includes(icon));
    return icon;
  }

  // 4joker면 zeroscore로 만듦
  _makerZeroProc4Joker(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    if (
      [ReelIcon.eJoker].includes(target[0]) &&
      [ReelIcon.eJoker].includes(target[1]) &&
      [ReelIcon.eJoker].includes(target[2]) &&
      [ReelIcon.eJoker].includes(target[3])
    ) {
      target[0] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[0]] : [ReelIcon.eJoker]);
      target[1] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[1]] : [ReelIcon.eJoker]);
      target[2] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[2]] : [ReelIcon.eJoker]);
      target[3] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[3]] : [ReelIcon.eJoker]);
      return true;
    }
    return false;
  }
  // 3joker면 zeroscore로 만듦
  _makerZeroProc3Joker(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    // 좌
    if (
      [ReelIcon.eJoker].includes(target[0]) &&
      [ReelIcon.eJoker].includes(target[1]) &&
      [ReelIcon.eJoker].includes(target[2])
    ) {
      target[0] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[0]] : [ReelIcon.eJoker]);
      target[1] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[1]] : [ReelIcon.eJoker]);
      target[2] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[2]] : [ReelIcon.eJoker]);
      return true;
    }
    // 우
    if (
      [ReelIcon.eJoker].includes(target[1]) &&
      [ReelIcon.eJoker].includes(target[2]) &&
      [ReelIcon.eJoker].includes(target[3])
    ) {
      target[1] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[1]] : [ReelIcon.eJoker]);
      target[2] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[2]] : [ReelIcon.eJoker]);
      target[3] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eJoker, avoidIconLine[3]] : [ReelIcon.eJoker]);
      return true;
    }

    return false;
  }
  // 삼칠별타면 zeroscore로 만듦
  _makerZeroProc37st(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    if (
      [ReelIcon.eBar3, ReelIcon.eJoker].includes(target[0]) &&
      [ReelIcon.eSeven, ReelIcon.eJoker].includes(target[1]) &&
      [ReelIcon.eStar, ReelIcon.eJoker].includes(target[2]) &&
      [ReelIcon.eTarget, ReelIcon.eJoker].includes(target[3])
    ) {
      target[0] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eBar3, avoidIconLine[0]] : [ReelIcon.eBar3]);
      target[1] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eSeven, avoidIconLine[1]] : [ReelIcon.eSeven]);
      target[2] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eStar, avoidIconLine[2]] : [ReelIcon.eStar]);
      target[3] = this.getRandomIcon(avoidIconLine ? [ReelIcon.eTarget, avoidIconLine[3]] : [ReelIcon.eTarget]);
      return true;
    }
    return false;
  }
  // 4바 계열이면 zeroscore로 만듦 4 NBar면 zeroscore로 만듦
  _makerZeroProc4bars(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    if (this.checkReelIconCount([ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1], target) == 4) {
      target[0] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[0]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[1]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[2]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[3]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      return true;
    }

    return false;
  }
  // 3바 계열이면 zeroscore로 만듦 3 NBar면 zeroscore로 만듦
  _makerZeroProc3bars(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    // 좌
    if (
      this.checkReelIconCount([ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1], target.slice(0, 3)) ==
      3
    ) {
      target[0] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[0]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[1]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[2]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      return true;
    }
    // 우
    if (
      this.checkReelIconCount([ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1], target.slice(1, 4)) ==
      3
    ) {
      target[1] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[1]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[2]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine
          ? [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1, avoidIconLine[3]]
          : [ReelIcon.eJoker, ReelIcon.eBar3, ReelIcon.eBar2, ReelIcon.eBar1],
      );
      return true;
    }
    return false;
  }
  // 4개 맞은거면 zeroscore로 만듦
  _makeZeroProc4Prize(icon: ReelIcon, target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    if (this.checkReelIconCount([ReelIcon.eJoker, icon], target) == 4) {
      target[0] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[0]] : [ReelIcon.eJoker, icon],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[1]] : [ReelIcon.eJoker, icon],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[2]] : [ReelIcon.eJoker, icon],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[3]] : [ReelIcon.eJoker, icon],
      );
      return true;
    }

    return false;
  }
  // 3개 맞은거면 zeroscore로 만듦
  _makeZeroProc3Prize(icon: ReelIcon, target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    // 좌
    if (this.checkReelIconCount([ReelIcon.eJoker, icon], target.slice(0, 3)) == 3) {
      target[0] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[0]] : [ReelIcon.eJoker, icon],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[1]] : [ReelIcon.eJoker, icon],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[2]] : [ReelIcon.eJoker, icon],
      );
      return true;
    }
    // 우
    if (this.checkReelIconCount([ReelIcon.eJoker, icon], target.slice(1, 4)) == 3) {
      target[1] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[1]] : [ReelIcon.eJoker, icon],
      );
      target[2] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[2]] : [ReelIcon.eJoker, icon],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[3]] : [ReelIcon.eJoker, icon],
      );
      return true;
    }
    return false;
  }
  // 타겟,스타,세븐은 2개여도 점수가 있으니, zeroscore로 만듦
  _makeZeroProc2Prize(icon: ReelIcon, target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    // 좌
    if (this.checkReelIconCount([ReelIcon.eJoker, icon], target.slice(0, 2)) == 2) {
      target[0] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[0]] : [ReelIcon.eJoker, icon],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[1]] : [ReelIcon.eJoker, icon],
      );
      return true;
    }
    // 우
    if (this.checkReelIconCount([ReelIcon.eJoker, icon], target.slice(2, 4)) == 2) {
      target[2] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[2]] : [ReelIcon.eJoker, icon],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, icon, avoidIconLine[3]] : [ReelIcon.eJoker, icon],
      );
      return true;
    }
    return false;
  }

  // 1체리, 2체리 족보시 zeroscore로 만듦
  _makeZeroProcCherry(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>): boolean {
    // 좌 2체리
    if (this.checkReelIconCount([ReelIcon.eJoker, ReelIcon.eCherry], target.slice(0, 2)) == 2) {
      target[0] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[0]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      target[1] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[1]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      return true;
    }
    // 우 2체리
    if (this.checkReelIconCount([ReelIcon.eJoker, ReelIcon.eCherry], target.slice(2, 4)) == 2) {
      target[2] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[2]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      target[3] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[3]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      return true;
    }
    // 좌 1체리
    if (target[0] == ReelIcon.eCherry) {
      target[0] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[0]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      return true;
    }
    // 우 1체리
    if (target[3] == ReelIcon.eCherry) {
      target[3] = this.getRandomIcon(
        avoidIconLine ? [ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[3]] : [ReelIcon.eJoker, ReelIcon.eCherry],
      );
      return true;
    }

    return false;
  }

  // 위아래 라인 겹치지않게 처리
  _makeAvoidTarget(target: Array<ReelIcon>, avoidIconLine: null | Array<ReelIcon>) {
    if (avoidIconLine != null) {
      if (target[0] == avoidIconLine[0]) {
        target[0] = this.getRandomIcon([avoidIconLine[0]]);
        return true;
      }
      if (target[1] == avoidIconLine[1]) {
        target[1] = this.getRandomIcon([avoidIconLine[1]]);
        return true;
      }
      if (target[2] == avoidIconLine[2]) {
        target[2] = this.getRandomIcon([avoidIconLine[2]]);
        return true;
      }
      if (target[3] == avoidIconLine[3]) {
        target[3] = this.getRandomIcon([avoidIconLine[3]]);
        return true;
      }
    }
    return false;
  }

  //1라인 기준으로 주어진 시상라인을 만듦. avoidIconLine은 해당 아이콘을 피해서 만들어라(위아래 같은 모양 피하기위함)
  makePrizeLine0(avoidIconLine: null | Array<ReelIcon>): PrizePatternInfo {
    const result = [
      this.getRandomIcon(avoidIconLine ? [avoidIconLine[0]] : []),
      this.getRandomIcon(avoidIconLine ? [avoidIconLine[1]] : []),
      this.getRandomIcon(avoidIconLine ? [avoidIconLine[2]] : []),
      this.getRandomIcon(avoidIconLine ? [avoidIconLine[3]] : []),
    ];
    // const result = [
    //   ReelIcon.eStar,
    //   ReelIcon.eJoker,
    //   ReelIcon.eBell,
    //   ReelIcon.eOrange,
    // ];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this._makerZeroProc4Joker(result, avoidIconLine)) continue;
      if (this._makerZeroProc3Joker(result, avoidIconLine)) continue;
      if (this._makerZeroProc37st(result, avoidIconLine)) continue;
      if (this._makerZeroProc4bars(result, avoidIconLine)) continue;
      if (this._makerZeroProc3bars(result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eBell, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eCherry, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eJoker, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eOrange, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eSeven, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eStar, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eTarget, result, avoidIconLine)) continue;
      if (this._makeZeroProc4Prize(ReelIcon.eWaterMelon, result, avoidIconLine)) continue;

      if (this._makeZeroProc3Prize(ReelIcon.eBell, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eCherry, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eJoker, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eOrange, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eSeven, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eStar, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eTarget, result, avoidIconLine)) continue;
      if (this._makeZeroProc3Prize(ReelIcon.eWaterMelon, result, avoidIconLine)) continue;

      // 세븐,스타,타겟은 2개여도 점수이므로 걸러내자
      if (this._makeZeroProc2Prize(ReelIcon.eSeven, result, avoidIconLine)) continue;
      if (this._makeZeroProc2Prize(ReelIcon.eStar, result, avoidIconLine)) continue;
      if (this._makeZeroProc2Prize(ReelIcon.eTarget, result, avoidIconLine)) continue;

      if (this._makeZeroProcCherry(result, avoidIconLine)) continue;
      if (this._makeAvoidTarget(result, avoidIconLine)) continue;

      //if (this._makeZeroProcCherry(result, avoidIconLine)) continue;

      //4잡바인경우 예외처리
      // if(
      //   [ReelIcon.eBar1,ReelIcon.eBar2,ReelIcon.eBar3].includes(result[0]) &&
      //   [ReelIcon.eBar1,ReelIcon.eBar2,ReelIcon.eBar3].includes(result[1]) &&
      //   [ReelIcon.eBar1,ReelIcon.eBar2,ReelIcon.eBar3].includes(result[2]) &&
      //   [ReelIcon.eBar1,ReelIcon.eBar2,ReelIcon.eBar3].includes(result[3])
      // ){
      //   const set1 = this.getRandomIcon( result );
      //   const set2 = this.getRandomIcon( result );
      //   const set3 = this.getRandomIcon( result );
      //   const set4 = this.getRandomIcon( result );
      //   result[0] = set1;
      //   result[1] = set2;
      //   result[2] = set3;
      //   result[3] = set4;
      // }

      // 조커가 있는 경우 예외처리
      // if (result.includes(ReelIcon.eJoker)) {
      //   if( result[0]==ReelIcon.eJoker )
      // }
      return {
        iconTable: result,
        displayIconTable: result,
        iconAniFlag: [false, false, false, false],
      };
    }
  }

  make1CherryLine(avoidIconLine: null | Array<ReelIcon>): PrizePatternInfo {
    // 좌 우 선택
    const isLeft = Math.round(Math.random()) == 1;
    const result = this.makePrizeLine0(avoidIconLine);
    if (isLeft) {
      result.iconAniFlag = [true, false, false, false];
      result.iconTable[0] = ReelIcon.eCherry;
      if ([ReelIcon.eCherry, ReelIcon.eJoker].includes(result.iconTable[1])) {
        result.iconTable[1] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eCherry, ReelIcon.eJoker]
            : [ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[1]],
        );
      }
    } else {
      result.iconAniFlag = [false, false, false, true];
      result.iconTable[3] = ReelIcon.eCherry;
      if ([ReelIcon.eCherry, ReelIcon.eJoker].includes(result.iconTable[2])) {
        result.iconTable[2] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eCherry, ReelIcon.eJoker]
            : [ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[2]],
        );
      }
    }
    result.displayIconTable = { ...result.iconTable };
    return result;
  }

  make2CherryLine(avoidIconLine: null | Array<ReelIcon>): PrizePatternInfo {
    // 좌 우 선택
    const isLeft = Math.round(Math.random()) == 1;
    const result = this.makePrizeLine0(avoidIconLine);
    if (isLeft) {
      result.iconAniFlag = [true, true, false, false];
      result.iconTable[0] = ReelIcon.eCherry;
      result.iconTable[1] = ReelIcon.eCherry;
      if ([ReelIcon.eCherry, ReelIcon.eJoker].includes(result.iconTable[2])) {
        result.iconTable[2] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eCherry, ReelIcon.eJoker]
            : [ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[2]],
        );
      }
    } else {
      result.iconAniFlag = [false, false, true, true];
      result.iconTable[2] = ReelIcon.eCherry;
      result.iconTable[3] = ReelIcon.eCherry;
      if ([ReelIcon.eCherry, ReelIcon.eJoker].includes(result.iconTable[1])) {
        result.iconTable[1] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eCherry, ReelIcon.eJoker]
            : [ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[1]],
        );
      }
    }
    result.displayIconTable = { ...result.iconTable };
    return result;
  }
  // 2잡바
  make3BarNLine(avoidIconLine: null | Array<ReelIcon>) {
    // 좌 우 선택
    const isLeft = Math.round(Math.random()) == 1;
    const result = this.makePrizeLine0(avoidIconLine);
    const jokerIDX: Array<number> = [];

    if (isLeft) {
      const barlist = [ReelIcon.eBar1, ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eBar3];
      shuffle(barlist);
      result.iconAniFlag = [true, true, true, false];
      result.iconTable[0] = barlist[0];
      result.iconTable[1] = barlist[1];
      result.iconTable[2] = barlist[2];
      if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker].includes(result.iconTable[3])) {
        result.iconTable[3] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker, ReelIcon.eCherry]
            : [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[3]],
        );
      }
    } else {
      const barlist = [ReelIcon.eBar1, ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eBar3];
      shuffle(barlist);
      result.iconAniFlag = [false, true, true, true];
      result.iconTable[1] = barlist[0];
      result.iconTable[2] = barlist[1];
      result.iconTable[3] = barlist[2];
      if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker].includes(result.iconTable[0])) {
        result.iconTable[0] = this.getRandomIcon(
          avoidIconLine == null
            ? [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eCherry, ReelIcon.eJoker]
            : [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[0]],
        );
      }
    }

    result.displayIconTable = { ...result.iconTable };
    return result;
  }
  // 아이콘 4개 시상 만들기 (TODO: 조커 섞을수 있는 옵션 필요 )
  make4BarNLine(useJokerCount = 0): PrizePatternInfo {
    const barlist = [
      ReelIcon.eBar1,
      ReelIcon.eBar1,
      ReelIcon.eBar1,
      ReelIcon.eBar2,
      ReelIcon.eBar2,
      ReelIcon.eBar2,
      ReelIcon.eBar3,
      ReelIcon.eBar3,
      ReelIcon.eBar3,
    ];
    shuffle(barlist);
    const result: PrizePatternInfo = {
      iconAniFlag: [true, true, true, true],
      iconTable: [barlist[0], barlist[1], barlist[2], barlist[3]],
      displayIconTable: [barlist[0], barlist[1], barlist[2], barlist[3]],
    };
    if (useJokerCount > 0) {
      if (useJokerCount > 2) useJokerCount = 2;
      const idx = [0, 1, 2, 3];
      shuffle(idx);
      for (let i = 0; i < useJokerCount; i++) {
        result.displayIconTable[idx[i]] = ReelIcon.eJoker;
      }
    }
    return result;
  }

  // 아이콘 2개 시상 만들기
  make2PrizeLine(icon: ReelIcon, avoidIconLine: null | Array<ReelIcon>): PrizePatternInfo {
    // 좌 우 선택
    const isLeft = Math.round(Math.random()) == 1;
    const result = this.makePrizeLine0(avoidIconLine);

    if (isLeft) {
      result.iconAniFlag = [true, true, false, false];
      result.iconTable[0] = icon;
      result.iconTable[1] = icon;
      if ([icon, ReelIcon.eJoker].includes(result.iconTable[2])) {
        result.iconTable[2] = this.getRandomIcon(
          avoidIconLine == null ? [icon, ReelIcon.eJoker] : [icon, ReelIcon.eJoker, avoidIconLine[2]],
        );
      }
    } else {
      result.iconAniFlag = [false, false, true, true];
      result.iconTable[2] = icon;
      result.iconTable[3] = icon;
      if ([icon, ReelIcon.eJoker].includes(result.iconTable[1])) {
        result.iconTable[1] = this.getRandomIcon(
          avoidIconLine == null ? [icon, ReelIcon.eJoker] : [icon, ReelIcon.eJoker, avoidIconLine[1]],
        );
      }
    }
    result.displayIconTable = { ...result.iconTable };
    return result;
  }
  // 아이콘 3개 시상 만들기
  make3PrizeLine(icon: ReelIcon, avoidIconLine: null | Array<ReelIcon>, useJokerCount = 0): PrizePatternInfo {
    // 좌 우 선택
    const isLeft = Math.round(Math.random()) == 1;
    const result = this.makePrizeLine0(avoidIconLine);
    let jokerIDX: Array<number> = [];
    if (useJokerCount > 0) {
      if (useJokerCount > 1) useJokerCount = 1;
    }

    if (isLeft) {
      if (useJokerCount > 0) {
        jokerIDX = [0, 1, 2];
      }
      result.iconAniFlag = [true, true, true, false];
      result.iconTable[0] = icon;
      result.iconTable[1] = icon;
      result.iconTable[2] = icon;
      // bar계열은 잡바도 피해야한다.
      if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3].includes(icon)) {
        if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker].includes(result.iconTable[3])) {
          result.iconTable[3] = this.getRandomIcon(
            avoidIconLine == null
              ? [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker, ReelIcon.eCherry]
              : [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[3]],
          );
        }
      } else {
        if ([icon, ReelIcon.eJoker].includes(result.iconTable[3])) {
          result.iconTable[3] = this.getRandomIcon(
            avoidIconLine == null
              ? [icon, ReelIcon.eJoker, ReelIcon.eCherry]
              : [icon, ReelIcon.eJoker, ReelIcon.eCherry, avoidIconLine[3]],
          );
        }
      }
    } else {
      if (useJokerCount > 0) {
        jokerIDX = [1, 2, 3];
      }
      result.iconAniFlag = [false, true, true, true];
      result.iconTable[1] = icon;
      result.iconTable[2] = icon;
      result.iconTable[3] = icon;
      // bar계열은 잡바도 피해야한다.
      if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3].includes(icon)) {
        if ([ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eJoker].includes(result.iconTable[0])) {
          result.iconTable[0] = this.getRandomIcon(
            avoidIconLine == null
              ? [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eCherry, ReelIcon.eJoker]
              : [ReelIcon.eBar1, ReelIcon.eBar2, ReelIcon.eBar3, ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[0]],
          );
        }
      } else {
        if ([icon, ReelIcon.eJoker].includes(result.iconTable[0])) {
          result.iconTable[0] = this.getRandomIcon(
            avoidIconLine == null
              ? [icon, ReelIcon.eCherry, ReelIcon.eJoker]
              : [icon, ReelIcon.eCherry, ReelIcon.eJoker, avoidIconLine[0]],
          );
        }
      }
    }

    result.displayIconTable = { ...result.iconTable };
    if (useJokerCount > 0) {
      shuffle(jokerIDX);
      for (let i = 0; i < useJokerCount; i++) {
        result.displayIconTable[jokerIDX[i]] = ReelIcon.eJoker;
      }
    }

    return result;
  }
  // 아이콘 4개 시상 만들기 (TODO: 조커 섞을수 있는 옵션 필요 )
  make4PrizeLine(icon: ReelIcon, useJokerCount = 0): PrizePatternInfo {
    const result: PrizePatternInfo = {
      iconAniFlag: [true, true, true, true],
      iconTable: [icon, icon, icon, icon],
      displayIconTable: [icon, icon, icon, icon],
    };
    if (useJokerCount > 0) {
      if (useJokerCount > 3) useJokerCount = 3;
      const idx = [0, 1, 2, 3];
      shuffle(idx);
      for (let i = 0; i < useJokerCount; i++) {
        result.displayIconTable[idx[i]] = ReelIcon.eJoker;
      }
    }
    return result;
  }

  // 37st 시상 만들기 (TODO: 조커 섞을수 있는 옵션 필요 )
  make37stPrizeLine(useJokerCount = 0): PrizePatternInfo {
    const result: PrizePatternInfo = {
      iconAniFlag: [true, true, true, true],
      iconTable: [ReelIcon.eBar3, ReelIcon.eSeven, ReelIcon.eStar, ReelIcon.eTarget],
      displayIconTable: [ReelIcon.eBar3, ReelIcon.eSeven, ReelIcon.eStar, ReelIcon.eTarget],
    };
    if (useJokerCount > 0) {
      if (useJokerCount > 3) useJokerCount = 3;
      const idx = [0, 1, 2, 3];
      shuffle(idx);
      for (let i = 0; i < useJokerCount; i++) {
        result.displayIconTable[idx[i]] = ReelIcon.eJoker;
      }
    }
    return result;
  }

  // ----------------------------
  // for debug
  // ----------------------------

  printLine(line: Array<ReelIcon>) {
    console.log(
      `${getReelIconName(line[0])}\t${getReelIconName(line[1])}\t${getReelIconName(line[2])}\t${getReelIconName(
        line[3],
      )}`,
    );
  }

  printPattern(pattern: Array<Array<ReelIcon>>) {
    console.log(
      `${getReelIconName(pattern[0][0])}\t${getReelIconName(pattern[1][0])}\t${getReelIconName(
        pattern[2][0],
      )}\t${getReelIconName(pattern[3][0])}`,
    );
    console.log(
      `${getReelIconName(pattern[0][1])}\t${getReelIconName(pattern[1][1])}\t${getReelIconName(
        pattern[2][1],
      )}\t${getReelIconName(pattern[3][1])}`,
    );
    console.log(
      `${getReelIconName(pattern[0][2])}\t${getReelIconName(pattern[1][2])}\t${getReelIconName(
        pattern[2][2],
      )}\t${getReelIconName(pattern[3][2])}`,
    );
    console.log('');
  }
}
