document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userName = document.getElementById('userName').value;
  const userReview = document.getElementById('userReview').value;
  const userRating = parseInt(document.getElementById('userRating').value);
  const userImage = document.getElementById('userImage').files[0];

   // ✅ Word Count Validation (10-15 words minimum)
    const wordCount = userReview.trim().split(/\s+/).length;
    if (wordCount < 10) {
        alert('Please enter at least 10 words in your review.');
        return;
    }

 // Rating validation (1 to 5 only)
  const ratingError = document.getElementById('ratingError');
  if (userRating < 1 || userRating > 5 || isNaN(userRating)) {
      ratingError.innerText = 'Please enter a rating between 1 and 5.';
      return;
  } else {
      ratingError.innerText = ''; // Clear error if valid
  }

  if (userImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
          addReview(userName, userReview, userRating, e.target.result);
      };
      reader.readAsDataURL(userImage);
  }

  document.getElementById('reviewForm').reset();
  document.getElementById('thankYouMessage').classList.remove('hidden');

  setTimeout(() => {
      document.getElementById('thankYouMessage').classList.add('hidden');
  }, 3000);
});

function addReview(name, review, rating, imageSrc) {
  const reviewContainer = document.getElementById('review-container');

  const stars = '<i class="fa fa-star" aria-hidden="true"></i>'.repeat(rating) +
      '<i class="fa fa-star-o" aria-hidden="true"></i>'.repeat(5 - rating);

  const reviewHTML = `
      <div class="box">
          <i class="fa-solid fa-quote-left"></i>
          <p>${review}</p>
          <img src="${imageSrc}" alt="User Image" />
          <h3>${name}</h3>
          <div class="stars">${stars}</div>
      </div>
  `;

  reviewContainer.innerHTML += reviewHTML;
}

/*------------ For login button --------- */
document.querySelector('.log-btn').addEventListener('click', () => {
  sessionStorage.setItem('lastPage', window.location.href);
});