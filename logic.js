const RSS_URL = `https://www.bitchute.com/feeds/rss/channel/STYXHEXENHAMMER666/`;
const RSS_URL2 = `https://www.youtube.com/feeds/videos.xml?channel_id=UC0rZoXAD5lxgBHMsjrGwWWQ`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    const items = data.querySelectorAll("link");
    let html = ``;
    items.forEach(el => {
		console.log("Doing thing");
      html += `
		<iframe width="420" height="315" src=${el.textContent} />
		boop
	  `;
    });
    document.body.insertAdjacentHTML("beforeend", html);
  });
alert("beep boop");