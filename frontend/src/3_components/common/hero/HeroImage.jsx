// src/3_components/common/hero/HeroImage.jsx

import heroFood from "../../../2_assets/images/Cake 5.jpg";
import HeroFloatingCards from "./HeroFloatingCards";

const HeroImage = ({ floatingCards = true }) => {
  return (
    <div
      className="
        relative
        hidden

        lg:flex
        lg:items-start
        lg:justify-center

        lg:pt-2
      "
    >
      {/* Background Circle */}
      <div
        className="
          relative

          h-[360px]
          w-[360px]

          rounded-full
          bg-gradient-to-br
          from-orange-200
          via-orange-100
          to-white

          shadow-2xl

          xl:h-[460px]
          xl:w-[460px]
        "
      />

      {/* Food Image */}
      <div
        className="
          absolute

          top-1/2
          left-1/2

          flex
          -translate-x-1/2
          -translate-y-1/2

          h-[250px]
          w-[250px]

          items-center
          justify-center
          overflow-hidden

          rounded-full
          border-8
          border-white
          bg-white

          shadow-xl

          xl:h-[320px]
          xl:w-[320px]
        "
      >
        <img
          src={heroFood}
          alt="Homemade food from Bake N Bite"
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {floatingCards && (
        <HeroFloatingCards />
      )}
    </div>
  );
};

export default HeroImage;