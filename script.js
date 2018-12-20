// 1. Через 5 секунд після відкриття сторінки вивести на екран повідомлення "5 seconds!".

setTimeout(function(){
	alert('5 seconds!');
}, 5000);

/* 2. Зробити таймер, що починає відлік з 3:30, рахує посекундно у зворотньому напрямку 
і після досягнення значення 0:00 замість цифр видає текст "BOOM!!!" (прим.: тероризм - це погано). */

let pTimer =document.querySelector('.timer');
let currentTime = 210;
showTimer(currentTime);

function showTimer(t){
	pTimer.innerText = t === 0 ? 'BOOM!!!' : Math.floor(t / 60) + ':' + addZero(t % 60);
}

function addZero(n){
	return n < 10 ? '0' + n : n;
}

let siBoom = setInterval(function(){
	currentTime--;
	showTimer(currentTime);
	if (currentTime === 0) clearInterval(siBoom);
}, 1000);


// 3. Виправте код, щоб у консолі видавало цифри 1, 2, 3, 4, 5:
	for (let i = 0; i < 5; i++) {
	  setTimeout(function() {
	    console.log(i + 1);
	  }, i * 1000);
	}

// Переробіть цей код так, щоб у ньому була рекурсія. Спробуйте застосувати setInterval.
		function out(i){
			console.log(i);
			if (i > 4) return;
			setTimeout(out, 1000, i + 1);
		}

		out(1);
		let i = 1;
		let si = setInterval(function(){
			console.log(i);
			i++;
			if (i > 10) clearInterval(si);
		}, 1000);


/* 4. Зробити годинник, що відображає в браузері поточні дату та час - день, місяць, рік, день тижня,
 години, хвилини, секунди. Синхронізацію проводити 1 раз на 5 хвилин.
	Рекомендації до виконання: раціонально створити масив змінних [Y, M, D, d, h, m, s] та 3 функції: 
	- синхронізацію з годинником комп’ютера; 
	- функцію, що повертає оформлену строку з датою та часом 
	- функцію, яка буде робити розрахунки додавання секунди та перевірки хвилин, годин і т.п. 
		на перевищення допустимих значень. 
	В таймері setInterval потрібно зробити додавання секунди, 
	виведення строки та 1 раз на 300 циклів проводити синхронізацію.
	Зауваження. Можна щосекунди брати системний час та виводити його вбудованими функціями, 
	типу .toString(), .toLocaleString() і т.п., але перед нами стоїть задача навчитися оперувати 
	складовими дати та часу. */

	(function getDate(){
		let weekdays = ['неділя', 'понеділок', 'вівторок', 'середа', 'четверг', 'п\'ятниця', 'субота'];
		let arr = [];
		let wrapper = document.querySelector('.date-wrapper');
		let currentTime;
		setDate();

		function setDate(){
			currentTime = new Date();
			arr = [
				currentTime.getFullYear(), 
				currentTime.getMonth(), 
				currentTime.getDate(), 
				currentTime.getDay(), 
				currentTime.getHours(), 
				currentTime.getMinutes(), 
				currentTime.getSeconds()
			];
		}

		setInterval(function(){
			arr[6]++;
			if (arr[6] > 59) {
				arr[5]++;
				arr[6] = 0;
			}
			if (arr[5] > 59) {
				arr[4]++;
				arr[5] = 0;
			}
			if (arr[4] > 23) {
				arr[2]++;
				setDate();
			} 
			printDateTime(arr);
		}, 1000);

		function printDateTime(datearr){
			let result = `${datearr[0]}-${addZero(datearr[1] + 1)}-${addZero(datearr[2])}, ${weekdays[datearr[3]]},	${addZero(datearr[4])}:${addZero(datearr[5])}:${addZero(datearr[6])}`;
			wrapper.innerText = result;
		}

		function addZero(n){
			return n < 10 ? '0' + n : n;
		}

		setInterval(setDate, 300 * 1000);

	})();