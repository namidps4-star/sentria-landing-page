/* =========================================
   SCROLL REVEAL
========================================= */

const grids = document.querySelectorAll(
  ".situations-grid, " +
  ".method-grid, " +
  ".pricing-grid, " +
  ".promises-grid, " +
  ".hero-grid, " +
  ".data-grid"
);


grids.forEach(grid => {

  [...grid.children].forEach((child, index) => {

    child.classList.add("reveal");

    child.style.setProperty(
      "--d",
      `${index * 0.12}s`
    );

  });

});


const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.15
  }
);


document
  .querySelectorAll(".reveal, .section-header")
  .forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });



/* =========================================
   RISK BARS
========================================= */

document
  .querySelectorAll(".risk-fill")
  .forEach(element => {

    element.style.setProperty(
      "--w",
      element.style.width
    );

  });


const riskObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("grown");

        riskObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.4
  }
);


document
  .querySelectorAll(".risk-fill")
  .forEach(element => {

    riskObserver.observe(element);

  });



/* =========================================
   MAGNETIC BUTTONS
========================================= */

document
  .querySelectorAll(
    ".button-primary, .nav-cta, .pricing-cta"
  )
  .forEach(button => {

    button.classList.add("magnetic");


    button.addEventListener("mousemove", event => {

      const rect =
        button.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left -
        rect.width / 2;


      const y =
        event.clientY -
        rect.top -
        rect.height / 2;


      button.style.transform =
        `translate(${x * 0.15}px, ${y * 0.3}px)`;

    });


    button.addEventListener("mouseleave", () => {

      button.style.transform =
        "translate(0,0)";

    });

  });



/* =========================================
   NUMBER COUNTING
========================================= */

function countUp(element, target, suffix = "") {

  if (!element) return;


  const duration = 1600;

  const start =
    performance.now();


  function tick(now) {

    const progress =
      Math.min(
        (now - start) / duration,
        1
      );


    const eased =
      1 - Math.pow(1 - progress, 3);


    element.textContent =
      String(
        Math.round(target * eased)
      ).padStart(2, "0") +
      suffix;


    if (progress < 1) {

      requestAnimationFrame(tick);

    }

  }


  requestAnimationFrame(tick);

}



/* =========================================
   START NUMBER COUNTERS WHEN DASHBOARD
   BECOMES VISIBLE
========================================= */

const mockup =
  document.querySelector(".mockup");


if (mockup) {

  const mockupObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const numbers =
              document.querySelectorAll(
                ".dash-card-number"
              );


            countUp(numbers[0], 7);

            countUp(numbers[1], 92, "%");

            countUp(numbers[2], 148);


            mockupObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.4
      }
    );


  mockupObserver.observe(mockup);

}