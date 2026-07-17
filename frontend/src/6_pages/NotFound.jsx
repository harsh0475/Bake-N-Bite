import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-7xl font-bold text-orange-500">
        404
      </h1>

      <p className="text-gray-600">
        Page Not Found
      </p>

      <Link
        to="/"
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;