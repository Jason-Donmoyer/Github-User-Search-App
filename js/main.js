
// VARIABLES

// Object to store user data
let newUser = {
  avatar: '',
  name: '',
  login: '',
  dateJoined: '',
  repos: '',
  followers: '',
  following: '',
  location: '',
  blog: '',
  twitterUsername: '',
  company: '',
}

// DOM Variables
const usernameInput = document.getElementById('username-input');
const submitBtn = document.querySelector('#submit-btn');

const userAvatar = document.getElementById('user-avatar');
const githubUsername = document.getElementById('github-username');
const githubLogin = document.getElementById('github-login');
const dateJoined = document.getElementById('github-date-joined');

const userRepos = document.getElementById('user-repos');
const userFollowers = document.getElementById('user-followers');
const userFollowing = document.getElementById('user-following');

const userLocation = document.getElementById('user-location');
const userBlog = document.getElementById('user-blog');
const userTwitterName = document.getElementById('user-twitter-name');
const userCompany = document.getElementById('user-company');

const locationIcon = document.getElementById('icon-location');
const locationIconNotAvailable = document.getElementById('icon-location-not-available');
const blogIcon = document.getElementById('icon-blog');
const blogIconNotAvailable = document.getElementById('icon-blog-not-available');
const twitterIcon = document.getElementById('icon-twitter');
const twitterIconNotAvailable = document.getElementById('icon-twitter-not-available');
const companyIcon = document.getElementById('icon-company');
const darkModeCompanyIcon = document.getElementById('dm-icon-company');
const companyIconNotAvailable = document.getElementById('icon-company-not-available');

// Mode Toggle Variables
const modeToggleBtn = document.getElementById('mode-toggle-btn');
const body = document.querySelector('body');
const logo = document.getElementById('logo');
const lightHeaderCopy = document.getElementById('light-header-copy');
const darkHeaderCopy = document.getElementById('dark-header-copy');
const sunIcon = document.getElementById('icon-sun');
const moonIcon = document.getElementById('icon-moon');
const searchBar = document.getElementById('search-bar-container');
const mainContent = document.getElementById('main-content');
const githubJoinedCopy = document.getElementById('github-joined-copy');
const bioCopy = document.getElementById('bio-copy');
const userStatsContainer = document.getElementById('user-stats');
const userStats = document.getElementsByClassName('user-stat');
const userStatNums = document.getElementsByClassName('user-stat-numbers');
const userSocialInfo = document.getElementsByClassName('user-social-info');

let darkMode = false;

// Mode Toggle Logic
modeToggleBtn.addEventListener('click', () => {
  if (darkMode === false) {
    darkMode = true;
  } else if (darkMode === true) {
    darkMode = false;
  }

  toggleModes();

  
  

});

function toggleModes() {
  if (darkMode === true) {
    body.classList.add('dark-bg');
    logo.classList.add('light-text-color');
    lightHeaderCopy.classList.remove('header-display-none');
    darkHeaderCopy.classList.add('header-display-none');
    sunIcon.classList.remove('header-display-none');
    moonIcon.classList.add('header-display-none');
    searchBar.classList.add('dark-blue-grey-bg');
    usernameInput.classList.add('light-text-color');
    mainContent.classList.add('dark-blue-grey-bg');
    githubUsername.classList.add('light-text-color');
    githubJoinedCopy.classList.add('light-text-color');
    bioCopy.classList.add('light-text-color');
    userStatsContainer.classList.add('dark-bg')
  
    for (let i = 0; i < userStats.length; i++) {
      userStats[i].classList.add('light-text-color');
      userStatNums[i].classList.add('light-text-color');
    }

    for (let i = 0; i < userSocialInfo.length; i++) {
      if (!userSocialInfo[i].classList.contains('not-available')) {
        userSocialInfo[i].classList.add('light-text-color');
      }
    }

    // if (!companyIconNotAvailable) {
    //   companyIcon.classList.add('header-display-none');
    //   darkModeCompanyIcon.classList.remove('header-display-none');
    // }

  } else if (darkMode === false) {
    body.classList.remove('dark-bg');
    logo.classList.remove('light-text-color');
    lightHeaderCopy.classList.add('header-display-none');
    darkHeaderCopy.classList.remove('header-display-none');
    sunIcon.classList.add('header-display-none');
    moonIcon.classList.remove('header-display-none');
    searchBar.classList.remove('dark-blue-grey-bg');
    usernameInput.classList.remove('light-text-color');
    mainContent.classList.remove('dark-blue-grey-bg');
    githubUsername.classList.remove('light-text-color');
    githubJoinedCopy.classList.remove('light-text-color');
    bioCopy.classList.remove('light-text-color');
    userStatsContainer.classList.remove('dark-bg')
  
    for (let i = 0; i < userStats.length; i++) {
      userStats[i].classList.remove('light-text-color');
      userStatNums[i].classList.remove('light-text-color');
    }

    for (let i = 0; i < userSocialInfo.length; i++) {
      if (!userSocialInfo[i].classList.contains('not-available')) {
        userSocialInfo[i].classList.remove('light-text-color');
      }
    }



  }
}


// On Page Load
fetchUser('octocat').then(userData => {
  getUser(userData);
});

// Event listener for button click
submitBtn.addEventListener('click', () => {
  // api call to github
  fetchUser(usernameInput.value).then(userData => {
    getUser(userData);
  });
});


// FUNCTIONS

// Async function to api.github.com
async function fetchUser(username) { 
  const response = await fetch('https://api.github.com/users/' + username); 
  const userData = await response.json(); 
  console.log(userData); 
  return userData; }


// Function to get text for month 
function getMonthName(day) {
  let month;
  // Switch Statement for months
  switch (day) {
    case 0: 
      month = 'Jan';
      break;
    case 1: 
      month = 'Feb';
      break;
    case 2: 
      month = 'Mar';
      break;
    case 3: 
      month = 'Apr';
      break;
    case 4: 
      month = 'May'; 
      break;
    case 5: 
      month = 'Jun';
      break;
    case 6: 
      month = 'Jul';
      break;
    case 7: 
      month = 'Aug'; 
      break;
    case 8: 
      month = 'Sep'; 
      break;
    case 9: 
      month = 'Oct'; 
      break;
    case 10: 
      month = 'Nov';
      break;
    case 11: 
      month = 'Dec';
      break;
  }
  return month;
}

// Function to format date
function formatDate(date) {
  let d = new Date(date);
  let day = d.getDate();
  let month = getMonthName(d.getMonth());
  let year = d.getFullYear();

  return `${day} ${month} ${year}`
}

// Function to extract data and update UI
function getUser(userData) {
  // object value assignment
  newUser.avatar = userData["avatar_url"];
  newUser.name = userData["name"];
  newUser.login = userData["login"];
  newUser.dateJoined = userData["created_at"];
  newUser.repos = userData["public_repos"];
  newUser.followers = userData["followers"];
  newUser.following = userData["following"];
  newUser.location = userData["location"];
  newUser.blog = userData["blog"];
  newUser.twitterUsername = userData["twitter_username"];
  newUser.company = userData["company"];
  
  // Update UI with new user object data
  userAvatar.style.backgroundImage = `url(${newUser.avatar})`;
  githubUsername.innerHTML = newUser.name;
  githubLogin.innerHTML = `@${newUser.login}`;
  dateJoined.innerHTML = formatDate(newUser.dateJoined);
  userRepos.innerHTML = newUser.repos;
  userFollowers.innerHTML = newUser.followers;
  userFollowing.innerHTML = newUser.following;

  // Check if user has location info
  if (newUser.location !== null) {
    userLocation.innerHTML = newUser.location;
    locationIcon.style.display = 'inline';
    locationIconNotAvailable.style.display = 'none';
    userLocation.classList.remove('not-available');
  } else {
    locationIcon.style.display = 'none';
    locationIconNotAvailable.style.display = 'inline';
    userLocation.innerHTML = 'Not Available';
    userLocation.classList.add('not-available');
  }
  
  // Check if user has blog info
  if (newUser.blog !== "") {
    userBlog.innerHTML = newUser.blog;
    blogIcon.style.display = 'inline';
    blogIconNotAvailable.style.display = 'none';
    userBlog.classList.remove('not-available');
  } else {
    blogIcon.style.display = 'none';
    blogIconNotAvailable.style.display = 'inline';
    userBlog.innerHTML = 'Not Available';
    userBlog.classList.add('not-available');
  }

  // Check if user has twitter info
  if (newUser.twitterUsername !== null) {
    userTwitterName.innerHTML = newUser.twitterUsername;
    twitterIcon.style.display = 'inline';
    twitterIconNotAvailable.style.display = 'none';
    userTwitterName.classList.remove('not-available');
  } else {
    twitterIcon.style.display = 'none';
    twitterIconNotAvailable.style.display = 'inline';
    userTwitterName.innerHTML = 'Not Available';
    userTwitterName.classList.add('not-available');
  }

  // Check if user has company information
  if (newUser.company !== null) {
    userCompany.innerHTML = newUser.company;
    companyIcon.style.display = 'inline';
    companyIconNotAvailable.style.display = 'none';
    userCompany.classList.remove('not-available');
  } else {
    companyIcon.style.display = 'none';
    companyIconNotAvailable.style.display = 'inline';
    userCompany.innerHTML = 'Not Available';
    userCompany.classList.add('not-available');
  }

}

