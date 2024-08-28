document.addEventListener("DOMContentLoaded", function() {
const tracks = document.querySelectorAll(".showroom-products-track");
const leftshowroom_arrows = document.querySelectorAll(".left_showroom_arrow");
const rightshowroom_arrows = document.querySelectorAll(".right_showroom_arrow");

const trackTranslations = Array(tracks.length).fill(0);

const translateContainer = (track, index, amount) => {
  const displayWidth = window.innerWidth - 419;
  const trackWidth = track.offsetWidth;
  let maxTranslateX = trackWidth - displayWidth;

  trackTranslations[index] += amount;

  if (trackTranslations[index] >= 0) {
    trackTranslations[index] = 0;
  } else if (trackTranslations[index] < -maxTranslateX) {
    trackTranslations[index] = -maxTranslateX;
  }

  track.style.transform = `translateX(${trackTranslations[index]}px)`;
  track.style.transition = "transform 0.5s ease";
};

leftshowroom_arrows.forEach((showroom_arrow, index) => {
  showroom_arrow.addEventListener("click", () => {
    const track = tracks[index];
    const secondChildWidth = 261;
    translateContainer(track, index, secondChildWidth);
  });
});

rightshowroom_arrows.forEach((showroom_arrow, index) => {
  showroom_arrow.addEventListener("click", () => {
    const track = tracks[index];
    const secondChildWidth = 261;
    translateContainer(track, index, -secondChildWidth);
  });
});
});



const algoliaDetails = {
  app_id: algolia_user,
  api_search_key: algolia_api_key,
  index_name: algolia_index,
};

function handleLoadingSliders() {
  const loadingProducts =
    document.getElementsByClassName("loading-products");
  const loadingProductsArr = [...loadingProducts];
  loadingProductsArr.forEach((e) => {
    e.remove();
  });
}

function updateImageUrl(url) {
  const newParams = "format=auto&quality=40&f=400x0";
  if (url.indexOf("?") > -1) {
    const urlParts = url.split("?");
    let newUrl = `${urlParts[0]}?${newParams}`;
    return newUrl;
  } else {
    return url;
  }
}

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
      products: [],
      gridStyle: '',
      getProductsManual(productsArr) {
          const clientAlg = algoliasearch(
              algoliaDetails.app_id,
              algoliaDetails.api_search_key
          );
          const indexAlg = clientAlg.initIndex(algoliaDetails.index_name);

          const filters = productsArr.map(id => `objectID:${id}`).join(' OR ');

          indexAlg.search('', {
              filters: filters
          }).then(({ hits }) => {
              handleLoadingSliders();
              const filteredResultsManual = hits.filter((item) => item && item.stock.global);
              this.products = filteredResultsManual;
              this.updateGridStyle();
          }).catch(err => {
              console.error('Algolia Error:', err);
          });
      },

      updateGridStyle() {
          const columns = this.products.length;
          this.gridStyle = `grid-template-columns: repeat(${columns}, 1fr);`;
      }
  }));
});
