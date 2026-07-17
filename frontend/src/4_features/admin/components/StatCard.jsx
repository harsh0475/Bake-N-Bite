const StatCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-orange-500">
        {value}
      </h2>

    </div>
  );
};

export default StatCard;