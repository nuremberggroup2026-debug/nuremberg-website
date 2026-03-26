

export default function GradientDivider() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

      <div className="absolute w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rotate-[25deg] blur-3xl"></div>

      <div className="relative z-10 w-32 h-[1px] bg-cyan-500/40"></div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}