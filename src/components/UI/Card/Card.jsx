import "./Card.css"
import cn from "classnames"

function Card({children, className, ...restProps }) {
    return (
        <div className={cn("card", className)} {...restProps}>
            {children}
        </div>
    )
}


Card.Content = ({children, className}) => (
    <div className={cn("card-content", className)}>{children}</div>
);

Card.Title = ({children, className}) => (
    <h3 className={cn("card-title", className)}>{children}</h3>
)

Card.Description = ({ children, className }) => (
  <p className={cn("card-description", className)}>{children}</p>
);

Card.Image = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={cn("card-image", className)} />
);

export default Card