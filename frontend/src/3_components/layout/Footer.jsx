import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  Heart,
  ChefHat,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "Menu", path: "/products" },
    { title: "Categories", path: "/categories" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const categories = [
    "Cakes",
    "Momos",
    "Sandwiches",
    "Noodles",
    "Beverages",
  ];

  return (
    <footer className="mt-8 border-t border-orange-100 bg-orange-50 lg:mt-12">

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-2 xl:grid-cols-5">

        {/* ================= Brand ================= */}

        <div>

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
              <ChefHat size={26} />
            </div>

            <div>

              <h2 className="text-2xl font-black text-orange-500">
                Bake N Bite
              </h2>

              <p className="text-sm text-gray-500">
                Homemade with Love
              </p>

            </div>

          </div>

          <p className="leading-7 text-gray-600">
            Fresh homemade meals prepared with love and delivered quickly
            across your neighbourhood.
          </p>

          <div className="mt-6 flex gap-3">

            <a
              href="https://www.facebook.com/harshk.188/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-orange-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange-500
                hover:text-white
              "
            >
              <FaFacebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/harshit_kumar_singh_04/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-orange-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange-500
                hover:text-white
              "
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="mailto:harshksingh2004@gmail.com"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-orange-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange-500
                hover:text-white
              "
            >
              <Mail size={18} />
            </a>

          </div>

        </div>

        {/* ================= Quick Links ================= */}

        <div>

          <h3 className="mb-5 text-base font-bold text-gray-900">
            Quick Links
          </h3>

          <div className="space-y-3">

            {quickLinks.map((link) => (

              <Link
                key={link.title}
                to={link.path}
                className="
                  block
                  text-gray-600
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:text-orange-500
                "
              >
                {link.title}
              </Link>

            ))}

          </div>

        </div>

        {/* ================= Categories ================= */}

        <div>

          <h3 className="mb-5 text-base font-bold text-gray-900">
            Popular Categories
          </h3>

          <div className="space-y-3">

            {categories.map((category) => (

              <Link
                key={category}
                to="/products"
                className="
                  block
                  text-gray-600
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:text-orange-500
                "
              >
                {category}
              </Link>

            ))}

          </div>

        </div>

        {/* ================= Contact ================= */}

        <div>

          <h3 className="mb-5 text-base font-bold text-gray-900">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">

              <MapPin className="mt-1 text-orange-500" size={20} />

              <div>

                <p className="font-medium text-gray-900">
                  Kolkata, India
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Dumdum Cantonment 
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">

              <Phone className="text-orange-500" size={20} />

              <a
                href="tel:+918420029221"
                className="text-gray-600 hover:text-orange-500"
              >
                +91 8420029221
              </a>

            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">

              <Mail
                className="mt-1 shrink-0 text-orange-500"
                size={20}
              />

              <div className="min-w-0">

                <p className="font-medium text-gray-900">
                  Email
                </p>

                <a
                  href="mailto:harshksingh2004@gmail.com"
                  className="
                    break-all
                    text-sm
                    text-gray-500
                    transition
                    hover:text-orange-500
                  "
                >
                  harshksingh2004@gmail.com
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Hours ================= */}

        <div>

          <h3 className="mb-5 text-base font-bold text-gray-900">
            Opening Hours
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">

              <Clock3 className="mt-1 text-orange-500" size={20} />

              <div>

                <p className="font-semibold">
                  Monday – Saturday
                </p>

                <p className="text-sm text-gray-500">
                  10:00 AM – 8:00 PM
                </p>

              </div>

            </div>

            <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">

              <Clock3 className="mt-1 text-orange-500" size={20} />

              <div>

                <p className="font-semibold">
                  Sunday
                </p>

                <p className="text-sm text-gray-500">
                  10:00 AM – 10:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Bottom ================= */}

      <div className="border-t border-orange-200">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-sm text-gray-600 lg:flex-row lg:text-left">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-orange-500">
              Bake N Bite
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <Link
              to="/privacy-policy"
              className="hover:text-orange-500"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-orange-500"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/refund-policy"
              className="hover:text-orange-500"
            >
              Refund Policy
            </Link>

          </div>

          <div className="flex items-center gap-2">

            <span>Crafted with</span>

            <Heart
              size={16}
              fill="currentColor"
              className="text-red-500"
            />

            <span>for homemade food lovers.</span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;