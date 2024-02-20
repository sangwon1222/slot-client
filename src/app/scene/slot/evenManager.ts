import { debounce, flatten, filter } from 'lodash-es';
import { useAuthStore } from '@/store/auth';
import { useGameStore } from '@/store/game';
import { canvasInfo } from '@/util/config';
import authApi from '@/api/auth';
import slotApi from '@/api/slot';
import * as PIXI from 'pixijs';
import Slot from '.';
import { reelPatturnInfo } from '@/util';

const { width, height, emoji } = canvasInfo;

export default class EventManager extends PIXI.Container {
  private mDimmed: PIXI.Graphics;
  private mIndexInGroup: number;
  private mEventOrder: number;
  private mReel: string[][];
  private mReelAni: boolean[][];
  private mDividend: number;
  private mText: PIXI.Text;
  private mBusy: boolean;

  set busy(v: boolean) {
    const slot = this.parent as Slot;
    this.mBusy = v;
    const name = v ? 'test1' : 'test2';
    slot.changeVideo('front', `/rsc/slot/video/${name}.webm`);
  }
  set setText(v: string) {
    this.mText.text = v;
    this.mText.anchor.set(0.5);
    this.mDimmed.visible = v != '';
  }
  constructor() {
    super();
    this.mBusy = false;
    this.mEventOrder = 0;
    this.mIndexInGroup = 0;
    this.mReel = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ];
    this.mReelAni = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ];
  }

  async init() {
    await this.createDimmed();
    await this.createText();
    this.cursor = 'pointer';
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, width, height);
    this.mEventOrder = 1;

    this.on(
      'pointerdown',
      debounce(
        async (e) => {
          e.bubbles = false;
          e.defaultPrevented = true;
          await this.setEvent();
        },
        500,
        { trailing: false, leading: true },
      ),
    );
  }

  async setEvent() {
    if (!useGameStore.game || useGameStore.game.length == 0) {
      const tableData = await authApi.getGameTable();
      if (tableData.ok && tableData.data.gameTable) {
        useAuthStore.gameName = tableData.data.gameTable;
        const gameData = await slotApi.getGame(useAuthStore.currentGroupIndex);
        useGameStore.game = gameData.data;
      } else {
        return (this.setText = '지정된 게임이 없습니다.');
      }
    } else this.setText = '';
    if (this.mBusy) return;

    const slot = this.parent as Slot;
    this.busy = true;
    this.mEventOrder = (this.mEventOrder + 1) % 2;

    switch (this.mEventOrder) {
      case 0:
        console.clear();
        await this.sendApi();
        await slot.startReel();
        slot.setDividene(this.mDividend);
        setTimeout(() => (this.busy = false), 1000);
        break;
      case 1:
        await slot.stopReel(this.mReel);
        if (filter(flatten(this.mReelAni), (e) => e)[0]) {
          setTimeout(async () => await slot.completeAni(this.mReelAni), 1000);
          setTimeout(async () => (this.busy = false), 2000);
        } else {
          this.busy = false;
        }

        break;
    }
  }

  async createDimmed() {
    this.mDimmed = new PIXI.Graphics();
    this.mDimmed.beginFill(0x000000, 0.8);
    this.mDimmed.drawRect(0, 0, width, height);
    this.mDimmed.endFill();
    this.mDimmed.cursor = 'wait';
    this.addChild(this.mDimmed);
    this.mDimmed.visible = false;
  }

  async createText() {
    this.mText = new PIXI.Text('', { fill: 0xffffff, fontSize: 48 });
    this.mText.anchor.set(0.5);
    this.mText.position.set(width / 2, height / 2);
    this.mDimmed.addChild(this.mText);
  }

  async sendApi() {
    await this.nextInGroup();

    const score = this.getCurrentScore();
    const pattern = await reelPatturnInfo(score);
    this.mDividend = pattern.dividend;
    this.mReel = pattern.displayIconTable;
    this.mReelAni = pattern.iconAniFlag;
    await authApi.updateUserReel();
    await this.showReelTableLog(pattern);
  }

  async nextInGroup() {
    const { turnInGroup, prizeTurn, currentGroupIndex } = useAuthStore;
    const { turnCount, groupCount } = useGameStore.game[prizeTurn];

    /**GROUP((여러 PRIZE,TURN 묶음)) => PRIZE(여러 TURN 묶음) => TURN...  */
    /** PRIZE 내부 진행중 */
    if (turnInGroup + 1 <= turnCount) {
      useAuthStore.turnInGroup += 1;
    } else {
      useAuthStore.turnInGroup = 1;

      /** PRIZE 끝 다음 PRIZE 묶음으로 진행 */
      if (turnInGroup + 1 > useGameStore.game[prizeTurn].turnCount) {
        if (prizeTurn + 1 < useGameStore.game.length) {
          useAuthStore.prizeTurn += 1;
          return;
        }

        /**모든 턴 진행 완료, 처음그룹 데이터 가져오기. */
        if (currentGroupIndex + 1 >= groupCount) {
          useAuthStore.currentGroupIndex = 0;
          useAuthStore.prizeTurn = 0;
          useAuthStore.turnInGroup = 1;
        } else {
          /** 다음 그룹 진행 데이터 가져오기 */
          useAuthStore.currentGroupIndex += 1;
        }
        const { data } = await slotApi.getGame(useAuthStore.currentGroupIndex);
        useGameStore.game = data;
      } else {
        useAuthStore.turnInGroup += 1;
      }
    }
  }

  getCurrentScore() {
    const { turnInGroup, prizeTurn } = useAuthStore;
    const { game } = useGameStore;
    return turnInGroup == game[prizeTurn].turnCount ? useGameStore.game[prizeTurn].score : 0;
  }

  async showReelTableLog(pattern: { [key: string]: any }) {
    console.log(pattern);

    const table = [
      [emoji[this.mReel[0][0]], emoji[this.mReel[1][0]], emoji[this.mReel[2][0]], emoji[this.mReel[3][0]]],
      [emoji[this.mReel[0][1]], emoji[this.mReel[1][1]], emoji[this.mReel[2][1]], emoji[this.mReel[3][1]]],
      [emoji[this.mReel[0][2]], emoji[this.mReel[1][2]], emoji[this.mReel[2][2]], emoji[this.mReel[3][2]]],
    ];
    for (let i = 0; i < 3; i++) {
      const t = table[i];
      const ani = [
        this.mReelAni[0][i] ? 'ani' : 'not',
        this.mReelAni[1][i] ? 'ani' : 'not',
        this.mReelAni[2][i] ? 'ani' : 'not',
        this.mReelAni[3][i] ? 'ani' : 'not',
      ];
      const color = [
        this.mReelAni[0][i] ? 'red' : 'black',
        this.mReelAni[1][i] ? 'red' : 'black',
        this.mReelAni[2][i] ? 'red' : 'black',
        this.mReelAni[3][i] ? 'red' : 'black',
      ];
      console.log(
        `%c ${t[0]} - ${ani[0]} %c ${t[1]} - ${ani[1]}  %c ${t[2]} - ${ani[2]}  %c ${t[3]} - ${ani[3]} `,
        `padding:10px 0; margin:10px 0; border:2px ${color[0]} solid;`,
        `padding:10px 0; margin:10px 0; border:2px ${color[1]} solid;`,
        `padding:10px 0; margin:10px 0; border:2px ${color[2]} solid;`,
        `padding:10px 0; margin:10px 0; border:2px ${color[3]} solid; `,
      );
    }
    console.log({
      turnCount: useGameStore.game[useAuthStore.prizeTurn].turnCount,
      score: pattern.score,
      prizeTurn: useAuthStore.prizeTurn,
      turnInGroup: useAuthStore.turnInGroup,
      currentGroupIndex: useAuthStore.currentGroupIndex,
    });
  }
}
