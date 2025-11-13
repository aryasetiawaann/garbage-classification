const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
let model;
let classNames = [];

web_url  = 'http://127.0.0.1:5500'
async function  loadModel() {
    console.log("🔄 Loading model...");
    model = await tf.loadLayersModel(web_url + '/model/model.json');
    console.log("✅ Model loaded successfully!");
}


async function loadLabels() {
  const response = await fetch(web_url + '/model/label.txt');
  const text = await response.text();
  classNames = text.trim().split('\n'); // pisahkan per baris
  console.log("✅ Labels loaded:", classNames);
}

async function init() {
  await Promise.all([loadModel(), loadLabels()]);
  console.log("✅ Model & labels ready!");
}

init();

// Event: drag over
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500', 'bg-blue-50');
});

// Event: drag leave
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500', 'bg-blue-50');
});

// Event: drop file
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    handleFiles(e.dataTransfer.files);
});

// Event: browse file
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Fungsi handle file upload
function handleFiles(files) {
    [...files].forEach(async (file) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      await image.decode(); // tunggu gambar ter-load

      // Konversi gambar ke tensor
      let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([128, 128]) // sesuaikan ukuran input model
        .toFloat()
        .expandDims();

      // Prediksi
      const prediction = model.predict(tensor);
      const result = await prediction.data();
      const highestIdx = result.indexOf(Math.max(...result));
      const label = classNames[highestIdx];
      const confidence = (result[highestIdx] * 100).toFixed(2);

      // Tampilkan di daftar
      const listItem = document.createElement('li');
      listItem.className = "flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm";
      listItem.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${image.src}" alt="Preview" class="w-16 h-16 object-cover rounded-lg border border-gray-300">
          <div>
            <p class="text-gray-500 text-md font-bold">Hasil: ${label} (${confidence}%)</p>
          </div>
        </div>
        <span class="text-green-600 text-md font-bold font-semibold">✔️</span>
      `;
      fileList.prepend(listItem);
    });
}