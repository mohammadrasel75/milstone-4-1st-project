let thrivingList = []; 
let strugglingList = []

let total = document.getElementById('total');
let strugglingCount = document.getElementById('strugglingCount');
let thrivingCount = document.getElementById('thrivingCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const thrivingFilterBtn = document.getElementById('thriving-filter-btn');
const strugglingFilterBtn = document.getElementById('struggling-filter-btn');
const filteredSection = document.getElementById('filtered-section')



const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main')


function calculateCount() {
    total.innerText = allCardSection.children.length  //3
    thrivingCount.innerText = thrivingList.length
    strugglingCount.innerText = strugglingList.length

}

calculateCount();

function toggleStyle(id){
    allFilterBtn.classList.remove('bg-black','text-white')
    thrivingFilterBtn.classList.remove('bg-black','text-white')
    strugglingFilterBtn.classList.remove('bg-black','text-white')

    allFilterBtn.classList.add('bg-gray-300','text-black')
    thrivingFilterBtn.classList.add('bg-gray-300','text-black')
    strugglingFilterBtn.classList.add('bg-gray-300','text-black')

    // console.log(id)

    const selected = document.getElementById(id)

    // console.log(selected)

    selected.classList.remove('bg-gray-300','text-black')
    selected.classList.add('bg-black', 'text-white')

    if(id == 'thriving-filter-btn'){
        allCardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden'); 
    }else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    }
}


mainContainer.addEventListener('click', function(event){

    console.log(event.target.parentNode);

    console.log(event.target.classList.contains('thriving-btn'));
    if(event.target.classList.contains('thriving-btn')){
        
    const parentNode = event.target.parentNode;
    const plantName = parentNode.querySelector('.plantName').innerText
    const latinName = parentNode.querySelector('.latinName').innerText
    const light = parentNode.querySelector('.light').innerText
    const water = parentNode.querySelector('.water').innerText
    const status = parentNode.querySelector('.status').innerText
    const notes = parentNode.querySelector('.notes').innerText

    const cardInfo = {
        plantName, 
        latinName,
        light,
        water,
        status,
        notes
    }

    const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName)
    
    if (!plantExist){
        thrivingList.push(cardInfo)
    }
   renderThriving ()    
    }
        

                   
})

function renderThriving () {
    filteredSection.innerHTML = ''

    for(let thrive of thrivingList){
        console.log(thrive)
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                <!-- part 1-->
                <div>
                    <p class="plantName text-4xl">${thrive.plantName}Plant Name 1</p>
                    <p class="latinName">Latin Name </p>
                </div>
                <!-- part 2 -->
                 <div class="flex gap-2">
                    <p class="light bg-gray-200 px-5">Bright Indicate </p>
                    <p class="water bg-gray-200 px-5">Weekly</p>
                 </div>
                 <!-- part 3 -->
                  <p class="status">Not applicable </p>
                  <p class="notes">New leaf unfurling by the east window. </p>
                  <div class="flex gap-5">
                    <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                    <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                  </div>
            </div>
            <!-- main part 2 -->
            <div>
                <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
            </div> `
        filteredSection.appendChild(div)    
    }
}