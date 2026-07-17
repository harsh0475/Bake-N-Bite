// src/4_features/home/components/HeroSection.jsx
import {
  Users,
  Star,
  Clock3,
  UtensilsCrossed,
} from "lucide-react";

import Hero from "../../../3_components/common/hero/Hero";

const HeroSection = () => {
  const buttons = [
    {
      label: "Order Now",
      to: "/products",
      variant: "primary",
    },
    {
      label: "Browse Categories",
      to: "/categories",
      variant: "secondary",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Happy Customers",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
    },
    {
      icon: Clock3,
      value: "30 Min",
      label: "Delivery",
    },
    {
      icon: UtensilsCrossed,
      value: "50+",
      label: "Fresh Dishes",
    },
  ];

  return (
    <Hero
      badge="Fresh Homemade Food Everyday"
      title="Fresh"
      highlight="Homemade Food"
      subtitle="Cakes, Momos, Sandwiches, Noodles, Snacks and Beverages prepared fresh with love and delivered quickly to your doorstep."
      buttons={buttons}
      stats={stats}
      search
    />
  );
};

export default HeroSection;