import { rscManager } from '@/app/resource/resourceManager';
import iconSheet from 'public/rsc/slot/json/icon.json';
import bigNumberSheet from 'public/rsc/slot/json/big_number.json';
import mainframeSheet from 'public/rsc/slot/json/mainframe.json';
import reelSheet from 'public/rsc/slot/json/reel.json';
import { productLink, devLink, canvasInfo } from '@/util/config';
import ReelDisplay from './reelDisplay';
import EventManager from './evenManager';
import * as PIXI from 'pixijs';
import Scene from '../scene';
import gsap from 'gsap';
import { useLayoutStore } from '@/store/layout';
import { useAuthStore } from '@/store/auth';

const { width, height } = canvasInfo;

export default class Slot extends Scene {
  private mSheet: { [key: string]: PIXI.Spritesheet };
  private mEventManager: EventManager;
  private mVideoWrap: PIXI.Container;
  private mFrontVideoWrap: PIXI.Container;
  private mReelDisplay: ReelDisplay;
  private mReelWrap: PIXI.Container;
  private mVideoSprite: { front: PIXI.Sprite; back: PIXI.Sprite };
  private mVideo: { front: HTMLVideoElement; back: HTMLVideoElement };
  private mDimmed: PIXI.Graphics;
  private mCurrentReel: number;

  get sheet() {
    return this.mSheet;
  }
  get currentReel() {
    return this.mCurrentReel;
  }
  set dimmed(v: boolean) {
    this.mDimmed.interactive = false;
    const duration = 0.5;
    const alpha = v ? 1 : 0;
    gsap.killTweensOf(this.mDimmed);
    gsap.to(this.mDimmed, { alpha, duration, onComplete: () => (this.mDimmed.visible = v) });
  }

  constructor() {
    super(0, 'slot');
    this.mCurrentReel = 0;
    this.mVideo = { front: null, back: null };
  }

  async init() {
    console.log(`%c slot init`, 'padding:6px; border:2px purple solid;');
    this.removeChildren();
    this.sortableChildren = true;

    await this.createDimmed();
    await this.loadingSpriteSheet();

    /**** z-index 순서:  video => reel => front-video */
    await this.createVideoWrap();
    await this.createReelWrap();

    /**처음 유저 인터렉티브 받기 위한 딤드 / 릴 스핀 애니 대기 표시 */
    this.mDimmed.on('pointerdown', async () => {
      useLayoutStore.isLoading = true;
      await this.changeVideo('back', '/rsc/slot/video/back-test.webm');
      this.dimmed = false;
      useLayoutStore.isLoading = false;
    });
  }

  async createDimmed() {
    this.mDimmed = new PIXI.Graphics();
    this.mDimmed.beginFill(0x000000, 0.6);
    this.mDimmed.drawRect(0, 0, width, height);
    this.mDimmed.endFill();
    this.mDimmed.zIndex = 6;
    this.mDimmed.interactive = true;
    this.mDimmed.cursor = 'pointer';
    this.addChild(this.mDimmed);
  }

  /**z-index 순서:  video => reel => front-video */
  async createReelWrap() {
    this.mReelWrap = new PIXI.Container();
    this.mReelWrap.zIndex = 2;
    this.mReelWrap.y = 450;
    this.mReelWrap.sortableChildren = true;
    this.addChild(this.mReelWrap);

    this.mReelDisplay = new ReelDisplay(this.mSheet.mainframe);
    this.mReelDisplay.position.set(0, 0);
    await this.mReelDisplay.init();
    this.mReelWrap.addChild(this.mReelDisplay);
  }

  setDividene(dividend: number) {
    this.mReelDisplay.changeDividend(dividend);
  }

  /**z-index 순서:  video => reel => front-video */
  async createVideoWrap() {
    this.mVideoSprite = { front: new PIXI.Sprite(), back: new PIXI.Sprite() };

    this.mVideoWrap = new PIXI.Container();
    this.mVideoWrap.zIndex = 1;
    this.mVideoWrap.addChild(this.mVideoSprite.back);

    this.mFrontVideoWrap = new PIXI.Container();
    this.mFrontVideoWrap.zIndex = 3;
    this.mFrontVideoWrap.addChild(this.mVideoSprite.front);

    this.mVideoSprite.front.alpha = 0;
    this.mVideoSprite.front.width = width;
    this.mVideoSprite.front.height = height;
    this.mVideoSprite.back.alpha = 0;
    this.mVideoSprite.back.width = width;
    this.mVideoSprite.back.height = width;

    this.addChild(this.mVideoWrap, this.mFrontVideoWrap);
  }

  changeVideo(role: 'front' | 'back', src: string) {
    return new Promise((resolve, _reject) => {
      if (this.mVideo[role]) {
        this.mVideo[role].pause();
        delete this.mVideo[role];
        this.mVideo[role] = null;
      }
      this.mVideo[role] = document.createElement('video');
      this.mVideo[role].loop = true;
      this.mVideo[role].autoplay = false;
      this.mVideo[role].src = src;
      this.mVideo[role].oncanplay = () => {
        gsap.killTweensOf(this.mVideoSprite[role]);
        this.mVideoSprite[role].alpha = 0;
        this.mVideoSprite[role].texture = PIXI.Texture.from(this.mVideo[role]);
        this.mVideo[role].play();
        gsap.to(this.mVideoSprite[role], { alpha: 1, duration: 0.5, onComplete: () => resolve(1) });
      };

      gsap.to(this.mVideoSprite[role], { alpha: 0, duration: 0.5 });
    });
  }

  async loadingSpriteSheet() {
    const isProduct = process.env.NODE_ENV === 'production';
    const link = isProduct ? productLink : devLink;
    await PIXI.Assets.load(`${link}/rsc/slot/json/icon.json`);
    await PIXI.Assets.load(`${link}/rsc/slot/json/big_number.json`);
    await PIXI.Assets.load(`${link}/rsc/slot/json/mainframe.json`);
    await PIXI.Assets.load(`${link}/rsc/slot/json/reel.json`);

    PIXI.utils.clearTextureCache();

    this.mSheet = {
      icon: new PIXI.Spritesheet(rscManager.getHandle.getRsc('icon.png'), iconSheet),
      number: new PIXI.Spritesheet(rscManager.getHandle.getRsc('big_number.png'), bigNumberSheet),
      mainframe: new PIXI.Spritesheet(rscManager.getHandle.getRsc('main_frame.png'), mainframeSheet),
      reel: new PIXI.Spritesheet(rscManager.getHandle.getRsc('reel.png'), reelSheet),
    };
    await this.mSheet.icon.parse();
    await this.mSheet.number.parse();
    await this.mSheet.mainframe.parse();
    await this.mSheet.reel.parse();
  }

  async startGame() {
    this.mEventManager = new EventManager();
    this.addChild(this.mEventManager);
    this.mEventManager.zIndex = 3;
    await this.mEventManager.init();
  }

  async startReel() {
    this.mReelDisplay.startReel();
  }

  async stopReel(reelAry: string[][]) {
    await this.mReelDisplay.stopReel(reelAry);
  }

  async completeAni(aniFlag: boolean[][]) {
    await this.mReelDisplay.completeAni(aniFlag);
  }
}
