import clsx from "clsx";

const Container = ({
  children,
  className,

  size = "default",

  fluid = false,
}) => {

  const sizes = {

    xs: "max-w-3xl",

    sm: "max-w-5xl",

    default: "max-w-7xl",

    wide: "max-w-[1440px]",

    full: "max-w-full",

  };

  return (

    <div
      className={clsx(

        "w-full",

        !fluid && "mx-auto",

        "px-4",

        "sm:px-6",

        "lg:px-8",

        sizes[size],

        className

      )}
    >

      {children}

    </div>

  );

};

export default Container;