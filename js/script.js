const overview = document.querySelector(".overview");
const username = "sarahbcodes";
const repoList = document.querySelector(".repo-list");
const repoDisplay = document.querySelector(".repo");
const repoData = document.querySelector(".repo-data");

const users = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    // console.log(data);
    displayUserInfo(data);
};

users();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `    
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  publicRepos();
};

//fetch public repo info//
const publicRepos = async function () {
  const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const gitRepoData = await gitRepos.json();
  // console.log(gitRepoData);
  displayRepoInfo(gitRepoData);
};

//display repo info//
const displayRepoInfo = async function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};


repoList.addEventListener("click", function (e) {
  if(e.target.matches("h3")) {
    const repoName = e.target.innerText;
    selectedRepoInfo(repoName);
  }
});

const selectedRepoInfo = async function (repoName) {
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);
// fetch languages //
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);
  
// create a list of languages //
  const languages = [];
  for (const language in languageData) {
     languages.push(language);
}

displaySelectedRepoInfo(repoInfo, languages);
};

const displaySelectedRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoDisplay.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};