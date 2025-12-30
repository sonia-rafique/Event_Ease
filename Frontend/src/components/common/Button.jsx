const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled }) => {
  const baseStyle = "px-5 py-2.5 rounded-lg font-bold transition duration-300 shadow-md transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-primary/50",
    secondary: "bg-secondary text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-secondary/50",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-300/50",
    outline: "bg-transparent border border-primary text-primary hover:bg-indigo-50 shadow-none",
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;