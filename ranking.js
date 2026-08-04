window.onload = function(){


const rankingArea =
document.getElementById("ranking-area");


let html = "";



// =====================
// ユニット別集計
// =====================

for(let i = 1; i <= 9; i++){


  const data =
  JSON.parse(localStorage.getItem(`unit${i}Members`));


  if(!data){
    continue;
  }



  const unit =
  unitData[`unit${i}`];



  let memberCount = {};

  let memberInfo = {};

  let songCount = {};



  // =====================
  // メンバー集計
  // =====================


  const members =
  data.members || data;



  members.forEach(member => {


    const id = member.id;



    if(memberCount[id]){


      memberCount[id]++;


    }else{


      memberCount[id] = 1;


      memberInfo[id] = {

        name:member.name,

        group:member.group,

        image:member.image

      };


    }


  });





  // =====================
  // 曲集計
  // =====================


  if(data.songs){


    data.songs.forEach(song=>{


      if(songCount[song]){

        songCount[song]++;


      }else{

        songCount[song] = 1;

      }


    });


  }






  // =====================
  // ランキング作成
  // =====================


  const memberRanking =

  Object.entries(memberCount)

  .sort((a,b)=>b[1]-a[1])

  .slice(0,10);





  const songRanking =

  Object.entries(songCount)

  .sort((a,b)=>b[1]-a[1])

  .slice(0,3);






  let memberHTML = "";



  memberRanking.forEach((member,index)=>{


    const info =
    memberInfo[member[0]];



    memberHTML += `

    <div class="ranking-item">


      <span>
      ${index+1}位
      </span>


      <img src="${info.image}">


      <span class="ranking-name">
      ${info.name}（${info.group}）
      </span>


      <span class="ranking-vote">
      ${member[1]}票
      </span>


    </div>


    `;


  });







  let songHTML = "";



  songRanking.forEach((song,index)=>{


    songHTML += `


    <div class="ranking-item">


      <span>
      ${index+1}位
      </span>


      <span class="ranking-name">
      🎵${song[0]}
      </span>


      <span class="ranking-vote">
      ${song[1]}票
      </span>


    </div>


    `;


  });








  html += `


<details class="unit-ranking">


<summary class="unit-summary">


<span class="unit-name">

👑 ${unit.name}

</span>


<span class="unit-group">

（${unit.group}）

</span>


<span class="toggle-mark">
＋
</span>


</summary>





<div class="ranking-card">


<h3>
🎵 楽曲統計
</h3>


${songHTML || "まだデータなし"}





<h3>
👤 選出メンバー統計
</h3>


${memberHTML || "まだデータなし"}




</div>



</details>


`;



}




rankingArea.innerHTML = html;



};