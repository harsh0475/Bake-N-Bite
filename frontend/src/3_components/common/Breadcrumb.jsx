import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const Breadcrumb = ({
  items,
}) => {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">

      {items.map(
        (item, index) => (

          <div
            key={item.label}
            className="flex items-center gap-2"
          >

            {index !== 0 && (
              <ChevronRight
                size={16}
                className="text-gray-400"
              />
            )}

            {item.href ? (

              <Link
                to={item.href}
                className="text-gray-500 hover:text-orange-500"
              >
                {item.label}
              </Link>

            ) : (

              <span className="font-semibold text-orange-500">
                {item.label}
              </span>

            )}

          </div>

        )
      )}

    </nav>
  );
};

export default Breadcrumb;