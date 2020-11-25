let location;

export default function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(logPosition, showError);
    return location;
  } else { 
    alert("Try another browser for geolocation services")
  }
}

function logPosition(position) {
  location = { Latitude: position.coords.latitude, Longitude: position.coords.longitude }
  console.log(location)
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("You must allow location services to use this app")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}