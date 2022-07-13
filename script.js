const ulHistory = document.querySelector("ul.my-history")
// initial variables for the localStorage
localStorage.setItem("hidden","d-none");
var hid = localStorage.getItem("hidden");
// function to check form page and the main page 
const searchUsersInp = document.getElementById("search-for-users");
let noResult = document.getElementById("no-result");
// main page variable
const mainPage = document.getElementById("main");
// variables for the form page
const formPage = document.getElementById("form");
valid();
const inputUser = document.getElementById("input-user"),
contBtn = document.getElementById("cont-btn"),
checkUserIcon = document.getElementById("user-icon"),
errorIcon = document.getElementById("error-icon"),
contName = document.getElementById("cont-name"),
waitName = document.getElementById("wait-name");
const parentUsers = document.getElementById("parent-users");
// add event input to the input
inputUser.addEventListener("input", function(r){
    // make user write only alphabet
    inputUser.value = inputUser.value.trim().replaceAll(/[^a-z]/ig, "");
    if(/\w{3}/ig.test(inputUser.value)){
        errorIcon.classList.add("d-none");
        checkUserIcon.classList.remove("d-none")
    }
    else checkUserIcon.classList.add("d-none")
})
// add the shortcut enter
inputUser.addEventListener("keydown", (e) => {
    if(e.key === "Enter") contBtn.click();
})
// add event to the btn continue
contBtn.addEventListener("click", () => {
    errorIcon.classList.add("d-none");
    contBtn.classList.add("op-btn")
    contName.classList.add("d-none");
    waitName.classList.remove("d-none");
    // if the input info give an error
    var timeChecking = setTimeout(() => {
        if(/\w{3}/ig.test(inputUser.value) === false){
            errorIcon.classList.remove("d-none");
            checkUserIcon.classList.add("d-none");
            contBtn.classList.remove("op-btn")
            contName.classList.remove("d-none");
            waitName.classList.add("d-none");
        }
        // the other condition if it has the true name
        else {
            var arrHist = [];
            localStorage.setItem("user",inputUser.value);
            localStorage.setItem("history",JSON.stringify(arrHist));
            logIn();
            formPage.classList.add("d-none");
            mainPage.classList.remove("d-none");
            location.reload();
        }
    }, 2500)
})
// the declare function
function valid(){
    var loc = localStorage.getItem("user");
    if(loc){
    formPage.classList.add(hid);
    mainPage.classList.remove(hid);
    }
}

// the user name
var locUserName = localStorage.getItem("user");

// main page
const mainGreetUser = document.getElementById("ran-greet");
const userGreeted = document.getElementById("greet-user");
let gre = ["Hello, ","Hi, ","Yo!","Hey, ","Welcome, "];
let ranGre = gre[Math.floor(Math.random() * gre.length)]; //rangreeting

// replace greeting element with text with javascript
mainGreetUser.innerHTML = ranGre;
userGreeted.innerHTML = locUserName;

// modal add user
// describe info emojies
const descItems = [...document.querySelectorAll(".describe-info .describe .field")];
descItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.firstElementChild.classList.toggle(item.firstElementChild.dataset.bg);
        item.firstElementChild.classList.toggle("w-color");
        item.classList.toggle("selected-etat");
    })
})

// avatar info

const avatars = [...document.querySelectorAll(".avatar-info .image img")];
avatars.forEach((item) => {
    item.addEventListener("click", (e) => {
        avatars.forEach((one) => {
            one.parentElement.classList.remove("selected-img");
        });
        e.currentTarget.parentElement.classList.add("selected-img");
    })
})

// modal add interactive
const firstName = document.getElementById("prenom");
const lastName = document.getElementById("nom");
const inputs = document.querySelectorAll(".basic-info .input");
inputs.forEach((input) => {
    var inpField = input.firstElementChild;
    var icon = input.lastElementChild;
    inpField.addEventListener("input", () => {
        inpField.value = inpField.value.trim().replaceAll(/[^a-z]/ig,"")
        if(/\w{3}/ig.test(inpField.value)) icon.classList.remove("d-none");
        else icon.classList.add("d-none");
    });
})

// add btn user the most important thing

// buttons close modal
// const mainModal = document.getElementById("main-modal")
const parentModal = document.getElementById("parent-modal")
const closeModal = document.querySelectorAll(".close-modal");
closeModal.forEach((item) => {
    item.addEventListener("click", () => {
        parentModal.classList.add("d-none");
    })
})
// buttons show modal
const showModal = document.querySelectorAll(".show-modal");
showModal.forEach((show) => {
    show.addEventListener("click", () => {
        parentModal.classList.remove("d-none");
        parentModal.firstElementChild.scrollTo(0,0)
    });
})

// start adding user info

// declare btn add user and add event click
const addUser = document.getElementById("add-user");
addUser.addEventListener("click", function(){
    // the basic info variables
    let firstN = inputs[0].firstElementChild;
    let lastN = inputs[1].firstElementChild;
    // select info variables
    let forYouSelect =  document.getElementById("for-you-select");
    let genderSelect =  document.getElementById("gender-select");
    let forYouSelected = forYouSelect.selectedOptions[0].value; //selectedOpt
    let genderSelected = genderSelect.selectedOptions[0].value; //selectedOpt
    // select person trait variables
    let selectedTrait = [];
    descItems.forEach((item) => {
        if(item.classList.contains("selected-etat")) selectedTrait.push(item.innerHTML);
    })
    // avatar info select
    let selectedAvatarSrc;
    avatars.forEach((img) => {
        var imgParent = img.parentElement;
        if(imgParent.classList.contains("selected-img")){
            selectedAvatarSrc = img.src;
        }
    })
    // last step text Areainfo
    let additInfoInp = document.getElementById("addit-info"); //textarea

    // first condition => all the fields are not empty
    if(/\w{3}/.test(firstN.value) && /\w{3}/.test(lastN.value) && additInfoInp.value.trim() !== "" && selectedTrait.length){
        searchUsersInp.value = "";
        noResult.classList.add("d-none");
    // send info to the localStorage
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        var day = d.getDate();
    var locInfo = localStorage.getItem("infoUsers")
        if(locInfo) mainArr = JSON.parse(locInfo);
        else var mainArr = [];
        let objInfoUser = {
            fstName: firstN.value, // first name
            lstName: lastN.value, // last name
            fYou: forYouSelected, // for you
            gend: genderSelected, // gender
            arrEtats: selectedTrait, // etat
            profilSrc: selectedAvatarSrc, // profil
            textArea: additInfoInp.value, // textarea info
            date: `${y}-${m}-${day}`,
            edited: " ",
        }
        mainArr.push(objInfoUser); // push the info
        localStorage.setItem("infoUsers",JSON.stringify(mainArr));
        parentModal.classList.add("d-none");
        updateUsers();
        matchUsers();
        updateBackground();
        userAddedToHistory();
        resetModalInfo();
        updateHistory();
        addedSucc();
        isTheHistoryEmpty();
    }

    // second condition the reverse

    else{
        let formError = document.getElementById("form-error");
        formError.classList.remove("hid-item")
        var durError = setTimeout(() => {
            formError.classList.add("hid-item");
            formError.classList.add("error-form");
        }, 3500);
    }

})

// function update users
updateUsers();
function updateUsers(){
    var locInfo = localStorage.getItem("infoUsers");
    locInfo ? mainArr = JSON.parse(locInfo) : mainArr = [];
    let stack = '';
    mainArr.forEach((i,indx) => {
        stack += `
        <li class="flex align-center flex-between pd-10" id="${i.fstName} ${i.lstName}">
        <div class="info-img w-40 flex align-center">
          <div class="img-user center-bg-pos" style="background-image: url('${i.profilSrc}');">
          </div>
          <div class="name-info pdl-15">
            <h6 class="p-small capital add-width line-clamp">${i.fstName} ${i.lstName}</h6>
            <p class="p-xsmall light-grey capital add-width line-clamp capital">${i.fYou}<span id="is-it-edited" class="light-grey">${i.edited}</span></p>
          </div>
        </div>
        <div class="date dark-grey w-25 p-small d-hidden">${i.date}</div>
        <div class="gender dark-grey p-small d-hidden w-25">${i.gend}</div>
        <div class="more-device w-10 flex justify-end">
          <button class="secondary-btn btn white-bg p-mid flex align-center justify-center" onclick="showMeDetails(${indx})">
            <ion-icon name="ellipsis-horizontal" class="s-hidden"></ion-icon>
            <span class="d-hidden">details</span>
          </button>
        </div>
      </li>         
        `
    })
    parentUsers.innerHTML = stack;
}


// count users
matchUsers();
function matchUsers(){
    let parentUsersElements = [...document.querySelectorAll("#parent-users li")];
    let countUsers = document.getElementById("count-users");
    let emptyUsersItem = document.getElementById("empty-users");
    let mainUsersCont = document.getElementById("main-users-cont");
    countUsers.innerHTML = parentUsersElements.length;
    if(parseInt(countUsers.innerHTML) > 0){
        mainUsersCont.classList.remove("d-none");
        emptyUsersItem.classList.add("d-none");
    }else{
        emptyUsersItem.classList.remove("d-none")
        mainUsersCont.classList.add("d-none");
    };
}

// add the bg to the user
updateBackground();
function updateBackground(){
    let parentUsersElements = [...document.querySelectorAll("#parent-users li")];
    let filteredUsers = parentUsersElements.filter((it,index) => index % 2 === 0);
    filteredUsers.forEach((yp) => {
        yp.classList.add("light-bg");
    })
}

// reset modal info add user
resetModalInfo();
function resetModalInfo(){
    // inputs: first name and last name
    inputs.forEach((inp) => {
        inp.firstElementChild.value = "";
        inp.lastElementChild.classList.add("d-none");
    });
    // les etas
    descItems.forEach((des) => {
        des.firstElementChild.classList.remove("w-color");
        des.firstElementChild.classList.remove(des.firstElementChild.dataset.bg);
        des.classList.remove("selected-etat");
    })    
    // text area
    document.getElementById("addit-info").value = "";
}

// search for users

searchUsersInp.addEventListener("input", (e) => {
    // filter the users
    let noResult = document.getElementById("no-result");
    let inpValue = e.target.value.toLowerCase();
    let parentUsersElements = [...document.querySelectorAll("#parent-users li")];
    parentUsersElements.forEach((list) => {
        if(list.id.toLowerCase().includes(inpValue.trim().toLowerCase())){
            list.classList.remove("d-none");
        }else{
            list.classList.add("d-none");
        }
    })
    let filtredLists = parentUsersElements.filter((l) => {
        let reversed = l.classList.contains("d-none");
        return !reversed;
    });
    var locInfo = localStorage.getItem("infoUsers");
    if((filtredLists.length && locInfo) || !locInfo || locInfo === null || locInfo === "[]") noResult.classList.add("d-none");
    else if (filtredLists.length === 0) noResult.classList.remove("d-none")
})

// delete all users modal verify

const verifyModal = document.getElementById("verify-modal"); // modal
const titleVerify = document.getElementById("title-verify"); // title
const infoverify = document.getElementById("info-verify"); // content
const deleteAllIcon = document.getElementById("delete-all-icon"); // icon
const mainBtnVerify = document.getElementById("delete-all-users"); // btn
const closeVerify = document.getElementById("close-verify"); // close
let emptyUsersItem = document.getElementById("empty-users");
deleteAllIcon.addEventListener("click", () => {
    var locInfo = localStorage.getItem("infoUsers");
    var testNoUser = emptyUsersItem.classList.contains("d-none");
    searchUsersInp.value = "";
    noResult.classList.add("d-none");
    if(locInfo && testNoUser){
        verifyModal.classList.remove("d-none");
        mainBtnVerify.classList.remove("d-none");
        mainBtnVerify.classList.add("func-delete");
        mainBtnVerify.innerHTML = 'Delete All';
        titleVerify.innerHTML = "Delete All Users";
        infoverify.innerHTML = "Do you want really to delete all users ?";
        closeVerify.innerHTML = "cancel";
        // function delete and update users
    }else{
        verifyModal.classList.remove("d-none");
        mainBtnVerify.classList.add("d-none");
        infoverify.innerHTML = "You don't have any user yet !";
        titleVerify.innerHTML = "Delete All Users";
        closeVerify.innerHTML = "OK";
    }
})
// close modal verify
closeVerify.addEventListener("click", () => {
    verifyModal.classList.add("d-none");
});
// delete all users
mainBtnVerify.addEventListener("click", () => {
        allUsersDeletedHistory();
        localStorage.removeItem("infoUsers");
        verifyModal.classList.add("d-none");
        updateUsers();
        matchUsers();
        updateBackground();
        resetModalInfo();
        deletedSucc();
        updateHistory();
        isTheHistoryEmpty();
})

// start nav pages modal details

const navPages = document.querySelectorAll(".nav-pages .nav");
const sectPages = document.querySelectorAll(".modal-details .page");
navPages.forEach((nav,index) => {
    nav.addEventListener("click", () => {
        navPages.forEach((n) => n.classList.remove("active"));
        navPages[index].classList.add("active");
        sectPages.forEach((s) => s.classList.add("d-none"));
        sectPages[index].classList.remove("d-none");
    })
})


// function show details
// variables informations details
// up card
const nameDetails = document.getElementById("name-details");
const forYouDetails = document.getElementById("for-you-details");
// about
const genderDetails = document.getElementById("gender-details");
const dateAddedDetails = document.getElementById("date-added-details");
const listFeatures = document.getElementById("list-features");
// names edit
const fnameDetails = document.getElementById("fname-details");
const lnameDetails = document.getElementById("lname-details");
// icons
const editField = document.querySelectorAll("i.edit-field");
// select
const fselDetails = document.getElementById("fsel-details");
const sselDetails = document.getElementById("ssel-details");
// btns
const deleteDetails = document.getElementById("delete-details");
const editPic = document.getElementById("edit-pic");
// imgs
const imgFadeDetails = document.getElementById("img-fade");
const imgPro = document.getElementById("image-pro");
const bio = document.getElementById("bio");
// start showing data user
const maindetailsModal = document.querySelector("#modal-details .main-modal");
var indItem;
function showMeDetails(ind){
    var locInfo = localStorage.getItem("infoUsers");
    locInfo ? mainArr = JSON.parse(locInfo) : mainArr = [];
    modalDetails.classList.remove("d-none");
    maindetailsModal.scrollTo(0,0);
    navPages.forEach((nav,index) => {
            navPages.forEach((n) => n.classList.remove("active"));
            navPages[0].classList.add("active");
            sectPages.forEach((s) => s.classList.add("d-none"));
            sectPages[0].classList.remove("d-none");
    })
    // up card
    var ci = mainArr[ind];
    nameDetails.innerHTML = `${ci.fstName} ${ci.lstName}`; // name
    forYouDetails.innerHTML = `${ci.fYou}`; // for you
    // about card
    genderDetails.innerHTML = `${ci.gend}`; // gender
    dateAddedDetails.innerHTML = `${ci.date}`; // date
    listFeatures.innerHTML = ci.arrEtats.join("");
    var icons = [...listFeatures.children];
    icons.forEach((i) => i.firstElementChild.classList.add("d-none"));
    icons.forEach((i) => i.lastElementChild.classList.remove("pdl-15"));
    // edit info
    fnameDetails.value = `${ci.fstName}` // fst name
    lnameDetails.value = `${ci.lstName}` // lst name
    // select
    var optFst = [...fselDetails.options];
    var optScd = [...sselDetails.options];
    optFst.forEach((opt) => {
        opt.value == ci.fYou ? opt.setAttribute("selected","") : "";
    })
    optScd.forEach((opt) => {
        opt.value == ci.gend ? opt.setAttribute("selected","") : "";
    })
    // imgs
    imgFadeDetails.style.backgroundImage = `url('${ci.profilSrc}')`;
    imgPro.style.backgroundImage = `url('${ci.profilSrc}')`;
    // letter
    bio.innerHTML = ci.textArea;
    // edit field
    editField.forEach((ico) => {
        ico.addEventListener("click", () => {
            ico.parentElement.firstElementChild.removeAttribute("readonly");
            ico.parentElement.firstElementChild.focus();
        })
        ico.parentElement.firstElementChild.addEventListener("blur", () => {
            ico.parentElement.firstElementChild.setAttribute("readonly","");
        })
    })
    indItem = ind;
}
// delete option
deleteDetails.addEventListener("click", () => {
    modalDetails.classList.add("d-none");
    userDeletedFromHistory();
    mainArr.splice(mainArr.indexOf(mainArr[indItem]),1);
    localStorage.setItem("infoUsers", JSON.stringify(mainArr));
    updateUsers();
    matchUsers();
    updateBackground();
    resetModalInfo();
    deletedSucc();
    updateHistory();
    isTheHistoryEmpty();
})
// close modal details
const closeDetails = [...document.querySelectorAll(".close-details")];
const modalDetails = document.getElementById("modal-details");
closeDetails.forEach((h) => {
  h.addEventListener("click", () => {
    modalDetails.classList.add("d-none");
  });
})
// make user write only alphabetic
fnameDetails.addEventListener("input", () => {
    fnameDetails.value = fnameDetails.value.replaceAll(/[^a-z]/ig,"");
})
lnameDetails.addEventListener("input", () => {
    lnameDetails.value = lnameDetails.value.replaceAll(/[^a-z]/ig,"");
})
// btn save and close
const saveAndClose = document.getElementById("save-close");
// error characters
const errorDetailsEdit = document.getElementById("error-details-edit")
saveAndClose.addEventListener("click", () => {
    var locInfo = localStorage.getItem("infoUsers");
    locInfo ? mainArr = JSON.parse(locInfo) : mainArr = [];
    // save changes edit details
    // first condition the first and the second input are not empty
    if(/\w{3}/ig.test(fnameDetails.value) && /\w{3}/ig.test(lnameDetails.value)){
        modifyUser();
        var cur = mainArr[indItem];
        cur.fstName = fnameDetails.value;
        cur.lstName = lnameDetails.value;
        cur.fYou = fselDetails.selectedOptions[0].value;
        cur.gend = sselDetails.selectedOptions[0].value;
        cur.edited = " - (Edited)";
        localStorage.setItem("infoUsers",JSON.stringify(mainArr));
        modalDetails.classList.add("d-none");
        updateUsers();
        matchUsers();
        updateBackground();
        resetModalInfo();
        savedSucc();
        updateHistory();
        isTheHistoryEmpty();
    // second condition the first and the second input are empty or less than 3 characters.
    }else{
        errorDetailsEdit.classList.remove("d-none");
        var timeEdit = setTimeout(() => {
            errorDetailsEdit.classList.add("d-none");
        }, 4000)
    }
})

// edit picture 

const inpFile = document.getElementById("up");
inpFile.addEventListener("change", () => {
    var locInfo = localStorage.getItem("infoUsers");
    locInfo ? mainArr = JSON.parse(locInfo) : mainArr = [];
    var current = mainArr[indItem];
    const fileRead = new FileReader();
    fileRead.addEventListener("load", () => {
        let uplImage = fileRead.result;
        console.log(uplImage);
        current.profilSrc = uplImage;
        current.edited = " - (Edited)";
        localStorage.setItem("infoUsers", JSON.stringify(mainArr)); 
    })
    fileRead.readAsDataURL(inpFile.files[0]);
    location.reload();
    profilUserUpdated();
    savedSucc();
    updateHistory();
    isTheHistoryEmpty();
})
/* 

nav pages
search

*/
const addSucc = document.getElementById("add-succ");
const saveSucc = document.getElementById("save-succ");
const delSucc = document.getElementById("del-succ");

function addedSucc(){
    addSucc.classList.add("active");
    setTimeout(() => {
        addSucc.classList.remove("active");
    }, 2500)
}
function savedSucc(){
    saveSucc.classList.add("active");
    setTimeout(() => {
        saveSucc.classList.remove("active");
    }, 2500)
}
function deletedSucc(){
    delSucc.classList.add("active");
    setTimeout(() => {
        delSucc.classList.remove("active");
    }, 2500)
}

// start account settings

// field
const nameYourAccount = document.getElementById("name-your-account");
// img
const yourProfilPic = document.getElementById("your-profil-pic");
// edit profil picture
const labelCam = document.getElementById("cam");
// icons
const iconNameAccount = document.getElementById("icon-name-account");
// hover info
const hoverInfo = document.getElementById("hover-info");
iconNameAccount.addEventListener("click", () => {
    nameYourAccount.removeAttribute("readonly");
    nameYourAccount.focus();
})
nameYourAccount.addEventListener("blur", () => {
    var locUser = localStorage.getItem("user");
    if(locUser !== nameYourAccount.value && /\w{3}/ig.test(nameYourAccount.value)){
        nameYourAccount.setAttribute("readonly","");
        updateUserName();
        localStorage.setItem("user",nameYourAccount.value);
        userGreeted.innerHTML = nameYourAccount.value;
        updateHistory();
        isTheHistoryEmpty();
        savedSucc();
    }
});
nameYourAccount.addEventListener("input", () => {
    nameYourAccount.value = nameYourAccount.value.replaceAll(/[^a-z]/ig,"");
   if(/\w{3}/ig.test(nameYourAccount.value)){
    hoverInfo.classList.add("d-none");
}else{
    hoverInfo.classList.remove("d-none");
   }
});

// get the name of the user
var locUser = localStorage.getItem("user");
locUser ? nameYourAccount.value = locUser : "";

// edit my profil picture

labelCam.addEventListener("change", () => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
       var uplProfil = reader.result;
       yourProfilPic.style.backgroundImage = `url('${uplProfil}')`;
       localStorage.setItem("profil", uplProfil);
    })
    reader.readAsDataURL(labelCam.files[0]);
    updateMyProfilPic();
    updateHistory();
    isTheHistoryEmpty();
    savedSucc();
})

var locPict = localStorage.getItem("profil");
locPict ? yourProfilPic.style.backgroundImage = `url('${locPict}')` : yourProfilPic.style.backgroundImage = "url('imgs/picture.jpg')";

// delete my account for ever

const deleteForEver = document.getElementById("delete-for-ever");
const modalForEver = document.getElementById("modal-for-ever");
const deleteMe = document.getElementById("delete-me");
const closeMe = document.getElementById("close-for-ever");
const hoverPaste = document.getElementById("paste");
const inputFor = document.getElementById("input-for-ever");
deleteMe.addEventListener("click",() => {
    modalForEver.classList.remove("d-none");
    inputFor.value = "";
    deleteForEver.classList.remove("active");
})
closeMe.addEventListener("click",() => {
    modalForEver.classList.add("d-none");
})

// start working on this topic
inputFor.addEventListener("input", () => {
    if(inputFor.value.trim().toLowerCase() === "you are legend salhi ^_^"){
        deleteForEver.classList.add("active");
        deleteForEver.addEventListener("click", (k) => {
            localStorage.removeItem("user");
            localStorage.removeItem("infoUsers");
            localStorage.removeItem("profil");
            localStorage.removeItem("history");
            location.reload();
        });
    }
    else deleteForEver.classList.remove("active");
})
inputFor.addEventListener("paste", () => {
    var inpField = inputFor.value;
   hoverPaste.classList.remove('d-none');
   setTimeout(() => {
    deleteForEver.classList.remove("active");
    inputFor.value = inpField;
   }, 1)
   setTimeout(() => {
    if(inputFor.value.trim().toLowerCase() === "you are legend salhi ^_^"){
        deleteForEver.classList.add("active");
    }
   }, 1)
   setTimeout(() => {
    hoverPaste.classList.add("d-none");
   }, 2000);
});

// start the history section
if(localStorage.getItem("history")) updateHistory();
function updateHistory(){
    var locHist = localStorage.getItem("history");
    var arrHist = JSON.parse(locHist);
    var pub = '';
    arrHist.forEach((a,d) => {
        pub += `
        <li class="flex align-center flex-between pd-20">
        <div class="left">
          <p class="light-black count-me">${a.action}</p>
          <p class="light-grey p-small">${a.fullDate}</p>
        </div>
        <div class="right pdl-20">
          <ion-icon name="trash-outline" class="dark-grey close-history cursor" onclick="deleteThis(${d})"></ion-icon>
        </div>
      </li>
        `
    })
    ulHistory.innerHTML = pub;
}


function logIn(){
    // localStorage
    var username  = localStorage.getItem("user");
    var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
    // date
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    var day = d.getDate();
    // time
    var d = new Date();
    var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
    var pmAm = h >= 12 ? "PM" : "AM";
    var objHist = {
        fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
        action: `logged into your account as <strong>${username}</strong>.`,
    }
    // update local storage
    arrHist.push(objHist);
    localStorage.setItem("history", JSON.stringify(arrHist));
}
function updateMyProfilPic(){
     // localStorage
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: `Updated your profile picture.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));   
}
function updateUserName(){
     // localStorage
     var oldName = localStorage.getItem("user");
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: `Updated your name from <strong>${oldName}</strong> to <strong>${nameYourAccount.value}</strong>.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));   
}
function userAddedToHistory(){
    // names
    let firstN = inputs[0].firstElementChild;
    let lastN = inputs[1].firstElementChild;
     // localStorage
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: `<strong>${firstN.value} ${lastN.value}</strong> is added to your users.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));
}
function userDeletedFromHistory(){
    let theFname = mainArr[indItem].fstName;
    let theLname = mainArr[indItem].lstName;
     // localStorage
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: `<strong>${theFname} ${theLname}</strong> is deleted from your users.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));
}
function allUsersDeletedHistory(){
     // localStorage
     var locInfo = localStorage.getItem("infoUsers");
     locInfo ? mainArr = JSON.parse(locInfo) : mainArr = [];
     var users = [];
     mainArr.forEach((s) => {
        users.push(`${s.fstName} ${s.lstName}`);
     })
     var lastUser = users.splice(users.length - 1,1);
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: mainArr.length > 1 ? `<strong>${users.join(" , ")}</strong> and  <strong>${lastUser.join("")}</strong> are deleted from your users` : `<strong>${lastUser.join("")}</strong> is deleted from your users`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));
} 
function profilUserUpdated(){
    // names
    let theFname = mainArr[indItem].fstName;
    let theLname = mainArr[indItem].lstName;
     // localStorage
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: /s\b/ig.test(theLname.trim()) ? `<strong>${theFname} ${theLname}</strong> profil picture is updated.` : `<strong>${theFname} ${theLname}'s</strong> profil picture is updated.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));   
}
function deleteThis(k){
    var arrHist = JSON.parse(localStorage.getItem("history"));
    arrHist.splice(arrHist.indexOf(k), 1);
    localStorage.setItem("history", JSON.stringify(arrHist));
    deletedSucc();
    updateHistory();
    isTheHistoryEmpty();
}
const emptyHistory = document.getElementById("empty-hist")
if(localStorage.getItem("history")) isTheHistoryEmpty();
function isTheHistoryEmpty(){
    var arrHist = JSON.parse(localStorage.getItem("history"));
    if(arrHist.length === 0){
        emptyHistory.classList.remove("d-none");
    }
    else emptyHistory.classList.add("d-none");
}

function modifyUser(){
    // names
    let theFname = mainArr[indItem].fstName;
    let theLname = mainArr[indItem].lstName;
     // localStorage
     var arrHist = JSON.parse(localStorage.getItem("history")); // get the arr
     // date
     var d = new Date();
     var y = d.getFullYear();
     var m = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
     var day = d.getDate();
     // time
     var d = new Date();
     var h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
     var min = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
     var s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
     var pmAm = h >= 12 ? "PM" : "AM";
     var objHist = {
         fullDate: `${y}-${m}-${day} at ${h}:${min}:${s} ${pmAm}`,
         action: /s\b/ig.test(theLname.trim()) ? `<strong>${theFname} ${theLname}</strong> profil is modified.` : `<strong>${theFname} ${theLname}'s</strong> profil is modified.`,
     }
     // update local storage
     arrHist.push(objHist);
     localStorage.setItem("history", JSON.stringify(arrHist));   
}

// start with droped and drop items

const drops = [...document.querySelectorAll(".drop")];

drops.forEach((drop,indx) => {
    drop.addEventListener("click", () => {
        drops[indx].nextElementSibling.classList.toggle("d-none");
    })
})

// start with count api

const visitor = document.getElementById("visitor");

function websiteVisits(response){
    visitor.innerHTML = response.value;
}

// key 772f8f3b-f369-4526-8259-96f91cab3cb4