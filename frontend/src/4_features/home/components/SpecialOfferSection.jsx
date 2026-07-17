import {
  ChefHat,
  Truck,
  Heart,
} from "lucide-react";

import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";
import OfferCard from "./OfferCard";

const offers = [
  {
    id: 1,
    icon: ChefHat,
    badge: "Fresh Daily",
    title: "Homemade Goodness",
    description:
      "Freshly prepared every day using quality ingredients and authentic homemade recipes.",
  },
  {
    id: 2,
    icon: Truck,
    badge: "Fast Delivery",
    title: "Quick Service",
    description:
      "Fresh meals delivered hot and safely across your nearby locality.",
  },
  {
    id: 3,
    icon: Heart,
    badge: "Made With Love",
    title: "Family Recipes",
    description:
      "Prepared with care, love and recipes trusted by generations.",
  },
];

const SpecialOfferSection = () => {
  return (
    <Section
      background="bg-white"
      spacing="lg"
    >
      <SectionTitle
        badge="Why Bake N Bite"
        title="Why You'll Love Bake N Bite"
        subtitle="Fresh ingredients, homemade recipes and quick delivery for every order."
      />

      {/* Mobile */}

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-3
          scrollbar-hide
          snap-x
          snap-mandatory

          lg:hidden
        "
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="min-w-[280px] snap-center"
          >
            <OfferCard {...offer} />
          </div>
        ))}
      </div>

      {/* Desktop */}

      <div
        className="
          hidden
          gap-6
          lg:grid
          lg:grid-cols-3
        "
      >
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            {...offer}
          />
        ))}
      </div>
    </Section>
  );
};

export default SpecialOfferSection;