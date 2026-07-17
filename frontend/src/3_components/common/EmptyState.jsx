import {
  PackageSearch,
} from "lucide-react";

import Button from "./Button";

const EmptyState = ({
  title = "Nothing found",
  description = "There is nothing to display.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[34px] border border-orange-100 bg-white p-10 text-center shadow-xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
          <PackageSearch
            size={42}
            className="text-orange-500"
          />
        </div>

        <h2 className="mt-8 text-3xl font-black text-gray-900">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          {description}
        </p>

        {buttonText && (
          <div className="mt-10">
            <Button
              size="lg"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmptyState;