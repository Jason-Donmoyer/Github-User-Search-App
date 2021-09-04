
// VARIABLES
const usernameInput = document.getElementById('username-input');
const submitBtn = document.querySelector('#submit-btn');

let userAvatar = document.getElementById('user-avatar');
let githubUsername = document.getElementById('github-username');
let githubLogin = document.getElementById('github-login');
let dateJoined = document.getElementById('github-date-joined');

// Object to store user data
let newUser = {
  avatar: '',
  name: '',
  login: '',
  id: '',
  bio: '',
  blog: '',
  followers: '',
}


// Event listener for button click
submitBtn.addEventListener('click', () => {
  // api call to github
  fetchUser(usernameInput.value).then(userData => {
    // object value assignment
    newUser.avatar = userData["avatar_url"];
    newUser.name = userData["name"];
    newUser.login = userData["login"];
    newUser.dateJoined = userData["created_at"];
    newUser.bio = userData["bio"];
    newUser.blog = userData["blog"];
    newUser.followers = userData["followers"];
    
    // Update UI with new user object data
    userAvatar.style.backgroundImage = `url(${newUser.avatar})`;
    githubUsername.innerHTML = newUser.name;
    githubLogin.innerHTML = `@${newUser.login}`;
    dateJoined.innerHTML = formatDate(newUser.dateJoined);
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
