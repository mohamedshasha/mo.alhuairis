function getOrderDetails() {
    let quantitySelect = document.getElementById("quantity");
    let customQuantityInput = document.getElementById("customQuantity");
    let quantity = quantitySelect.value === "other" ? parseInt(customQuantityInput.value) || 0 : parseInt(quantitySelect.value);
    let kind = document.getElementById("kind").value;
    let deliveryTime = document.getElementById("deliveryTime").value;
    let total = document.getElementById("total").value;
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let phone = document.getElementById("phone").value;

    return {
        quantity: quantity,
        kind: kind,
        deliveryTime: deliveryTime,
        total: total,
        name: name,
        location: location,
        phone: phone
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value) {
                this.setAttribute('placeholder-shown', 'true');
            } else {
                this.removeAttribute('placeholder-shown');
            }
        });
    });
});
function updateCustomQuantityInput() {
    let quantitySelect = document.getElementById("quantity");
    let customQuantityInput = document.getElementById("customQuantity");

    requestAnimationFrame(() => {
        customQuantityInput.style.display = quantitySelect.value === "other" ? "block" : "none";
    });
}

let debounceTimer;

function updateTotal() {
    clearTimeout(debounceTimer);
    let quantitySelect = document.getElementById("quantity");
    let customQuantityInput = document.getElementById("customQuantity");
    let quantity = quantitySelect.value === "other" ? parseInt(customQuantityInput.value) || 0 : parseInt(quantitySelect.value);
    let pricePerLitre = 2782;
    let totalPrice = quantity * pricePerLitre;
    document.getElementById("total").value = totalPrice.toLocaleString() + " جنيه";
  
    // إظهار حقل الكمية المخصصة إذا اختار المستخدم "أدخل كمية أخرى"
    customQuantityInput.style.display = quantitySelect.value === "other" ? "block" : "none";
  }


function submitOrder() {
    let orderDetails = getOrderDetails();
    document.getElementById("orderConfirmation").style.display = "block";
    

    if (orderDetails.name === "" || orderDetails.phone === "" || orderDetails.location === "") {
        alert("يرجى ملء جميع الحقول المطلوبة!");
        return;
    }
    let orderNumber = localStorage.getItem("lastOrderNumber");
    orderNumber = orderNumber ? parseInt(orderNumber) + 1 : 1;
    localStorage.setItem("lastOrderNumber", orderNumber);
    document.getElementById("orderNumber").textContent = orderNumber;
    alert(`تم إنشاء الطلب بنجاح! رقم الطلب: ${orderNumber}`);
    

    // استدعاء دالة sendWhatsAppNotification مع تمرير المعاملات
 

    alert(` اضغط على زر "اطلب الآن" لإكمال الطلب\n\n العميل: ${orderDetails.name}\n رقم الهاتف: ${orderDetails.phone}\n الموقع: ${orderDetails.location}\n⛽ الكمية: ${orderDetails.quantity}\n إجمالي السعر: ${orderDetails.total}\n وقت التوصيل: ${orderDetails.deliveryTime}`);}



function sendWhatsAppNotification(clientName, location, phoneNumber, quantity, kind, deliveryTime, totalPrice) {
    let orderNumber = document.getElementById("orderNumber").textContent;
    

let message = `طلب وقود جديد:\n\n` +
    `⛽ الكمية: ${quantity} لتر\n` +
    ` نوع المنشأة: ${kind}\n` +
    ` زمن الوصول: ${deliveryTime}\n` +
    ` إجمالي السعر: ${totalPrice} \n` +
    ` العميل: ${clientName}\n` +
    ` الموقع: ${location}\n` +
    ` رقم الهاتف: ${phoneNumber}\n` +
    ` رقم الطلب: ${orderNumber}\n`;


    let encodedMessage = encodeURIComponent(message);
    let whatsappURL = `https://wa.me/${249123103333}?text=${encodedMessage}`;

    // فتح واتساب في نافذة جديدة
    window.open(whatsappURL, "_blank");
}

document.getElementById("orderButton").addEventListener("click", () => {
    let orderDetails = getOrderDetails();
    if (orderDetails.name === "" || orderDetails.phone === "" || orderDetails.location === "") {
        alert("يرجى ملء جميع الحقول المطلوبة!");
        return;
    }
    // استدعاء دالة sendWhatsAppNotification مع تمرير المعاملات
    sendWhatsAppNotification(orderDetails.name, orderDetails.location, orderDetails.phone, orderDetails.quantity, orderDetails.kind, orderDetails.deliveryTime, orderDetails.total);
});
