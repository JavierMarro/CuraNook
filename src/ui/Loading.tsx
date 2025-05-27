import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Loading() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2>Loading contents...</h2>
      <div className="lottie-gif w-100 h-100">
        <DotLottieReact
          src="https://lottie.host/3c5a1f44-8bee-49fc-a0bb-c89698dbd088/YRwlnz4xaH.json"
          loop
          autoplay
        />
      </div>
    </section>
  );
}
