const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb e.g class/jane/new
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // navigates the window to a particular hash uri
    // e.g. navigateToHash("login") -> sets location.hash to <domain>/#/login
    navigateToHash: (uri) => {
        location.hash = "#/" + uri
    }
}

export default Utils;