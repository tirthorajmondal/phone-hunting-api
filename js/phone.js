const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    console.log(phones);

    const phonesContainer = document.getElementById('phone-container');
    // clear phonesContainer
    phonesContainer.textContent = '';




    if (phones.length > 12 && !isShowAll) {
        document.getElementById('show-all-container').classList.remove('hidden');
    }
    else {
        document.getElementById('show-all-container').classList.add('hidden');
    }

    console.log('isShowAll', isShowAll);

    // slice first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

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
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod voluptate saepe dignissimos!</p>
                <p class="font-bold text-2xl">$999</p>
            <div class="card-actions mt-2">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            `;
        phonesContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);

}

// handle search button
function handleSearch(isShowAll) {
    toggleLoadingSpinner(true);
    const searchInput = document.getElementById('search').value;
    loadPhone(searchInput, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = (isShowAll) => {
    handleSearch(true);
}

// handle Show detail
const handleShowDetail = async (id) => {
    console.log('clicked show detail', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    // <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.!</p>
    <p><span>Storage: </span> ${phone?.mainFeatures?.storage
    }</p>
    <p><span>Storage: </span> ${phone.image}</p>
    <p><span>Storage: </span> ${phone.image}</p>
    <p></p>
    `;
    // show modal
    show_detail_modal.showModal()
}

loadPhone();


