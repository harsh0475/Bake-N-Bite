import Button from "../../../3_components/common/Button";

const AdminSectionHeader = ({
  title,
 description,
  badge,
  actionText,
  actionIcon,
  actionVariant = "outline",
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`
        mb-8
        flex
        flex-col
        gap-5

        lg:flex-row
        lg:items-center
        lg:justify-between

        ${className}
      `}
    >
      <div>
        <h2 className="text-2xl font-black text-gray-900 lg:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm leading-7 text-gray-500 lg:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {badge && (
          <span
            className="
              rounded-full
              bg-orange-100
              px-4
              py-2
              text-sm
              font-bold
              text-orange-600
            "
          >
            {badge}
          </span>
        )}

        {actionText && (
          <Button
            variant={actionVariant}
            leftIcon={actionIcon}
            onClick={onAction}
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminSectionHeader;