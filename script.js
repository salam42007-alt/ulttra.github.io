const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input"); 
let currentCategory = "houses"; 

// -----------------------------------
// البيانات مع الامتداد الصحيح لكل صورة (JSON Structure)
// -----------------------------------
const data = {
  houses: [
    {name:"house1", ext:"webp", desc:"بيت عملي وكبير، مناسب للعمل الجماعي وفِرق الاستكشاف", price:"10 ألف كريديت"},
    {name:"house2", ext:"webp", desc:"منزل ياباني واسع وأنيق", price:"30 ألف كريديت"},
    {name:"house3", ext:"webp", desc:"منزل ريفي صغير وهادئ", price:"20 ألف كريديت"},
    {name:"house4", ext:"webp", desc:"منزل ريفي متوسط، رائع وسهل إضافة الغرف", price:"مجاني للجدد و10 آلاف كريديت"},
    {name:"house5", ext:"webp", desc:"منزل قروي عملاق وفسيح", price:"6 آلاف كريديت"},
    {name:"house6", ext:"webp", desc:"منزل ريفي كبير، مناسب لثلاثة أشخاص", price:"11 ألف كريديت"}
  ],
  tools: [
    {name:"tool1", ext:"webp", desc:"بيكاكس قوي جداً، قادر على كسر مساحة 3×3 بسهولة", price:"4 آلاف كريديت"},
    {name:"tool2", ext:"jpg", desc:"فأس قوي جداً لأعمال التعدين والتحطيم", price:"3 آلاف كريديت"},
    {name:"tool3", ext:"jpg", desc:"سيف قوي يضرب البرق، مع تطويرات مميزة", price:"3 آلاف كريديت"}
  ],
  ranks: [
    {name:"rank1", ext:"jpg", desc:"Elite: +500 بلوكة كليم، سيف سوبر، 300 فلوس", price:"20 ألف كريديت"},
    {name:"rank2", ext:"jpg", desc:"VIP: +1000 بلوكة كليم، سيف سوبر، 3000 فلوس", price:"30 ألف كريديت"},
    {name:"rank3", ext:"jpg", desc:"Golding: +2000 بلوكة كليم، سيف سوبر، 5000 فلوس", price:"40 ألف كريديت"}
  ],
  claims: [
    {name:"cliam", ext:"jpg", desc:"100 بلوكة", price:"1 ألف كريديت"},
    {name:"cliam", ext:"jpg", desc:"300 بلوكة", price:"3 آلاف كريديت"},
    {name:"cliam", ext:"jpg", desc:"400 بلوكة", price:"4 آلاف كريديت"},
    {name:"cliam", ext:"jpg", desc:"1000 بلوكة", price:"10 آلاف كريديت"}
  ]
};

// -----------------------------------
// 1. دالة إنشاء شاشة تفاصيل المنتج (New Page View)
// -----------------------------------
function showProductDetailsPage(item, category) {
    content.innerHTML = ""; // مسح قائمة المنتجات

    // 1. حاوية التفاصيل
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "product-details-page";
    detailsContainer.style.textAlign = 'center';

    // 2. زر العودة
    const backButton = document.createElement('button');
    backButton.textContent = '← العودة إلى القائمة';
    backButton.className = 'back-button';
    backButton.onclick = () => showCategory(category);
    
    // 3. الصورة الكبيرة
    const largeImg = document.createElement("img");
    largeImg.src = `images/${item.name}.${item.ext}`;
    largeImg.alt = item.name;
    largeImg.style.maxWidth = '100%';
    largeImg.style.maxHeight = '400px';
    largeImg.style.borderRadius = '15px';
    largeImg.style.margin = '20px auto';
    largeImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

    // 4. العنوان والوصف والسعر
    const cleanName = item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2');
    const infoHtml = `
        <h2 style="color: #FFD700;">${cleanName}</h2>
        <p style="font-size: 1.2em; max-width: 600px; margin: 0 auto 20px auto;">${item.desc}</p>
        <p style="font-size: 1.5em; font-weight: bold; color: #7CFC00;">السعر: ${item.price}</p>
        <button class="buy-button">طلب الشراء (تواصل معنا)</button>
    `;

    detailsContainer.appendChild(backButton);
    detailsContainer.appendChild(largeImg);
    detailsContainer.innerHTML += infoHtml; 

    content.appendChild(detailsContainer);
}


// -----------------------------------
// 2. دالة إنشاء بطاقة المنتج
// -----------------------------------
function createProductCard(item, category) {
    const card = document.createElement("div");
    card.className = `product-card ${category}`; 

    const img = document.createElement("img");
    img.src = `images/${item.name}.${item.ext}`;
    img.alt = item.name;
    img.loading = "lazy"; 

    const info = document.createElement("div");
    info.className = "product-info";
    const cleanName = item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2');
    info.innerHTML = `
        <h3>${cleanName}</h3> 
        <p>${item.price}</p>
    `;
    
    card.appendChild(img);
    card.appendChild(info);

    // ربط النقر بصفحة التفاصيل الجديدة
    card.onclick = () => {
        showProductDetailsPage(item, category);
    };
    
    return card;
}

// -----------------------------------
// 3. دالة عرض الفئة
// -----------------------------------
function renderProducts(products, cat) {
    content.innerHTML = "";
    if (products.length === 0) {
        content.innerHTML = `<p style="text-align: center; margin-top: 50px;">عذراً، لم يتم العثور على منتجات مطابقة في فئة ${cat} هذه.</p>`;
        return;
    }
    products.forEach(item => {
        content.appendChild(createProductCard(item, cat));
    });
}

function showCategory(cat) {
    currentCategory = cat;
    searchInput.value = ''; 
    renderProducts(data[cat], cat);
}

// -----------------------------------
// 4. دالة البحث (Filtering Function)
// -----------------------------------
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = data[currentCategory].filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const descMatch = item.desc.toLowerCase().includes(searchTerm);
        return nameMatch || descMatch;
    });
    
    renderProducts(filteredProducts, currentCategory);
}

// -----------------------------------
// 5. مستمعات الأحداث والتحميل الأولي
// -----------------------------------

tabs.forEach(tab=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach(t=>t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

searchInput.addEventListener("input", filterProducts);

// الإعداد الأولي (عرض المنازل أولاً افتراضياً)
showCategory('houses');
// تفعيل زر المنازل
document.querySelector('button[data-target="houses"]').classList.add("tab-active");