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

      <img src="${member.image}">

      <p>
      ${member.name}
      </p>

    </div>
    `;


  });





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
  "👑 EBiDAN THE LIVE 2026\nシャッフル予想してみた！\n\n#EBiDANTHELIVE2026";


  const url =
  "https://twitter.com/intent/tweet?text="
  + encodeURIComponent(text);


  window.open(url, "_blank");

}