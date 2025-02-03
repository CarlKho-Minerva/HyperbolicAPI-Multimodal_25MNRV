import { useRef } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import SidePanel from "./components/side-panel/SidePanel";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import cn from "classnames";
import { useMediaStream } from "./hooks/useMediaStream";

const CONFIG = {
  API_KEY: process.env.REACT_APP_GEMINI_API_KEY as string,
  HOST: "generativelanguage.googleapis.com",
  get URI() {
    return `wss://${this.HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;
  }
} as const;

if (!CONFIG.API_KEY) {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

function VideoStream({ videoRef, videoStream }: {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoStream: MediaStream | null;
}) {
  return (
    <video
      className={cn("stream", {
        hidden: !videoRef.current || !videoStream,
      })}
      ref={videoRef}
      autoPlay
      playsInline
    />
  );
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoStream, setVideoStream } = useMediaStream();

  return (
    <div className="App">
      <LiveAPIProvider url={CONFIG.URI} apiKey={CONFIG.API_KEY}>
        <div className="streaming-console">
          <SidePanel />
          <main>
            <div className="main-app-area">
              <Altair />
              <VideoStream videoRef={videoRef} videoStream={videoStream} />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App;
