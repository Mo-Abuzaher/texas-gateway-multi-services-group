import { useEffect, useRef, useState } from "react";

interface SeamlessVideoProps {
  src: string;
  poster?: string;
  className?: string;
  id?: string;
}

export default function SeamlessVideo({ src, poster, className = "", id }: SeamlessVideoProps) {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // React state to control the JSX styles / opacity crossfade
  const [activeVideo, setActiveVideo] = useState<"A" | "B" | "idle">("idle");

  // Keep a mutable ref of the state so event listeners can read the fresh value instantly without re-binding
  const activeVideoRef = useRef<"A" | "B" | "idle">("idle");
  activeVideoRef.current = activeVideo;

  useEffect(() => {
    const videoA = videoRefA.current;
    const videoB = videoRefB.current;

    if (!videoA || !videoB) return;

    let isTransitioning = false;
    let transitionTimeout: NodeJS.Timeout | null = null;

    // Reset loop state to A
    setActiveVideo("A");

    // Setup initial playback parameters
    videoA.currentTime = 0;
    videoA.muted = true;
    videoA.playsInline = true;
    videoA.load();

    videoB.currentTime = 0;
    videoB.muted = true;
    videoB.playsInline = true;

    const startPlay = async () => {
      try {
        await videoA.play();
      } catch (err) {
        console.warn("Autoplay was prevented by browser security policies:", err);
      }
    };
    startPlay();

    // The crossfade transition duration overlapping boundary (0.8s offers a clean overlap)
    const crossfadeTime = 0.8;

    const transitionToB = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Start playing Video B in background
      videoB.currentTime = 0;
      videoB.play()
        .then(() => {
          // Switch opacity to B
          setActiveVideo("B");

          transitionTimeout = setTimeout(() => {
            // Once crossfade is complete, pause and reset A
            videoA.pause();
            videoA.currentTime = 0;
            isTransitioning = false;
          }, crossfadeTime * 1000);
        })
        .catch((err) => {
          console.error("Failed to start Video B playback:", err);
          isTransitioning = false;
        });
    };

    const transitionToA = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // Start playing Video A in background
      videoA.currentTime = 0;
      videoA.play()
        .then(() => {
          // Switch opacity to A
          setActiveVideo("A");

          transitionTimeout = setTimeout(() => {
            // Once crossfade is complete, pause and reset B
            videoB.pause();
            videoB.currentTime = 0;
            isTransitioning = false;
          }, crossfadeTime * 1000);
        })
        .catch((err) => {
          console.error("Failed to start Video A playback:", err);
          isTransitioning = false;
        });
    };

    const handleTimeUpdateA = () => {
      if (activeVideoRef.current !== "A" || isTransitioning) return;
      const duration = videoA.duration;
      if (!duration) return;

      if (videoA.currentTime >= duration - crossfadeTime) {
        transitionToB();
      }
    };

    const handleTimeUpdateB = () => {
      if (activeVideoRef.current !== "B" || isTransitioning) return;
      const duration = videoB.duration;
      if (!duration) return;

      if (videoB.currentTime >= duration - crossfadeTime) {
        transitionToA();
      }
    };

    const handleEndedA = () => {
      if (activeVideoRef.current === "A" && !isTransitioning) {
        transitionToB();
      }
    };

    const handleEndedB = () => {
      if (activeVideoRef.current === "B" && !isTransitioning) {
        transitionToA();
      }
    };

    videoA.addEventListener("timeupdate", handleTimeUpdateA);
    videoB.addEventListener("timeupdate", handleTimeUpdateB);
    videoA.addEventListener("ended", handleEndedA);
    videoB.addEventListener("ended", handleEndedB);

    return () => {
      videoA.removeEventListener("timeupdate", handleTimeUpdateA);
      videoB.removeEventListener("timeupdate", handleTimeUpdateB);
      videoA.removeEventListener("ended", handleEndedA);
      videoB.removeEventListener("ended", handleEndedB);

      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }

      videoA.pause();
      videoB.pause();
    };
  }, [src]);

  const activeOpacityA = activeVideo === "A" || activeVideo === "idle" ? 1 : 0;
  const activeOpacityB = activeVideo === "B" ? 1 : 0;

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center"
      id={id}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      <video
        ref={videoRefA}
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={poster}
        className={`${className} transition-opacity duration-1000 ease-in-out absolute inset-0 w-full h-full object-cover`}
        style={{ opacity: activeOpacityA }}
      />
      <video
        ref={videoRefB}
        src={src}
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className={`${className} transition-opacity duration-1000 ease-in-out absolute inset-0 w-full h-full object-cover`}
        style={{ opacity: activeOpacityB }}
      />
    </div>
  );
}
