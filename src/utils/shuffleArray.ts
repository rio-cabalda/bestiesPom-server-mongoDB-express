const shuffleArray = (array:string[] , outputNum:number) =>{
    let returnArr = array || [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [returnArr[i], returnArr[j]] = [returnArr[j], returnArr[i]];
    }
    return returnArr.slice(0, outputNum);
  }

export default shuffleArray;