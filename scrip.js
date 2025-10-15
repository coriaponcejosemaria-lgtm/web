// =======================
// CONFIGURACIÓN DE TARIFAS
// =======================
const pricing = {
    standard: { base: 5, perKm: 2.8 },
    comfort: { base: 7, perKm: 3.6 },
    van: { base: 10, perKm: 4.2 },
    premium: { base: 15, perKm: 6 },
  };
  
  // Recargo nocturno (20%)
  const nightSurcharge = 0.2;
  
  // =======================
  // FUNCIONES AUXILIARES
  // =======================
  
  // Formatea números a moneda boliviana
  function toCurrency(value) {
    return `Bs. ${value.toFixed(2)}`;
  }
  
  // Verifica si la hora seleccionada es nocturna (22:00–06:00)
  function isNight(datetime) {
    if (!datetime) return false;
    const date = new Date(datetime);
    const hour = date.getHours();
    return hour >= 22 || hour < 6;
  }
  
  // Calcula la tarifa total según tipo, distancia y hora
  function calcFare(distance, type, datetime) {
    const vehicle = pricing[type] || pricing.standard;
    let fare = vehicle.base + distance * vehicle.perKm;
    if (isNight(datetime)) fare *= 1 + nightSurcharge;
    return fare;
  }
  
  // =======================
  // MANEJO DE EVENTOS
  // =======================
  
  // Botón "Calcular tarifa"
  document.getElementById("calcBtn").addEventListener("click", () => {
    const distance = parseFloat(document.getElementById("distance").value);
    const type = document.getElementById("vehicle").value;
    const datetime = document.getElementById("datetime").value;
  
    // Validación básica
    if (isNaN(distance) || distance <= 0) {
      alert("⚠️ Por favor, ingresa una distancia válida en kilómetros.");
      return;
    }
    if (!datetime) {
      alert("📅 Por favor, selecciona una fecha y hora.");
      return;
    }
  
    // Cálculo y visualización
    const fare = calcFare(distance, type, datetime);
    const fareText = toCurrency(fare);
  
    // Muestra la tarifa calculada
    const fareElement = document.getElementById("farePrice");
    fareElement.textContent = fareText;
    fareElement.style.color = "#e67e22";
    fareElement.style.fontWeight = "bold";
  
    // Animación visual
    fareElement.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
  });
  
  // Formulario "Confirmar reserva"
  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const datetime = document.getElementById("datetime").value;
    const fare = document.getElementById("farePrice").textContent;
  
    if (!from || !to || !datetime) {
      alert("⚠️ Por favor, completa todos los campos antes de confirmar.");
      return;
    }
  
    // Confirmación con resumen
    alert(
      `✅ Reserva confirmada:\n\n🛫 Desde: ${from}\n🏁 Hasta: ${to}\n🕒 Fecha y hora: ${datetime}\n💰 Tarifa: ${fare}\n\nGracias por usar Taximovil El Matieño 🚖`
    );
  
    // Limpia el formulario
    e.target.reset();
    document.getElementById("farePrice").textContent = "Bs. 0.00";
  });
  