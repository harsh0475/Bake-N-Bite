import {
  Clock3,
  Truck,
  Flame,
  Heart,
} from "lucide-react";

const HeroFloatingCards = () => {

  return (

    <>

      {/* Delivery */}

      <div
        className="
          absolute
          left-0
          top-16
          rounded-3xl
          bg-white/90
          p-5
          shadow-2xl
          backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-orange-100 p-3">

            <Truck
              className="text-orange-500"
            />

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Delivery

            </p>

            <h3 className="font-bold">

              30 Minutes

            </h3>

          </div>

        </div>

      </div>

      {/* Fresh */}

      <div
        className="
          absolute
          right-0
          bottom-24
          rounded-3xl
          bg-white/90
          p-5
          shadow-2xl
          backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-green-100 p-3">

            <Clock3
              className="text-green-600"
            />

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Fresh

            </p>

            <h3 className="font-bold">

              Cooked Daily

            </h3>

          </div>

        </div>

      </div>

      {/* Bestseller */}

      <div
        className="
          absolute
          right-8
          top-8
          flex
          items-center
          gap-2
          rounded-full
          bg-red-500
          px-5
          py-3
          font-semibold
          text-white
          shadow-xl
        "
      >

        <Flame size={18} />

        Bestseller

      </div>

      {/* Homemade */}

      <div
        className="
          absolute
          left-12
          bottom-8
          flex
          items-center
          gap-2
          rounded-full
          bg-pink-500
          px-5
          py-3
          font-semibold
          text-white
          shadow-xl
        "
      >

        <Heart
          size={18}
          fill="white"
        />

        Homemade

      </div>

    </>

  );

};

export default HeroFloatingCards;