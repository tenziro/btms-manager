// * lenis scroll
const lenis = new Lenis({
	duration: 1.2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// * 리사이즈 시
window.addEventListener('resize', () => {
	const nav = document.querySelector('#nav');
	const body = document.querySelector('body');
	if (nav) {
		if (window.innerWidth > 768 && nav.classList.contains('opened')) {
			nav.classList.remove('opened');
			body.classList.remove('stop-scroll');
		}
	}
});
// * 기본
document.addEventListener('DOMContentLoaded', () => {
	// * 메뉴 열고 닫기
	const navControl = () => {
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
	};
	// * input 관련
	const inputControl = () => {
		const inputs = Array.from(document.querySelectorAll(".input > input"));
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
							// if (input.parentElement.nextElementSibling) {
							// 	input.parentElement.nextElementSibling.style.display = 'none';
							// 	input.parentElement.nextElementSibling.querySelector('input').value = '';
							// }
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
	};
	// * 달력 관련
	const calendarControl = () => {
		const showCalendar = () => {
			const btnInputCals = document.querySelectorAll('.btn-input-cal');
			btnInputCals.forEach(function (btn) {
				btn.addEventListener('click', function (event) {
					const layerCalendars = document.querySelectorAll('.layer-calendar');
					const targetCalendar = document.querySelector(btn.getAttribute('data-target'));
					layerCalendars.forEach(function (calendar) {
						if (calendar !== targetCalendar) {
							calendar.classList.remove('show');
						}
					});
					if (targetCalendar) {
						targetCalendar.classList.toggle('show');
					}
					event.stopPropagation();
				});
			});
			document.addEventListener('click', function (event) {
				const layerCalendars = document.querySelectorAll('.layer-calendar');
				const btnInputCals = document.querySelectorAll('.btn-input-cal');
				const isOutsideClick = Array.from(layerCalendars).concat(Array.from(btnInputCals)).every(function (element) {
					return !element.contains(event.target);
				});

				if (isOutsideClick) {
					layerCalendars.forEach(function (layerCalendar) {
						layerCalendar.classList.remove('show');
					});
				}
			});
		};
		const handleCalendar = () => {
			document.querySelectorAll('.layer-calendar').forEach(calendar => {
				calendar.addEventListener('click', function (event) {
					if (event.target.matches('button.day')) {
						const clickedButton = event.target;
						const isChecked = clickedButton.getAttribute('aria-checked') === 'true';
						calendar.querySelectorAll('button.day').forEach(button => {
							button.setAttribute('aria-checked', 'false');
						});
						clickedButton.setAttribute('aria-checked', isChecked ? 'false' : 'true');
					}
					if (event.target.matches('button.month')) {
						const clickedButton = event.target;
						const isChecked = clickedButton.getAttribute('aria-checked') === 'true';
						calendar.querySelectorAll('button.month').forEach(button => {
							button.setAttribute('aria-checked', 'false');
						});
						clickedButton.setAttribute('aria-checked', isChecked ? 'false' : 'true');
					}
				});
			});
		};
		showCalendar();
		handleCalendar();
	};
	// * 직접선택 제어
	const selfSelectedControl = () => {
		const radios = document.querySelectorAll('input[name="r2"]');
		const selfRadio = radios.length > 3 ? radios[3] : null;
		const formGroup = document.querySelector('.search-full');
		const inputs = formGroup ? formGroup.querySelectorAll('input[type="text"]') : [];
		const btnInputCals = formGroup ? formGroup.querySelectorAll('.btn-input-cal') : [];
		const btnSearch = formGroup ? formGroup.querySelector('.btn.tertiary') : null;

		function updateInputState() {
			if (selfRadio && selfRadio.checked) {
				inputs.forEach(function (input) {
					input.disabled = false;
				});
				btnInputCals.forEach(function (btnInputCal) {
					btnInputCal.disabled = false;
				});
				if (btnSearch) {
					btnSearch.disabled = false;
				}
			} else {
				inputs.forEach(function (input) {
					input.disabled = true;
				});
				btnInputCals.forEach(function (btnInputCal) {
					btnInputCal.disabled = true;
				});
				if (btnSearch) {
					btnSearch.disabled = true;
				}
			}
		}
		radios.forEach(radio => {
			radio.addEventListener('change', updateInputState);
		});
		updateInputState(); // 초기 상태 설정
	};
	// * 카운트 제어
	const countControl = () => {
		const totalCounts = document.querySelectorAll('.total-count');

		// 숫자를 세자리마다 콤마로 포맷하는 함수
		function formatNumberWithCommas(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		// 각 자릿수를 랜덤 숫자로 애니메이션하는 함수
		function animateNumber(element, targetNumber) {
			const targetStr = formatNumberWithCommas(targetNumber);
			element.innerHTML = '';

			// 콤마를 포함한 각 문자에 대해 처리
			targetStr.split('').forEach(char => {
				if (char === ',') {
					// 콤마는 그대로 추가
					const comma = document.createElement('span');
					comma.textContent = ',';
					element.appendChild(comma);
				} else {
					// 숫자는 애니메이션을 위한 span 생성
					const digitSpan = document.createElement('span');
					digitSpan.textContent = '0';
					element.appendChild(digitSpan);

					// 애니메이션 시작
					const targetDigit = char;
					const interval = setInterval(() => {
						const randomDigit = Math.floor(Math.random() * 10);
						digitSpan.textContent = randomDigit;
						if (randomDigit.toString() === targetDigit) {
							clearInterval(interval);
							digitSpan.textContent = targetDigit;
						}
					}, 50);
				}
			});
		}

		totalCounts.forEach(countElement => {
			const targetNum = parseInt(countElement.getAttribute('data-num'), 10);
			animateNumber(countElement, targetNum);
		});
	};
	navControl();
	inputControl();
	calendarControl();
	selfSelectedControl();
	countControl();
});

