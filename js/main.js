
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

// handle categories function
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

    // get sort-by-views btn and call agin displayData for sorting
    document.getElementById("sort-by-views").addEventListener("click", () => {
        displayAllData(allData, true, true);
    });
}


let displayAllData = (allData, status, sortByViews) => {

    let emptyContainer = document.getElementById("empty-container");
    emptyContainer.innerHTML = "";
    let displayAllData = document.getElementById("display-data-container");
    displayAllData.innerHTML = "";


    if (status == true) {

        // sort the value depends on views
        if (sortByViews) {
            allData.sort((a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10));
        }

        allData.forEach(data => {
            let displayData = document.createElement("div");

            let dateTime = data?.others?.posted_date;

            // convert seconds to hours and minutes
            let hours = Math.floor(dateTime / 3600);
            let seconds = dateTime % 3600;
            let minutes = Math.floor(seconds / 60);
            let NewDateTime = `${hours}hrs ${minutes} minutes ago`
            let numericValue = parseFloat(NewDateTime);


            displayData.innerHTML = `
                <div>
                    <div class="relative" id="image-container">
                        <img class="rounded-md w-[400px] h-[250px] shadow-lg" src="${data?.thumbnail}" alt="no image found">
                        <small class="font-mono absolute top-[80%] right-4 bg-[#363636] py-1 text-white rounded-md ">${numericValue === 0 ? "" : NewDateTime}</small>
                    </div>
                    <div class="flex items-center mt-4">
                        <img class="rounded-full w-[40px] h-[40px]" src="${data.authors[0].profile_picture}" alt="no image found">
                        <h2 class="ml-4 font-bold text-2xl">${data?.title}</h2>
                    </div>
                    <div class="flex items-center ml-14">
                        <h4 class="text-[17px]">${data?.authors[0].profile_name}</h4>
                        <img class="h-4 ml-2 my-3" src="${data.authors[0]?.verified ? './images/verified.png' : ''}"" alt="">
                    </div>
                    <p class="ml-14 text-[17px] font-mono">${data?.others.views}</p>
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



