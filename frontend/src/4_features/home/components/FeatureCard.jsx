const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        h-full
        rounded-3xl
        border
        border-orange-100
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        lg:p-8
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-orange-100
          text-orange-500
          transition-all
          duration-300

          group-hover:bg-orange-500
          group-hover:text-white

          lg:h-16
          lg:w-16
        "
      >
        <Icon size={28} />
      </div>

      <h3
        className="
          mt-5
          text-xl
          font-black
          text-gray-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          leading-7
          text-gray-500
          lg:text-base
        "
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;