"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/types";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  callType: "voice" | "video";
  user: User;
}

export function CallModal({ isOpen, onClose, callType, user }: CallModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "voice");
  const [callStatus, setCallStatus] = useState<"ringing" | "answered">(
    "ringing"
  );

  // Simulate call being answered after a few seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setCallStatus("answered"), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setCallStatus("ringing");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {callType === "video" ? "Video Call" : "Voice Call"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {callStatus === "ringing" ? "Ringing..." : "Connected"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-8">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="avatar"/>
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-semibold">{user.name}</h3>

          {callType === "video" && callStatus === "answered" && (
             <div className="relative h-48 w-full overflow-hidden rounded-lg bg-secondary">
               <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground">Remote Video</p>
                {isVideoOff ? (
                    <div className="flex h-full w-full items-center justify-center bg-black">
                        <VideoOff className="h-12 w-12 text-white" />
                    </div>
                ) : (
                    <img src="https://placehold.co/400x300.png" alt="Remote video feed" className="h-full w-full object-cover" data-ai-hint="person talking" />
                )}
             </div>
          )}
        </div>
        <div className="flex justify-center gap-4 rounded-full bg-secondary p-3">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            className="rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          {callType === "video" && (
            <Button
              variant={isVideoOff ? "destructive" : "outline"}
              size="icon"
              className="rounded-full"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
          )}
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full"
            onClick={handleClose}
          >
            <PhoneOff />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
