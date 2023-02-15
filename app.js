// Code is largely modeled from this Google extension example:
// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/cookies/cookie-clearer/popup.js

const header = document.getElementById("header");

try {
  const [cookie] = await chrome.cookies.getAll({
    name: "uid",
    domain: "medium.com",
  });
  let deletedCookie = await deleteCookie(cookie);
  chrome.tabs.reload();
  header.innerText = "Medium.com UID cookie cleared."
} catch {
  header.innerText = "No Medium.com UID cookies found.";
}

function deleteCookie(cookie) {
  const protocol = cookie.secure ? "https:" : "http:";

  // If hostOnly is false, remove the "." prefixed to the domain
  const domain = cookie.hostOnly ? cookie.domain : cookie.domain.substring(1);

  const cookieUrl = `${protocol}//${domain}${cookie.path}`;

  return chrome.cookies.remove({
    url: cookieUrl,
    name: cookie.name,
    storeId: cookie.storeId,
  });
}
