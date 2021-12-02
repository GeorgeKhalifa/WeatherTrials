
//client side javascript --- using fetch api

//fetch from the url, then do something
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    //parse json data to objects
    response.json().then((data) => {
        console.log(data);
    })
});


//MANIPULATE FROM HTML
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

//matches the first p in html file, not what i want, so i need id or smth
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');


//messageOne.textContent = "From java Script!!";




weatherForm.addEventListener('submit', (event) => {

    //dont refresh the broswer,just our function to run
    event.preventDefault();
    messageOne.textContent = 'loading...';
    const location = search.value;
    console.log(location);
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = ''
            }
            else {
                console.log(data.location);
                messageOne.textContent = data.location;
                console.log(data.forecastData);
                messageTwo.textContent = data.forecastData.tempreature;
            }
        })
    });

})