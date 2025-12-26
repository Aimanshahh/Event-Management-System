const Input = ({ label, type = 'text', value, onChange, placeholder, required, error }) => (
  <div className="input-group">
    {label && <label className="input-label">{label} {required && <span className="required">*</span>}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`input ${error ? 'input-error' : ''}`}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export default Input;
