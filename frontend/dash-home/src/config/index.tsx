const API_ADDRESS = process.env.REACT_APP_API_ADDRESS ?
    `${window.location.protocol}//${process.env.REACT_APP_API_ADDRESS}` :
    `${window.location.protocol}//${window.location.host}`;

const RELEASE_VERSION = process.env.REACT_APP_RELEASE_VERSION ?
    process.env.REACT_APP_RELEASE_VERSION :
    "UNKNOWN";

export {
    API_ADDRESS,
    RELEASE_VERSION
}
