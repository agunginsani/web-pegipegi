module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "bus",
        "flight",
        "main",
        "train",
        "payment"
      ],
    ],
  },
};
