export default (text) => `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${text}"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #${text}
            </button>
            <button type="button" class="card__hashtag-delete" data-name="${text}">
              delete
            </button>
          </span>`;
