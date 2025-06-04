import { Toaster } from "react-hot-toast";

interface ToasterComponentProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  duration?: number;
}

export function ToasterComponent({
  position = "top-right",
  duration = 3000,
}: ToasterComponentProps) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
}
