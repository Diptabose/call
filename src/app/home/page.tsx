"use client";
import usePeer from "@/hooks/usePeer";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

const Home = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const {
    peer,
    call,
    connected,
    isIncomingConnection,
    disconnectCall,
    liftCall,
  } = usePeer("t235r478734054567ty");

  console.log("The connected status is ", connected);
  async function startCall() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recieversMediaStream = await call(
        "qrwyehgfdwetrhjh56",
        mediaStream
      );
      ref.current!.srcObject = recieversMediaStream;
    } catch (err) {
      console.log("The err is ", err);
    }
  }

  async function handleAnswer() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      liftCall(mediaStream);
    } catch (err) {
      console.log("Error occured in the handle Answer", err);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="contained" onClick={startCall}>
        Place a call
      </Button>
      <audio ref={ref} autoPlay></audio>
      <span className="text-white">
        Peer connected: {connected ? "Connected" : "Disconnected"}
      </span>

      {isIncomingConnection && <Button onClick={handleAnswer}>Answer</Button>}
    </div>
  );
};

export default Home;
