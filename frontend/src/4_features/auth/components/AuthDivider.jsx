// src/4_features/auth/components/AuthDivider.jsx
const AuthDivider = ({ label = "OR" }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
};

export default AuthDivider;