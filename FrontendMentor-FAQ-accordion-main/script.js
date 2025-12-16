function showpara(clickedIcon) {
    const answer = clickedIcon.parentElement.nextElementSibling;
    console.log(answer)
    answer.classList.toggle("hidden-answer");
    
    //change the icon
    const currentIcon = clickedIcon.src;
    const plusIconPath = currentIcon.includes("plus");
    const newIconPath = plusIconPath ? currentIcon.replace("plus", "minus") : currentIcon.replace("minus","plus");
    clickedIcon.src = newIconPath
  }
  