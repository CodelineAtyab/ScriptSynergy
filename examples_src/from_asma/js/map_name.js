console.log("map method example ");

const names=["Asma","Ali","Ahmed","Ayesha","Sara","Sana"];

const newMapedList = names.map((n) => {
   let nameTeam = "";

    const firstletter = n.charAt(0).toUpperCase();
    // nameTeam = n +" [team "+ firstletter + "]";
    nameTeam = `${n} [team ${firstletter}]`
    return nameTeam;
//    return n + " [team " + names.startsWith("A")
});

console.log(newMapedList);