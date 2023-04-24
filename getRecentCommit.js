const fetch = require('node-fetch');


async function getRecentCommit(owner, repo, token) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  

  const response = await fetch(endpoint, { headers });
  const data = await response.json();

  const recentCommit = data[0];

  const commitInfo = {
    message: recentCommit.commit.message,
    author: recentCommit.commit.author.name,
    timestamp: recentCommit.commit.author.date,
  };
  
  return commitInfo;
}
  

async function main() {
  try {
    const owner = 'Athira-M-Chandran';
    const repo = 'ToDo';
    const token = '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';
  

    const recentCommit = await getRecentCommit(owner, repo, token);
    console.log(recentCommit);
  } catch (error) {
    console.error(error);
  }
}

main();
