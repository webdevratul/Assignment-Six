
// load loadAllData function
let loadCategories = async () => {
    let res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    let data = await res.json();
    let categories = data.data;
    // call displayCategories function
    displayCategories(categories);
}

// display categories function 
let displayCategories = (categories) => {
    let cateGoriesContainer = document.getElementById("categories-container");
    categories.forEach(categorie => {
        let cateGoriesItem = document.createElement("div");
        cateGoriesItem.innerHTML = `
        <button class="bg-gray-200 py-2 px-8 mx-2 my-2 rounded-md" onclick="handleCategories(${categorie.category_id})">${categorie?.category}</button
        `
        cateGoriesContainer.appendChild(cateGoriesItem);
    });
}

let handleCategories = (categorieId) => {
    loadAllData(categorieId);
}

// call loadAllData function 
loadCategories();

// loadAllData function
let loadAllData = async (categorieId = "1000") => {
    let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categorieId}`)
    let data = await res.json();
    let allData = data.data;
    let status = data.status;
    // call displayAllData function
    displayAllData(allData, status);
}

let displayAllData = (allData, status) => {
    let emptyContainer = document.getElementById("empty-container");
    emptyContainer.innerHTML = "";
    let displayAllData = document.getElementById("display-data-container");
    displayAllData.innerHTML = "";
    if (status == true) {
        allData.forEach(data => {
            let displayData = document.createElement("div");
            displayData.innerHTML = `
                <div>
                    <img class="rounded-md w-full h-[250px] shadow-lg" src="${data?.thumbnail}" alt="">
                    <div class="flex items-center">
                        <img class="rounded-full w-[40px]" src="https://i.ibb.co/fDbPv7h/Noha.jpg" alt="">
                        <h2 class="ml-4 mt-4 font-bold text-xl">Building a Winning UX Strategy <br> Using the Kano Model
                        </h2>
                    </div>
                    <div class="flex items-center ml-14">
                        <h4 class="text-[17px]">${data?.authors[0].profile_name}</h4>
                        <img class="h-4 ml-2 my-3" src="${data.authors[0]?.verified ? './images/verified.png' : ''}"" alt="">
                    </div>
                    <p class="ml-14 text-[17px]">${data?.others.views}</p>
            </div>
            `
            displayAllData.appendChild(displayData);
        });
    } else {
        emptyContainer.innerHTML = `
        <div class="mx-auto w-[300px] text-center">
            <img class="mx-auto" src="./images/Icon.png" alt="">
            <h2 class="my-4 text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
       `
    }
}

// call loadAllData
loadAllData();



