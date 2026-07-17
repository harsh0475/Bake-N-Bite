// src/3_components/common/hero/HeroContent.jsx

import { Star } from "lucide-react";

import HeroSearch from "./HeroSearch";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const HeroContent = ({
  badge,
  title,
  highlight,
  description,
  buttons = [],
  showSearch = false,
  stats = [],
}) => {
  return (
    <div className="flex h-full flex-col justify-start">

      {/* ================= Search ================= */}

      {showSearch && <HeroSearch />}

      {/* ================= Badge ================= */}

      {badge && (
        <div
          className="
            mt-4
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-orange-100
            bg-white
            px-5
            py-2
            shadow-sm
          "
        >
          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-500"
          />

          <span className="text-sm font-semibold text-orange-600">
            {badge}
          </span>
        </div>
      )}

      {/* ================= Heading ================= */}

      <h1
        className="
          mt-3
          text-4xl
          font-black
          leading-tight
          tracking-tight
          text-gray-900

          sm:text-5xl
          md:text-6xl
          xl:text-7xl
        "
      >
        {title}

        {highlight && (
          <span className="block text-orange-500">
            {highlight}
          </span>
        )}
      </h1>

      {/* ================= Description ================= */}

      {description && (
        <p
          className="
            mt-4
            max-w-xl
            text-base
            leading-7
            text-gray-600
            sm:text-lg
          "
        >
          {description}
        </p>
      )}

      {/* ================= Buttons ================= */}

      <HeroButtons buttons={buttons} />

      {/* ================= Stats ================= */}

      <HeroStats stats={stats} />
    </div>
  );
};

export default HeroContent;