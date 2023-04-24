const fetch = require('node-fetch');

async function getLastCommitFiles(owner, repo, token) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(endpoint, { headers });
  const data = await response.json();
  const lastCommit = data[0];

  console.log('last commit:', lastCommit);
  const commitInfo = {
    message: recentCommit.commit.message,
    author: recentCommit.commit.author.name,
    timestamp: recentCommit.commit.author.date,
    file: recentCommit.commit.endpoint,
  };
  
  return commitInfo;
}

//   const commitFilesEndpoint = lastCommit.url + '/files';
//   const commitFilesResponse = await fetch(commitFilesEndpoint, { headers });
//   const commitFilesData = await commitFilesResponse.json();

//   console.log('commit files:', commitFilesData);

//   const changedFiles = commitFilesData.map(file => file.filename);

//   return changedFiles;
// }

async function main() {
  try {
    const owner = 'Athira-M-Chandran';
    const repo = 'ToDo';
    const token = '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';

    const lastCommit = await getLastCommitFiles(owner, repo, token);
    console.log(lastCommit);
  } catch (error) {
    console.error(error);
  }
}

main();



// const fetch = require('node-fetch');


// async function getRecentCommit(owner, repo, token) {
//   const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   const response = await fetch(endpoint, { headers });
//   const data = await response.json();

//   const recentCommit = data[0];

//   const commitInfo = {
//     message: recentCommit.commit.message,
//     author: recentCommit.commit.author.name,
//     timestamp: recentCommit.commit.author.date,
//     file: recentCommit.commit.endpoint,
//   };
  
//   return commitInfo;
// }
  

// async function main() {
//   try {
//     const owner = 'Athira-M-Chandran';
//     const repo = 'ToDo';
//     const token = '';
  

//     const recentCommit = await getRecentCommit(owner, repo, token);
//     console.log(recentCommit);
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();
