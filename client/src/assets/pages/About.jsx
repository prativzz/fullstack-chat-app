const About = () => {
  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-md text-zinc-800 px-6 pt-24 pb-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">About Us</h1>
        <p className="text-base leading-relaxed text-zinc-700">
          Welcome to our chat app — a minimal, fast, and secure messaging platform designed to make communication effortless and elegant.
        </p>
        <p className="text-base leading-relaxed text-zinc-700">
          Inspired by iOS design, our interface focuses on simplicity and clarity, allowing you to connect with others in a distraction-free environment.
        </p>
        <p className="text-base leading-relaxed text-zinc-700">
          Built using the latest web technologies like React, Node, Tailwind, and Socket.IO, we ensure smooth real-time messaging and a delightful user experience.
        </p>
      </div>
    </div>
  );
};

export default About;
