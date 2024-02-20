declare interface TypeChatStore {
  chatting: { chat: string; userID: string; level: number }[];
  concurrentUsers: number;
}

declare interface TypeAuthStore {
  userID: string;
  accessToken: string;
  refreshToken: string;
  signedIn: boolean;
  currentGroupIndex: number;
  gameName: string;
  prizeTurn: number;
  turnInGroup: number;
}

declare interface TypeLayoutStore {
  isLoading: boolean;
  currentNav: string;
}

declare interface TypeAppParms {
  backgroundColor: number;
  width: number;
  height: number;
  view: HTMLCanvasElement;
}

declare interface TypeCanvasInfo {
  backgroundColor: number;
  width: number;
  height: number;
  slotIconScale: number;
  stopCount: number;
  maskScale: { w: number; h: number };
  atlasData: any;
  gapIconInReel: number;
  centerSlotIndex: number;
  startDelay: number;
  debug: boolean;
  slotScaleAry: number[];
  emoji: { [key: string]: string };
}

declare interface TypeObjectAny {
  [key: string]: any;
}

declare interface TypeObjectStringAry {
  [key: string]: string[];
}

declare interface TypeSceneInfo {
  sceneId: number;
  name: string;
}

declare interface TypeClientsCount {
  socketID: string;
  nickname: string;
  clientsCount: number;
}

declare interface TypeEnterSocket {
  clientsCount: number;
  users: any;
  socketId: string;
}

declare interface TypeEnterSocket {
  clientsCount: number;
  users: any;
  socketId: string;
}
