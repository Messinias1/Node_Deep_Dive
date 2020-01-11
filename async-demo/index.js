console.log("before");

getUser(1, getRepos);

console.log("after");

function getRepos(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, gitHubUsername: "Carl" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
