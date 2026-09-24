onload = () => {
  document.body.classList.remove("container");

  const petalContainer = document.querySelector(".flower-container");
  if (!petalContainer) return;

  const createPetal = () => {
    const petal = document.createElement("span");
    petal.className = "petal";

    const size = Math.random() * 12 + 8;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 7;
    const drift = (Math.random() - 0.5) * 120;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.8}px`;
    petal.style.left = `${startX}px`;
    petal.style.setProperty("--drift", `${drift}px`);
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;

    petalContainer.appendChild(petal);

    setTimeout(
      () => {
        petal.remove();
      },
      duration * 1000 + 300,
    );
  };

  for (let i = 0; i < 28; i++) {
    setTimeout(createPetal, i * 180);
  }

  setInterval(createPetal, 260);
};
