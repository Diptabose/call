import React from "react";
import { FaLock } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { Avatar, Button, IconButton } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";





// This thing will go in a draggable dialog
const CallPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-auto bg-black/85 text-white">
      <div className="flex justify-between relative h-10">
        <div className="w-full flex items-center justify-center text-xs gap-1 text-gray-300">
          <span>
            <FaLock />
          </span>
          <span>End-to-end encrypted</span>
        </div>
        <div className="absolute right-2">
          <IconButton>
            <PersonAddRoundedIcon className="text-white text-xl" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center sm:h-full sm:justify-center">
        <Avatar className="w-20 h-20"></Avatar>
        <div className="flex flex-col gap-1 items-center justify-center">
          <span className="text-xl">Didi 2</span>
          <span className="text-sm font-light text-stone-400">Ringing</span>
        </div>
      </div>
      <div className="flex justify-around items-center bg-blue-600/20 mt-auto py-4 rounded-t-lg sm:justify-center sm:gap-8 ">
        <IconButton>
          <VolumeUpRoundedIcon className="text-white text-xl" />
        </IconButton>
        <IconButton>
          <VideocamRoundedIcon className="text-white text-xl" />
        </IconButton>
        <IconButton>
          <MicOffRoundedIcon className="text-white text-xl" />
        </IconButton>
        <Button
          className="w-10 h-10 rounded-full bg-red-500"
          variant="contained"
        >
          <CallEndRoundedIcon />
        </Button>
      </div>
    </div>
  );
};

export default CallPage;
