
import React from 'react';
import { GraduationCap, PlayCircle, Video } from "lucide-react";

interface VideoPlaceholderProps {
  title?: string;
  icon?: "graduation" | "play" | "video";
  className?: string;
}

const VideoPlaceholder = ({ 
  title = "Video Lecture",
  icon = "graduation",
  className = ""
}: VideoPlaceholderProps) => {
  const iconMap = {
    graduation: <GraduationCap className="h-12 w-12 text-muted-foreground" />,
    play: <PlayCircle className="h-12 w-12 text-muted-foreground" />,
    video: <Video className="h-12 w-12 text-muted-foreground" />
  };

  return (
    <div className={`aspect-video bg-muted rounded-lg flex flex-col items-center justify-center ${className}`}>
      {iconMap[icon]}
      <span className="mt-2 text-muted-foreground">{title}</span>
    </div>
  );
};

export default VideoPlaceholder;
