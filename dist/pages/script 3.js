const carData = {
  ev: [
    { name: "Tesla Model 3",price:'400 Dt', image: "tesla.jpg" },
    { name: "Chevrolet Bolt",price:'350 Dt', image: "chevrolet.jpg" },
    { name: "Ford Mustang Mach-E",price:'400 Dt', image: "fordM.jpg" },
  ],
  suv: [
    { name: "Honda CR-V",price:'250 DT', image: "hondaC.jpg" },
    { name: "Toyota RAV4",price:'320 DT' ,image: "toyota.jpg" },
    { name: "Ford Explorer",price:'380 Dt', image: "fordE.jpg" },
  ],
  truck: [
    { name: "Ford F-150",price:'360 DT', image: "fordF.jpg" },
    { name: "Chevrolet Silverado",price:'500 DT', image: "chevroletS.jpg" },
    { name: "Volkswagen Amarok",price:'340 Dt', image: "amarok.jpg" },
  ],
  sedan: [
    { name: "Honda Civic",price:'230 Dt', image: "hondaC.jpg" },
    { name: "Toyota Camry",price:'280 Dt', image: "toyotaC.jpg" },
    { name: "Hyundai Elantra",price:'190 Dt', image: "hyundai.jpg" },
  ],
  hybrid: [
    { name: "Toyota Prius",price:'270 DT', image: "toyotaP.jpg" },
    { name: "Honda Insight",price:'300 DT', image: "hondaIn.jpg" },
    { name: "Hyundai Tucson Hybrid",price:'250 DT', image: "hyundaiTu.jpg" },
  ],
};
document.addEventListener("DOMContentLoaded", () => {
  const sr = ScrollReveal({
    distance: "60px",
    duration: 900,
    delay: 400,
    reset: true,
  });

  let lastScroll = 0;
  const navbar = document.querySelector(".navdiv");
  const backToTopButton = document.getElementById("back-to-top");

  // Scroll event listener
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Navbar behavior
    if (currentScroll > lastScroll) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    navbar.style.backgroundColor =
      currentScroll === 0 ? "#f5b754" : "#f5b754";

    // Back-to-top button visibility
    if (currentScroll > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }

    lastScroll = currentScroll;
  });

  // ScrollReveal animations
  sr.reveal(".section-title", { origin: "top" });
  sr.reveal(".type-card", { origin: "bottom", interval: 100 });
  sr.reveal(".about-info-item", { origin: "left", interval: 300 });
  sr.reveal(".contact", { origin: "right" });
  sr.reveal(".callout", { origin: "bottom" });

  // Back-to-top button functionality
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Vehicle type click event
  document.querySelectorAll(".type-card").forEach((card) => {
    card.addEventListener("click", function () {
      const type = this.dataset.type;
      const listings = carData[type] || [];
      const listingsContainer = document.getElementById("carListings");

      // Clear previous listings
      listingsContainer.innerHTML = "";

      // Add new listings or display a message if empty
      if (listings.length > 0) {
        listings.forEach((car) => {
          const carElement = document.createElement("div");
          carElement.className = "car-item";
          carElement.innerHTML = `
                        <img src="${car.image}" alt="${car.name}">
                        <div class="desc">
                            <h2>${car.name}</h2>
                            <h2>${car.price}</h2><h3>per day</h2>
                            <button class="book-button" onclick="alert('Booking ${car.name}')">Learn more</button>
                        </div>
                    `;
          listingsContainer.appendChild(carElement);
        });
      } else {
        listingsContainer.innerHTML = "<p>No cars available for this type.</p>";
      }

      // Show listings
      listingsContainer.classList.add("active");
      const backButton = document.createElement("button");
      backButton.className = "close-button";
      backButton.textContent = "Back";
      backButton.addEventListener("click", closeListings);
      listingsContainer.appendChild(backButton);

      this.insertAdjacentElement("afterend", listingsContainer);
    });
  });

  // Close listings function

  function closeListings() {
    const activeListings = document.querySelectorAll(".car-listings.active");
    activeListings.forEach((listing) => {
      listing.classList.remove("active"); // Hide the active listings
    });
  }

  // Add hover effects to car items
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".car-item")) {
      const carItem = e.target.closest(".car-item");
      carItem.style.transform = "scale(1.02)";
      carItem.style.transition = "transform 0.3s ease";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".car-item")) {
      const carItem = e.target.closest(".car-item");
      carItem.style.transform = "scale(1)";
    }
  });

  // Add smooth transitions for form inputs
  document.querySelectorAll(".input-box input").forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });
});
const selectCards = document.querySelectorAll(".select-card");
selectCards[0].classList.add("show-info");

const price = ["225", "455", "275", "625", "395"];

const priceEl = document.getElementById("select-price");

function updateSwiperImage(eventName, args) {
  if (eventName === "slideChangeTransitionStart") {
    const index = args && args[0].realIndex;
    priceEl.innerText = price[index];
    selectCards.forEach((item) => {
      item.classList.remove("show-info");
    });
    selectCards[index].classList.add("show-info");
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 500,
    modifier: 1,
    scale: 0.75,
    slideShadows: false,
    stretch: -100,
  },

  onAny(event, ...args) {
    updateSwiperImage(event, args);
  },
});
