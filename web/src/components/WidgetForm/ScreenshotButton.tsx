import html2canvas from "html2canvas";
import { Camera } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string) => void;
}

export function ScreenshotButton({ onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);

    setIsTakingScreenshot(false);
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="
            p-2 bg-zinc-800 rounded-md border-transparent
            hover:bg-zinc-700 transition-colors  focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-offset-zinc-900
            focus:ring-brand-500
    "
    >
      {/* <Camera className="w-6 h-6 text-zinc-100 " /> */}
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100 " />
      )}
    </button>
  );
}
