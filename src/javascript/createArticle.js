const form = document.getElementById("form1")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hoi")
    const title = document.getElementById("artTitle").value
    const url = document.getElementById("URL").value
    const summary = document.getElementById("Summary").value
    const source = document.getElementById("NewsSource").value
    const date = new Date(document.getElementById("PublishDate").value)
    const event = document.getElementById("HasEvent").checked
    const launch = document.getElementById("HasLaunch").checked
    
    console.log(title)
    const article = {
        "id" : null,
        "Url" : url,
        "Title" : title,
        "Summary" : summary,
        "NewsSource" : source,
        "PublishDate" : date,
        "HasLaunch" : launch,
        "HasEvent" : event,
        "ImageUrl" : "https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg",
        "BigArticle" : true
    }
    localStorage.setItem("article" , JSON.stringify(article))
    alert('your article will be shown on the bottom of the home paige!')

});