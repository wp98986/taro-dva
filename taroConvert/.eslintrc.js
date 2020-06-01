module.exports = {
  extends: ["taro"],
  rules: {
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "Taro"
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".tsx"]
      }
    ],
    "prefer-destructuring": [
      2,
      {
        object: false,
        array: false
      }
    ],
    "no-console": [2],
    "no-alert": [2],
    "jsx-quotes": ["error", "prefer-single"]
  },
  parser: "babel-eslint"
};
