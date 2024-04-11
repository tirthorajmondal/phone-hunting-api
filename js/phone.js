const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones);

    const phonesContainer = document.getElementById('phone-container');
    // clear phonesContainer
    phonesContainer.textContent = '';

    if(phones.length> 12){
        document.getElementById('show-all-container').classList.remove('hidden');
    }
    else{
         document.getElementById('show-all-container').classList.add('hidden');
    }

    // slice first 12 phones
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="Phone"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
            <div class="card-actions mt-2">
                <button class="btn btn-primary">Buy Now</button>
            </div>
            `;
        phonesContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);

}

// handle search button

function handleSearch() {
    toggleLoadingSpinner(true);
    const searchInput = document.getElementById('search').value;
    console.log(searchInput);
    loadPhone(searchInput);
}


// // handle search button 2
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchFieldValue = document.getElementById('search-field2').value;
//     loadPhone(searchFieldValue);
// }


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = (isShowAll) => {
    if(isShowAll){
        loadPhone()
    }
}