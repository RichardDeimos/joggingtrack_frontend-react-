
export function checkLocalStorage() {
  let currentUser = localStorage.getItem('currentUser');
  
  if ( currentUser ) {
    return true;
  } else {
    return false;
  }
}