const fetch = require('node-fetch');

async function getLastCommitFiles(owner, repo, token) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(endpoint, { headers });
  const data = await response.json();
  console.log(data, data[0])
  const recentCommit = data[0];

  console.log('last commit:', recentCommit);

  
  const commitInfo = {
    message: recentCommit.commit.message,
    author: recentCommit.commit.author.name,
    timestamp: recentCommit.commit.author.date,
    url: recentCommit.commit.url
    
  };
  
  return commitInfo;
}
async function getLastCommitFiles(owner, repo, commitSha, token) {
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

    const recentCommit = await getLastCommitFiles(owner, repo, token);
    console.log('recentCommit',recentCommit);

    const commitFiles = await getLastCommitFiles(owner, repo, recentCommit.url, token);
    console.log('commit files:', commitFiles);

    const commitInfo = {
      message: recentCommit.commit.message,
      author: recentCommit.commit.author.name,
      timestamp: recentCommit.commit.author.date,
      url: recentCommit.commit.url,
      filename: commitFiles[0].filename
    };
    
    console.log('commit info:', commitInfo);
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
