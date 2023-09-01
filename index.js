// const handleCategory = () => {
//    fetch('https://openapi.programming-hero.com/api/news/categories')
// .then(res => res.json())
// .then(data => console.log(data))
// //uporer ai code tukute jodi kono error khai tobe ai code nicher .catch block ar moddhe chole asbe
// .catch((err) => console.log(err));

// };

// uporer aitai amra akhon asynchronous vabe karbob then tokhon ai chianing method ar dorkar nai

const handleCategory = async () => {

    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json();
    // get the tab container by using id
    const tabContainer = document.getElementById('tab-container');
    const trimData = data.data.news_category.slice(0, 4);
    trimData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a> 
        `;
        tabContainer.appendChild(div);
    })

    console.log(data);

};


const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json()

    const cardContainer = document.getElementById('card-container');
    // nicher line a ar maddhome forEach loop cholar agei amra inner html take emty kare nibo because defualt akta page alwaya open die rakhsi
    // onno kono button a click karle prothome empty hobe then run karbe
    cardContainer.innerHTML = ``;
    data.data.forEach((news) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src=${news.image_url} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${news.title.slice(0, 40)}
            <div class="badge badge-secondary">${news?.rating?.badge}</div>
          </h2>
          <p>
          ${news.details.slice(0, 50)}
          </p>
          <h3> total views:${news.total_view ? news.total_view : 'No views'} </h3>
          <div class="card-footer flex mt-8">
            <div class ="flex">
                <div class =" avatar online">
                    <div class="w-14 rounded-full">
                      <img src= ${news.author?.img}/>
                    </div>
                 </div>
                </div>
                <div>
                  <h6> ${news.author?.name}</6>
                  <small> 2022-08-24 17:27:34 </small>
                </div>            
          </div>
          <div class="card-actions justify-start">
          <button onclick =handleModal('${news._id}') class="btn btn-primary">details</button>
        </div>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    })

}


const handleModal = async(newsId) => {
    console.log(newsId)
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId} `)
    const data = await response.json();
    console.log(data.data[0])
 
    const modalContainer = document.getElementById('modal-container')
    const div = document.createElement('div');
    div.innerHTML = `
    <!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg"> ${(data?.data[0])}</h3>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>ß
    `;
    modalContainer.append(div);

   const modal = document.getElementById('my_modal_1')
   modal.showModal();
}







handleCategory()
//nicher ai function ke call kare string ar moddhe parameter "01" die prothom tab ta default open hoe thakebe 
handleLoadNews("01")
