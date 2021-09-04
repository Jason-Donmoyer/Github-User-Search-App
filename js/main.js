
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
  userLocation.innerHTML = newUser.location;
  userBlog.innerHTML = newUser.blog;
  userTwitterName.innerHTML = newUser.twitterUsername;
  userCompany.innerHTML = newUser.company;
}

