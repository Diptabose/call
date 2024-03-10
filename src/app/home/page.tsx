"use client";
import usePeer from "@/hooks/usePeer";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const {
    peer,
    call,
    callConnected,
    connected,
    isIncomingConnection,
    disconnectCall,
    liftCall,
  } = usePeer("");

  const [input, setInput] = useState("");



  const [mediaStream, setMediaStream] = useState<MediaStream>();


  /**
   * Initiate the call, start the media stream and set to state, so that when disconnected we can release the resources.
   * 
   * The call function returns the recievers media stream which we can set to the audio tag.
   * 
   * Typically this will also go in the dialog.
   */
  async function startCall() {
    console.log("The calling id is ", input);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMediaStream(mediaStream);
      const recieversMediaStream = await call(input, mediaStream);
      console.log(recieversMediaStream);

      ref.current!.srcObject = recieversMediaStream;
    } catch (err) {
      console.log("The err is ", err);
    }
  }


  /**
   * The answer is typically in the dialog. indicates the incoming connection.
   * While answering the recievers media stream is required to lift the call.
   * 
   */
  async function handleAnswer() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMediaStream(mediaStream);
      const stream = await liftCall(mediaStream);
      console.log("Im recieving stream from lift call SO Im reciever", stream);
      ref.current!.srcObject = stream;
    } catch (err) {
      console.log("Error occured in the handle Answer", err);
    }
  }


  /**
   * 
   */
  function cancelCall() {
    mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setMediaStream(undefined);
    disconnectCall();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="contained" onClick={startCall}>
        Place a call
      </Button>
      <audio ref={ref} autoPlay></audio>
      <span className="text-white">
        Peer connected: {connected ? "Connected" : "Disconnected"}
      </span>

      <TextField
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="text-white"
      />

      <Button onClick={cancelCall}>Cancel call</Button>
      {isIncomingConnection && <Button onClick={handleAnswer}>Answer</Button>}
    </div>
  );
};

export default Home;
