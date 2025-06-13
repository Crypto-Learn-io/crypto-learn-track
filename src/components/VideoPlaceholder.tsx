import React from 'react';
import { GraduationCap, PlayCircle, Video } from "lucide-react";
import VideoEmbed from './VideoEmbed';

interface VideoPlaceholderProps {
  title?: string;
  icon?: "graduation" | "play" | "video";
  className?: string;
  videoId?: string;
}

const VideoPlaceholder = ({ 
  title = "Video Lecture",
  icon = "graduation",
  className = "",
  videoId
}: VideoPlaceholderProps) => {
  const iconMap = {
    graduation: <GraduationCap className="h-12 w-12 text-muted-foreground" />,
    play: <PlayCircle className="h-12 w-12 text-muted-foreground" />,
    video: <Video className="h-12 w-12 text-muted-foreground" />
  };

  // If videoId is provided, render the YouTube video
  if (videoId) {
    return <VideoEmbed videoId={videoId} title={title} />;
  }

  // Otherwise render the placeholder
  return (
    <div className={`aspect-video bg-muted rounded-lg flex flex-col items-center justify-center ${className}`}>
      {iconMap[icon]}
      <span className="mt-2 text-muted-foreground">{title}</span>
    </div>
  );
};

export default VideoPlaceholder;
