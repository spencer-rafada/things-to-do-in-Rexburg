// The code will be long
// because I want to use MVC Design Pattern for this.

window.onload = function () {
    const helpers = (function () {
      function getDOMElements(DOMSelectors) {
        let DOMElements = {};
        for (let selector in DOMSelectors) {
          if (DOMSelectors.hasOwnProperty(selector)) {
            DOMElements[selector] = document.querySelector(
              DOMSelectors[selector]
            );
          }
        }
        return DOMElements;
      }
      return {
        getDOMElements
      };
    })();
  
    const modal = (function () {
      const state = {
        counter: 0,
        intervalID: 0
      };
      let CONSTANTS = {
        ACTIVE_CLASS_NAME: "active",
        TIMER: 1500,
        TRANSITION: "all .7s ease-out"
      };
      function addConstant(key, value) {
        CONSTANTS[key] = value;
      }
  
      return {
        state,
        CONSTANTS,
        addConstant
      };
    })();
  
    const view = (function (helpers) {
      const DOMSelectors = {
        carouselInnerSlider: ".content_inner_slider",
        dots: ".dots",
        slide: "#slide",
        carouselImages: ".content_inner_slider > img",
        dot: ".dot"
      };
      const DOMElements = helpers.getDOMElements(DOMSelectors);
      const CAROUSEL_IMAGES = [
        ...document.querySelectorAll(DOMSelectors.carouselImages)
      ];
      const DOTS = [...document.querySelectorAll(DOMSelectors.dot)];
      function moveSliderToIndex(IMAGE_SIZE, index) {
        DOMElements.carouselInnerSlider.style.transform = `translateX(-${
          IMAGE_SIZE * index
        }px)`;
      }
      function addClassToIndex(className, index) {
        CAROUSEL_IMAGES[index].classList.add(className);
      }
      function removeClassToIndex(className, index) {
        CAROUSEL_IMAGES[index].classList.remove(className);
      }
      function addBackGroundToCurrentIndex(index) {
        DOTS[index].style.background = "#000";
      }
      function removeBackGroundToCurrentIndex(index) {
        DOTS[index].style.background = "transparent";
      }
      function setTransition(element, transition) {
        element.style.transition = `${transition}`;
      }
      return {
        DOMSelectors,
        moveSliderToIndex,
        addClassToIndex,
        removeClassToIndex,
        addBackGroundToCurrentIndex,
        removeBackGroundToCurrentIndex,
        setTransition
      };
    })(helpers);
  
    const controller = (function (modal, view, helpers) {
      const DOMSelectors = view.DOMSelectors;
      const DOMElements = helpers.getDOMElements(DOMSelectors);
      function initApp() {
        const imageSize = DOMElements.carouselInnerSlider.clientWidth;
        const imagesCount =
          [...document.querySelectorAll(DOMSelectors.carouselImages)].length - 1;
        modal.addConstant("IMAGE_SIZE", imageSize);
        modal.addConstant("TOTAL_IMAGES", imagesCount);
        view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
        handleAdding();
        DOMElements.dots.addEventListener("click", handleDotClick);
      }
      function removeEventListeners() {
        DOMElements.dots.removeEventListener("click", handleDotClick);
      }
      function handleDotClick(event) {
        const value = Number(event.target.value);
        if (!isNaN(value)) {
          handleRemove();
          modal.state.counter = value;
          view.moveSliderToIndex(modal.CONSTANTS.IMAGE_SIZE, modal.state.counter);
          handleAdding();
        }
      }
      function handleRemove() {
        view.removeClassToIndex(
          modal.CONSTANTS.ACTIVE_CLASS_NAME,
          modal.state.counter
        );
        view.removeBackGroundToCurrentIndex(modal.state.counter);
      }
      function handleAdding() {
        view.addClassToIndex(
          modal.CONSTANTS.ACTIVE_CLASS_NAME,
          modal.state.counter
        );
        view.addBackGroundToCurrentIndex(modal.state.counter);
      }
      DOMElements.carouselInnerSlider.addEventListener(
        "transitionstart",
        removeEventListeners
      );
      DOMElements.carouselInnerSlider.addEventListener("transitionend", initApp);
      view.setTransition(
        DOMElements.carouselInnerSlider,
        modal.CONSTANTS.TRANSITION
      );
      return {
        initApp,
        removeEventListeners
      };
    })(modal, view, helpers);
  
    controller.initApp();
  
    window.addEventListener("resize", () => {
      controller.removeEventListeners();
      controller.initApp();
    });
  };
  