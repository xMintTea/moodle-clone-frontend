import cn from 'classnames';
import "./Badge.css"

function Badge({
    children,
    variant = "primary",
    as: Component = "span",
    className,
    ...props
}) {
    const badgeClass = cn("badge",`badge-${variant}`,className);

    return (
        <Component className={badgeClass} {...props}>
            {children}
        </Component>
    )
}

export default Badge