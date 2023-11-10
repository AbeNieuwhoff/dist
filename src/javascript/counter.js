let link = "https://api.spaceflightnewsapi.net/v4/articles/"

export async function art(link){
  let array1 = [];
  const response = await fetch(link);
  const movies = await response.json();
  let getal = 10
  if(movies.count < getal){
    getal = movies.count
  }
  for(let i = 0; i < getal; i++){
    let site = movies.results[i].news_site;
    if (array1.find(e => e.bron === site)) {
      let objIndex = array1.findIndex((obj => obj.bron == site))
      array1[objIndex].aantal++
    }
    else {
      let nieuw = {
        "bron" : site,
        "aantal" : 1
      }
      array1.push(nieuw)
    }
    
  }
  document.querySelector('#countArticlesContainer').textContent = ""
  for(let i = 0; i < array1.length; i++){
    let site = array1[i].bron
    let count = array1[i].aantal
    const siteDiv = document.createElement('div')
    siteDiv.classList.add('countDisplay')
    siteDiv.textContent = `${site}: ${count}`
    
    document.querySelector('#countArticlesContainer').appendChild(siteDiv)
  }
}

export async function showarticles(check){
  art(check)
  document.querySelector('#showArticle').textContent = ''
  let res = []
  let array1 = [];
  const response = await fetch(check);
  const movies = await response.json();
  res = movies.results
  let storcheck = 0
  localStorage.getItem("article")
  res.forEach((result) => {
  const article = {
      "id" : result.id,
      "Url" : result.url,
      "Title" : result.title,
      "Summary" : result.summary,
      "NewsSource" : result.news_site,
      "PublishDate" : result.published_at,
      "HasLaunch" : result.launches && result.launches.length > 0,
      "HasEvent" : result.events && result.events.length > 0,
      "ImageUrl" : result.image_url,
      "BigArticle" : false
  }
      array1.push(article)
  })
  if(localStorage.getItem("article") != null){
    array1.push(JSON.parse(localStorage.getItem("article")))
  }
  for(let i = 0; i < array1.length; i++){
    const date1 = new Date(array1[i].PublishDate)
    if(i == 0){
      array1[i].BigArticle = true
    }
    else{
      const date2 = new Date(array1[i-1].PublishDate)
      if(date1.getDate() < date2.getDate()){
        array1[i].BigArticle = true
      }
    }
    if(array1[i].BigArticle == false){
      const articleTemplateClone = document.querySelector('#artTemp').content.cloneNode(true)
      const articleDetails =  articleTemplateClone.querySelector('.articleDet')

      articleTemplateClone.querySelector('.Title').textContent = array1[i].Title
      articleTemplateClone.querySelector('.articleSummary').textContent = array1[i].Summary

      articleTemplateClone.querySelector('.articleSrc').textContent = array1[i].NewsSource
      articleTemplateClone.querySelector('.articleLastupdate').textContent = date1.toLocaleDateString('en-EN')

      if (array1[i].HasEvent) {
        const eventElement = document.createElement('span')
        eventElement.classList.add('event')
        eventElement.textContent = 'Event'

        articleDetails.appendChild(eventElement)
      }
      if (array1[i].HasLaunch) {
        const launchElement = document.createElement('span')
        launchElement.classList.add('launch')
        launchElement.textContent = 'Launch'

        articleDetails.appendChild(launchElement)
      }

      const anchor = articleTemplateClone.querySelector('a') 
      anchor.href = array1[i].Url
      anchor.dataset.articleid = array1[i].id

      articleTemplateClone.querySelector('img').src = array1[i].ImageUrl
      articleTemplateClone.querySelector('img').alt = 'Image for the article'

      document.querySelector('#showArticle').appendChild(articleTemplateClone)
    }
    else{
      const articleTemplateClone = document.querySelector('#bigArtTemp').content.cloneNode(true)

      articleTemplateClone.querySelector('img').src = array1[i].ImageUrl
      articleTemplateClone.querySelector('img').alt = 'Image for the article'

      
      articleTemplateClone.querySelector('.bigTitle').textContent = array1[i].Title
      articleTemplateClone.querySelector('.bigArtDate').textContent = date1.toLocaleDateString('en-EN')

      const anchor = articleTemplateClone.querySelector('a') 
      anchor.href = array1[i].Url
      anchor.dataset.articleid = array1[i].id

      document.querySelector('#showArticle').appendChild(articleTemplateClone)
    }
    
  }
}



export function setupCounter(element) {
  art()
  showarticles(link)
  var countDownDate = new Date("nov 10, 2023 17:00:00").getTime();
  var x = setInterval(function() {

  
    var now = new Date().getTime();
      
    
    var distance = countDownDate - now;
      
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    
    element.innerHTML = "assignment time remaining: " + days + " days " + hours + " hours "
    + minutes + " minutes and " + seconds + " seconds ";
      
  
    if (distance < 0) {
      clearInterval(x);
      element.innerHTML = "EXPIRED";
    }
  }, 1000);
  
}
const eventcheckbox = document.getElementById("hasEvent")
const launchcheckbox = document.getElementById("hasLaunch")
const titelbox = document.getElementById("searchArt")
const searchbut = document.getElementById("searchButton")
const type = document.querySelectorAll('input[name="type"]')
const date = document.getElementById('articleDate')

let getal = 0
let getal2 = 0
let storageDate = ""
eventcheckbox.addEventListener('change', function() {

  if(this.checked){
    getal = 1
    if(launchcheckbox.checked){
      if(getal2 == 0){
        link = link.replace("?has_launch=true", "?has_event=true&has_launch=true")
      }
      else{
        link = link.replace("?has_launch=true&published_at_lte=" + storageDate, "?has_event=true&has_launch=true&published_at_lte=" + storageDate)
      }
    }
    else{
      if(getal2 == 0){
        link += "?has_event=true"
      }
      else {
        link = link.replace("?published_at_lte=" + storageDate, "?has_event=true&published_at_lte=" + storageDate)
      }
      
    }
  }
  else{
    link = link.replace("?has_event=true", "")
    if(launchcheckbox.checked){
      getal = 1
      link = link.replace("&", "?")
    }
    else{
      getal = 0
      if(getal2 == 0){
        link = link.replace("&", "")
      } else{
        link = link.replace("&", "?")
      }
      
    }
  }
  showarticles(link)
});

launchcheckbox.addEventListener('change', function() {
  if(this.checked){
    getal = 1
    if(eventcheckbox.checked){
      if(getal2 == 0){
        link += "&"
        link += "has_launch=true"
      }
      else{
        link = link.replace("?has_event=true&published_at_lte=" + storageDate, "?has_event=true&has_launch=true&published_at_lte=" + storageDate)
      }
      
    }
    else{
      if(getal2 == 0){
        link += "?has_launch=true"
      } else{
        link = link.replace("?published_at_lte=" + storageDate, "?has_launch=true&published_at_lte=" + storageDate)
      }
      
    }
  }
  else{
    if(eventcheckbox.checked){
      getal = 1
      link = link.replace("&has_launch=true", "")
    }
    else{
      getal = 0
      link = link.replace("?has_launch=true", "")
      if(getal2 == 0){
        link = link.replace("&", "")
      } else{
        link = link.replace("&", "?")
      }
      
    }
  }
  showarticles(link)
});




let addition = ""
searchbut.addEventListener('click', function(event) {
  event.preventDefault()
  addition = ""
  if(getal == 1 || getal2 == 1){
    addition = addition + "&title_contains=" + titelbox.value
  }
  if(getal == 0 && getal2 == 0){
    addition += "?title_contains=" + titelbox.value
  }
  link += addition
  showarticles(link)
  link = link.replace(addition, "")
  titelbox.value = ""
});


var item = "article"
type.forEach((elem) => {
  elem.addEventListener("change", function(event) {
    link = link.replace(item, event.target.value)
    item = event.target.value;
    showarticles(link)
  });
});



async function getIMG(){
  const response = await fetch("https://api.spacexdata.com/v5/launches/latest");
  const movies = await response.json();
  const event = new Date(movies.date_local);
  document.getElementById('launchImg').src = movies.links.patch.large
  document.getElementById('launchImgTekst').textContent = movies.name + " " + event.toLocaleDateString('en-EN')
}
getIMG()

date.addEventListener('change', function() {
  link = link.replace("&published_at_lte=" + storageDate, "")
  link = link.replace("?published_at_lte=" + storageDate, "")
  if(date.value == ""){
    getal2 = 0
  }
  if(getal == 1){
    getal2 = 1
    link += '&published_at_lte=' + date.value
  }
  else{
    getal2 = 1
    link += '?published_at_lte=' + date.value
  }
  storageDate = date.value
  showarticles(link)
}
)


const editbtn = document.getElementById('createArticleIcon')
editbtn.addEventListener('click', function(){
  window.replace('C:\Users\abeni\propedeuse ICT\FEP1_jaar2\fep1_jaar2_eindopdracht\createArticle.html')
})