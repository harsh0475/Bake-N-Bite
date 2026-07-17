import {
  ChefHat,
  Truck,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    icon: ChefHat,
    title: "Fresh Homemade Food",
    description:
      "Every meal is freshly prepared using quality ingredients and authentic homemade recipes.",
  },
  {
    id: 2,
    icon: Truck,
    title: "Fast Local Delivery",
    description:
      "Fresh food delivered quickly across your local area while it's still hot and delicious.",
  },
  {
    id: 3,
    icon: BadgeCheck,
    title: "Premium Quality",
    description:
      "We maintain high standards of hygiene, consistency and taste in every order.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Made With Love",
    description:
      "Prepared with the same love and care as food made for our own family.",
  },
];

const WhyChooseUs = () => {
  return (
    <Section background="bg-orange-50/60" spacing="lg">
      <SectionTitle
        badge="Our Promise"
        title="Why Customers Choose Bake N Bite"
        subtitle="Fresh homemade meals, quality ingredients and reliable local delivery."
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
        {features.map((feature) => (
          <div
            key={feature.id}
            className="min-w-[280px] snap-center"
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>

      {/* Desktop */}

      <div
        className="
          hidden
          gap-6
          lg:grid
          lg:grid-cols-2
          xl:grid-cols-4
        "
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            {...feature}
          />
        ))}
      </div>
    </Section>
  );
};

export default WhyChooseUs;