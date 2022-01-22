// creating variables for later use

const recipieList = document.querySelector('#recipies');
const form = document.querySelector('#add-recipies');
const find = document.querySelector('#find-recipie');
const search = document.querySelector('#searchButton');
const clear = document.querySelector('#clear');
const show = document.querySelector('#everything');

// create element and render

function renderRecipie(doc){
    // creating elements that will get inserted into our html
    let li = document.createElement('li');
    let name = document.createElement('span');
    let time = document.createElement('span');
    let min = document.createElement('span');
    let cross =document.createElement('button');
    let update = document.createElement('button');

    // adding info to our elements by grabbing data from our database
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    time.textContent = doc.data().time;
    min.textContent = "Minutes ";
    cross.textContent = ' delete ';
    update.textContent = " update ";

    // putting everything into a li
    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(min);
    li.appendChild(cross);
    li.appendChild(update);

    // put everything into our ul
    recipieList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete();
    })

    // Updating data
    update.addEventListener('click', (e) => {
        let n = document.querySelector("#eName").value;
        let t = document.querySelector("#eTime").value;

        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).update({                                       // update will change the specified items in the database
            name: n,
            time: t
        })
    })
}

// this displays info according to the entered time
function display() {
    let searchTime = document.querySelector('#times').value;

    console.log(searchTime);
    db.collection('recipes').where("time", "==", searchTime).get().then((snapshot) => {   //where is used to query the database. takes 3 arguments
    snapshot.docs.forEach(doc => {
    renderRecipie(doc);
        })
    })
}

// this is for displaying every item in the database
function display2() {

    db.collection('recipes').get().then((snapshot) => {   //get grabs the data from the database
    snapshot.docs.forEach(doc => {
    renderRecipie(doc);
        })
    })
}

// getting data
search.addEventListener('click', display);

show.addEventListener('click', display2);

// clearing out the ul
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
