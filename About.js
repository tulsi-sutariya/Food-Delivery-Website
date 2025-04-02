
"use strick"
const search_input = document.querySelector(".search-input")
const search = document.querySelector("#sh")

console.log(search)
search.addEventListener("click",()=>{
    search_input.classList.toggle("active")
})


const left_img = document.querySelector(".left img")

const photos = [
      "https://i.pinimg.com/736x/3d/34/79/3d347941d731f1ff196997205a840294.jpg",
      "https://media.istockphoto.com/id/1223612183/photo/pad-pak-ruam-or-veg-thai-stir-fried-vegetables-in-black-bowl-isolated-on-backdrop-pad-pak-is.jpg?s=612x612&w=0&k=20&c=CmuCJPrB7Fu8KGqlG6c4WIhqiPNpyhnfjZagkzKJCwE=",
      "https://flouronmyface.com/wp-content/uploads/2018/02/homemade_deep_dish_pizza.jpg",
      "https://t3.ftcdn.net/jpg/08/41/75/06/360_F_841750654_Nm8EiIUeTyrd39U2S1eAbUjj3Krbpc1q.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1772052308/display_1500/stock-photo-indian-vegetarian-thali-or-indian-whole-meal-1772052308.jpg",
      "https://thumbs.dreamstime.com/z/veg-thali-indian-cuisine-food-platter-consists-variety-veggies-paneer-dish-lentils-jeera-rice-roti-sweet-onion-etc-225931697.jpg",
    ];
    let currentIndex = 0
 
    function changeImg(){
       currentIndex = (currentIndex + 1) % photos.length
          left_img.src = photos[currentIndex]
    }
    
       setInterval(changeImg,3000)
    
       document.querySelector('.log-btn').addEventListener('click', () => {
        sessionStorage.setItem('lastPage', window.location.href);
     });