const OfferBanner = () => {
  return (
    <section className="bg-orange-500 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl font-bold text-white">
          Flat 20% OFF
        </h2>

        <p className="mt-4 text-lg text-orange-100">
          On your first order from Bake N Bite.
        </p>

        <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-orange-500 transition hover:bg-orange-100">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default OfferBanner;