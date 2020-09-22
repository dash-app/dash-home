const API_ADDRESS = process.env.REACT_APP_API_ADDRESS ? 
    `${window.location.protocol}//${process.env.REACT_APP_API_ADDRESS}` :
    `${window.location.protocol}//${window.location.hostname}:13105`; // 13105 is default port of dash-home.

export {
    API_ADDRESS
}