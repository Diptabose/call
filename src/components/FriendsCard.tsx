import {
  Avatar,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import CallRoundedIcon from "@mui/icons-material/CallRounded";

const FriendsCard = () => {
  return (
    <Card className="bg-gray-800 flex items-center justify-between text-white font-light cursor-pointer hover:bg-gray-600 transition-[background-color] duration-500">
      <CardContent className="flex items-center p-0 pl-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8" />
          <span >Bose</span>
        </div>
      </CardContent>
      <CardActions>
        <IconButton className="text-green-500">
          <CallRoundedIcon className="text-green-500" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FriendsCard;
