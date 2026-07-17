import clsx from "clsx";

const AdminPage = ({
  children,
  className = "",
  fluid = false,
}) => {
  return (
    <div
      className={clsx(
        "w-full",
        fluid
          ? ""
          : "mx-auto max-w-7xl",
        className
      )}
    >
      <div className="space-y-8 lg:space-y-10">
        {children}
      </div>
    </div>
  );
};

export default AdminPage;