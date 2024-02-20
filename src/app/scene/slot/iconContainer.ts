import { filter, findIndex, map, sample, shuffle } from 'lodash-es';
import { canvasInfo } from '@/util/config';
import * as PIXI from 'pixijs';
import App from '@/app/app';
import gsap from 'gsap';
import Slot from '.';

const { atlasData, slotIconScale, gapIconInReel, slotScaleAry, centerSlotIndex, stopCount } = canvasInfo;
const slotCount = slotScaleAry.length;

export default class IconContainer extends PIXI.Container {
  private mSpriteAry: Array<IconSprite>;
  private mIconList: any[];
  private mYPos: number[];

  get stopNameAry(): string[] {
    return [this.mIconList[centerSlotIndex - 1], this.mIconList[centerSlotIndex], this.mIconList[centerSlotIndex + 1]];
  }

  constructor() {
    super();
    this.mIconList = [];
    this.mYPos = [];
  }

  async init() {
    this.mIconList = shuffle(atlasData);
    this.mSpriteAry = [];

    await this.makeIcon();
  }

  async makeIcon() {
    let y = -(slotIconScale * slotScaleAry[0]) * 2;

    for (let i = 0; i < slotCount; i++) {
      const icon = new IconSprite();
      await icon.init();
      icon.setTexture(this.mIconList[i]);
      icon.position.set(0, y);
      icon.width = slotIconScale;
      icon.height = slotScaleAry[i] * slotIconScale;
      icon.zIndex = 1;
      this.mSpriteAry.push(icon);
      this.addChild(icon);

      this.mYPos.push(y);
      y += slotIconScale * slotScaleAry[i] + gapIconInReel;
    }
  }

  /**아이콘 Y값, 스핀 아이콘 스케일 애니 */
  reelAni(duration: number, timeScale: number) {
    if (timeScale == 1) return;
    for (let i = 0; i < slotCount; i++) {
      const height = i + 1 >= slotCount ? 0 : slotScaleAry[i + 1] * slotIconScale;
      const y = i + 1 >= slotCount ? this.mYPos[i] + slotIconScale : this.mYPos[(i + 1) % slotCount];

      gsap.to(this.mSpriteAry[i], { height, y, duration }).timeScale(timeScale);
    }
  }

  /** 릴 아이콘 순서 바꾸기 */
  async next() {
    return new Promise((resolve, _reject) => {
      const index = this.mIconList.length - 1;
      this.mIconList = [...this.mIconList.slice(index), ...this.mIconList.slice(0, index)];

      for (let i = 0; i < slotCount; i++) {
        gsap.killTweensOf(this.mSpriteAry[i]);
        this.mSpriteAry[i].setTexture(this.mIconList[i]);
        this.mSpriteAry[i].height = slotScaleAry[i] * slotIconScale;
        this.mSpriteAry[i].y = this.mYPos[i];
      }
      resolve(1);
    });
  }

  async setStopIconIndex(iconList: string[]) {
    return new Promise((resolve, _reject) => {
      const reduceAry = filter(this.mIconList, (e) => !iconList.includes(e));
      this.mIconList = [
        ...reduceAry.slice(reduceAry.length - stopCount),
        ...iconList,
        ...reduceAry.slice(0, reduceAry.length - stopCount),
      ];
      for (let i = 0; i < slotCount; i++) {
        gsap.killTweensOf(this.mSpriteAry[i]);
        this.mSpriteAry[i].setTexture(this.mIconList[i]);
        this.mSpriteAry[i].height = slotScaleAry[i] * slotIconScale;
        this.mSpriteAry[i].y = this.mYPos[i];
      }

      resolve(1);
    });
  }

  /**완료 애니 ex) 아이콘 확대 애니 */
  async completeAni(aniFlag: boolean[]) {
    const icon = [
      this.mSpriteAry[centerSlotIndex - 1],
      this.mSpriteAry[centerSlotIndex],
      this.mSpriteAry[centerSlotIndex + 1],
    ];
    map(aniFlag, (e, i) => (e ? icon[i].completeAni() : null));
  }
}

export class IconSprite extends PIXI.Container {
  private mSprite: PIXI.Sprite;
  private mSheet: PIXI.Spritesheet;
  private mIconName: string;
  get name(): string {
    return this.mIconName;
  }
  constructor() {
    super();
  }

  async init() {
    this.mSheet = (App.getHandle.getScene as Slot).sheet.icon;
    this.mSprite = new PIXI.Sprite();
    this.mIconName = '';
    this.addChild(this.mSprite);
  }

  /** 아이콘 바꾸기 */
  async setTexture(textrure: string) {
    this.mIconName = textrure;
    this.mSprite.texture = this.mSheet.textures[textrure];
    this.mSprite.anchor.set(0.5);
    this.mSprite.position.set(this.mSprite.width / 2, this.mSprite.height / 2);
  }

  /**완료 애니 */
  completeAni() {
    return new Promise((resolve, _reject) => {
      const ease = 'bounce';
      const duration = 0.5;
      const timeline = gsap.timeline();
      timeline.to(this.mSprite.scale, { x: 1.2, y: 1.2, ease, duration });
      timeline.to(this.mSprite.scale, { x: -1.2, y: 1.2, duration: 0.25 });
      timeline.to(this.mSprite.scale, { x: 1.2, y: 1.2, duration: 0.25 });
      timeline.to(this.mSprite.scale, { x: -1.2, y: 1.2, duration: 0.25 });
      timeline.to(this.mSprite.scale, { x: 1.2, y: 1.2, duration: 0.25 });
      timeline.to(this.mSprite.scale, { x: 1, y: 1, ease, duration, onComplete: () => resolve(1) });
    });
  }
}
