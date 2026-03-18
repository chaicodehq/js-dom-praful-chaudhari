/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder();
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up");
 *   // => true
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military");
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab");
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers();
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment");
 *   // => true
 */
export function createContingent(name, type, state, members) {
    // Your code here

    if (
        typeof name !== "string" ||
        typeof type !== "string" ||
        typeof state !== "string"
    )
        return null;
    if (!Array.isArray(members)) return null;

    const div = document.createElement("div");
    div.classList.add("contingent");
    div.setAttribute("data-name", name);
    div.setAttribute("data-type", type);
    div.setAttribute("data-state", state);

    const h3 = document.createElement("h3");
    h3.textContent = name;

    const spanType = document.createElement("span");
    spanType.classList.add("type");
    spanType.textContent = type;

    const spanState = document.createElement("span");
    spanState.classList.add("state");
    spanState.textContent = state;

    const ul = document.createElement("ul");
    for (const member of members) {
        const li = document.createElement("li");
        li.textContent = member;
        ul.appendChild(li);
    }

    div.appendChild(h3);
    div.appendChild(spanType);
    div.appendChild(spanState);
    div.appendChild(ul);

    return div;
}

export function setupParadeDashboard(container) {
    // Your code here

    if (!container) return null;

    return {
        addContingent(contingent) {
            const cngtgnt = createContingent(
                contingent.name,
                contingent.type,
                contingent.state,
                contingent.members,
            );
            if (!cngtgnt) return null;

            container.appendChild(cngtgnt);
            return cngtgnt;
        },

        removeContingent(name) {
            for (const ele of container.children) {
                if (ele.getAttribute("data-name") === name) {
                    ele.remove();
                    return true;
                }
            }

            return false;
        },

        moveContingent(name, direction) {
            // - direction: "up" or "down"
            // - "up": swaps contingent with its previousElementSibling
            //   (uses insertBefore to place it before its previous sibling)
            // - "down": swaps with its nextElementSibling
            //   (uses insertBefore to place next sibling before this element)
            // - Returns true if moved, false if can't move (no sibling in that direction)
            // - Returns false if contingent not found

            let cont = null;
            for (const ele of container.children) {
                if (ele.getAttribute("data-name") === name) {
                    cont = ele;
                    break;
                }
            }
            if (!cont) return false;

            if (direction === "up") {
                const prevSibling = cont.previousElementSibling;
                if (!prevSibling) return false;
                const temp = document.createElement("li");
                prevSibling.replaceWith(temp);
                cont.replaceWith(prevSibling);
                temp.replaceWith(cont);
            }
            if (direction === "down") {
                const nextSibling = cont.nextElementSibling;
                if (!nextSibling) return false;
                const temp = document.createElement("li");
                nextSibling.replaceWith(temp);
                cont.replaceWith(nextSibling);
                temp.replaceWith(cont);
            }

            return true;
        },

        getParadeOrder() {
            return Array.from(container.children).map((cont) =>
                cont.getAttribute("data-name"),
            );
        },

        getContingentsByType(type) {
            return Array.from(container.children).filter(
                (ele) => ele.getAttribute("data-type") === type,
            );
        },

        highlightState(state) {
            let count = 0;
            for (const ele of container.children) {
                if (ele.getAttribute("data-state") === state) {
                    ele.classList.add("highlight");
                    count++;
                } else {
                    ele.classList.remove("highlight");
                }
            }
            return count;
        },

        getTotalMembers() {
            let count = 0;
            for (const contingent of container.children) {
                const ul = contingent.querySelector("ul");
                count += ul.querySelectorAll("li").length;
            }
            return count;
        },
    };
}
