const AdminPageContainer = ({ children }) => {
  return (
    <section
      className="
        min-h-full

        rounded-[38px]

        bg-gradient-to-b
        from-orange-50/80
        via-white
        to-orange-50/70
      "
    >
      <div
        className="
          mx-auto

          max-w-7xl

          px-3
          py-4

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        {children}
      </div>
    </section>
  );
};

export default AdminPageContainer;