import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);

    return (
        <div className={theme}>
            <div>
                {children}
            </div>
        </div>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
