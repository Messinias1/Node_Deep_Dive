console.log("before");

// Promise
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => console.log("Error", err.message));

// Async Await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}
displayCommits();

console.log("after");

function getRepos(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve(["commits"]);
    });
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from the database...");
      resolve({ id: id, gitHubUsername: "Carl" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github API...");
      resolve(["repo1", "repo2", "repo3"]);
      // reject(new Error("Could  not get the repos"));
    }, 2000);
  });
}
