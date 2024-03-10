"use client";

import { Button } from "@mui/material";
import React from "react";

const SettingsPage = () => {
  function getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(speechSynthesis.getVoices());
      }, 200);
    });
  }

  async function speak() {
    const voices = await getVoices();

    console.log("The voices are" , voices);
    let utterance = new SpeechSynthesisUtterance(
      "The person you are speaking with has put your call on hold. Please stay online."
    );

    utterance.voice = voices[2];
  
    speechSynthesis.speak(utterance);
   

    utterance.onend = () => {
      speak();
    };
  }

  return (
    <div>
      Settings Page
      <Button onClick={speak}>Speak</Button>
    </div>
  );
};

export default SettingsPage;
