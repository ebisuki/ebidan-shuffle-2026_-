window.onload = function(){


const resultArea =
document.getElementById("result-area");



for(let i = 1; i <= 9; i++){



let data =
JSON.parse(localStorage.getItem(`unit${i}Members`));


if(!data){

  data = {
    members: [],
    songs: []
  };

}



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
class="save-member-image"
width="55"
height="55">

      <p>
      ${member.name}
      </p>

    </div>
    `;


  });
if(memberList.length === 0){

  members = `
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

🎯EBiDAN THE LIVE 2026　シャッフル大予想🎯

</div>


<div class="save-subtitle">

「${userName}」が考えるユニットはこれだ！

</div>


<div class="save-unit-grid">

`;

  for(let i = 1; i <= 9; i++){


    const data =
    JSON.parse(localStorage.getItem(`unit${i}Members`)) || {
      members: [],
      songs: []
    };


    const unit =
    unitData[`unit${i}`];


    let members = "";


    const memberList =
    data.members || data;


    for(let j = 0; j < 9; j++){


      const member =
      memberList[j];


      if(member){


        members += `

        <div class="save-member">

  <img 
src="${member.image}"
class="save-member-image"
crossorigin="anonymous">

</div>

        `;


      }else{


        members += `

        <div class="save-member empty">

        </div>

        `;


      }


    }



    html += `

    <div class="save-unit">


      <h2>
      ${unit.name}
      </h2>


      <div class="save-member-grid">

      ${members}

      </div>


    </div>


    `;


  }

html += `</div>`;
  saveArea.innerHTML = html;


}
function savePDF(){

  const nameInput =
  document.getElementById("user-name");


  const title =
  document.querySelector(".result-title p");


  const originalTitle =
  title.innerHTML;


  const name =
  nameInput.value.trim();


  if(name){

    title.innerHTML =
    `${name}さんのシャッフル予想結果`;

  }else{

    title.innerHTML =
    "シャッフル予想結果";

  }


  window.print();


  // 印刷後に元へ戻す
  setTimeout(()=>{

    title.innerHTML =
    originalTitle;

  },1000);


}

function shareX(){

  const text =
  "👑 EBiDAN THE LIVE 2026\n🎯 シャッフルユニット予想してみた！\n\n#EBiDAN\n#Yes_EBiDAN15th\n#エビライ2026\n#EBiDANシャッフル大予想";

  const siteURL =
  "https://ebisuki.github.io/ebidan-shuffle-2026_-/";

  const url =
  "https://twitter.com/intent/tweet?text="
  + encodeURIComponent(text + "\n\n" + siteURL);


  window.open(url, "_blank");

}
// =====================
// 画像保存
// =====================

function saveImage(){


  // 画像用エリアを作成
  createSaveImageArea();


  const area =
  document.getElementById("save-image-area");



  html2canvas(area, {

  scale: 2,

  backgroundColor: null,

  useCORS: true

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



// ボタン接続

document
.getElementById("save-image-button")
.addEventListener("click", saveImage);