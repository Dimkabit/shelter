const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');


const popupContent = document.querySelector('.popup__content');
const popupTitle = document.querySelector('.popup-title');


const createCards = function() {
	data.forEach(({ img, name, type, breed, age, inoculations, diseases, parasites, description }) => {

		const popupCard = document.createElement('div');
	popupCard.classList = '.popup__content'
	const popupContentEl = `
		<a href="" class="popup__close close-popup">X</a>
		<div class="frend__slider-card">
			<a class="popup-link" href="#popup"><img src="${img}" alt="${name}" class="slader__img" width="270" height="270"></a>
			<button type="button" class="content-section__batton button-slide">
				<a href=""><span>Learn more</span></a>
			</button>
		</div>
		<div class="popup__info">
			<h3 class="slider__card-title popup-title">${name}</h3>
			<h4 class="info__subtitle">${type} - ${breed}</h4>
			<p class="info__text">${description}.</p>
			<ul class="info__list">
				<li class="list__info"><strong>Age:</strong> ${age}</li>
				<li class="list__info"><strong>Inoculations:</strong> ${inoculations}</li>
				<li class="list__info"><strong>Diseases:</strong> ${diseases}</li>
				<li class="list__info"><strong>Parasites:</strong> ${parasites}</li>
			</ul>
		</div>
		` ;
		return popupContentEl
		
})

}

const renderCards = function(data) {
	popupContent.textContent = '';
	const cards = data.map(createCard)
	popupContent.append(...cards)
	document.body.classList.add('popup__content')
};

console.log(renderCards);
/*for(let i = 0; i < data.length; i++) {
	
		popupContent.innerHTML = `
		<a href="" class="popup__close close-popup">X</a>
		<div class="frend__slider-card">
			<a class="popup-link" href="#popup"><img src="${data[i].img}" alt="${data[i].name}" class="slader__img" width="270" height="270"></a>
			<button type="button" class="content-section__batton button-slide">
				<a href=""><span>Learn more</span></a>
			</button>
		</div>
		<div class="popup__info">
			<h3 class="slider__card-title popup-title">${data[i].name}</h3>
			<h4 class="info__subtitle">${data[i].type} - ${data[i].breed}</h4>
			<p class="info__text">${data[i].description}.</p>
			<ul class="info__list">
				<li class="list__info"><strong>Age:</strong> ${data[i].age}</li>
				<li class="list__info"><strong>Inoculations:</strong> ${data[i].inoculations}</li>
				<li class="list__info"><strong>Diseases:</strong> ${data[i].diseases}</li>
				<li class="list__info"><strong>Parasites:</strong> ${data[i].parasites}</li>
			</ul>
		</div>
		` ;
	
} ;*/


let unlock = true;

const timeout = 800;

if (popupLinks.length > 0  ) {
	for(let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', (e) => {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				
					popupOpen(curentPopup);
				e.preventDefault();
				
		});
	}
	
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', (e) => {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		})
	}
}

function popupOpen(curentPopup) {
	
	if(curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
		if(popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
			curentPopup.classList.add('open'); 
		curentPopup.addEventListener('click', (e) => {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
		
		
		
	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if(lockPadding.length > 0){
		for(let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if(lockPadding.length > 0) {
			for(let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px'
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', (e) => {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	//проверяем поддержку
	if(!Element.prototype.closest) {
		//реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if(node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	//проверяем поддержку
	if(!Element.prototype.matches) {
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();


