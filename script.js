// HARDI Estate — GitHub Pages demo
// Ganti nomor WhatsApp di bawah dengan nomor bisnis Anda, format internasional tanpa + atau spasi.
const WHATSAPP_NUMBER = "6285811320376";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const filterButtons = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#property-search");
const cards = [...document.querySelectorAll(".property-card")];
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

function filterProperties() {
  const term = searchInput.value.trim().toLocaleLowerCase("id");
  let visible = 0;
  cards.forEach(card => {
    const typeMatch = activeFilter === "all" || card.dataset.type === activeFilter;
    const searchMatch = card.dataset.search.includes(term) || card.textContent.toLocaleLowerCase("id").includes(term);
    const show = typeMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  filterProperties();
}));
searchInput.addEventListener("input", filterProperties);

// Klik kartu/tombol properti: isi kebutuhan lalu arahkan ke formulir konsultasi.
document.querySelectorAll("[data-property]").forEach(link => {
  link.addEventListener("click", () => {
    const property = link.dataset.property;
    const interest = document.querySelector('select[name="interest"]');
    const message = document.querySelector('textarea[name="message"]');
    if (interest) interest.value = property === "The Aurelia" ? "Mencari apartemen" : "Membeli rumah";
    if (message && !message.value.trim()) message.value = `Saya tertarik mengetahui lebih lanjut tentang ${property}.`;
  });
});


const form = document.querySelector("#contact-form");
const toast = document.querySelector("#toast");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const contact = String(data.get("contact") || "").trim();
  const interest = String(data.get("interest") || "").trim();
  const message = String(data.get("message") || "").trim();
  const text = [
    "Halo HARDI Estate, saya ingin berkonsultasi.",
    "",
    `Nama: ${name}`,
    `Kontak saya: ${contact}`,
    `Kebutuhan: ${interest}`,
    message ? `Catatan: ${message}` : ""
  ].filter(Boolean).join("\n");
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "6281234567890") {
    toast.textContent = "Demo nomor WhatsApp aktif. Ganti WHATSAPP_NUMBER di script.js sebelum digunakan.";
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 4500);
    // Membuka WhatsApp dengan nomor contoh hanya jika memang ingin mencoba:
    // window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
document.querySelector("#year").textContent = new Date().getFullYear();

// Subtle reveal for sections as they enter view.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".intro-main, .intro-photo, .section-heading, .services-layout, .journal-grid, .contact-left, .contact-form").forEach(el => observer.observe(el));
}