module.exports = {
  branches: ["master"], // Only triggers on pushes to master branch
  repositoryUrl: "https://github.com/syed-orgn/redux-hooks",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "angular", // Customize commit message analysis
    }],
    ["@semantic-release/release-notes-generator", {
      generator: "angular", // Use Angular-style release notes
      writer: "conventional", // Output format for release notes
    }],
  ],
};
