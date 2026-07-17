import { ChefHat } from "lucide-react";

const LoadingSpinner = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-[32px] border border-orange-100 bg-white p-10 shadow-xl">

        <div className="relative">

          <div
            className="
              h-20
              w-20
              animate-spin
              rounded-full
              border-[6px]
              border-orange-100
              border-t-orange-500
            "
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <ChefHat
              size={30}
              className="text-orange-500"
            />
          </div>

        </div>

        <h2 className="mt-8 text-2xl font-black text-gray-900">
          Please wait
        </h2>

        <p className="mt-3 text-center text-gray-500">
          {text}
        </p>

      </div>
    </div>
  );
};

export default LoadingSpinner;