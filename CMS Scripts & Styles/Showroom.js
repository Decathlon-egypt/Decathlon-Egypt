document.addEventListener("DOMContentLoaded", function() {
  const tracks = document.querySelectorAll(".showroom-products-track");
  const leftShowroomArrows = document.querySelectorAll(".left_showroom_arrow");
  const rightShowroomArrows = document.querySelectorAll(".right_showroom_arrow");
  const trackTranslations = Array(tracks.length).fill(0);

  const noImageTracks = document.querySelectorAll(".no-image-track");
  const leftNoImageArrows = document.querySelectorAll(".left_no_image_arrow");
  const rightNoImageArrows = document.querySelectorAll(".right_no_image_arrow");
  const noImageTrackTranslations = Array(noImageTracks.length).fill(0);

  const translateContainer = (track, index, amount, translations, offset) => {
    const displayWidth = window.innerWidth - offset;
    const trackWidth = track.offsetWidth;
    const maxTranslateX = trackWidth - displayWidth;

    translations[index] += amount;

    if (translations[index] >= 0) {
      translations[index] = 0;
    } else if (translations[index] < -maxTranslateX) {
      translations[index] = -maxTranslateX;
    }

    track.style.transform = `translateX(${translations[index]}px)`;
    track.style.transition = "transform 0.5s ease";
  };

  leftShowroomArrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      const track = tracks[index];
      const secondChildWidth = 261;
      translateContainer(track, index, secondChildWidth, trackTranslations, 416);
    });
  });

  rightShowroomArrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      const track = tracks[index];
      const secondChildWidth = 261;
      translateContainer(track, index, -secondChildWidth, trackTranslations, 416);
    });
  });

  leftNoImageArrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      const track = noImageTracks[index];
      const secondChildWidth = 261;
      translateContainer(track, index, secondChildWidth, noImageTrackTranslations, 91);
    });
  });

  rightNoImageArrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      const track = noImageTracks[index];
      const secondChildWidth = 261;
      translateContainer(track, index, -secondChildWidth, noImageTrackTranslations, 91);
    });
  });
});

const algoliaDetails = {
  app_id: algolia_user,
  api_search_key: algolia_api_key,
  index_name: algolia_index,
};

function handleLoadingSliders() {
  const loadingProducts = document.getElementsByClassName("loading-products");
  const loadingProductsArr = [...loadingProducts];
  loadingProductsArr.forEach((e) => {
    e.remove();
  });
}

function updateImageUrl(url) {
  const newParams = "format=auto&quality=40&f=400x0";
  if (url.indexOf("?") > -1) {
    const urlParts = url.split("?");
    return `${urlParts[0]}?${newParams}`;
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
