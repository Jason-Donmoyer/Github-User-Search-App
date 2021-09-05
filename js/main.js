
// VARIABLES
const usernameInput = document.getElementById('username-input');
const submitBtn = document.querySelector('#submit-btn');

let userAvatar = document.getElementById('user-avatar');
let githubUsername = document.getElementById('github-username');
let githubLogin = document.getElementById('github-login');
let dateJoined = document.getElementById('github-date-joined');

let userRepos = document.getElementById('user-repos');
let userFollowers = document.getElementById('user-followers');
let userFollowing = document.getElementById('user-following');

let userLocation = document.getElementById('user-location');
let userBlog = document.getElementById('user-blog');
let userTwitterName = document.getElementById('user-twitter-name');
let userCompany = document.getElementById('user-company');

let locationIcon = document.getElementById('icon-location');
let locationIconNotAvailable = document.getElementById('icon-location-not-available');
let blogIcon = document.getElementById('icon-blog');
let blogIconNotAvailable = document.getElementById('icon-blog-not-available');
let twitterIcon = document.getElementById('icon-twitter');
let twitterIconNotAvailable = document.getElementById('icon-twitter-not-available');
let companyIcon = document.getElementById('icon-company');
let companyIconNotAvailable = document.getElementById('icon-company-not-available');

// Mode Toggle Variables
const modeToggleBtn = document.getElementById('mode-toggle-btn');
const body = document.querySelector('body');
const logo = document.getElementById('logo');
const lightHeaderCopy = document.getElementById('light-header-copy');
const darkHeaderCopy = document.getElementById('dark-header-copy');
const sunIcon = document.getElementById('icon-sun');
const moonIcon = document.getElementById('icon-moon');


// Mode Toggle Logic
modeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-bg');
  logo.classList.toggle('light-text-color');
  lightHeaderCopy.classList.toggle('header-display-none');
  darkHeaderCopy.classList.toggle('header-display-none');
  sunIcon.classList.toggle('header-display-none');
  moonIcon.classList.toggle('header-display-none');
});


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


// fetchUser('Jason-Donmoyer').then(userData => {
//   newUser.login = userData["login"];
//   newUser.id = userData["id"];
//   newUser.bio = userData["bio"];
//   newUser.blog = userData["blog"];
//   newUser.followers = userData["followers"];
// });


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

