import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Error() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2>Oh no! Something went wrong...</h2>
      <div className="lottie-gif w-100 h-100">
        <DotLottieReact
          src="https://lottie.host/50594a3b-9c7c-4290-9c45-5113483f355f/gaIcfqDTsZ.json"
          loop
          autoplay
        />
      </div>
    </section>
  );
}
