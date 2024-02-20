import { canvasInfo } from '@/util/config';
import IconContainer from './iconContainer';
import * as PIXI from 'pixijs';
import App from '@/app/app';
import gsap from 'gsap';
import Slot from '.';

const { startDelay, stopCount } = canvasInfo;

export default class Reel extends PIXI.Container {
  // 배당 수
  private mSheet: PIXI.Spritesheet;
  private mDividend: number;
  private mDividendSprite: PIXI.Sprite;
  private mSpinAni: gsap.core.Timeline;
  private mIconReel: IconContainer;
  get dividend(): number {
    return this.mDividend;
  }
  set dividend(v: number) {
    this.mDividend = v;
    this.mDividendSprite.texture = this.mSheet.textures[`x${v}`];
  }
  constructor(dividend: number) {
    super();
    this.mDividend = dividend;
  }

  async init() {
    this.mSheet = (App.getHandle.getScene as Slot).sheet.reel;
    this.removeChildren();
    await this.makeIcon();
  }

  async makeIcon() {
    const bg = new PIXI.Sprite(this.mSheet.textures[`x1`]);
    bg.zIndex = 0;

    this.mDividendSprite = new PIXI.Sprite();
    this.mDividendSprite.texture = this.mSheet.textures[`x1`];
    this.mDividendSprite.zIndex = 1;

    this.mIconReel = new IconContainer();
    await this.mIconReel.init();
    this.mIconReel.x = (154 - 140) / 2;
    this.mIconReel.position.set((154 - 140) / 2, 0);
    this.mDividendSprite.zIndex = 2;

    this.addChild(bg, this.mDividendSprite, this.mIconReel);
  }

  async changeDividend(dividend: number) {
    if (this.mDividend === dividend) return;
    if (dividend == 1) {
      gsap.to(this.mDividendSprite, { alpha: 0, duration: 0.5 });
    } else {
      gsap.to(this.mDividendSprite, {
        alpha: 0,
        duration: 0.5,
        onComplete: () => {
          this.mDividendSprite.texture = this.mSheet.textures[`x${dividend}`];
          gsap.to(this.mDividendSprite, { alpha: 1, duration: 1 });
        },
      });
    }
    this.mDividend = dividend;
  }

  start() {
    return new Promise((resolve, _reject) => {
      this.mSpinAni?.kill();
      const duration = 0.01;
      const ease = 'circ.out';

      this.mSpinAni = gsap.timeline({ repeat: -1 });
      this.mSpinAni.timeScale(0.005);
      this.mSpinAni.to(this.mIconReel, {
        duration,
        ease,
        onStart: () => {
          const timeScale = this.mSpinAni.timeScale() + 0.04 > 1 ? 1 : this.mSpinAni.timeScale() + 0.04;
          this.mSpinAni.timeScale(timeScale);
          if (timeScale < 1) this.mIconReel.reelAni(duration, timeScale);
        },
        onComplete: async () => await this.mIconReel.next(),
      });

      setTimeout(() => resolve(1), startDelay * 1000);
    });
  }

  stop(iconNameAry: string[]) {
    return new Promise((resolve, _reject) => {
      const duration = 0.05;
      const ease = 'circ.out';

      /**스탑 아이콘 빼서 뒤에 넣기 */
      this.mIconReel.setStopIconIndex(iconNameAry);
      this.mSpinAni.kill();
      this.mSpinAni = gsap.timeline({ repeat: -1 });
      this.mSpinAni.timeScale(1);
      let scale = 1;
      this.mSpinAni.to(this.mIconReel, {
        duration,
        ease,
        onStart: async () => {
          scale = scale - 0.05 < 0.05 ? 0.05 : scale - 0.05;
          this.mSpinAni.timeScale(scale);
          this.mIconReel.reelAni(duration, scale);
        },
        onComplete: async () => {
          /** 스탑 타이밍 아니면 순서대로 아이콘 추가 */
          await this.mIconReel.next();

          /** 스탑 아이콘 3개 디스플레이 완료 */
          if (
            this.mIconReel.stopNameAry[0] == iconNameAry[0] &&
            this.mIconReel.stopNameAry[1] == iconNameAry[1] &&
            this.mIconReel.stopNameAry[2] == iconNameAry[2]
          ) {
            await this.mSpinAni.kill();
            this.mSpinAni = null;
            return resolve(1);
          }
        },
      });
    });
  }

  async completeAni(aniFlag: boolean[]) {
    await this.mIconReel.completeAni(aniFlag);
  }
}
