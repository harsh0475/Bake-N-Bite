// src/6_pages/Contact.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

import Container from "../3_components/common/Container";
import Breadcrumb from "../3_components/common/Breadcrumb";
import PromoBanner from "../3_components/common/PromoBanner";
import Button from "../3_components/common/Button";
import AuthInput from "../4_features/auth/components/AuthInput";

import { sendContactMessage } from "../4_features/contact/api/contactApi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    lines: ["Kolkata, India", "Dumdum Cantonment • Dumdum • Airport"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 8420029221"],
    href: "tel:+918420029221",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["harshksingh2004@gmail.com"],
    href: "mailto:harshksingh2004@gmail.com",
  },
  {
    icon: Clock3,
    title: "Opening Hours",
    lines: ["Mon – Sat: 10:00 AM – 8:00 PM", "Sunday: 10:00 AM – 10:00 PM"],
  },
];

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormError("");

    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const getErrorMessage = (error, fallback) => {
    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail[0]?.msg || fallback;
    }

    if (typeof detail === "string") {
      return detail;
    }

    return fallback;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (form.message.trim().length < 10) {
      setFormError("Please write a message with at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await sendContactMessage(form);

      toast.success(response.message || "Message sent successfully.");
      setForm(emptyForm);
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to send your message."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="💬 We'd Love To Hear From You"
          title="Get In Touch"
          description="Questions about an order, feedback on our food, or just want to say hi? Reach out and our team will get back to you soon."
          stats={[
            { value: "< 24h", label: "Response Time" },
            { value: "7 Days", label: "We're Here" },
          ]}
          className="mt-8"
        />

        {/* ====================================================== */}
        {/* Details + Form */}
        {/* ====================================================== */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
          {/* Left — Contact Details */}

          <div className="space-y-5">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-black text-gray-900">
                      {detail.title}
                    </h3>

                    {detail.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-gray-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );

              return detail.href ? (
                <a key={detail.title} href={detail.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={detail.title}>{content}</div>
              );
            })}

            {/* Socials */}

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-black text-gray-900">Follow Us</h3>

              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/harshk.188/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <FaFacebook size={18} />
                </a>

                <a
                  href="https://www.instagram.com/harshit_kumar_singh_04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-orange-100 bg-white p-4 shadow-md sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
                Send Us A Message
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Fill out the form below and we'll respond as soon as we can.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <AuthInput
                label="Full Name"
                name="name"
                icon={User}
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />

              <AuthInput
                label="Email"
                name="email"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <AuthInput
                label="Phone (Optional)"
                name="phone"
                icon={Phone}
                value={form.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />

              <AuthInput
                label="Subject"
                name="subject"
                icon={MessageSquare}
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {formError && (
              <p className="mt-5 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                {formError}
              </p>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                size="lg"
                fullWidth
                loading={submitting}
                rightIcon={!submitting && <Send size={18} />}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Contact;