const TextArea = ({ label, value, onChange, placeholder, required, rows = 4, error }) => (
  <div className="input-group">
    {label && <label className="input-label">{label} {required && <span className="required">*</span>}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`textarea ${error ? 'input-error' : ''}`}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export default TextArea;
