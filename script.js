const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input"); // تم ربطه في HTML بـ .search-in-nav
let currentCategory = "houses"; 

// البيانات مع الامتداد الصحيح لكل صورة (JSON Structure)
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
// 1. دالة إنشاء بطاقة المنتج
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
    // يتم استبدال (house1) إلى (House 1) لتكون مقروءة
    const cleanName = item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2');
    info.innerHTML = `
        <h3>${cleanName}</h3> 
        <p>${item.price}</p>
    `;
    
    card.appendChild(img);
    card.appendChild(info);

    // حالياً، وظيفة النقر تعرض الوصف في تنبيه
    card.onclick = () => {
        alert(`تفاصيل ${cleanName}:\n${item.desc}\nالسعر: ${item.price}`);
    };
    
    return card;
}

// -----------------------------------
// 2. دالة عرض الفئة
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
// 3. دالة البحث (Filtering Function)
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
// 4. مستمعات الأحداث
// -----------------------------------

// ربط أزرار التنقل
tabs.forEach(tab=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach(t=>t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

// ربط حقل البحث
searchInput.addEventListener("input", filterProducts);

// الإعداد الأولي (عرض المنازل أولاً افتراضياً)
showCategory('houses');
document.querySelector('button[data-target="houses"]').classList.add("tab-active");