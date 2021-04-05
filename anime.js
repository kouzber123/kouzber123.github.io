let i = 1
async function getApi(){
    const getResponse = await fetch(`https://api.jikan.moe/v3/search/anime?q=&order_by=score&sort=desc&page=${i}`) /*fetch, promise this*/ 
    const data = await getResponse.json()
   //print(data.results)
    uploadData(data.results)
    console.log(data.results)
}
getApi()

async function changePage(){
    document.querySelector(".stuff").remove()
    i +=1
    const getResponse = await fetch(`https://api.jikan.moe/v3/search/anime?q=&order_by=score&sort=desc&page=${i}`) /*fetch, promise this*/ 
    const data = await getResponse.json()
    //print(data.results)
    uploadData(data.results)
}

async function prePage(){ 
    i-=1             //minustetaan ja katsotaan tapahtuuko mitään
    if(i <= 0){  //jos alle miinuksen niin plussataan yhdellä
        i +=1
    }else{     //muutoin poistetaan aiempi sivu ja eteenpäin
        document.querySelector(".stuff").remove()
        const getResponse = await fetch(`https://api.jikan.moe/v3/search/anime?q=&order_by=score&sort=desc&page=${i}`) /*fetch, promise this*/ 
        const data = await getResponse.json()
        //getInfo(data.results)
        uploadData(data.results)
    }
}

function uploadData(Data){
    document.getElementById("containers").innerHTML=`
    <div class="dataFrames">
                    ${Object(Data).map(function(results){
                            return `<div class="stuff"><h3>${results.title}</h3>
                            <img src=${results.image_url} alt="anime image">
                            <p>${results.synopsis} <strong>Score:</strong> ${results.score}</p> </div>`                                             
                    }).join('')}                       
                </div>
    `
}



//lista esimerkki

/*function print(data){
    //let result = data.map(a => a.title); tärkee tällä voi kaivaa object arrayt
      //  console.log(result)
        document.getElementById("anime").innerHTML=`
        <select onchange="getInfo(this.value)" class="selects">   
        <option> Choose anime you desire </option> 
         ${Object(data).map(function(result){
            return `<option>${result.title}</option>`
         }).join('')}
         </select>`
} //this.value menee tänne */
/*async function getInfo(animeName){
    if(animeName != "Choose anime you desire"){
        const getImages = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}`)
        const imageData = await getImages.json()
        uploadData(imageData.results)
        console.log(imageData.results)
    }
}*/