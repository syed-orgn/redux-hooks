module.exports = {
  branches: ["master"], // Only triggers on pushes to master branch
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "angular", // Customize commit message analysis
    }],
  ],
};
