  AOS.init({
            duration: 1000, // Animation duration
            easing: 'ease-in-out', // Easing function
            once: false // Animation will only run once
        });


const navEl = document.getElementById('top-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY >= 56) {
    navEl.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.1)"

  }
  if (window.scrollY < 56) {
    navEl.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0)";
  }
})


//--------------------------------------------------------
const progresses = [
  { id: "python-progress-bar", width: "50%" },
  { id: "html-progress-bar", width: "95%" },
  { id: "css-progress-bar", width: "90%" },
  { id: "js-progress-bar", width: "70%" },
  { id: "react-progress-bar", width: "40%" },
  { id: "next-progress-bar", width: "30%" }
];

function checkScroll() {
  progresses.forEach(p => {
    const el = document.getElementById(p.id);
    const top = el.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;
    const height = window.innerHeight;

    if (top < height && bottom > 0) {
      el.style.width = p.width;
    } else {
      el.style.width = "0%";
    }
  });
}

window.addEventListener("scroll", checkScroll);

//--------------------------------------------------------

function showDropdown(){
  if(document.getElementById("dropdown-list").style.display = "none"){
    document.getElementById("dropdown-list").style.display = "block"
  }
}
function closeDropdown(){
   if(document.getElementById("dropdown-list").style.display = "block"){
    document.getElementById("dropdown-list").style.display = "none"
 }
}

