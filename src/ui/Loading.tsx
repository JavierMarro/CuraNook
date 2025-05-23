import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Loading() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2>Loading contents...</h2>
      <div className="lottie-gif w-100 h-100">
        <DotLottieReact
          src="https://lottie.host/81ec2187-ce6d-44f2-be90-b402a8b82b3b/qcekLszBvT.json"
          loop
          autoplay
        />
      </div>
    </section>
  );
}
