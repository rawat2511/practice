var articles = document.getElementById("articles");
var video = document.getElementById("video");
var trending = document.getElementById("trending");


window.addEventListener( "load", displayTredning);
trending.addEventListener( "click", displayTredning);

function displayTredning(){
    fetch( './articles.json' )
    .then( res => res.json() )
    .then( res => {
        articles.innerHTML = "";
        for( var i = 0; i < res.length; i++ ){
            makeArticleCard( res[i] );
        }
    });
}

function makeArticleCard( {author, heading, image, likes, time} ){
    var div = document.createElement("div")
    div.className = "article";
    div.innerHTML = `
    <img src=${image} alt="" class="article-img">

    <div class="flex-1">
        <p class="article-heading">
            ${heading}
        </p>
        <i class="fa fa-bookmark-o fa-lg" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${author} alt="" class="author">
        <p>${time}</p>
        <i class="fa fa-heart-o fa-lg" aria-hidden="true"><p>${likes}</p></i>
        <i class="fa fa-share-alt fa-lg" aria-hidden="true"></i>
    </div>
`;
    let clear = document.createElement( "div" );
    clear.className = "clear";

    articles.appendChild( div );
    articles.appendChild( clear );
}

video.addEventListener("click", fetchData);

function fetchData(){

    var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=60&q=latest%20movies%20trailer&key=AIzaSyB2M6fUG-_3ZmsVG3AzaZQCX7nz5MluBEw`;

    fetch( url )
    .then( response => response.json() )
    .then( res => {
        displayVideo( res.items );
    });

}

function displayVideo( arr ){

    articles.innerHTML = "";
    for( var i = 1; i < arr.length; i++ ){
        var obj = arr[i];
        var id = obj.id.videoId;
        var title = obj.snippet.title;
        console.log( obj );
        var thumbnail;
        if( i % 2 == 0 ){
            thumbnail = "https://secure.gravatar.com/avatar/91d9647d48311247adced62f7e9fdbbb?s=96&d=mm&r=g";
        }
        else{
            thumbnail = "https://secure.gravatar.com/avatar/0081c64428025cafd4ef5f2cc54cf47c?s=96&d=mm&r=g";
        }
        createCard( id, title, thumbnail );
    }

}

function createCard( id, title, thumbnail ){
    
    var div = document.createElement("div");
    div.id = "video";

    var videoCard = document.createElement("iframe");
    videoCard.src = `https://www.youtube.com/embed/${id}`;
    videoCard.height = "242px";
    videoCard.width = "431px";
    videoCard.style.borderRadius = "10px";
    videoCard.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoCard.allowFullscreen;
    articles.appendChild( videoCard );

    div.appendChild( videoCard );

    var div1 = document.createElement("div");
    div1.innerHTML = `<div class="article">


    <div class="flex-1">
        <p class="article-heading">
            ${title}
        </p>
        <i class="fa fa-bookmark-o fa-lg" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${thumbnail} alt="" class="author">
        <p>55 min ago</p>
        <i class="fa fa-heart-o fa-lg" aria-hidden="true"><p>1</p></i>
        <i class="fa fa-share-alt fa-lg" aria-hidden="true"></i>
    </div>

    </div>`;

    div.appendChild( div1 );

    articles.appendChild( div );
}