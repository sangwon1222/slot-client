export const canvasInfo: Readonly<TypeCanvasInfo> = {
  backgroundColor: 0x000000,
  width: 720,
  height: 1280,
  slotIconScale: 140,
  maskScale: { w: 616, h: 420 },
  gapIconInReel: 4,
  slotScaleAry: [0.7, 0.7, 0.8, 1, 0.8, 0.7],
  centerSlotIndex: 2,
  stopCount: 5,
  atlasData: ['bar1', 'bar2', 'bar3', 'bell', 'cherry', 'orange', 'seven', 'star', 'target', 'watermelon'],
  emoji: {
    bell: '🔔',
    bar1: '➖',
    bar2: '🟰',
    bar3: '☰',
    joker: '🃏',
    watermelon: '🍉',
    orange: '🍊',
    seven: '7️⃣',
    star: '⭐',
    target: '🎯',
    cherry: '🍒',
  },
  startDelay: 0.25,
  debug: false,
};

export const productLink = 'http://www.cuberoom.net/test-1/';
export const devLink: string = location.origin;
