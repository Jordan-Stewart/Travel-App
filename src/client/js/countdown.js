//calculate remaining days until user leaves for their trip

//references this resource on building a countdown - https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
function countdown (date) {
  const aDate = new Date();
  const currentDate = Date.now(aDate);
  var days = currentDate - now;

  var timeleft = Math.floor(days / (1000 * 60 * 60 * 24));
}

export { countdown }
