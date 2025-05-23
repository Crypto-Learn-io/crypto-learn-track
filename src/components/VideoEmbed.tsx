
import React from "react";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId, title }) => {
  return (
    <div className="video-container mb-6">
      <div className="aspect-video rounded-lg overflow-hidden border border-slate-200">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        ></iframe>
      </div>
      {title && <p className="mt-2 text-sm text-muted-foreground">{title}</p>}
    </div>
  );
};

export default VideoEmbed;
