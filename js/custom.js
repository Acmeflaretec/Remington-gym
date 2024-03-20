
  $(function () {

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    // AOS ANIMATION
    AOS.init({
      disable: 'mobile',
      duration: 800,
      anchorPlacement: 'center-bottom'
    });


    // SMOOTHSCROLL NAVBAR
    $(function() {
      $('.navbar a, .hero-text a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });    
  });


    










  const track = document.querySelector(".carousel__track"); //ul
const slides = Array.from(track.children); //li items
const nextButton = document.querySelector(".carousel__button--right ");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});




const photos = Array.from(document.getElementsByClassName("photo"));
const photoWrapper = document.getElementById("photoWrapper");

let count = 0;
photos.forEach((photo) => {
    count++;
    if (count % 2) {
        photo.classList.add("even");
    }
});

photoWrapper.addEventListener("scroll", () => {
    photos.forEach(checkPosition);
});

function checkPosition(photo) {
    if (photo.getBoundingClientRect().right - 4 <= 0) {
        photo.remove();
        photoWrapper.append(photo);
        photoWrapper.scrollLeft = 0;
        return;
    }
}

function infiniteScroll() {
    photoWrapper.scrollLeft++;
    requestAnimationFrame(infiniteScroll);
}

infiniteScroll();
