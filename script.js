const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let shiftX = 0;
let shiftY = 0;

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    activeItem = item;

    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    shiftX = e.clientX - itemRect.left;
    shiftY = e.clientY - itemRect.top;

    // Switch to absolute positioning dynamically on drag start
    if (item.style.position !== 'absolute') {
      const initialLeft = itemRect.left - containerRect.left + container.scrollLeft;
      const initialTop = itemRect.top - containerRect.top + container.scrollTop;
      item.style.width = `${item.offsetWidth}px`;
      item.style.height = `${item.offsetHeight}px`;
      item.style.position = 'absolute';
      item.style.left = `${initialLeft}px`;
      item.style.top = `${initialTop}px`;
    }

    item.style.cursor = 'grabbing';
    item.style.zIndex = '1000';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container
  let newLeft = e.clientX - containerRect.left - shiftX;
  let newTop = e.clientY - containerRect.top - shiftY;

  // Enforce boundary constraints inside container
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (!activeItem) return;

  activeItem.style.cursor = 'grab';
  activeItem.style.zIndex = '';
  activeItem = null;
});