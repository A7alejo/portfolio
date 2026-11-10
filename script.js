// ===== Modo claro / oscuro =====
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function aplicarTema(tema) {
  root.setAttribute("data-theme", tema);
  const esOscuro = tema === "dark";
  themeBtn.setAttribute("aria-label", esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
}

// Si la persona ya eligió un tema antes, lo recordamos
let temaGuardado = null;
try {
  temaGuardado = localStorage.getItem("tema");
} catch (e) {
  temaGuardado = null;
}

if (temaGuardado) {
  aplicarTema(temaGuardado);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  aplicarTema("dark");
} else {
  aplicarTema("light");
}

themeBtn.addEventListener("click", () => {
  const nuevoTema = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  aplicarTema(nuevoTema);
  try {
    localStorage.setItem("tema", nuevoTema);
  } catch (e) {
    // Si el navegador no deja guardar, no pasa nada
  }
});

// ===== Reloj en vivo con la hora de Tandil =====
const clock = document.getElementById("clock");

function actualizarReloj() {
  const hora = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires"
  });
  clock.textContent = hora;
}

actualizarReloj();
setInterval(actualizarReloj, 1000);
