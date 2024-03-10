import Peer, { MediaConnection, PeerError } from 'peerjs';
import React, { useEffect, useState } from 'react'



type PeerErrorString = "disconnected" | "browser-incompatible" | "invalid-id" | "invalid-key" | "network" | "peer-unavailable" | "ssl-unavailable" | "server-error" | "socket-error" | "socket-closed" | "unavailable-id" | "webrtc"

const usePeer = (id: string) => {


    const [peer, setPeer] = useState<Peer>();
    const [audioStream, setAudioStream] = useState<MediaStream>();
    const [connected, setConnected] = useState<boolean>(false);

    const [mediaConnection, setMediaConnection] = useState<MediaConnection>();
    const [isIncomingConnection, setIncomingConnection] = useState<boolean>(false);

    const [callConnected, setCallConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!connected) {
            import("peerjs").then(({ default: Peer }) => {
                const peer = new Peer(id);
                peer.on('open', handlePeerOpen);
                peer.on('error', handlePeerError);
                peer.on('call', handleIncommingCall);
                setPeer(peer);
            });
        }
    }, [id, connected]);


    function handleIncommingCall(call: MediaConnection) {
        setMediaConnection(call);
        setIncomingConnection(true);
    }


    function liftCall(stream: MediaStream): Promise<MediaStream> {

        return new Promise((resolve, reject) => {
            mediaConnection?.answer(stream);
            mediaConnection?.on('stream', (otherStream) => {
                setCallConnected(true);
                resolve(otherStream)
            })
            mediaConnection?.on('error', (err) => {
                reject(err);
            })
        })
    }

    function call(reciver_id: string, stream: MediaStream): Promise<MediaStream> {

        return new Promise((resolve, reject) => {
            const recieverConnection = peer?.call(reciver_id, stream);
            setMediaConnection(recieverConnection);
            recieverConnection?.on('stream', (stream: MediaStream) => {
                setCallConnected(true);
                resolve(stream);
            });
            recieverConnection?.on('error', (err) => {
                reject(err);
            });
        });
    }


    /**
     * Show on when call dial up and when connected.
     * 
     * When connected Start the timer. And store it, for both members.
     * The connection can be known from the resolve(stream) thats the momemt where both gets connected.
     */
    function disconnectCall() {
        mediaConnection?.close();
    }



    function handlePeerOpen(id: string) {
        console.log("The peer connected to ", id);
        setConnected(true);
    }

    function handlePeerError(error: PeerError<PeerErrorString>) {
        console.log("The error is ", error.type);
        switch (error.type) {
            case "peer-unavailable":
                return "Peer Unavaliable"
            case "disconnected":
                setConnected(false);
                break;
        }
    }
    return { peer, connected, audioStream, call, disconnectCall, isIncomingConnection, liftCall, callConnected };
}

export default usePeer;