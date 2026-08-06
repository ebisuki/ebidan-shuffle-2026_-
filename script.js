
let selectedMembers = [];


// 今いるページのユニット番号取得
const unitNumber =
location.pathname.match(/unit(\d+)/)?.[1] || "1";


// 保存場所
const storageKey =
`unit${unitNumber}Members`;


// 現在のユニット設定
const currentUnit =
unitData[`unit${unitNumber}`] || {
  max: 9
};


const maxMembers =
currentUnit.max;




// =========================
// メンバー一覧生成
// =========================

function createMemberList(){


  const list =
  document.getElementById("member-list");


  if(!list){
    return;
  }



  members.forEach(member => {


    // 他ユニットで選択済みか確認
    let used = false;


    for(let i = 1; i <= 9; i++){

      if(i == unitNumber){
        continue;
      }


      const saved =
      JSON.parse(localStorage.getItem(`unit${i}Members`));


if(saved && saved.members){

if(saved.members.some(m => m.id === `${member.id}-card`)){

    used = true;

  }

}


console.log("チェック", member.name, used);

    }


    list.innerHTML += `


<div class="member-card ${used ? "used-member" : ""}"
id="${member.id}-card"
onclick="${used ? "" : `selectMember('${member.name}','${member.group.replace(/'/g,"\\'")}','${member.image}','${member.id}-card')`}">


      <img src="${member.image}" draggable="false">


      <p class="member-name">
      ${member.name}
      </p>


      <p class="group-name">
      ${member.group}
      </p>


    </div>


    `;


  });


}




// =========================
// メンバー選択
// =========================

function selectMember(name, group, image, id){


  const card =
  document.getElementById(id);



  const index =
  selectedMembers.findIndex(member => member.id === id);



  if(index !== -1){


    selectedMembers.splice(index,1);


    if(card){

      card.classList.remove("selected");

    }



  }else{


    if(selectedMembers.length >= maxMembers){

      alert(`最大${maxMembers}人まで選択できます`);

      return;

    }



    selectedMembers.push({

      name:name,

      group:group,

      image:image,

      id:id

    });



    if(card){

      card.classList.add("selected");

    }


  }



  updateSelectedArea();


}





// =========================
// 選択エリア更新
// =========================

function updateSelectedArea(){


  const area =
  document.getElementById("selected-area");



  if(!area){
    return;
  }



  area.innerHTML = "";



  for(let i = 0; i < maxMembers; i++){


    if(selectedMembers[i]){


      area.innerHTML += `


<div class="member-card selected-card"
onclick="selectMember('${selectedMembers[i].name}','${selectedMembers[i].group.replace(/'/g,"\\'")}','${selectedMembers[i].image}','${selectedMembers[i].id}')">


        <img src="${selectedMembers[i].image}" draggable="false">


        <p class="member-name">
        ${selectedMembers[i].name}
        </p>


        <p class="group-name">
        ${selectedMembers[i].group}
        </p>


      </div>


      `;


    }else{


      area.innerHTML += `

      <div class="empty-slot"></div>

      `;


    }


  }



  const count =
  document.getElementById("remaining-count");



  if(count){

    count.innerHTML =
    `${selectedMembers.length} / ${maxMembers} 人選択中`;

  }


}





// =========================
// 保存
// =========================

function saveUnit(){



  const songs = [];



  const song1 =
  document.getElementById("song1");



  const song2 =
  document.getElementById("song2");



  if(song1 && song1.value.trim()){

    songs.push(song1.value.trim());

  }



  if(song2 && song2.value.trim()){

    songs.push(song2.value.trim());

  }




  const saveData = {


    members:selectedMembers,


    songs:songs


  };




  localStorage.setItem(

    storageKey,

    JSON.stringify(saveData)

  );



  alert("保存しました");



  location.href="units.html";



}






// =========================
// 復元
// =========================

window.onload = function(){



  createMemberList();



  const saved =
  JSON.parse(localStorage.getItem(storageKey));



  if(saved){



    if(saved.members){

      selectedMembers =
      saved.members;


    }else{


      selectedMembers =
      saved;


    }




    selectedMembers.forEach(member => {


      const card =
      document.getElementById(member.id);



      if(card){

        card.classList.add("selected");

      }


    });



    const song1 =
    document.getElementById("song1");


    const song2 =
    document.getElementById("song2");



    if(song1 && saved.songs){

      song1.value =
      saved.songs[0] || "";

    }


    if(song2 && saved.songs){

      song2.value =
      saved.songs[1] || "";

    }



  }



  updateSelectedArea();



};

// =========================
// 曲名検索用 正規化
// =========================

function normalizeSongText(text){

  return text
    .normalize("NFKC")
    .toLowerCase();

}

// =========================
// 曲名予測変換
// =========================

function setupSongSuggest(inputId, suggestId){

  const input =
  document.getElementById(inputId);


  const suggest =
document.getElementById(suggestId);


if(!input || !suggest){
  return;
}



  const currentGroup =
  currentUnit.group;



  const songs =
(songData[currentGroup] || []).map(song => {

  if(typeof song === "object"){

    return {
      name: song.name,
      search: normalizeSongText(song.search || song.name)
    };

  }

  return {
    name: song,
    search: normalizeSongText(song)
  };

});



  input.addEventListener("input", function(){


    const keyword =normalizeSongText(input.value.trim());


    suggest.innerHTML = "";


if(!keyword){
  suggest.classList.remove("active");
  return;
}



const results = [

  ...songs.filter(song =>
    song.search.startsWith(keyword)
  ),

  ...songs.filter(song =>
    !song.search.startsWith(keyword) &&
    song.search.includes(keyword)
  )

];


results.forEach(song => {


      const item =
      document.createElement("div");


      item.className =
      "song-suggest-item";


      item.textContent =
      song.name;


      item.onclick = function(){

  input.value = song.name;

  suggest.innerHTML = "";

  suggest.classList.remove("active");

};



      suggest.appendChild(item);
      suggest.classList.add("active");


    });


  });



}


window.addEventListener("load", function(){


  setupSongSuggest(
    "song1",
    "song1-suggestions"
  );


  setupSongSuggest(
    "song2",
    "song2-suggestions"
  );


});


// =========================
// 候補を外クリックで閉じる
// =========================

document.addEventListener("click", function(event){

  const songInputAreas =
  document.querySelectorAll(".song-input-area");

  songInputAreas.forEach(area => {

    if(!area.contains(event.target)){

      const suggest =
      area.querySelector(".song-suggestions");

      if(suggest){

        suggest.innerHTML = "";
        suggest.classList.remove("active");

      }

    }

  });

});