jQuery(window)
  .once("map")
  .on("load", function () {
    const view = jQuery(".ev-table");
    if (view.length > 0) {
      const cells = jQuery(".x-axis > .views-row > .views-field > .field-content");
      const overlay = jQuery('<div id="popup-overlay" class="hidden"></div>');
      const popup = jQuery('<div id="popup"></div>');
      overlay.append(popup);
      const closeBtn = jQuery('<div class="close material-symbols-outlined">Close</div>');
      jQuery("body").append(overlay);
      const closePopup = (e) => {
        if (
          e.target == overlay[0] ||
          e.target == closeBtn[0] ||
          e.target.className == "close material-symbols-outlined"
        ) {
          overlay.addClass("hidden");
          jQuery(".views-row", popup).detach();
        }
      };
      overlay.click(closePopup);
      closeBtn.click(closePopup);
      const titles = [];
      cells?.each(function (_, cell) {
        const rows = jQuery(".views-row", cell);
        if(!rows) return;
        const newCellContentArr = [];
        rows?.each(function (_, row) {
          const resources = jQuery(".link ol li", row);
          const size = 10 * Math.log(resources.length) + 20;
          const cellContent = jQuery(row).clone(true, true);
          const colorCode = row.querySelector("#cell-data", cellContent).dataset.color;
          const briefName = row.querySelector("#cell-data", cellContent).dataset.brief;
          const categoryName = row.querySelector("#cell-data", cellContent).dataset.category;
          const cellColorJS = colorCode != "" ? colorCode : "#005cb9";
          const newCellContent = jQuery(
            `<button class="title-group" aria-label="${briefName} brief, ${categoryName} category, ${
              resources.length
            } ${resources.length == 1 ? "resource" : "resources"}" data-size="${
              resources.length
            }" style="width:${size}px;height:${size}px;background-color:${cellColorJS};display:flex;"></button>`
          );
  
          newCellContent.click(() => {
            popup.append(closeBtn);
            popup.append(cellContent);
            overlay.removeClass("hidden");
            popup.scrollTop(0);
          });
          newCellContentArr.push(newCellContent);
        });
        jQuery(this).once().html('');
        newCellContentArr.forEach(content => jQuery(this).append(content));

      });
      view.addClass("ready");
    }
  });
