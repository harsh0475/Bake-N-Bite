import clsx from "clsx";
import Container from "./Container";

const Section = ({
  children,
  className,
  background = "transparent",
  container = true,
  spacing = "lg",
}) => {
  const spacings = {
    none: "",

    sm: "py-8 lg:py-10",

    md: "py-10 lg:py-14",

    lg: "py-12 lg:py-16",

    xl: "py-14 lg:py-20",

    hero: "py-8 lg:py-16",
  };

  const content = container ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      className={clsx(
        spacings[spacing],
        background,
        className
      )}
    >
      {content}
    </section>
  );
};

export default Section;