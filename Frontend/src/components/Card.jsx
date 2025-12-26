const Card = ({ title, subtitle, description, image, footer, onClick }) => (
  <div className="card" onClick={onClick}>
    {image && <img src={image} alt={title} className="card-image" />}
    <div className="card-body">
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {description && <p className="card-description">{description}</p>}
    </div>
    {footer && <div className="card-footer">{footer}</div>}
  </div>
);

export default Card;
