// Importación de librerías
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Inicialización de Lenis para scroll suave
const lenis = new Lenis({
  duration: 1.2, // Duración de la animación (segundos)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Función de easing
  smoothWheel: true, // Suaviza el scroll con la rueda del ratón
  smoothTouch: false, // Habilitar/deshabilitar el scroll suave con touch
});

// Vincular Lenis con ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Manejo de clics en enlaces con href="#id"
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    const targetId = anchor.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      lenis.scrollTo(targetElement, {
        duration: 1.2, // Tiempo de desplazamiento personalizado (opcional)
        offset: 0, // Desplazamiento opcional, p. ej., para un encabezado fijo
        immediate: false, // Hacer el scroll instantáneo si es necesario
      });
    }
  });
});

let inputValue = null;
let formCreated = false;

// Función para crear y mostrar el formulario
const createAndShowForm = () => {
  if (!formCreated) {
    // Crear el contenedor del formulario si no existe
    let formDiv = document.querySelector(".hbspt-form");
    if (!formDiv) {
      formDiv = document.createElement("div");
      formDiv.classList.add("hbspt-form");
      document.body.appendChild(formDiv);
    }

    // Aplicar clases iniciales para animación
    formDiv.classList.add("translate-y-[100dvh]");

    // Crear el formulario con HubSpot
    hbspt.forms.create({
      portalId: "6604339",
      formId: "a0b6fb00-a9e5-4349-87d1-9fc7feff2b88",
      target: ".hbspt-form",
      onFormReady: ($form) => {
        const hiddenInput = $form.querySelector('input[name="auxdev"]');
        if (hiddenInput) {
          hiddenInput.value = inputValue || "";
        }
      },
    });
    formCreated = true;
  }

  // Mostrar el formulario
  const formDiv = document.querySelector(".hbspt-form");
  const btnClose = document.getElementById("close");
  if (formDiv && btnClose) {
    setTimeout(() => {
      formDiv.classList.add("translate-y-0");
      formDiv.classList.remove("translate-y-[100dvh]");
      btnClose.classList.add("translate-y-0");
      btnClose.classList.remove("-translate-y-20");
    }, 100);
  } else {
    console.error(
      "El elemento .hbspt-form o el botón de cierre no se encuentra en el DOM"
    );
  }
};

// Configuración de animaciones de scroll
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const calendar = document.querySelector(".calendar");

  // Definir la fecha de inicio (1 de diciembre)
  const startDate = new Date();
  startDate.setMonth(11); // Diciembre es el mes 11 (0-indexado)
  startDate.setDate(1); // Primer día de diciembre

  const today = new Date();

  if (today < startDate) {
    // Si la fecha actual es anterior al 1 de diciembre, deshabilitar la interacción
    const btnForm = document.querySelectorAll(".calendar > div");
    btnForm.forEach((dayElement) => {
      dayElement.classList.add("disabled");
      dayElement.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir el evento de clic
      });
    });
    console.log("El formulario no está accesible hasta el 1 de diciembre.");
  } else {
    // Manejo de eventos para los días del calendario
    const btnForm = document.querySelectorAll(".calendar > div");
    const currentDay = today.getDate(); // Día dinámico actual

    btnForm.forEach((dayElement) => {
      dayElement.addEventListener("click", () => {
        const dayValue = parseInt(dayElement.getAttribute("data-day"));

        if (dayValue > currentDay) {
          inputValue = "soon";
        } else {
          inputValue = dayValue;
          createAndShowForm();
        }
      });
    });
  }

  // Botón adicional para mostrar formulario
  const btnIn = document.getElementById("in");
  if (btnIn) {
    btnIn.addEventListener("click", createAndShowForm);
  }

  // Botón para cerrar el formulario
  const btnClose = document.getElementById("close");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      const formDiv = document.querySelector(".hbspt-form");
      if (formDiv) {
        btnClose.classList.add("-translate-y-20");
        btnClose.classList.remove("translate-y-0");
        formDiv.classList.add("translate-y-[100dvh]");
        formDiv.classList.remove("translate-y-0");
      } else {
        console.error(
          "El elemento .hbspt-form no se encuentra en el DOM para cerrar"
        );
      }
    });
  }
});
