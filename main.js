const DOMStrings = {
  navBar: document.getElementById("navBar"),
  modalBtns: document.querySelectorAll('.modalBtn'),
  closeBtns: document.querySelectorAll('.closeBtn'),
  modalBkGrd: document.querySelectorAll('.portfolio-modal'),
  navMenuSml: document.querySelector('.navMenuSml'),
  smlNavLinks: document.querySelector('.smlNavLinks')
}

/* portfolio image sliders */

// to stop the function from firing off millions of times
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in")

function checkslide() {
  sliderImages.forEach(sliderImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.offsetHeight / 5; // this gives us the position to slide in at
    const imageBottom = sliderImage.offsetTop + sliderImage.offsetHeight;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if(isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });

}

window.addEventListener('scroll', debounce(checkslide));

/* sticky navbar + menu */
const topOfNav = DOMStrings.navBar.offsetTop;

function fixNav(e) {
  if(window.scrollY >= topOfNav){  
    document.body.style.paddingTop = DOMStrings.navBar.offsetHeight + 'px';
    document.body.classList.add('fixed-nav'); 
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav'); 
  }
}
window.addEventListener('scroll', fixNav);

/* modals for projects */

// listen for open click
DOMStrings.modalBtns.forEach(btn => addEventListener('click', openModal));
// listen for close click
DOMStrings.closeBtns.forEach(btn => addEventListener('click', closeModal));
// listen for outside click
DOMStrings.modalBkGrd.forEach(el => addEventListener('click', outsideClick));

// identify which is the correct element and then get the element by the id - then we should be able to access the correct classlist to display
function openModal(e) {
  if (e.target.className === "modalBtn") {
    const modalNum = e.target.parentNode.dataset.modalnum;
    const modal = document.getElementById(modalNum);
    modal.style.display = "block";
  }
}
// close the modal - do the reverse of open
function closeModal(e) {
  if (e.target.className === "closeBtn"){
    const modalNum = e.target.parentNode.parentNode.id;
    const modal = document.getElementById(modalNum);
    modal.style.display = "none";
  }
}
// check to see if the person clicks outside of the modal - then shut it down
function outsideClick(e) {
  if(e.target.className === "portfolio-modal" && e.target.className != "modal-content"){
      const modalNum = e.target.id;
      const modal = document.getElementById(modalNum);
      modal.style.display = "none";
  }
}

DOMStrings.navMenuSml.addEventListener('click', openSmlMenu);

function openSmlMenu() {
  const smlMenu = DOMStrings.smlNavLinks;
  if (smlMenu.style.display === "flex") {
    smlMenu.style.display = "none";
  } else {
    smlMenu.style.display = "flex";
  }
}



