import { rscManager } from '@app/resource/resourceManager';
import { useLayoutStore } from '@store/layout';
import rsc from '@app/resource/resouce.json';
import Scene from '@app/scene/scene';
import { find } from 'lodash-es';
import Slot from './scene/slot/index';
import * as PIXI from 'pixijs';

export default class SceneManager extends PIXI.Container {
  private mSceneAry: Array<Scene>;
  private mCurrentSceneIdx: number;

  get currentScene(): Scene {
    return this.mSceneAry[this.mCurrentSceneIdx];
  }

  get currentSceneInfo(): TypeSceneInfo {
    return this.mSceneAry[this.mCurrentSceneIdx].info;
  }

  constructor() {
    super();

    this.mSceneAry = [];
    this.mCurrentSceneIdx = 0;
  }

  async init() {
    this.mCurrentSceneIdx = 0;
    this.mSceneAry = [new Slot()];
  }

  async start() {
    try {
      useLayoutStore.isLoading = true;
      const { name } = this.mSceneAry[0].info;
      // await rscManager.getHandle.loadCommonRsc(rsc.common);
      await rscManager.getHandle.loadAllRsc(rsc[name]);
      await this.changeScene(name);
    } catch (e) {
      console.error(e);
    } finally {
      useLayoutStore.isLoading = false;
    }
  }

  async changeScene(sceneName: string) {
    await rscManager.getHandle.loadAllRsc(rsc[sceneName]);
    this.removeChildren();
    await this.mSceneAry[this.mCurrentSceneIdx]?.endGame();
    const scene = find(this.mSceneAry, (e) => sceneName === e.info.name);
    await scene.init();
    this.addChild(scene);
    await scene.startGame();
  }
}
