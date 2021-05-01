export default {
    up() {},
    Wdown(size) {
      const sizes = {
        xs: "575.98px",
        sm: "767.98px",
        "md-sm": "820px",
        md: "991.98px",
        lg: "1199.98px",
        xl: "1600px"
      };
      return `@media (max-width: ${sizes[size]})`;
    },
    Hdown(size) {
        const sizes = {
          xs: "575.98px",
          sm: "767.98px",
          md: "991.98px",
          lg: "1199.98px",
          xl: "1600px"
        };
        return `@media (max-height: ${sizes[size]})`;
      }
};