const generateBtn = document.getElementById('generateBtn');
const qrDataInput = document.getElementById('qrData');
const qrCodeImage = document.getElementById('qrCodeImage');

generateBtn.addEventListener('click', async () => {
    const data = qrDataInput.value;
    
    if (!data) {
        alert('Please enter some data to generate a QR code.');
        return;
    }

    try {
        const response = await fetch('https://sasasaia.pythonanywhere.com/generate_qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        qrCodeImage.src = imageUrl;
        qrCodeImage.style.display = 'block';
    } catch (error) {
        console.error('Error generating QR code:', error);
        alert('Failed to generate QR code. Please try again.');
    }
});