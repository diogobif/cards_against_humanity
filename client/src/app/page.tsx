// File: app/page.tsx (Frontend - Next.js App Router)
"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

const socket = io("http://localhost:3001");

export default function Home() {
  const [myId, setMyId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const peerRef = useRef<Peer>();
  const ROOM_ID: number = 1;

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setMyId(id);
    });

    socket.on("user-joined", (userId: string) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const call = peer.call(userId, stream);
          if (myVideoRef.current) myVideoRef.current.srcObject = stream;
          call.on("stream", (remoteStream) => addRemoteVideo(remoteStream));
        });
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (myVideoRef.current) myVideoRef.current.srcObject = stream;
          call.answer(stream);
          call.on("stream", (remoteStream) => addRemoteVideo(remoteStream));
        });
    });
  }, []);

  const joinRoom = () => {
    setJoined(true);
    socket.emit("join-room", ROOM_ID, myId);
  };

  const addRemoteVideo = (stream: MediaStream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    video.className = "w-full border";
    videoContainerRef.current?.appendChild(video);
  };

  return (
    <div className="p-4">
      <button type="button" onClick={joinRoom}>
        JOIN ROOM
      </button>
      <div className="grid grid-cols-2 gap-4 mt-6" ref={videoContainerRef}>
        <video ref={myVideoRef} autoPlay muted className="w-full border" />
      </div>
    </div>
  );
}
