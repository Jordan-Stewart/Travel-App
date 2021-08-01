import { countdown } from "./js/countdown";
import { retrieveDestination } from "./js/retrieveDestination";
import { retrieveImage } from "./js/retrieveImage";
import { retrieveWeather } from "./js/retrieveWeather";
import { generateTrip } from './js/app'

import './styles/main.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/slideshow.scss'
import './styles/responsive.scss'


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener("click", performAction);

//alert("I EXIST")
//onsole.log("CHANGE!!");
