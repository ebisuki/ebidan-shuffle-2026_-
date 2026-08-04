let completeUnits = 0;


window.onload = function(){


  // =========================
  // 各ユニット進捗
  // =========================

  for(let i = 1; i <= 9; i++){


    const saved =
    JSON.parse(localStorage.getItem(`unit${i}Members`));


    let count = 0;


    if(saved){


      if(saved.members){

        count = saved.members.length;


      }else{


        count = saved.length;


      }


    }



    const max =
    unitData[`unit${i}`].max;



    // 人数表示

    const unitCount =
    document.getElementById(`unit${i}-count`);


    if(unitCount){


      unitCount.innerHTML =
      `${count} / ${max} 人選択中`;


    }



    // 進捗バー

    const unitProgress =
    document.getElementById(`unit${i}-progress`);


    if(unitProgress){


      unitProgress.style.width =
      `${(count / max) * 100}%`;


    }



    // ボタン変更
// 曲表示

const songArea =
document.getElementById(`unit${i}-song`);


if(songArea){

  const savedSong =
  JSON.parse(localStorage.getItem(`unit${i}Members`));


  if(savedSong && savedSong.songs){

    const songs =
    savedSong.songs.filter(song => song);


    if(songs.length > 0){

      songArea.innerHTML =
      songs.map(song => `🎵${song}`).join("<br>");

    }

  }

}
    const button =
    document.getElementById(`unit${i}-button`);


    if(button && count > 0){


      button.innerHTML =
      "編集する";


    }



    // 完成カード

    const card =
    document.getElementById(`unit${i}-card`);


    if(card && count === max){


      card.classList.add("complete");


    }


  }





  // =========================
  // 全体進捗
  // =========================


  completeUnits = 0;



  for(let i = 1; i <= 9; i++){


    const savedUnit =
    JSON.parse(localStorage.getItem(`unit${i}Members`));


    let count = 0;



    if(savedUnit){


      if(savedUnit.members){


        count = savedUnit.members.length;


      }else{


        count = savedUnit.length;


      }


    }



    if(count === unitData[`unit${i}`].max){


      completeUnits++;


    }


  }





  const totalCount =
  document.getElementById("total-count");


  if(totalCount){


    totalCount.innerHTML =
    `${completeUnits} / 9 ユニット完成`;


  }





  const totalProgress =
  document.getElementById("total-progress-fill");


  if(totalProgress){


    totalProgress.style.width =
    `${(completeUnits / 9) * 100}%`;


  }





  // =========================
  // 提出ボタン
  // =========================


  const submitButton =
  document.getElementById("submit-button");


  const submitMessage =
  document.getElementById("submit-message");



  if(submitButton && submitMessage){


    if(completeUnits < 9){


      submitMessage.innerHTML =
      `あと ${9 - completeUnits} ユニット完成させてね✨`;

submitButton.classList.add("disabled");
    }else{


      submitMessage.innerHTML =
      "準備完了✨";


    }



    submitButton.onclick = function(){


      location.href = "result.html";


    };


  }


};