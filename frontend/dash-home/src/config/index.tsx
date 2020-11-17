const API_ADDRESS = process.env.REACT_APP_API_ADDRESS ?
    `${window.location.protocol}//${process.env.REACT_APP_API_ADDRESS}` :
    `${window.location.protocol}//${window.location.host}`;

export {
    API_ADDRESS
}
