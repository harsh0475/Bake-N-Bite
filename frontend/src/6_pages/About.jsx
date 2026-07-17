import { Link } from "react-router-dom";
import {
  ChefHat,
  Truck,
  BadgeCheck,
  HeartHandshake,
  Users,
  Clock3,
  Utensils,
  ArrowRight,
} from "lucide-react";

import Container from "../3_components/common/Container";
import Breadcrumb from "../3_components/common/Breadcrumb";
import PromoBanner from "../3_components/common/PromoBanner";
import Section from "../3_components/common/Section";
import SectionTitle from "../3_components/common/SectionTitle";
import Button from "../3_components/common/Button";

import FeatureCard from "../4_features/home/components/FeatureCard";

const stats = [
  { icon: Users, value: "5,000+", label: "Happy Customers" },
  { icon: Utensils, value: "50+", label: "Homemade Dishes" },
  { icon: Clock3, value: "3+", label: "Years Serving" },
  { icon: BadgeCheck, value: "4.9★", label: "Average Rating" },
];

const values = [
  {
    id: 1,
    icon: ChefHat,
    title: "Fresh Homemade Food",
    description:
      "Every dish is freshly prepared using quality ingredients and authentic homemade recipes, never mass-produced.",
  },
  {
    id: 2,
    icon: Truck,
    title: "Fast Local Delivery",
    description:
      "We deliver quickly across your neighbourhood so your food arrives fresh, warm and on time.",
  },
  {
    id: 3,
    icon: BadgeCheck,
    title: "Premium Quality",
    description:
      "We maintain high standards of hygiene, consistency and taste in every single order we prepare.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Made With Love",
    description:
      "Prepared with the same love and care as food made for our own family, every single day.",
  },
];

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="🍴 Our Story"
          title="About Bake N Bite"
          description="We started Bake N Bite with a simple idea: home-cooked food, made with real ingredients and real care, delivered fresh to your door."
          stats={[
            { value: "3+", label: "Years" },
            { value: "5,000+", label: "Customers" },
            { value: "4.9★", label: "Rating" },
          ]}
          className="mt-8"
        />
      </Container>

      {/* ====================================================== */}
      {/* Our Story */}
      {/* ====================================================== */}

      <Section spacing="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle
              badge="How We Started"
              title="Homemade Food, Made For Everyone"
            />

            <p className="text-base leading-7 text-gray-600">
              Bake N Bite began in a small home kitchen with a single goal —
              to bring the taste of real, homemade food to people who miss it
              most. What started with a handful of cakes and snacks for
              friends and neighbours has grown into a full menu of fresh
              bakes, momos, sandwiches, noodles and beverages.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600">
              We still cook the same way we did on day one — fresh
              ingredients, no shortcuts, and a lot of care in every order.
              Every dish is prepared to order and delivered quickly so it
              reaches you just the way it left our kitchen.
            </p>

            <div className="mt-8">
              <Link to="/products">
                <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                  Explore Our Menu
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-gray-900 sm:text-3xl">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ====================================================== */}
      {/* Our Values */}
      {/* ====================================================== */}

      <Section background="bg-orange-50/60" spacing="lg">
        <SectionTitle
          badge="Our Promise"
          title="Why Customers Choose Bake N Bite"
          subtitle="Fresh homemade meals, quality ingredients and reliable local delivery — every single time."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <FeatureCard key={value.id} {...value} />
          ))}
        </div>
      </Section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <Section spacing="lg">
        <div className="overflow-hidden rounded-[38px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-8 text-center shadow-2xl sm:p-14">
          <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            Hungry Already?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-orange-50 sm:text-base">
            Browse our full menu of freshly prepared homemade food and get it
            delivered straight to your doorstep.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-bold text-orange-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl"
            >
              Order Now
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/70 px-8 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </section>
  );
};

export default About;