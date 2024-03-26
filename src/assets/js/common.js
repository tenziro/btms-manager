// 리사이즈 시
window.addEventListener('resize', function () {
	const nav = document.querySelector('#nav');
	const body = document.querySelector('body');
	if (window.innerWidth > 768 && nav.classList.contains('opened')) {
		nav.classList.remove('opened');
		body.classList.remove('stop-scroll');
	}
});
// 메뉴 열고 닫기
const openNavButton = document.querySelector('.btn-open-nav');
const closeNavButton = document.querySelector('.btn-close-nav');
if (openNavButton) {
	openNavButton.addEventListener('click', () => toggleNav('open'));
}
if (closeNavButton) {
	closeNavButton.addEventListener('click', () => toggleNav('close'));
}
const toggleNav = (action) => {
	const nav = document.getElementById('nav');
	const body = document.querySelector('body');
	if (action === 'open') {
		nav.classList.add('opened');
		body.classList.add('stop-scroll');
	} else if (action === 'close') {
		nav.classList.remove('opened');
		body.classList.remove('stop-scroll');
	}
};
document.addEventListener('DOMContentLoaded', function () {
	const navItemElements = document.querySelectorAll('.sub-nav .nav-item');
	navItemElements.forEach(function (navItem) {
		navItem.addEventListener('click', function () {
			const currentActiveNavItem = document.querySelector('.sub-nav .nav-item.active');
			if (currentActiveNavItem) {
				currentActiveNavItem.classList.remove('active');
			}
			this.classList.add('active');
		});
	});
});
// input 관련
document.addEventListener('DOMContentLoaded', function () {
	const inputs = Array.from(document.querySelectorAll(".input input"));
	inputs.forEach(input => {
		// input 값 변경시 Clear 버튼 추가 또는 제거
		input.addEventListener("input", function () {
			if (input.value.length > 0) {
				// 입력 필드에 값이 있을 때 Clear 버튼 추가
				if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('btn-input-clear')) {
					const btnClear = document.createElement('button');
					btnClear.setAttribute('type', 'button');
					btnClear.setAttribute('role', 'button');
					btnClear.classList.add('btn-input-clear');
					btnClear.textContent = 'Clear';
					btnClear.addEventListener('click', function () {
						input.value = '';
						btnClear.remove();
						if (input.parentElement.nextElementSibling) {
							input.parentElement.nextElementSibling.style.display = 'none';
							input.parentElement.nextElementSibling.querySelector('input').value = '';
						}
					});
					input.insertAdjacentElement('afterend', btnClear);
				}
			} else {
				// 입력 필드에 값이 없을 때 Clear 버튼 제거
				const nextBtnClear = input.nextElementSibling;
				if (nextBtnClear && nextBtnClear.classList.contains('btn-input-clear')) {
					nextBtnClear.remove();
				}
			}
		});
		// 페이지 로드 시 input 값이 0이 아니면 Clear 버튼 추가
		if (input.value.length > 0) {
			// 입력 필드가 비활성화 상태이면 Clear 버튼 제거
			if (input.disabled || input.readOnly) {
				const nextBtnClear = input.nextElementSibling;
				if (nextBtnClear && nextBtnClear.classList.contains('btn-input-clear')) {
					nextBtnClear.remove();
				}
			} else {
				if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('btn-input-clear')) {
					const btnClear = document.createElement('button');
					btnClear.setAttribute('type', 'button');
					btnClear.setAttribute('role', 'button');
					btnClear.classList.add('btn-input-clear');
					btnClear.textContent = 'Clear';
					btnClear.addEventListener('click', function () {
						input.value = '';
						btnClear.remove();
						if (input.parentElement.nextElementSibling) {
							input.parentElement.nextElementSibling.style.display = 'none';
							input.parentElement.nextElementSibling.querySelector('input').value = '';
						}
					});
					input.insertAdjacentElement('afterend', btnClear);
				}
			}
		}
	});
});