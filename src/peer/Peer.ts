import { LogLevel, Peer, PeerError } from 'peerjs'



export class PeerService {

  peer!: Peer;

  public connect(id: string) {
    this.peer = new Peer(id, {
      debug: 3,
    });


    this.peer.on('open', this.handlePeerOpen)
    this.peer.on('error', this.handleError);

    return this.peer;
  }

  public handlePeerOpen(id: string) {
    console.log("The peer connected with id", id);
  }

  public handleError(err: Error) {
    console.log("The err is ", err.message);
  }


  public call(reciever_id: string) {

  }


  public disconnect() {
    this.peer.disconnect();
  }







}



