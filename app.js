let latitude, longitude = "";
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

} else {
    alert("tarayıcı konum bilgisi alamıyor")
}

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function onSuccess(position) {
    let mecid1 = 41.067305167974965
    let mecid2 = 29.001463846257728

    let ata1 = 40.99427065993157
    let ata2 = 29.12785456893241

    let pend1 = 40.87400258952425
    let pend2 = 29.253463958423193

    let mecid = getDistance(mecid1, mecid2, position.coords.latitude, position.coords.longitude)
    let ata = getDistance(ata1, ata2, position.coords.latitude, position.coords.longitude)
    let pend = getDistance(pend1, pend2, position.coords.latitude, position.coords.longitude)

    if (mecid < ata && mecid < pend) {
        document.getElementById("try").innerHTML = `<h1 style='font-size: 45px; font-weight: bold; text-align: center; margin-top: 300px;'>En yakın hastane Mecidiyeköy</h1>`;
    }
    else if (ata < mecid && ata < pend) {
        document.getElementById("try").innerHTML = `<h1 style='font-size: 45px; font-weight: bold; text-align: center; margin-top: 300px;'>En yakın hastane Ataşehir</h1>`;
    }
    else if (pend < mecid && pend < ata) {
        document.getElementById("try").innerHTML = `<h1 style='font-size: 45px; font-weight: bold; text-align: center; margin-top: 300px;'>En yakın hastane Pendik</h1>`;
    }
    else {
        console.log('Bir hata meydana geldi');
    }
}
function onError(error) {
    document.getElementById("try").innerHTML = `
        <p> error </p>
        `;
}


