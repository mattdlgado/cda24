// Importación de librerías
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Inicialización de Lenis para scroll suave
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

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
  if (formDiv) {
    setTimeout(() => {
      formDiv.classList.add("translate-y-0");
      formDiv.classList.remove("translate-y-[100dvh]");
    }, 100);
  } else {
    console.error("El elemento .hbspt-form no se encuentra en el DOM");
  }
};

// Configuración de animaciones de scroll
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const calendar = document.querySelector(".calendar");

  if (hero) {
    gsap.to(hero, {
      scale: 0.9,
      scrollTrigger: {
        trigger: hero,
        start: "bottom bottom",
        end: "bottom center",
        scrub: true,
      },
    });
  }

  if (calendar) {
    gsap.to(calendar, {
      y: -40,
      scrollTrigger: {
        trigger: calendar,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // Manejo de eventos para los días del calendario
  const btnForm = document.querySelectorAll(".calendar > div");
  const today = new Date();
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

  // Botón adicional para mostrar formulario
  const btnIn = document.getElementById("in");
  if (btnIn) {
    btnIn.addEventListener("click", createAndShowForm);
  }
});
