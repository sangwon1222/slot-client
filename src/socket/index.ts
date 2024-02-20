import { useSocketStore } from '@/store/socket';
import { Socket, io } from 'socket.io-client';
import { useChatStore } from '@/store/chat';
import App from '@/app/app';

const isProduct = process.env.NODE_ENV === 'production';
console.log(isProduct ? 'http://cuberoom.kr' : 'localhost:4000');

export class SocketIo {
  private socket: Socket;

  constructor() {
    this.socket = io(isProduct ? 'http://cuberoom.kr' : 'localhost:4000', {
      withCredentials: isProduct,
      extraHeaders: { 'my-custom-header': 'abcd' },
    });
  }

  async init() {
    this.socket.on('connect', () => {
      if (!isProduct) console.log('socket-connect');
    });

    this.socket.on('enter', ({ clientsCount, socketId }: TypeEnterSocket) => {
      useChatStore.concurrentUsers = clientsCount;
      useSocketStore.socketID = socketId;
      this.emit('income', { nickname: useSocketStore.nickname });
    });

    this.socket.on('income', ({ socketID, nickname, clientsCount }: TypeClientsCount) => {
      useChatStore.concurrentUsers = clientsCount;
    });

    this.socket.on('send-chat', ({ userID, chat, level }: { userID: string; chat: string; level: number }) => {
      useChatStore.chatting.push({ userID, chat, level });
    });

    this.socket.on('stop-bet', (status) => {
      console.log(status);
    });

    this.socket.on('leave', ({ clientsCount }: TypeClientsCount) => {
      useChatStore.concurrentUsers = clientsCount;
      console.log('나갔다');
    });
  }
  async close() {
    this.socket.close();
    this.socket.disconnect();
  }

  emit(eventName: string, args?: any) {
    this.socket.emit(eventName, { ...args });
  }
}
