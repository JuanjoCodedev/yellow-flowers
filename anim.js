// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 140 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6,
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);

function createFlower() {
  const flowerContainer = document.querySelector(".flower-container");

  // Número máximo de flores en pantalla
  const maxFlowersOnScreen = 15;

  // Verificar si ya hay 10 flores en pantalla
  if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
    return; // No crear más flores
  }

  // Número máximo de flores a crear simultáneamente (entre 1 y 5)
  const maxFlowers = Math.ceil(Math.random() * 5 + 1);
  const flowerSize = 100; // Tamaño de la flor

  // Arrays para almacenar las posiciones de las flores existentes
  const existingPositions = [];

  for (let j = 0; j < maxFlowers; j++) {
    let positionValid = false;
    let randomX, randomY;

    // Generar posiciones aleatorias y verificar que no se superpongan con las existentes
    while (!positionValid) {
      randomX = Math.random() * (window.innerWidth - flowerSize);
      randomY = Math.random() * (window.innerHeight - flowerSize);

      positionValid = true;

      // Verificar si la nueva posición está lo suficientemente alejada de las posiciones existentes
      for (const position of existingPositions) {
        const distance = Math.sqrt(
          Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2),
        );
        if (distance < 0) {
          // Rango de 300 píxeles recomendado para pc, en celular con 0
          positionValid = false;
          break;
        }
      }
    }

    // Agregar la nueva posición a la lista de posiciones existentes
    existingPositions.push({ x: randomX, y: randomY });

    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.style.animation = "fadeInFlower 1s ease-in-out both"; // Agregar animación de entrada a la flor

    for (let i = 1; i <= 10; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal", `p${i}`);
      flower.appendChild(petal);

      // Tiempo aleatorio de desaparición entre 2 y 5 segundos
      const disappearanceTime = Math.random() * 3000 + 2000;

      // Agrega una animación de salida a los pétalos con el tiempo aleatorio de desaparición
      petal.style.animation = `fadeOutPetal 0.5s ease-in-out both ${i * 0.1}s, fadeOutFlower 0.5s ease-in-out both ${disappearanceTime}s`;
    }

    flower.style.position = "fixed";
    flower.style.left = `${randomX}px`;
    flower.style.top = `${randomY}px`;

    flowerContainer.appendChild(flower);

    // Tiempo aleatorio de desaparición entre 2 y 5 segundos
    const disappearanceTime = Math.random() * 3000 + 2000;

    setTimeout(() => {
      flowerContainer.removeChild(flower);

      // Remover la posición de la flor que desapareció de la lista de posiciones existentes
      existingPositions.splice(
        existingPositions.findIndex(
          (pos) => pos.x === randomX && pos.y === randomY,
        ),
        1,
      );
    }, disappearanceTime);
  }
}

// Cambia el intervalo de tiempo para controlar la aparición de las flores cada 3 segundos
setInterval(createFlower, 1000); // Nuevas flores cada 3 segundos
