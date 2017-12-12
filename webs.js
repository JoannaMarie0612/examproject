 $(function () {
     $('.arrow').click(function () {
         $('html, body').animate({
             scrollTop: $('section#bio').offset().top
         }, 1000);
         return false;
     });
 });


 function openNav() {
     document.getElementById("mySidenav").style.width = "250px";
     document.getElementById("main").style.marginLeft = "250px";
 }

 function closeNav() {
     document.getElementById("mySidenav").style.width = "0";
     document.getElementById("main").style.marginLeft = "0";
 }



 //audio


 function myFunction() {
     var x = document.getElementById("myAudio").autoplay;
     document.getElementById("demo").innerHTML = x;
 }


 ///fetch

 function getAllEvents() {
     fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/song?_embed")
         .then(res => res.json())
         .then(showEvents);
 }

 function getAllEventsByTag(id) {
     fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/song?_embed&tags=" + id)
         .then(res => res.json())
         .then(showEvents);
 }


 ////tagid
 function getSingleEventById(myId) {
     console.log(myId);
     fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/song/" + myId + "/?_embed")
         .then(res => res.json())
         .then(showSingleEvent);

 }

 function getMenu() {
     fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/tags")
         .then(res => res.json())
         .then(showMenu);
 }

 function showMenu(tags) {
     console.log(tags);
     let lt = document.querySelector("#linkTemplate").content;

     tags.forEach(function (tag) {
         if (tag.description == "songs") {
             let clone = lt.cloneNode(true);
             let parent = document.querySelector("#tagmenu");
             clone.querySelector("a").textContent = tag.name;
             clone.querySelector("a").setAttribute("href", "events.html?tagid=" + tag.id);
             parent.appendChild(clone);
         }
     });

 }

 function showSingleEvent(json) {
     console.log(json);
     document.querySelector("#single h4").textContent = json.title.rendered;
     document.querySelector("#single .price span").textContent = json.acf.ticket_price;
     document.querySelector("#single .details").innerHTML = json.acf.event_info;
     document.querySelector("#single .date").textContent = json.acf.date;
     document.querySelector("#single .time").textContent = json.acf.time;
     document.querySelector("#single .location span").textContent = json.acf.location;
     document.querySelector("#single img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
 }

 function showEvents(data) {
     //console.log(data)
     let list = document.querySelector("#list");
     let template = document.querySelector("#eventTemplate").content;

     data.forEach(function (theEvent) {
         console.log(theEvent)
         let clone = template.cloneNode(true);
         let title = clone.querySelector("h4");
         let date = clone.querySelector(".date");
         let time = clone.querySelector(".time span");
         let location = clone.querySelector(".location");
         let price = clone.querySelector(".price span");
         let img = clone.querySelector("img");
         let audio = clone.querySelector("audio");
         let link = clone.querySelector("a.read-more");


         title.textContent = theEvent.title.rendered;
         date.textContent = theEvent.acf.date;
         time.textContent = theEvent.acf.time;
         location.textContent = theEvent.acf.location;
         price.textContent = theEvent.acf.ticket_price;
         //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

         if (theEvent._embedded["wp:featuredmedia"][0].media_details) {
             img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
         }

         if (theEvent.acf) {
             audio.setAttribute("src", theEvent.acf.audio)
         }

         //console.log(theEvent.content.rendered)

         link.setAttribute("href", "more.html?id=" + theEvent.id);


         list.appendChild(clone);
     });

 }

 let searchParams = new URLSearchParams(window.location.search);
 let id = searchParams.get("id");
 let tagid = searchParams.get("tagid");
 //console.log(id)


 getMenu();
 if (id) {
     getSingleEventById(id);
 }
 if (tagid) {
     getAllEventsByTag(tagid);

 } else {
     getAllEvents();



     getData();

 }
