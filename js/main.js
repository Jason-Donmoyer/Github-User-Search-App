
const usernameInput = document.getElementById('username-input');
const submitBtn = document.querySelector('button');

let newUser = {
  login: '',
  id: '',
  bio: '',
  blog: '',
  followers: '',
}


submitBtn.addEventListener('click', () => {
  fetchUser(usernameInput.value).then(userData => {
    newUser.login = userData["login"];
    newUser.id = userData["id"];
    newUser.bio = userData["bio"];
    newUser.blog = userData["blog"];
    newUser.followers = userData["followers"];
  });
});




// fetchUser('Jason-Donmoyer').then(userData => {
//   newUser.login = userData["login"];
//   newUser.id = userData["id"];
//   newUser.bio = userData["bio"];
//   newUser.blog = userData["blog"];
//   newUser.followers = userData["followers"];
// });





async function fetchUser(username) { 
  const response = await fetch('https://api.github.com/users/' + username); 
  const userData = await response.json(); 
  console.log(userData); 
  return userData; }