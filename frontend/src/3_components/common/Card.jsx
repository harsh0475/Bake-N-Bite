import clsx from "clsx";

const Card = ({
  children,

  className,

  hover = false,
  clickable = false,

  padding = "md",
  shadow = "sm",

  border = true,

  ...props
}) => {
  const paddings = {
    none: "",

    sm: "p-4",

    md: "p-6",

    lg: "p-8",
  };

  const shadows = {
    none: "",

    sm: "shadow-sm",

    md: "shadow-md",

    lg: "shadow-xl",
  };

  return (
    <div
      className={clsx(
        "rounded-3xl",
        "bg-white",

        border && "border border-orange-100",

        paddings[padding],

        shadows[shadow],

        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",

        clickable &&
          "cursor-pointer active:scale-[0.99]",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "mb-6 flex items-center justify-between",
      className
    )}
  >
    {children}
  </div>
);

const Title = ({
  children,
  className,
}) => (
  <h3
    className={clsx(
      "text-xl font-bold text-gray-900",
      className
    )}
  >
    {children}
  </h3>
);

const Description = ({
  children,
  className,
}) => (
  <p
    className={clsx(
      "mt-2 text-sm leading-6 text-gray-500",
      className
    )}
  >
    {children}
  </p>
);

const Content = ({
  children,
  className,
}) => (
  <div className={clsx(className)}>
    {children}
  </div>
);

const Footer = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "mt-6 flex items-center justify-between",
      className
    )}
  >
    {children}
  </div>
);

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
Card.Footer = Footer;

export default Card;