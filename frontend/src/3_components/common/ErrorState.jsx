import {
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

import Button from "./Button";

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred.",
  onRetry,
}) => {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[34px] border border-red-100 bg-white p-10 shadow-xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            size={42}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-8 text-center text-3xl font-black text-gray-900">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center leading-7 text-gray-500">
          {description}
        </p>

        {onRetry && (
          <div className="mt-10 flex justify-center">
            <Button
              leftIcon={<RotateCcw size={18} />}
              onClick={onRetry}
            >
              Try Again
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ErrorState;