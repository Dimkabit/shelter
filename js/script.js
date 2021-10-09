let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
const activeLink = document.querySelectorAll('.menu__link');

//active link cheng
const deactive = () => {
	activeLink.forEach(btn => btn.classList.remove('active-link'))
}

activeLink.forEach((btn, i) => {
	btn.addEventListener('click', () => {
		if(!btn.classList.contains('active-link')) {
			deactive();
			btn.classList.add('active-link');
		}
	})
})


//menu burger
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		menuBody.classList.toggle("active");
	});
}
