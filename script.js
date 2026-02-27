// ===== DATA =====
var WHATSAPP_NUMBER = '5569993775932';
var WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um pedido na Federal Burger! 🍔';

function getWhatsappLink(item) {
  var msg = item ? 'Olá! Gostaria de pedir: ' + item : WHATSAPP_MESSAGE;
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
}

var burgers = [
  { name: "FEDERAL BURGER", description: "Pão, hambúrguer, mussarela, tomate e alface.", price: 17, image: "federal.jpg" },
  { name: "FEDERAL BACON", description: "Pão, hambúrguer, mussarela, bacon, tomate e alface.", price: 20, image: "federal.jpg" },
  { name: "FEDERAL CUPIM", description: "Pão, hambúrguer, mussarela, cupim bovino, tomate e alface.", price: 23, image: "federal.jpg" },
  { name: "FEDERAL FRANGO/CATUPIRY", description: "Pão, hambúrguer, mussarela, frango com catupiry, tomate e alface.", price: 20, image: "federal.jpg" },
  { name: "FEDERAL TWO EGGS", description: "Pão, hambúrguer, mussarela, dois ovos, alface e tomate.", price: 19, image: "federal.jpg" },
  { name: "FEDERAL 4 QUEIJOS", description: "Pão, hambúrguer, mussarela, cheddar, parmesão, catupiry, tomate e alface.", price: 21, image: "federal.jpg" },
  { name: "FEDERAL CALABRESA", description: "Pão, hambúrguer, mussarela, calabresa, tomate e alface.", price: 19, image: "federal.jpg" },
  { name: "FEDERAL DORITOS", description: "Pão, hambúrguer, mussarela, cheddar, creme de pimenta, doritos, catupiry, tomate e alface.", price: 23, image: "federal.jpg" },
  { name: "FEDERAL GRAN DUOS", description: "Pão, 2 hambúrguers, 2 mussarelas, tomate, alface, 2 sabores para escolher.", price: 27, image: "federal.jpg" },
  { name: "FEDERAL FILÉ", description: "Pão, hambúrguer, mussarela, filé mignon, tomate e alface.", price: 28, image: "federal.jpg" },
  { name: "FEDERAL PICANHA", description: "Pão, mussarela, hambúrguer, picanha, alface e tomate.", price: 29, image: "federal.jpg" },
  { name: "FEDERAL STROGONOFF", description: "Strogonoff de frango ou filé, pão, hambúrguer, mussarela, batata palha, tomate e alface.", price: 30, image: "federal.jpg" },
];

var addons = [
  { name: "Cebola Caramelizada", price: 8 },
  { name: "Cebola Roxa", price: 2 },
  { name: "Picanha", price: 18 },
  { name: "Filé", price: 16 },
  { name: "Cupim", price: 15 },
  { name: "Banana / Abacaxi", price: 5 },
  { name: "Cheddar", price: 3 },
  { name: "Catupiry", price: 5 },
  { name: "Batata Palha", price: 3 },
  { name: "Ovo", price: 2 },
  { name: "Mussarela", price: 2 },
  { name: "Calabresa Acebolada", price: 12 },
  { name: "Hambúrguer sem queijo", price: 5 },
  { name: "Salada", price: 1 },
  { name: "Porção de Batata Frita", price: 10 },
];

var drinks = [
  { name: "Refrigerante 2L", price: 10 },
  { name: "Refrigerante 1L", price: 10 },
  { name: "Refrigerante Lata", price: 6 },
  { name: "Água Mineral 500ml", price: 3 },
  { name: "Sucos", price: 10 },
];

function formatPrice(p) { return 'R$ ' + p.toFixed(2).replace('.', ','); }

// ===== RENDER =====
document.getElementById('year').textContent = new Date().getFullYear();

var defaultLink = getWhatsappLink();
document.getElementById('whatsapp-float').href = defaultLink;
document.getElementById('contato-whatsapp').href = defaultLink;

// Burgers grid
var burgersGrid = document.getElementById('burgers-grid');
burgers.forEach(function(b, idx) {
  burgersGrid.innerHTML +=
    '<div class="metal-surface rounded-lg overflow-hidden card-hover flex flex-col">' +
      '<div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox(\'' + b.image + '\', \'' + b.name + '\')">' +
        '<img src="' + b.image + '" alt="' + b.name + '" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />' +
        '<div class="absolute top-3 right-3 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-md text-sm">' + formatPrice(b.price) + '</div>' +
        '<div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg></div>' +
      '</div>' +
      '<div class="p-4 flex flex-col flex-1 gap-2">' +
        '<h3 class="font-display text-xl text-primary tracking-wider">' + b.name + '</h3>' +
        '<p class="text-muted-foreground text-sm flex-1">' + b.description + '</p>' +
        '<button onclick="addToCart(' + idx + ')" class="add-to-cart-btn mt-2">🛒 Adicionar ao pedido</button>' +
      '</div>' +
    '</div>';
});

// Addons reference list (no cart buttons — addons are added per burger in the cart)
var addonsGrid = document.getElementById('addons-grid');
addons.forEach(function(item, i) {
  addonsGrid.innerHTML +=
    '<div class="flex items-center justify-between px-5 py-3 border-b border-border ' + (i % 2 !== 0 ? 'bg-white/5' : '') + '">' +
      '<span class="text-foreground font-medium uppercase text-sm tracking-wide">' + item.name + '</span>' +
      '<span class="text-primary font-bold text-sm whitespace-nowrap">' + formatPrice(item.price) + '</span>' +
    '</div>';
});

// Drinks
var drinksList = document.getElementById('drinks-list');
drinks.forEach(function(item, i) {
  drinksList.innerHTML +=
    '<div class="flex items-center justify-between px-5 py-4 border-b border-border ' + (i % 2 !== 0 ? 'bg-white/5' : '') + '">' +
      '<span class="text-foreground font-medium uppercase text-sm tracking-wide">' + item.name + '</span>' +
      '<div class="flex items-center gap-3">' +
        '<span class="text-primary font-bold whitespace-nowrap">' + formatPrice(item.price) + '</span>' +
        '<button onclick="addDrinkToCart(' + i + ')" class="add-to-cart-btn" style="width:auto;padding:0.3rem 0.6rem;font-size:0.75rem;">+ 🛒</button>' +
      '</div>' +
    '</div>';
});

// ===== SIDEBAR =====
function openSidebar() { document.getElementById('sidebar-overlay').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar-overlay').classList.remove('open'); }

// ===== INTERSECTION OBSERVER =====
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-section').forEach(function(el) { observer.observe(el); });

// ===== LIGHTBOX =====
function openLightbox(src, alt) {
  var lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-img').alt = alt;
  document.getElementById('lightbox-caption').textContent = alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });

// ===== CART =====
// Cart structure:
// cart = [
//   { type:'burger', index:0, qty:1, addons:[{index:0, qty:1}, ...] },
//   { type:'drink', index:0, qty:1 }
// ]
var cart = [];
var checkoutStep = false; // false = cart view, true = checkout form

function bounceCartIcon() {
  var badge = document.getElementById('cart-badge');
  var btn = badge.parentElement;
  btn.classList.remove('cart-bounce');
  void btn.offsetWidth;
  btn.classList.add('cart-bounce');
}

function addToCart(burgerIndex) {
  var existing = cart.find(function(c) { return c.type === 'burger' && c.index === burgerIndex; });
  if (existing) { existing.qty++; } else { cart.push({ type: 'burger', index: burgerIndex, qty: 1, addons: [] }); }
  checkoutStep = false;
  renderCart(); bounceCartIcon();
}

function removeFromCart(cartIdx) {
  var item = cart[cartIdx];
  if (!item) return;
  item.qty--;
  if (item.qty <= 0) { cart.splice(cartIdx, 1); }
  renderCart();
}

function increaseCartItem(cartIdx) {
  var item = cart[cartIdx];
  if (!item) return;
  if (item.type === 'burger') { item.qty++; }
  else if (item.type === 'drink') { item.qty++; }
  renderCart();
}

function addDrinkToCart(drinkIndex) {
  var existing = cart.find(function(c) { return c.type === 'drink' && c.index === drinkIndex; });
  if (existing) { existing.qty++; } else { cart.push({ type: 'drink', index: drinkIndex, qty: 1 }); }
  checkoutStep = false;
  renderCart(); bounceCartIcon();
}

// Addon management per burger
function toggleAddonPanel(cartIdx) {
  var panel = document.getElementById('addon-panel-' + cartIdx);
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

function addAddonToBurger(cartIdx, addonIdx) {
  var item = cart[cartIdx];
  if (!item || item.type !== 'burger') return;
  var existing = item.addons.find(function(a) { return a.index === addonIdx; });
  if (existing) { existing.qty++; } else { item.addons.push({ index: addonIdx, qty: 1 }); }
  renderCart();
}

function removeAddonFromBurger(cartIdx, addonIdx) {
  var item = cart[cartIdx];
  if (!item || item.type !== 'burger') return;
  var existing = item.addons.find(function(a) { return a.index === addonIdx; });
  if (!existing) return;
  existing.qty--;
  if (existing.qty <= 0) { item.addons = item.addons.filter(function(a) { return a.index !== addonIdx; }); }
  renderCart();
}

function clearCart() { cart = []; checkoutStep = false; renderCart(); }

function toggleCart() {
  var panel = document.getElementById('cart-panel');
  var overlay = document.getElementById('cart-overlay');
  var isOpen = panel.classList.contains('open');
  if (isOpen) { panel.classList.remove('open'); overlay.classList.remove('open'); checkoutStep = false; }
  else { panel.classList.add('open'); overlay.classList.add('open'); }
}

function getItemSubtotal(c) {
  var base = (c.type === 'burger' ? burgers[c.index] : drinks[c.index]).price * c.qty;
  if (c.type === 'burger' && c.addons) {
    c.addons.forEach(function(a) { base += addons[a.index].price * a.qty * c.qty; });
  }
  return base;
}

function getCartTotal() {
  return cart.reduce(function(s, c) { return s + getItemSubtotal(c); }, 0);
}

function goToCheckout() { checkoutStep = true; renderCart(); }
function backToCart() { checkoutStep = false; renderCart(); }

function renderCart() {
  var container = document.getElementById('cart-items');
  var footer = document.getElementById('cart-footer');
  var badge = document.getElementById('cart-badge');

  var totalQty = cart.reduce(function(s, c) { return s + c.qty; }, 0);
  badge.style.display = totalQty > 0 ? 'flex' : 'none';
  badge.textContent = totalQty;

  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
    footer.style.display = 'none';
    checkoutStep = false;
    return;
  }

  footer.style.display = 'flex';

  if (checkoutStep) {
    renderCheckout(container, footer);
    return;
  }

  // Cart items view
  var html = '';
  cart.forEach(function(c, ci) {
    var data = c.type === 'burger' ? burgers[c.index] : drinks[c.index];
    var subtotal = getItemSubtotal(c);
    var emoji = c.type === 'burger' ? '🍔' : '🥤';
    var imgHtml = data.image
      ? '<img src="' + data.image + '" alt="' + data.name + '" />'
      : '<div style="width:3.5rem;height:3.5rem;border-radius:0.375rem;background:hsl(0 0% 18%);display:flex;align-items:center;justify-content:center;font-size:1.2rem;">' + emoji + '</div>';

    html += '<div class="cart-item-wrapper">';
    html += '<div class="cart-item">' +
      imgHtml +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + data.name + '</div>' +
        '<div class="cart-item-price">' + formatPrice(subtotal) + '</div>' +
      '</div>' +
      '<div class="cart-qty-controls">' +
        '<button class="cart-qty-btn" onclick="removeFromCart(' + ci + ')">−</button>' +
        '<span class="cart-qty">' + c.qty + '</span>' +
        '<button class="cart-qty-btn" onclick="increaseCartItem(' + ci + ')">+</button>' +
      '</div>' +
    '</div>';

    // Addons section for burgers
    if (c.type === 'burger') {
      var addonCount = c.addons.length;
      html += '<button onclick="toggleAddonPanel(' + ci + ')" class="addon-toggle-btn">' +
        '➕ Adicionais' + (addonCount > 0 ? ' (' + addonCount + ')' : '') +
        '<svg style="width:14px;height:14px;transition:transform 0.2s;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>';

      html += '<div id="addon-panel-' + ci + '" class="addon-panel" style="display:none;">';
      addons.forEach(function(addon, ai) {
        var existing = c.addons.find(function(a) { return a.index === ai; });
        var qty = existing ? existing.qty : 0;
        html += '<div class="addon-row">' +
          '<span class="addon-name">' + addon.name + '</span>' +
          '<span class="addon-price">' + formatPrice(addon.price) + '</span>' +
          '<div class="addon-qty-controls">' +
            (qty > 0
              ? '<button class="cart-qty-btn" style="width:1.4rem;height:1.4rem;font-size:0.8rem;" onclick="removeAddonFromBurger(' + ci + ',' + ai + ')">−</button>' +
                '<span style="font-size:0.8rem;min-width:1rem;text-align:center;color:hsl(0 0% 95%);">' + qty + '</span>'
              : '') +
            '<button class="cart-qty-btn" style="width:1.4rem;height:1.4rem;font-size:0.8rem;" onclick="addAddonToBurger(' + ci + ',' + ai + ')">+</button>' +
          '</div>' +
        '</div>';
      });
      html += '</div>';
    }

    html += '</div>'; // close wrapper
  });

  container.innerHTML = html;

  // Footer: total + continue button
  footer.innerHTML =
    '<textarea id="cart-notes" placeholder="Observações do pedido (ex: sem cebola, ponto da carne...)" maxlength="500" rows="2" style="width:100%;resize:vertical;border-radius:0.375rem;border:1px solid hsl(0 0% 25%);background:hsl(0 0% 14%);color:hsl(0 0% 95%);padding:0.5rem 0.75rem;font-size:0.85rem;font-family:Inter,sans-serif;outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor=\'hsl(48 96% 53%)\'" onblur="this.style.borderColor=\'hsl(0 0% 25%)\'"></textarea>' +
    '<div class="cart-total"><span>TOTAL</span><span>' + formatPrice(getCartTotal()) + '</span></div>' +
    '<button onclick="goToCheckout()" class="w-full text-center bg-primary text-primary-foreground font-display text-lg tracking-wider px-6 py-3 rounded-lg transition-colors block" style="border:none;cursor:pointer;font-family:\'Bebas Neue\',sans-serif;">CONTINUAR PARA ENVIO</button>' +
    '<button onclick="clearCart()" class="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1" style="background:none;border:none;cursor:pointer;color:hsl(0 0% 60%);">Limpar carrinho</button>';
}

function renderCheckout(container, footer) {
  var html = '<div class="checkout-form">';
  html += '<h3 style="font-family:\'Bebas Neue\',sans-serif;color:hsl(48 96% 53%);font-size:1.25rem;letter-spacing:0.05em;margin-bottom:0.5rem;">📋 FINALIZAR PEDIDO</h3>';

  // Delivery or pickup
  html += '<label class="checkout-label">Tipo de pedido</label>';
  html += '<div class="checkout-radio-group">' +
    '<label class="checkout-radio"><input type="radio" name="orderType" value="entrega" onchange="onOrderTypeChange()" checked /> 🚗 Entrega</label>' +
    '<label class="checkout-radio"><input type="radio" name="orderType" value="retirada" onchange="onOrderTypeChange()" /> 🏪 Retirada</label>' +
  '</div>';

  // Address (shown for delivery)
  html += '<div id="address-field">' +
    '<label class="checkout-label">Endereço de entrega</label>' +
    '<input type="text" id="checkout-address" placeholder="Rua, número, bairro..." maxlength="200" class="checkout-input" />' +
  '</div>';

  // Payment
  html += '<label class="checkout-label">Forma de pagamento</label>';
  html += '<div class="checkout-radio-group">' +
    '<label class="checkout-radio"><input type="radio" name="payMethod" value="dinheiro" onchange="onPayMethodChange()" /> 💵 Dinheiro</label>' +
    '<label class="checkout-radio"><input type="radio" name="payMethod" value="pix" onchange="onPayMethodChange()" /> 📱 Pix</label>' +
    '<label class="checkout-radio"><input type="radio" name="payMethod" value="cartao" onchange="onPayMethodChange()" /> 💳 Cartão</label>' +
  '</div>';

  // Change field (for cash)
  html += '<div id="change-field" style="display:none;">' +
    '<label class="checkout-label">Troco para quanto?</label>' +
    '<input type="text" id="checkout-change" placeholder="Ex: R$ 50,00" maxlength="20" class="checkout-input" />' +
  '</div>';

  html += '</div>';
  container.innerHTML = html;

  // Footer: back + total + send
  footer.innerHTML =
    '<div class="cart-total"><span>TOTAL</span><span>' + formatPrice(getCartTotal()) + '</span></div>' +
    '<button onclick="sendOrder()" class="w-full text-center bg-green-600 hover:bg-green-700 text-foreground font-display text-lg tracking-wider px-6 py-3 rounded-lg transition-colors block" style="border:none;cursor:pointer;font-family:\'Bebas Neue\',sans-serif;color:hsl(0 0% 95%);">📱 ENVIAR PEDIDO NO WHATSAPP</button>' +
    '<button onclick="backToCart()" class="w-full text-center text-sm py-1" style="background:none;border:none;cursor:pointer;color:hsl(0 0% 60%);">← Voltar ao carrinho</button>';
}

function onOrderTypeChange() {
  var val = document.querySelector('input[name="orderType"]:checked').value;
  document.getElementById('address-field').style.display = val === 'entrega' ? 'block' : 'none';
}

function onPayMethodChange() {
  var val = document.querySelector('input[name="payMethod"]:checked').value;
  document.getElementById('change-field').style.display = val === 'dinheiro' ? 'block' : 'none';
}

function sendOrder() {
  var orderType = document.querySelector('input[name="orderType"]:checked').value;
  var payMethod = document.querySelector('input[name="payMethod"]:checked');

  if (!payMethod) { alert('Selecione uma forma de pagamento.'); return; }
  payMethod = payMethod.value;

  if (orderType === 'entrega') {
    var addr = document.getElementById('checkout-address').value.trim();
    if (!addr) { alert('Por favor, informe o endereço de entrega.'); return; }
    // Sanitize
    addr = addr.substring(0, 200).replace(/[<>]/g, '');
  }

  var changeVal = '';
  if (payMethod === 'dinheiro') {
    changeVal = document.getElementById('checkout-change').value.trim().substring(0, 20).replace(/[<>]/g, '');
  }

  // Build message
  var total = getCartTotal();
  var msg = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';

  // Burgers
  var burgerItems = cart.filter(function(c) { return c.type === 'burger'; });
  if (burgerItems.length > 0) {
    msg += '🍔 *Burgers:*\n';
    burgerItems.forEach(function(c) {
      var b = burgers[c.index];
      msg += '  • ' + c.qty + 'x ' + b.name + ' (' + formatPrice(b.price * c.qty) + ')\n';
      if (c.addons.length > 0) {
        c.addons.forEach(function(a) {
          var ad = addons[a.index];
          msg += '      ➕ ' + a.qty + 'x ' + ad.name + ' (' + formatPrice(ad.price * a.qty * c.qty) + ')\n';
        });
      }
    });
    msg += '\n';
  }

  // Drinks
  var drinkItems = cart.filter(function(c) { return c.type === 'drink'; });
  if (drinkItems.length > 0) {
    msg += '🥤 *Bebidas:*\n';
    drinkItems.forEach(function(c) {
      var d = drinks[c.index];
      msg += '  • ' + c.qty + 'x ' + d.name + ' (' + formatPrice(d.price * c.qty) + ')\n';
    });
    msg += '\n';
  }

  msg += '*Total: ' + formatPrice(total) + '*\n\n';

  // Notes
  var notesEl = document.getElementById('cart-notes');
  var notes = notesEl ? notesEl.value.trim() : '';
  if (notes) {
    notes = notes.substring(0, 500).replace(/[<>]/g, '');
    msg += '📝 *Observações:* ' + notes + '\n\n';
  }

  // Order type
  if (orderType === 'entrega') {
    msg += '🚗 *Entrega*\n📍 Endereço: ' + addr + '\n\n';
  } else {
    msg += '🏪 *Retirada no local*\n\n';
  }

  // Payment
  var payLabels = { dinheiro: '💵 Dinheiro', pix: '📱 Pix', cartao: '💳 Cartão' };
  msg += '💰 *Pagamento:* ' + payLabels[payMethod];
  if (payMethod === 'dinheiro' && changeVal) {
    msg += '\n💱 Troco para: ' + changeVal;
  }

  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

