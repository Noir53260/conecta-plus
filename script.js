const plans = [
  {type:"2 PLAY", speed:"600", price:"18,00", benefits:["MESH","ECDF","PRIME"], condition:"", hot:false},
  {type:"2 PLAY", speed:"850", price:"20,00", benefits:["ECDF","HBO MAX","PRIME"], condition:"", hot:false},
  {type:"2 PLAY", speed:"1000", price:"17,98", benefits:["ECDF","HBO","PRIME"], condition:"", hot:true},
  {type:"2 PLAY", speed:"1024", price:"25,00", benefits:["ECDF","PRIME","HBO"], condition:"", hot:false},
  {type:"2 PLAY", speed:"300", price:"13,00", benefits:[], condition:"ADULTO", hot:false},
  {type:"2 PLAY", speed:"300", price:"11,50", benefits:[], condition:"DISCAPACIDAD", hot:false},
  {type:"2 PLAY", speed:"400", price:"17,00", benefits:[], condition:"RESCATE DEC", hot:false},
  {type:"1 PLAY", speed:"600", price:"18,00", benefits:[], condition:"EFECTIVO", hot:false},
  {type:"3 PLAY", speed:"600", price:"24,00", benefits:["ECDF","HBO MAX","PRIME"], condition:"TODO CLARO", hot:true},
  {type:"3 PLAY", speed:"600", price:"24,00", benefits:["ECDF","HBO MAX","PRIME"], condition:"CAMBIATE", hot:false},
  {type:"3 PLAY", speed:"850", price:"27,00", benefits:["ECDF","HBO MAX","PRIME"], condition:"CAMBIATE", hot:false},
  {type:"3 PLAY", speed:"850", price:"22,95", benefits:["HBO MAX","PRIME"], condition:"TARJETA DE CRÉDITO", hot:false},
  {type:"3 PLAY", speed:"850", price:"22,83", benefits:["ECDF"], condition:"TARJETA DE CRÉDITO", hot:false},
  {type:"3 PLAY PREMIUM", speed:"1024", price:"33,00", benefits:["HBO MAX + PRIME","HBO MAX + ECDF","PRIME + ECDF"], condition:"", hot:true},
  {type:"3 PLAY PREMIUM", speed:"1024", price:"28,05", benefits:["HBO MAX + PRIME","HBO MAX + ECDF"], condition:"", hot:false},
  {type:"4 PLAY", speed:"1024", price:"40,00", benefits:["ECDF","PRIME","HBO MAX"], condition:"", hot:false}
];

const grid = document.getElementById("plansGrid");

function whatsapp(plan){
  const text = `Hola, quiero información del plan ${plan.type} de ${plan.speed} Mbps por $${plan.price}. Quiero consultar cobertura y requisitos.`;
  return `https://wa.me/593982939218?text=${encodeURIComponent(text)}`;
}

function render(filter="all"){
  grid.innerHTML = "";
  plans.forEach((p, index) => {
    if(filter !== "all" && p.type !== filter) return;
    const card = document.createElement("article");
    card.className = "plan-card" + (p.hot ? " hot" : "");
    const benefits = p.benefits.length ? p.benefits : ["Consulta las condiciones de este plan"];
    const serviceNote = p.type === "1 PLAY" ? "Solo Internet" :
      p.type === "2 PLAY" ? "Internet + Telefonía" :
      p.type.includes("3 PLAY") ? "Internet + TV · 91 canales · hasta 3 decodificadores" :
      "Consulta los servicios incluidos";
    card.innerHTML = `
      ${p.hot ? '<div class="badge">DESTACADO</div>' : ""}
      <div class="plan-type">${p.type}</div>
      <h3 class="plan-name">${serviceNote}</h3>
      <div class="speed">${p.speed} <small>Mbps</small></div>
      <div class="price-row"><div class="price">$${p.price}</div><div class="price-note">sin IVA</div></div>
      <ul class="plan-features">${benefits.map(x=>`<li>${x}</li>`).join("")}</ul>
      <div class="condition">${p.condition || "&nbsp;"}</div>
      <a class="plan-btn" href="${whatsapp(p)}" target="_blank" rel="noopener">Consultar este plan ↗</a>
    `;
    grid.appendChild(card);
  });
}

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});
render();
