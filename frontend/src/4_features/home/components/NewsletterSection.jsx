// src/4_features/home/components/NewsletterSection.jsx
import {
  Mail,
  Bell,
} from "lucide-react";

import { useState } from "react";

import { toast } from "react-toastify";

import Container from "../../../3_components/common/Container";
import Button from "../../../3_components/common/Button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-20">
      <Container size="sm">
        <div
          className="
            relative
            overflow-hidden
            rounded-[34px]

            bg-gradient-to-r
            from-orange-500
            via-orange-400
            to-amber-400

            p-6

            shadow-2xl

            sm:p-10
          "
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />

          <div className="relative rounded-[26px] bg-white p-6 sm:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Left */}

              <div>
                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-100
                  "
                >
                  <Bell size={30} className="text-orange-500" />
                </div>

                <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
                  Stay Updated
                </h2>

                <p className="mt-4 leading-8 text-gray-600">
                  Subscribe to receive updates about new menu items,
                  festive specials, exclusive offers and local delivery
                  announcements.
                </p>
              </div>

              {/* Right */}

              <form
                onSubmit={handleSubscribe}
                className="space-y-4"
              >
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-200
                      py-4
                      pl-14
                      pr-4

                      outline-none

                      transition

                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;