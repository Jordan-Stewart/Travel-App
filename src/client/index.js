import { checkURL } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

import './styles/main.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/slideshow.scss'
import './styles.responsive.scss'


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener("click", performAction);

export {
 checkURL,
 handleSubmit
}

console.log(checkURL);

alert("I EXIST")
console.log("CHANGE!!");
