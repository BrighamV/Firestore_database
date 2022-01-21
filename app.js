const recipieList = document.querySelector('#recipies');
const form = document.querySelector('#add-recipies');
const find = document.querySelector('#find-recipie');
const search = document.querySelector('#searchButton');
const clear = document.querySelector('#clear');
const show = document.querySelector("#everything");

// create element and render

function renderRecipie(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let time = document.createElement('span');
    let min = document.createElement('span');
    let cross =document.createElement('button');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    time.textContent = doc.data().time;
    min.textContent = "Minutes";
    cross.textContent = 'delete';

    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(min);
    li.appendChild(cross);

    recipieList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete();
    })
}

function display() {
    let searchTime = document.querySelector('#times').value;

    console.log(searchTime);
    db.collection('recipes').where("time", "==", searchTime).get().then((snapshot) => {   //get grabs the data from the database
    snapshot.docs.forEach(doc => {
    renderRecipie(doc);
        })
    })
}

function display2() {
    let searchTime = document.querySelector('#times').value;

    console.log(searchTime);
    db.collection('recipes').get().then((snapshot) => {   //get grabs the data from the database
    snapshot.docs.forEach(doc => {
    renderRecipie(doc);
        })
    })
}

// getting data
search.addEventListener('click', display);

show.addEventListener('click', display2);

clear.addEventListener('click', (e) => {
    document.getElementById('recipies').innerHTML = "";
})


// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('recipes').add({                    // add adds to the database
        name: form.name.value,
        time: form.time.value
    });
    form.name.value = "";
    form.time.value = "";
});

// active listener for data
// db.collection('recipies').orderBy('name').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     console.log(changes);
//     changes.forEach(change => {
//         if(change.type == 'added'){
//             renderRecipie(change.doc)
//         } else if (change.type == 'removed') {
//             let li = recipieList.querySelector('[data-id' + change.doc.id + ']');
//             recipieList.removeChild(li);
//         }
//     });
// });