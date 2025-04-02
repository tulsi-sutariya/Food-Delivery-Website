const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const error_message = document.getElementById('error-message')
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
form.addEventListener('submit', (e) => {
  let errors = []

  if(firstname_input){
    // If we have a firstname input then we are in the signup
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value)
  }
  else{
    // If we don't have a firstname input then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if(errors.length > 0){
    // If there are any errors
    e.preventDefault()
    error_message.innerText  = errors.join(". ")
  }

  if(errors.length === 0 && firstname_input){
    e.preventDefault();
    showSuccessMessage('Account created successfully! Please login.');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }

  if(errors.length === 0 && !firstname_input){
    e.preventDefault();
    showSuccessMessage('Login successful!');
    setTimeout(() => {
     sessionStorage.setItem('lastPage', window.location.href);; // Change to your dashboard or home page
    }, 2000);
  }
  
})

function getSignupFormErrors(firstname, email, password){
  let errors = []

  if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  else if(!emailPattern.test(email)){
    errors.push('Please enter a valid email address')
    email_input.parentElement.classList.add('incorrect')
  }
  
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect');
      
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect');
    
  }

  return errors;
}


function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  else if(!emailPattern.test(email)){
    errors.push('Please enter a valid email address')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Please enter your password')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect');
    
  }
  return errors;
}

const allInputs = [firstname_input, email_input, password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })

})

const loginOverlay = document.querySelector('.wrapper');

document.querySelector('.cross').addEventListener('click',function(){
 //window.location.assign('1-Food-Website.html')

  const lastPage = sessionStorage.getItem('lastPage') || '1-Food-Website.html';
  window.location.href = lastPage;
 
});


// Function to show success message
function showSuccessMessage(message) {
  const successMessage = document.getElementById('success-message');
  const successText = document.getElementById('success-text');
  successText.innerText = message;
  successMessage.style.display = 'block';

  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}
