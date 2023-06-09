const fetch = require('node-fetch');

async function getLastCommit(owner, repo, token) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(endpoint, { headers });
  const data = await response.json();
  // console.log(data, data[0])
  const recentCommit = data[0];

  // console.log('last commit:', recentCommit);

  
  const commitInfo = {
    message: recentCommit.commit.message,
    author: recentCommit.commit.author.name,
    timestamp: recentCommit.commit.author.date,
    url: recentCommit.commit.url
    
  };
  
  return commitInfo;
}

async function getCommitFiles(owner, repo, commitSha, token) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(endpoint, { headers });
  const data = await response.json();
  
  if (data.files && data.files.length > 0) {
    const files = data.files.map((file) => file.filename);
    return files;
  } else {
    return [];
  }
}

async function main() {
  try {
    const owner = 'Athira-M-Chandran';
    const repo = 'ToDo';
    const token = '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';

    const recentCommit = await getLastCommit(owner, repo, token);
    console.log('recentCommit',recentCommit);

    const commitFiles = await getCommitFiles(owner, repo, recentCommit.url.split('/').pop(), token);
    console.log('commit files:', commitFiles);

    const commitInfo = {
      message: recentCommit.message,
      author: recentCommit.author,
      timestamp: recentCommit.timestamp,
      url: recentCommit.url,
      filename: commitFiles[0]
    };
    
    console.log('commit info:', commitInfo);
  } catch (error) {
    console.error(error);
  }
}

main();
