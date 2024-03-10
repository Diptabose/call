import Peer, { MediaConnection, PeerError, PeerErrorType } from 'peerjs';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'



type PeerErrorString = "disconnected" | "browser-incompatible" | "invalid-id" | "invalid-key" | "network" | "peer-unavailable" | "ssl-unavailable" | "server-error" | "socket-error" | "socket-closed" | "unavailable-id" | "webrtc"

const usePeer = (id: string) => {


    const [peer, setPeer] = useState<Peer>();
    const [audioStream, setAudioStream] = useState<MediaStream>();
    const [connected, setConnected] = useState<boolean>(false);

    const [mediaConnection, setMediaConnection] = useState<MediaConnection>();
    const [incomingMediaConnection, setIncomingMediaConnection] = useState<MediaConnection>();

    const [isIncomingConnection, setIncomingConnection] = useState<boolean>(false);

    useEffect(() => {
        if (!connected) {
            console.log("Inside effect ", id);
            import("peerjs").then(({ default: Peer }) => {
                const peer = new Peer(id);
                peer.on('open', handlePeerOpen);
                peer.on('error', handlePeerError);
                setPeer(peer);
            });
        }
    }, [id, connected]);


    function handleIncommingCall(call: MediaConnection) {

    }


    function liftCall(stream: MediaStream) {
        incomingMediaConnection?.answer(stream);
    }

    function call(reciver_id: string, stream: MediaStream): Promise<MediaStream> {

        return new Promise((resolve, reject) => {
            const recieverConnection = peer?.call(reciver_id, stream, {
                metadata: {
                    purpose: "Test call",
                    data: "Helloworld"
                }
            });

            setMediaConnection(recieverConnection);

            recieverConnection?.on('stream', (stream: MediaStream) => {
                resolve(stream);
            });
            recieverConnection?.on('error', (err) => {
                reject(err);
            });


        });
    }


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
    return { peer, connected, audioStream, call, disconnectCall, isIncomingConnection, liftCall };
}

export default usePeer