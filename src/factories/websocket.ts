import { websocketEndpoint } from 'config';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

export class WebSocket {
  client;

  constructor() {
    this.client = new W3CWebSocket(websocketEndpoint, 'echo-protocol');

    this.client.onerror = () => {
      console.log('Connection Error');
    };
  }
}
