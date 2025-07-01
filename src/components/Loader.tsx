import { CSSProperties } from "react";

const Loader = () => {
  return (
    <div className="p-4 text-center flex place-items-center gap-1.5 w-full justify-center">
      <span
        className="bg-indigo-600 size-3 animate-pulse"
        style={
          {
            "--i": 1,
            animationDelay: "calc(100ms*var(--i))",
          } as CSSProperties
        }
      ></span>
      <span
        className="bg-indigo-600 size-3 animate-pulse"
        style={
          {
            "--i": 2,
            animationDelay: "calc(100ms*var(--i))",
          } as CSSProperties
        }
      ></span>
      <span
        className="bg-indigo-600 size-3 animate-pulse"
        style={
          {
            "--i": 3,
            animationDelay: "calc(100ms*var(--i))",
          } as CSSProperties
        }
      ></span>
      <span
        className="bg-indigo-600 size-3 animate-pulse"
        style={
          {
            "--i": 4,
            animationDelay: "calc(100ms*var(--i))",
          } as CSSProperties
        }
      ></span>
    </div>
  );
};

export default Loader;
