import App from '@/app/app';
import crypto from 'crypto-js';
import * as PIXI from 'pixijs';
import { canvasInfo } from './config';
import { getReelPatturnInfo } from './ReelScoreMGR';

export const drawRect = (fill: number, w: number, h: number, alpha?: number) => {
  const rect = new PIXI.Graphics();
  rect.beginFill(fill, alpha);
  rect.drawRect(0, 0, w, h);
  rect.endFill();
  return rect;
};

export const reelPatturnInfo = async (score: number) => await getReelPatturnInfo(score);

export const resize = (canvasElement: HTMLCanvasElement) => {
  if (!canvasElement) return;
  // const canvas =

  const { innerWidth, innerHeight } = window;
  if (innerHeight > innerWidth / 0.5625 && innerWidth < canvasInfo.width) {
    /**너비 기준 */
    const height = Math.round(innerWidth / 0.5625);
    canvasElement.style.width = `${innerWidth}px`;
    canvasElement.style.height = `${height}px`;
  } else {
    /**높이 기준 */
    const width = Math.round(innerHeight / 1.777);
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${innerHeight}px`;
  }
};

export const setEncode = (data: string, secretKey: string) => {
  if (!data) return null;
  const byte = crypto.AES.encrypt(JSON.stringify(data), secretKey);
  const encode = byte.toString();
  return encode;
};

export const setDecode = (data: string, secretKey: string) => {
  if (!data) return null;
  const byte = crypto.AES.decrypt(data, secretKey);
  const decode = byte.toString(crypto.enc.Utf8);
  return JSON.parse(decode);
};

export const getDegree = (y: number, x: number) => {
  return (Math.atan2(y, x) * 180) / Math.PI;
};

export const getCoordinate = (moveX, moveY, distance, degree) => {
  const x = Math.cos(degree) * distance - moveX;
  const y = Math.sin(degree) * distance - moveY;
  return { x, y };
};

export const getDistance = (y1: number, y2: number, x1: number, x2: number) => {
  return Math.round(Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)));
};

/**
 * @description 탭이 안보일 때 => onHiddenTab()
 * @description 탭이 보일 때 => onViewTab()
 * */
export const registVisibleChange = () => {
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    if (isHidden) App.getHandle.onHiddenTab();
    if (!isHidden) App.getHandle.onViewTab();
  });
};

export const getTime = () => {
  const date = new Date();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${seconds}`;
};

export const formatNumber = (number: number) => {
  const value = `${number}`.replaceAll(',', '');
  return +value > -1 ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};
