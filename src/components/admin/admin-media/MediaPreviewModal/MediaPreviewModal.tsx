"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MediaPreviewModalProps } from "./MediaPreviewModal.types";
import { ImageIcon, Music, Video as VideoIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function MediaPreviewModal({ open, onOpenChange, item }: MediaPreviewModalProps) {
  if (!item) return null;

  const preventDefault = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-black flex flex-col border-none select-none [&>button]:hidden"
        onContextMenu={preventDefault}
      >
        <DialogHeader className="p-4 bg-white/95 border-b flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
              {item.type === "IMAGE" ? (
                <ImageIcon className="h-4 w-4 text-primary" />
              ) : item.type === "AUDIO" ? (
                <Music className="h-4 w-4 text-primary" />
              ) : (
                <VideoIcon className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <DialogTitle className="text-sm font-bold text-black truncate">{item.title}</DialogTitle>
              <span className="text-[10px] text-[#656A73] font-bold uppercase">
                {item.type} • {(item.sizeBytes / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#656A73]" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto flex items-center justify-center p-4" onContextMenu={preventDefault}>
          {item.type === "IMAGE" && item.url && (
            <div className="relative w-full h-full pointer-events-none">
              <Image src={item.url} alt={item.title} fill className="object-contain" unoptimized draggable={false} />
            </div>
          )}

          {item.type === "VIDEO" && item.url && (
            <video
              src={item.url}
              controls
              className="max-w-full max-h-full"
              autoPlay
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={preventDefault}
              disablePictureInPicture
            />
          )}

          {item.type === "AUDIO" && item.url && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md p-12 bg-white/5 rounded-2xl border border-white/10">
              <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Music className="h-16 w-16 text-primary" />
              </div>
              <audio
                src={item.url}
                controls
                className="w-full"
                autoPlay
                controlsList="nodownload"
                onContextMenu={preventDefault}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
