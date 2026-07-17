// src/3_components/common/hero/Hero.jsx

import Container from "../Container";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = ({
  badge,
  title,
  highlight,
  subtitle,
  buttons,
  stats,
  search = false,
  image = true,
  floatingCards = true,
  minHeight = "",
  className = "",
}) => {
  return (
    <section
      className={`
        relative
        overflow-hidden
        ${className}
      `}
    >
      <HeroBackground />

      <Container>
        <div
          className={`
            relative
            grid
            grid-cols-1
            items-start
            gap-8
            pt-2
            pb-2

            lg:grid-cols-2
            lg:gap-10
            lg:pt-4
            lg:pb-4

            ${minHeight}
          `}
        >
          <HeroContent
            badge={badge}
            title={title}
            highlight={highlight}
            description={subtitle}
            buttons={buttons}
            showSearch={search}
            stats={stats}
          />

          {image && (
            <HeroImage
              floatingCards={floatingCards}
            />
          )}
        </div>
      </Container>

      <svg
        className="absolute bottom-0 left-0 w-full translate-y-[70%] pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96L1440,160L0,160Z"
        />
      </svg>
    </section>
  );
};

export default Hero;