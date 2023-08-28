const SassRuleRewire = require("react-app-rewire-sass-rule");
const path = require("path");
const rewireAliases = require("react-app-rewire-aliases");

module.exports = function override(config, env) {
  require("react-app-rewire-postcss")(config, {
    plugins: (loader) => [require("postcss-rtl")()],
  });

  config = rewireAliases.aliasesOptions({
    "@src": path.resolve(__dirname, "src"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@components": path.resolve(__dirname, "src/components"),
    "@layouts": path.resolve(__dirname, "src/layouts"),
    "@store": path.resolve(__dirname, "src/store"),
    "@views": path.resolve(__dirname, "src/views"),
    "@configs": path.resolve(__dirname, "src/configs"),
    "@utility": path.resolve(__dirname, "src/utility"),
    "@utils": path.resolve(__dirname, "src/utility/Utils"),
    "@Modules": path.resolve(__dirname, "src/Modules"),
    "@styles": path.resolve(__dirname, "src/assets/scss"),
    "@hooks": path.resolve(__dirname, "src/utility/hooks"),
  })(config, env);

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: ["node_modules", "src/assets"],
            },
          },
        },
      ],
    })
    .rewire(config, env);
  return config;
};
