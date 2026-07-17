const HeroBackground = () => {
  return (
    <>
      {/* Main Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

      {/* Large Blur */}

      <div className="absolute -left-36 top-0 h-[420px] w-[420px] rounded-full bg-orange-300/25 blur-3xl" />

      <div className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-orange-200/20 blur-3xl" />

      {/* Decorative Circles */}

      <div className="absolute left-20 top-32 h-4 w-4 rounded-full bg-orange-400/60" />

      <div className="absolute right-40 top-48 h-3 w-3 rounded-full bg-yellow-400/70" />

      <div className="absolute left-1/3 bottom-24 h-5 w-5 rounded-full bg-orange-300/40" />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(#f97316_1px,transparent_1px),linear-gradient(90deg,#f97316_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />
    </>
  );
};

export default HeroBackground;