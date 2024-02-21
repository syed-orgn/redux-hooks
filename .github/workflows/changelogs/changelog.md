### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


name: Release Workflow

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Read Changelog File
        id: read_changelog
        run: |
          changelog_content=$(cat changelogs/changelog.md)
          echo "Changelog Content: $changelog_content"
          echo "::set-output name=changelog::$changelog_content"

      - name: Create Release Draft
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.PAT }}
        with:
          tag_name: v1.0.0
          release_name: Release 1.0.0
          body: |
            Changeloged: 
            ${{ steps.generate_changelog.outputs.changelog }}
          draft: false
          prerelease: false

      # - name: Publish Release
      #   if: steps.create_release.outputs.release_created == 'true'
      #   uses: actions/upload-release-asset@v1
      #   env:
      #     GITHUB_TOKEN: ${{ secrets.PAT }}
      #   with:
      #     upload_url: ${{ steps.create_release.outputs.upload_url }}
      #     asset_path: ./path/to/release-asset.zip
      #     asset_name: release-asset.zip
      #     asset_content_type: application/zip