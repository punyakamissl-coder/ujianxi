// Data Initialization
const username = localStorage.getItem('username');
const currentSubject = localStorage.getItem('currentSubject');

console.log('Exam page loaded. Retrieved from localStorage:');
console.log('  username:', username);
console.log('  currentSubject:', currentSubject);

// Keamanan: Jika data login tidak ada, kembalikan ke halaman awal
if (!username || !currentSubject) {
    console.error('Security check failed on ujian.html:');
    alert("Sesi tidak ditemukan atau tidak sah. Silakan masuk melalui halaman pilihan mata pelajaran.");
    window.location.href = 'index.html'; // Redirect ke halaman awal
    throw new Error("Sesi tidak valid");
}
document.getElementById('userDisplay').innerText = username;
document.getElementById('mapelDisplay').innerText = currentSubject;

// Fullscreen Logic
function enterFullscreen() {
    const elem = document.documentElement;
    const requestMethod = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
    
    if (requestMethod) {
        requestMethod.call(elem).catch(err => {
            console.warn(`Gagal masuk fullscreen: ${err.message}`);
        });
    }
}

// Fungsi untuk memulai ujian dan memicu fullscreen
function startExamNow() {
    enterFullscreen();
    const startModal = document.getElementById('startModal');
    if (startModal) startModal.classList.add('hidden');

    // Generate Question Navigation (Mock 40 questions)
    const navGrid = document.getElementById('questionNavGrid');
    if (navGrid) {
        navGrid.innerHTML = '';
        for (let i = 1; i <= 40; i++) {
            const btn = document.createElement('button');
            btn.className = `h-10 w-10 flex items-center justify-center text-sm font-bold border rounded transition-all
                ${i === 1 ? 'ring-2 ring-blue-600 bg-white text-slate-800' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-400'}`;
            btn.innerText = i;
            btn.onclick = () => {
                document.getElementById('currentQuestionNum').innerText = i;
                // Logic to scroll iframe can be added here
            };
            navGrid.appendChild(btn);
        }
    }

    // Muat soal ke dalam iframe
    const subjectInfo = getSubjectInfo(currentSubject);
    const examFrame = document.getElementById('examFrame');
    if (subjectInfo && examFrame) {
        examFrame.src = subjectInfo.url;
    }
}
window.startExamNow = startExamNow;

// Timer Logic (90 Menit)
const totalTime = 90 * 60;
let timeLeft = totalTime;
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');

const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update Progress Bar
    const progress = (timeLeft / totalTime) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Waktu Habis!");
        window.location.href = "index.html";
    }
    timeLeft--;
}, 1000);

// Security Features
let violationCount = 0;

function triggerViolation() {
    violationCount++;
    // Tampilkan modal re-token dan sembunyikan peringatan biasa
    const retokenModal = document.getElementById('retokenModal');
    if (retokenModal) retokenModal.classList.remove('hidden');
    
    // Sembunyikan alert peringatan jika ada
    const alertBox = document.getElementById('alertBox');
    if (alertBox) alertBox.classList.add('hidden');
}

// 1. Deteksi Tab Switching (Visibility API)
document.addEventListener("visibilitychange", () => {
    if (document.hidden) triggerViolation();
});

// 2. Deteksi Keluar Fullscreen
const handleFullscreenChange = () => {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    const retokenModal = document.getElementById('retokenModal');
    const startModal = document.getElementById('startModal');
    
    const isRetokenModalHidden = retokenModal ? retokenModal.classList.contains('hidden') : true;
    const isStartModalHidden = startModal ? startModal.classList.contains('hidden') : true;

    // Hanya trigger violation jika bukan di awal ujian dan sedang tidak memproses re-token
    if (!isFullscreen && isRetokenModalHidden && isStartModalHidden) triggerViolation();
};

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

// Handle verifikasi token ulang
const retokenForm = document.getElementById('retokenForm');
if (retokenForm) {
    retokenForm.onsubmit = (e) => {
        e.preventDefault();
        const subjectInfo = getSubjectInfo(currentSubject);
        const inputToken = document.getElementById('inputRetoken').value.trim().toUpperCase();

        if (subjectInfo && inputToken === subjectInfo.token.toUpperCase()) {
            // Berikan jeda sangat singkat agar browser memproses penutupan modal sebelum fullscreen
            setTimeout(() => {
                document.getElementById('retokenModal').classList.add('hidden');
                document.getElementById('inputRetoken').value = '';
                enterFullscreen(); 
                console.log("Token valid, mencoba masuk fullscreen kembali...");
            }, 100);
        } else {
            alert("Token Salah! Hubungi pengawas untuk mendapatkan token.");
        }
    };
}

function closeAlert() {
    const alertBox = document.getElementById('alertBox');
    if (alertBox) alertBox.classList.add('hidden');
}

// 3. Cegah Klik Kanan & Inspect
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || 
        (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
    }
});

// 4. Konfirmasi Kembali
function confirmHome() {
    if (confirm("Apakah Anda yakin ingin keluar? Semua progress yang belum disimpan akan hilang.")) {
        window.location.href = 'index.html';
    }
}