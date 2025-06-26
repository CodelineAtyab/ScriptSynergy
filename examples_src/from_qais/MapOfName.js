const ListOfName=["QAIS","MIAAD","MOHAMMED","QABASS"];
const myMapList= ListOfName.map((Q) => {

   let NameOfTeam = "";

    const FLetter = Q.charAt(0).toUpperCase();
    nameOFTeam = `${Q} [team ${FLetter}]`
    return nameOFTeam;

});

console.log(myMapList);



