//calculate remaining days until user leaves for their trip

//references this resource on building a countdown - https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
export function countdown (tripDate) {
  const date = new Date();
  const now = Date.now(date);
  var days = tripDate - now;
  
  var timeleft = Math.floor(days / (1000 * 60 * 60 * 24));
  
  return timeleft;
}
