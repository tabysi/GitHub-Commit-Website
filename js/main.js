//*=====================\\
//?       CONFIG         \\
//*=======================\\
const repoOwner = "Trusted-Studios";    //! Your Target Account! not the displayname!
const Server = true                     //? If you use this for your website pls let this on true, so i can see what you build with my code :D
let   repoName = "Trusted-Studios-Docs";  //! TargetAccount/Repos

const userCard = document.getElementById("userCard");
const userCardName = document.getElementById("userCardName");
const userCardBio = document.getElementById("userCardBio");
const userCardLocation = document.getElementById("userCardLocation");
const userCardCompany = document.getElementById("userCardCompany");

const repoSelector = document.getElementById("repoSelector");
const uniqueRepositories = {};

//*=====================\\
//! DONT TOUCH THIS CODE \\
//*=======================\\

function PingTabysi () {
  try {
    if (Server == true) {
      console.log("Ping Server --> True")
    } else if (Server == false) {
      console.log("Ping Server --> False")
    } else {
      console.error("Falscher Parameter")
    }

  } catch (error) {
    console.error(error)
  }
}

PingTabysi();

async function fetchCommitsByPage(pageNumber) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits?page=${pageNumber}&per_page=5`
    );
    const commits = response.data;
    return commits;
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    return [];
  }
}

function updateCommitList(commits) {
  const commitList = document.getElementById("commitList");
  commitList.innerHTML = "";

  commits.forEach((commit) => {
    const li = document.createElement("li");
    const username = commit.commit.author.name;

    li.innerHTML = `
        <div class="flex items-center">
        <img src="${commit.author.avatar_url}" alt="Profile" class="h-8 w-8 rounded-full mr-2 cursor-pointer" data-username="${commit.author.login}">
        <span class="cursor-pointer" data-username="${commit.author.login}">${commit.commit.author.name}:</span>
        </div>
        <a href="${commit.html_url}" target="_blank" class="text-blue-500 underline underline-offset-2 cursor-pointer">${commit.commit.message}</a>`;
    commitList.appendChild(li);

    li.querySelector("img").addEventListener("click", () => {
      console.log(
        `Profilbild von ${commit.commit.author.name} wurde geklickt.`
      );
    });

    li.querySelector(".text-blue-500").addEventListener("click", () => {
      console.log(
        `Commit-Nachricht von ${commit.commit.author.name} wurde geklickt.`
      );
    });
  });
}

function clearButtonGroup() {
  const commitButtonGroup = document.getElementById("commitButtonGroup");
  commitButtonGroup.innerHTML = "";
  commitButtonGroup.style.display = "none";
}

async function fetchCommits() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits`
    );
    const commits = response.data;
    const totalCommits = commits.length;
    const maxCommitsPerPage = 5;
    const totalPages = Math.ceil(totalCommits / maxCommitsPerPage);

    if (totalPages > 1) {
      const commitButtonGroup = document.getElementById("commitButtonGroup");
      commitButtonGroup.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add(
          "bg-blue-500",
          "text-white",
          "px-3",
          "py-2",
          "rounded"
        );
        button.addEventListener("click", async () => {
          const commitsForPage = await fetchCommitsByPage(i);
          updateCommitList(commitsForPage);
        });
        commitButtonGroup.appendChild(button);
      }

      commitButtonGroup.style.display = "flex";
    }
    // Display the first page of commits by default
    const firstPageCommits = commits.slice(0, maxCommitsPerPage);
    updateCommitList(firstPageCommits);

    const commitList = document.getElementById("commitList");
    commitList.style.display = "block";
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

async function fetchUserInfo(username) {
  try {
    const encodedUsername = encodeURIComponent(username);
    const response = await axios.get(
      `https://api.github.com/users/${encodedUsername}`
    );
    return response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der User-Informationen:", error);
    return null;
  }
}

function showUserInfo(username) {
  fetchUserInfo(username).then((userInfo) => {
    if (userInfo) {
      userCardName.textContent = userInfo.login || "Username nicht verfügbar";
      userCardBio.textContent = userInfo.bio || "Bio nicht verfügbar";
      userCardLocation.textContent = `Location: ${
        userInfo.location || "Nicht angegeben"
      }`;
      userCardCompany.textContent = `Company: ${
        userInfo.company || "Nicht angegeben"
      }`;

      userCard.classList.remove("hidden");
    }
  });
}


async function fetchRepositories() {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${repoOwner}/repos`
    );
    const repositories = response.data;

    repositories.forEach((repo) => {
      const repoName = repo.name;

      if (!uniqueRepositories[repoName]) {
        const option = document.createElement("option");
        option.value = repoName;
        option.textContent = repoName;
        repoSelector.appendChild(option);

        uniqueRepositories[repoName] = true;
      }
    });
    clearButtonGroup();

    repoName = repoSelector.value;
    fetchCommits();
  } catch (error) {
    console.error("Fehler beim Abrufen der Repositories:", error);
  }
}

fetchRepositories();

repoSelector.addEventListener("change", () => {
  const selectedRepo = repoSelector.value;

  if (selectedRepo === "all") {
    repoName = "";
    fetchCommits();
  } else {
    const commitList = document.getElementById("commitList");
    commitList.innerHTML = "";

    // Clear the button group when a new repository is selected
    clearButtonGroup();

    repoName = selectedRepo;
    fetchCommits();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "IMG" || target.tagName === "SPAN") {
    const username = target.dataset.username;
    console.log(username);
    showUserInfo(username);
  } else if (target.id === "closeUserCard") {
    userCard.classList.add("hidden");
  }
});

window.addEventListener("load", () => {
  fetchRepositories();
  fetchCommits();
});

window.addEventListener("error", (event) => {
  console.error("Unerwarteter Fehler aufgetreten:", event.error);
});
