const Button = ({
  className = "bg-royal-blue-600",
  text,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-1 flex justify-center gap-x-2 text-white px-4 py-2 rounded hover:bg-royal-blue-700 active:bg-royal-blue-600`}
    >
      {text || children}
    </button>
  );
};

export default Button;
