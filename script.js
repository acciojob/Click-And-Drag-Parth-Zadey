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

    if (item.style.position !== 'absolute') {
      const initialLeft = itemRect.left - containerRect.left;
      const initialTop = itemRect.top - containerRect.top;
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

  let left = e.clientX - containerRect.left - shiftX;
  let top = e.clientY - containerRect.top - shiftY;

  // Keep within bounds
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  activeItem.style.left = `${left}px`;
  activeItem.style.top = `${top}px`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.cursor = 'grab';
    activeItem.style.zIndex = '';
    activeItem = null;
  }
});