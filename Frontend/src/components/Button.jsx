const Button = ({ children, onClick, loading, disabled, variant = 'primary', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`btn btn-${variant} ${loading ? 'btn-loading' : ''}`}
  >
    {loading ? 'Loading...' : children}
  </button>
);

export default Button;
