console.log("before");

getUser(1, user => {
  console.log("User", user);

  getRepositories(user.username, repos => {
    console.log("Repos", repos);
  });
});

console.log("after");

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
