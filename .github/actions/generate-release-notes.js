const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');

async function main() {
    const token = process.env.PAT;
    const tag = process.env.tag;

    // Authenticate and get current branch SHA
    const octokit = new Octokit({ auth: token });
    const { data: ref } = await octokit.git.refs.get({ owner: 'syed-orgn', repo: 'redux-hooks', ref: 'heads/' + tag });
    const commitSha = ref.object.sha;

    // Fetch commits since previous release (or all commits if no previous tag)
    const previousTag = await getPreviousTag(token, tag);
    const commitRange = previousTag ? `${previousTag}...${commitSha}` : commitSha;
    const { data: commits } = await octokit.git.commits({ owner: 'syed-orgn', repo: 'redux-hooks', sha: commitRange });

    // Extract and format release notes
    const notes = formatReleaseNotes(commits);

    // Set environment variable with release notes
    core.setOutput('notes', notes);
}

async function getPreviousTag(token, tag) {
    if (!tag.startsWith('v')) {
        console.warn('Tag name must start with "v"');
        return null;
    }

    const tagsList = await axios.get(`https://api.github.com/repos/syed-orgn/redux-hooks/tags`, {
        headers: { Authorization: `token ${token}` },
    });

    const previousTags = tagsList.data.filter(t => t.name.startsWith('v') && t.name < tag);
    return previousTags.length > 0 ? previousTags[0].name : null;
}

function formatReleaseNotes(commits) {
    // Implement your logic to categorize and format commit messages
    // Based on type (Minor Changes, Patch Changes), issue/PR reference, author, etc.
    // Return the formatted release notes string
    let notes = '';
    for (const commit of commits) {
        const message = commit.commit.message;
        // ... (Extract and format information)
        notes += `#${commit.sha} ${message}\n`;
    }
    return notes;
}

main().catch(error => {
    console.error(error);
    core.setFailed(error.message);
});
