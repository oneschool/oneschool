"use strict";

import Home from './views/pages/Home.js'
import Error404 from './views/pages/Error404.js'
import Login from './views/pages/Login.js'
import Register from './views/pages/Register.js'
import Dashboard from './views/pages/Dashboard.js';

import TheFooter from './views/components/TheFooter.js' 

import Utils from './utils/Utils.js'

import { setDomain } from './osapi/OsApi.js';

const server = "/api/v1"
setDomain(server)


// resource/identifier/verb
const routes = {
    '/'              : Home
    , '/login'       : Login
    , '/register'    : Register
    , '/app'         : Dashboard
    // , '/p/:id'      : PostShow
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    // // Render the footer
    // footer.innerHTML = await TheFooter.render();
    // await TheFooter.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);