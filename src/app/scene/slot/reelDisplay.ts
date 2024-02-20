import { canvasInfo } from '@/util/config';
import { drawRect, formatNumber } from '@/util';
import * as PIXI from 'pixijs';
import Reel from './reel';
import gsap from 'gsap';

const { width, debug } = canvasInfo;

export default class ReelDisplay extends PIXI.Container {
  private mReelContainer: PIXI.Container;
  private mScoreObj: { [key: string]: ScoreBoard | null };
  private mSheet: PIXI.Spritesheet;
  private mReelAry: Array<Reel>;
  private mRazer: Array<PIXI.Sprite>;

  get sheet(): PIXI.Spritesheet {
    return this.mSheet;
  }

  constructor(textureSheet: PIXI.Spritesheet) {
    super();
    this.mSheet = textureSheet;
    this.mReelAry = [];
  }

  async init() {
    this.mScoreObj = { score: null, credit: null, win: null };
    this.removeChildren();
    await this.makeBg();
    await this.makeScoreBoard();
    await this.makeReelMask();
    await this.makeReel();
    await this.makeRazer();
  }

  async makeBg() {
    const bg = new PIXI.Sprite();
    bg.texture = this.mSheet.textures['mainframe'];
    const bgAnchor = this.mSheet.data.frames['mainframe'].anchor;
    bg.anchor.set(bgAnchor.x, bgAnchor.y);
    bg.y = bg.height * bgAnchor.y;
    this.addChild(bg);
  }

  async makeScoreBoard() {
    const list = ['score', 'credit', 'win'];
    const gap = [width / 2 - 220, width / 2, width / 2 + 230];
    const length = list.length;
    for (let i = 0; i < length; i++) {
      const score = new ScoreBoard(list[i], (i + 1) * 1000 + (i + 2) * 100);
      this.addChild(score);
      await score.init();
      score.position.set(gap[i], 814);
      this.mScoreObj[list[i]] = score;
    }
  }

  async makeReelMask() {
    this.mReelContainer = new PIXI.Container();
    this.mReelContainer.position.set(50, 312);
    const mask = drawRect(0xffffff, 616, 420);
    mask.position.set(this.mReelContainer.x, this.mReelContainer.y);
    if (debug) mask.visible = false;
    else this.mReelContainer.mask = mask;
    this.addChild(this.mReelContainer, mask);
  }

  async makeReel() {
    for (let i = 0; i < 4; i++) {
      this.mReelAry[i] = new Reel(1);
      await this.mReelAry[i].init();
      this.mReelAry[i].position.set(154 * i, 0);
      this.mReelContainer.addChild(this.mReelAry[i]);
    }
  }

  async makeRazer() {
    this.mRazer = [];
    const razerPos = [374, 520, 650];
    for (let i = 0; i < 3; i++) {
      const razer = new PIXI.Sprite();
      razer.texture = this.mSheet.textures['prizeLine'];
      const razerAnchor = this.mSheet.data.frames['prizeLine'].anchor;
      razer.anchor.set(razerAnchor.x, razerAnchor.y);
      razer.position.set(34, razerPos[i]);
      razer.alpha = 0;
      this.mRazer.push(razer);
      this.addChild(razer);
    }
  }

  async completeAni(aniFlag: boolean[][]) {
    const { length } = this.mReelAry;
    const razerFlag = [
      aniFlag[0][0] && aniFlag[1][0] && aniFlag[2][0] && aniFlag[3][0],
      aniFlag[0][1] && aniFlag[1][1] && aniFlag[2][1] && aniFlag[3][1],
      aniFlag[0][2] && aniFlag[1][2] && aniFlag[2][2] && aniFlag[3][2],
    ];
    for (let i = 0; i < length; i++) {
      if (razerFlag[i])
        gsap
          .to(this.mRazer[i], { alpha: 1, duration: 0.25, onComplete: () => (this.mRazer[i].alpha = 0) })
          .repeat(4)
          .yoyo(true);
      await this.mReelAry[i].completeAni(aniFlag[i]);
    }
  }

  async stopReel(reelAry: string[][]) {
    const orderList = [0, 3, 1, 2];
    const { length } = this.mReelAry;
    for (let i = 0; i < length; i++) {
      const index = orderList[i];
      await this.mReelAry[index].stop(reelAry[index]);
    }
  }

  async startReel() {
    this.changeScoreValue(
      'credit',
      this.mScoreObj['credit'].info.value - 100 < 0 ? 0 : this.mScoreObj['credit'].info.value - 100,
    );
    const { length } = this.mReelAry;
    for (let i = 0; i < length; i++) {
      await this.mReelAry[i].start();
    }
  }

  changeDividend(dividend: number) {
    for (let i = 0; i < 4; i++) {
      this.mReelAry[i].changeDividend(dividend);
    }
  }

  changeScoreValue(role: string, value: number) {
    this.mScoreObj[role].setValueSprite(value);
  }
}

class ScoreBoard extends PIXI.Container {
  private mRole: string;
  private mValue: number;
  private mValueTextContiner: PIXI.Container;
  get info(): { role: string; value: number } {
    return { role: this.mRole, value: this.mValue };
  }

  get sheet(): PIXI.Spritesheet {
    return (this.parent as ReelDisplay).sheet;
  }
  constructor(role: string, value: number) {
    super();
    this.mRole = role;
    this.mValue = value;
  }

  async init() {
    this.removeChildren();
    this.mValueTextContiner = new PIXI.Container();
    this.addChild(this.mValueTextContiner);
    await this.setValueSprite(this.mValue);
  }

  async setValueSprite(value: number) {
    this.mValue = value;
    this.mValueTextContiner.removeChildren();
    this.mValueTextContiner.position.set(0, 0);
    const toString = formatNumber(this.mValue);
    let x = 0;
    for (let i = 0; i < toString.length; i++) {
      const sprite = new PIXI.Sprite();
      sprite.texture = this.sheet.textures[toString[i]];
      sprite.x = x;
      x += sprite.width;
      const { anchor } = this.sheet.data.frames[toString[i]];
      sprite.anchor.set(anchor.x, anchor.y);
      this.mValueTextContiner.addChild(sprite);
    }

    this.mValueTextContiner.x = -this.mValueTextContiner.width / 2;
  }
}
