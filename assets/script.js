const jsonFile = '../../data.json';

const cards = document.querySelectorAll('.card');
let activity = document.querySelectorAll('.exercise');
let times = document.querySelectorAll('.times');
let lastWeek = document.querySelectorAll('.last_week span');



// Fetch the JSON file
fetch(jsonFile)
	.then(response => {
		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		// Parse the JSON response
		return response.json();
	})
	.then(data => {
		// Work with the JSON data
		getData(data);
		console.log(data[0].timeframes)
	})
	.catch(error => {
		console.error('Error fetching the JSON file:', error);
	});



function getData(data) {


	document.querySelectorAll('.date').forEach(date => {

		date.addEventListener('click', (e) => {
			// trigger delete all active classes function
			delActive();
			// add active class to currnt date
			e.target.classList.add('active');
			if (e.currentTarget.classList.contains('daily')) {

				getDaily(data);

			} else if (e.currentTarget.classList.contains('weekly')) {

				getWeekly(data);

			} else {
				getMonthly(data);
			}
		})

	})
	// defualt data
	getMonthly(data);
}

// get daily data
function getDaily(data) {
	for (let i = 0; i < cards.length; i++) {

		activity[i].textContent = data[i].title;

		times[i].textContent = data[i].timeframes.daily.current + 'hrs';

		lastWeek[i].textContent = data[i].timeframes.daily.previous + 'hrs';
	}
}
// get weekly data
function getWeekly(data) {

	for (let i = 0; i < cards.length; i++) {

		activity[i].textContent = data[i].title;

		times[i].textContent = data[i].timeframes.weekly.current + 'hrs';

		lastWeek[i].textContent = data[i].timeframes.weekly.previous + 'hrs';

	}

}
// get monthly data
function getMonthly(data) {

	for (let i = 0; i < data.length; i++) {

		activity[i].innerText = data[i].title;

		times[i].textContent = data[i].timeframes.monthly.current + 'hrs';

		lastWeek[i].textContent = data[i].timeframes.monthly.previous + 'hrs';

	}

}

// delete all active classes
function delActive() {
	document.querySelectorAll('.date').forEach(e => {
		e.classList.remove('active');
	})
}