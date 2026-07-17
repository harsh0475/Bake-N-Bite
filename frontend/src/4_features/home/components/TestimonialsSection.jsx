import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review:
      "The cakes were incredibly fresh and delicious. My entire family loved them. Highly recommended!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 5,
    review:
      "The momos arrived hot and tasted amazing. Delivery was quick and the packaging was excellent.",
  },
  {
    id: 3,
    name: "Anjali Singh",
    rating: 5,
    review:
      "Homemade food just like home. Everything was hygienic, fresh and full of flavour.",
  },
];

const TestimonialsSection = () => {
  return (
    <Section background="bg-white" spacing="lg">
      <SectionTitle
        badge="Testimonials"
        title="What Our Customers Say"
        subtitle="Real experiences shared by our happy customers."
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
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="min-w-[300px] snap-center"
          >
            <TestimonialCard {...testimonial} />
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
          xl:grid-cols-3
        "
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
          />
        ))}
      </div>
    </Section>
  );
};

export default TestimonialsSection;