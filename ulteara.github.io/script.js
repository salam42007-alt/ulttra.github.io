const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");

const data = {
  houses: [
    {name:"house1", desc:"بيت عملي وكبير، مناسب للعمل الجماعي وفِرق الاستكشاف", price:"10 ألف كريديت"},
    {name:"house2", desc:"منزل ياباني واسع وأنيق", price:"30 ألف كريديت"},
    {name:"house3", desc:"منزل ريفي صغير وهادئ", price:"20 ألف كريديت"},
    {name:"house4", desc:"منزل ريفي متوسط، رائع وسهل إضافة الغرف", price:"مجاني للجدد و10 آلاف كريديت"},
    {name:"house5", desc:"منزل قروي عملاق وفسيح", price:"6 آلاف كريديت"},
    {name:"house6", desc:"منزل ريفي كبير، مناسب للعيش لثلاثة أشخاص", price:"11 ألف كريديت"}
  ],
  tools: [
    {name:"tool1", desc:"بيكاكس قوي جداً، قادر على كسر مساحة 3×3 بسهولة", price:"4 آلاف كريديت"},
    {name:"tool2", desc:"فأس قوي جداً لأعمال التعدين والتحطيم", price:"3 آلاف كريديت"},
    {name:"tool3", desc:"سيف قوي يضرب البرق، مع عدة تطويرات مميزة", price:"3 آلاف كريديت"}
  ],
  ranks: [
    {name:"rank1", desc:"Elite: +500 بلوكة كليم، سيف سوبر، 300 فلوس", price:"20 ألف كريديت"},
    {name:"rank2", desc:"VIP: +1000 بلوكة كليم، سيف سوبر، 3000 فلوس", price:"30 ألف كريديت"},
    {name:"rank3", desc:"Golding: +2000 بلوكة كليم، سيف سوبر، 5000 فلوس", price:"40 ألف كريديت"}
  ],
  claims: [
    {name:"claim1", desc:"100 بلوكة", price:"1 ألف كريديت"},
    {name:"claim2", desc:"300 بلوكة", price:"3 آلاف كريديت"},
    {name:"claim3", desc:"400 بلوكة", price:"4 آلاف كريديت"},
    {name:"claim4", desc:"1000 بلوكة", price:"10 آلاف كريديت"}
  ]
};

function showCategory(cat) {
  content.innerHTML = "";
  data[cat].forEach(item=>{
    const img = document.createElement("img");
    img.src = `images/${item.name}.png`;
    img.alt = item.name;
    img.onclick = ()=>{
      const details = document.createElement("div");
      details.className = "details";
      details.innerHTML = `<h3>${item.name}</h3><p>${item.desc}</p><p><b>${item.price}</b></p>`;
      content.innerHTML = "";
      content.appendChild(img);
      content.appendChild(details);
    };
    content.appendChild(img);
  });
}

// تفعيل التاب عند الضغط
tabs.forEach(tab=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach(t=>t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

// عرض الصفحة الرئيسية أولاً
content.innerHTML = "<p>اضغطي على أي خانة أعلاه لاستكشاف المنتجات!</p>";
