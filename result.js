window.onload = function(){

const resultArea =
document.getElementById("result-area");


for(let i = 1; i <= 9; i++){

let data =
JSON.parse(localStorage.getItem(`unit${i}Members`)) || {
  members: [],
  songs: []
};


const unit =
unitData[`unit${i}`];


let songs = "🎵ｰ";


if(data.songs && data.songs.length > 0){

  songs =
  data.songs
  .filter(song => song)
  .map(song => `🎵${song}`)
  .join("<br>");

}


let members = "";


const memberList =
data.members || data;


memberList.forEach(member => {

members +=
`
<div class="result-member">

<img 
src="${member.image}"
draggable="false">

<p>
${member.name}
</p>

</div>
`;

});


if(memberList.length === 0){

members =
`
<div class="empty-member">
未選択
</div>
`;

}



resultArea.innerHTML +=

`

<div class="result-unit">


<h2>
${unit.name}
</h2>


<p class="result-group">
${unit.group}
</p>


<div class="result-song">
${songs}
</div>


<div class="result-grid">

${members}

</div>


</div>

`;

}

};





function createSaveImageArea(){


const saveArea =
document.getElementById("save-image-area");


const nameInput =
document.getElementById("user-name");


const userName =
nameInput.value.trim() || "あなた";



let html = `


<div class="save-title">

🎯EBiDAN THE LIVE 2026<br>
シャッフル大予想🎯

</div>


<div class="save-subtitle">

「${userName}」が考えるユニットはこれだ！

</div>


<div class="save-unit-grid">

`;

/* 画像保存用ユニット生成 */

for(let i = 1; i <= 9; i++){


const data =
JSON.parse(localStorage.getItem(`unit${i}Members`)) || {
  members: [],
  songs: []
};


const unit =
unitData[`unit${i}`];

const songList =
(data.songs || []).filter(song => song);

let songs = "";

if(songList.length === 0){

  songs = "未選択";

}else if(songList.length === 1){

  songs = `🎵 ${songList[0]}`;

}else{

  songs =
  `🎵 ${songList[0]}<br>🎵 ${songList[1]}`;

}

let members = "";


const memberList =
data.members || data;



for(let j = 0; j < 9; j++){


const member =
memberList[j];

if(member){

  console.log(member.image);


members +=

`
<div class="save-member">

<img
src="${member.image}"
class="save-member-image"
width="55"
height="55">

<div class="save-member-name">
${member.name}
</div>

</div>
`;


}else{


members +=

`
<div class="save-member empty">

</div>
`;

}


}



html +=


`

<div class="save-unit">


<h2>
${unit.name}
</h2>

<div class="save-song">

${songs}

</div>

<div class="save-member-grid">

${members}

</div>


</div>


`;



}



html += `</div>`;


saveArea.innerHTML = html;



}





// =====================
// 画像保存
// =====================


async function saveImage(){

createSaveImageArea();


const area =
document.getElementById("save-image-area");


// 画像読み込み待ち

const images =
area.querySelectorAll("img");


await Promise.all(

Array.from(images).map(img => {

if(img.complete){

return Promise.resolve();

}


return new Promise(resolve => {

img.onload = resolve;

img.onerror = resolve;

});


})

);





html2canvas(area, {

  scale: window.devicePixelRatio * 2,

  backgroundColor: null,

  useCORS: false,

  allowTaint: true

})

.then(canvas => {


const link =
document.createElement("a");


link.download =
"EBiDANシャッフル予想結果.png";


link.href =
canvas.toDataURL("image/png");


link.click();


});


}

// =====================
// Xシェア
// =====================

function shareX(){

  const text =
"👑 EBiDAN THE LIVE 2026\n🎯 シャッフルユニット予想してみた！\n\n#EBiDAN #Yes_EBiDAN15th #エビライ2026 #EBiDANシャッフル大予想";

  const siteURL =
"https://ebisuki.github.io/ebidan-shuffle-2026_-/";

  const url =
"https://twitter.com/intent/tweet?text=" +
encodeURIComponent(text + "\n\n" + siteURL);

  window.open(url, "_blank");

}

document
.getElementById("save-image-button")
.addEventListener("click", saveImage);
