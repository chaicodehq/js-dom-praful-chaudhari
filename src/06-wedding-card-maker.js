/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
    // Your code here

    if (!containerElement) return null;

    return {
        addGuest(name, side) {
            const div = document.createElement("div");
            div.classList.add("guest-item");
            div.setAttribute("data-name", name);
            div.setAttribute("data-side", side);

            const span = document.createElement("span");
            span.textContent = name;

            div.appendChild(span);

            const btn = document.createElement("button");
            btn.textContent = "Remove";
            btn.classList.add("remove-btn");

            div.appendChild(btn);

            div.addEventListener("click", (e) => {
                if (e.target.matches(".remove-btn")) {
                    e.target.closest(".guest-item").remove();
                }
            });

            containerElement.appendChild(div);

            return div;
        },

        getGuests() {
            const guestsNodes = containerElement.children;
            const guests = [];
            for (const node of guestsNodes) {
                guests.push({
                    name: node.getAttribute("data-name"),
                    side: node.getAttribute("data-side"),
                });
            }
            return guests;
        },

        removeGuest(name) {
            const guestDivs = containerElement.children;
            let toBeRemoved = null;

            for (const d of guestDivs) {
                if (d.getAttribute("data-name") === name) {
                    toBeRemoved = d;
                    break;
                }
            }
            if (!toBeRemoved) return false;

            toBeRemoved.remove();
            return true;
        },
    };
}

export function setupThemeSelector(containerElement, previewElement) {
    // Your code here

    if (!containerElement || !previewElement) return null;

    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");

    btn1.classList.add("theme-btn");
    btn2.classList.add("theme-btn");
    btn3.classList.add("theme-btn");

    btn1.textContent = "traditional";
    btn2.textContent = "modern";
    btn3.textContent = "royal";

    btn1.setAttribute("data-theme", "traditional");
    btn2.setAttribute("data-theme", "modern");
    btn3.setAttribute("data-theme", "royal");

    containerElement.appendChild(btn1);
    containerElement.appendChild(btn2);
    containerElement.appendChild(btn3);

    containerElement.addEventListener("click", (e) => {
        if (e.target.matches(".theme-btn")) {
            const theme = e.target.closest(".theme-btn");
            previewElement.className = theme.getAttribute("data-theme");
            previewElement.setAttribute(
                "data-theme",
                theme.getAttribute("data-theme"),
            );
        }
    });

    return {
        getTheme() {
            return previewElement.getAttribute("data-theme");
        },
    };
}

export function setupCardEditor(cardElement) {
    // Your code here

    if (!cardElement) return null;

    function clickHandler(e) {
        const item = e.target.closest("[data-editable]");
        if (item && cardElement.contains(item)) {
            for (const ele of cardElement.children) {
                ele.classList.remove("editing");
                ele.contentEditable = "false";
            }
            item.classList.add("editing");
            item.contentEditable = "true";
        }
    }

    cardElement.addEventListener("click", clickHandler);

    return {
        getContent(field) {
            for (const child of cardElement.children) {
                if (child.getAttribute("data-editable") === field) {
                    return child.textContent;
                }
            }
            return null;
        },
    };
}
