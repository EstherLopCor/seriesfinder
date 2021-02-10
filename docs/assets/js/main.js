"use strict";let series=[],favorites=[];const searchInput=document.querySelector(".search-input"),searchBtn=document.querySelector(".search-button"),seriesBoxList=document.querySelector(".js-series-list"),favBoxList=document.querySelector(".js-fav-list"),resetFavButton=document.querySelector(".js-reset-fav-button");function handlerClickButton(){getFromLocalStorage(),fetch("http://api.tvmaze.com/search/shows?q="+searchInput.value).then(e=>e.json()).then(e=>{series=e,paintSeries()})}function paintSeries(){let e="";for(let t=0;t<series.length;t++)e+=`<li class="box-results js-box-results" id="${series[t].show.id}">`,null===series[t].show.image?e+='<div><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class="image-result js-image-result"></div>':e+=`<div class="box-image"><img src=${series[t].show.image.medium} class="image-result js-image-result"></div>`,e+=`<h3 class="title-result js-title-result">${series[t].show.name}</h3>`,e+="</li>";seriesBoxList.innerHTML=e,liListener()}function addToFavList(e){const t=e.currentTarget.id,s=findSerie(t,series);findSerie(t,favorites)?(e.currentTarget.classList.remove("change-color"),favorites.splice(favorites.indexOf(s),1),localStorage.setItem("favorites",JSON.stringify(favorites))):(e.currentTarget.classList.add("change-color"),saveFavorite(s))}function findSerie(e,t){return e=parseInt(e),t.find(t=>t.show.id===e)}function saveFavorite(e){favorites.push(e),localStorage.setItem("favorites",JSON.stringify(favorites))}function paintFavorites(){let e="";for(let t=0;t<favorites.length;t++)e+=`<li class="box-results js-box-results li-fav" id="${favorites[t].show.id}">`,e+='<button type="button" class="clear-btn js-clear-btn">X</button>',null===favorites[t].show.image?e+='<div><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class="image-result js-image-result"></div>':e+=`<div class="box-image"><img src=${favorites[t].show.image.medium} class="image-result js-image-result img-fav"></div>`,e+=`<h3 class="title-result js-title-result h3-fav">${favorites[t].show.name}</h3>`,e+="</li>";favBoxList.innerHTML=e,removeFromFavList()}function removeFromList(e){const t=findSerie(e.currentTarget.parentElement.id,favorites);favorites.splice(favorites.indexOf(t),1),localStorage.setItem("favorites",JSON.stringify(favorites)),favBoxList.removeChild(e.currentTarget.parentElement),paintFavorites()}function resetFav(){favBoxList.innerHTML="",favorites=[],localStorage.removeItem("favorites"),getFromLocalStorage()}function getFromLocalStorage(){if(JSON.parse(localStorage.getItem("favorites"))){favorites=JSON.parse(localStorage.getItem("favorites"));for(const e of favorites)paintFavorites(series)}else favBoxList.innerHTML="",localStorage.removeItem("favorites")}function liListener(){const e=document.querySelectorAll(".js-box-results");for(const t of e)t.addEventListener("click",addToFavList),t.addEventListener("click",paintFavorites)}function removeFromFavList(){const e=document.querySelectorAll(".js-clear-btn");for(const t of e)t.addEventListener("click",removeFromList)}removeFromFavList(),getFromLocalStorage(),searchBtn.addEventListener("click",handlerClickButton),resetFavButton.addEventListener("click",resetFav);