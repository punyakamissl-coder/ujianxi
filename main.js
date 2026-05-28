document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('subjectGrid');
    if (!grid) return;

    // Render Cards
    subjectsData.forEach(subject => {
        const card = document.createElement('div');
        card.className = "group relative bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden";
        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h4 class="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">${subject.name}</h4>
                <div class="flex items-center mt-4 space-x-3">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-500 border border-indigo-100">
                        Ujian Aktif
                    </span>
                    <span class="text-xs text-slate-500 font-medium group-hover:text-slate-400 transition-colors">Klik untuk masuk</span>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
        `;
        card.onclick = () => openModal(subject.name);
        grid.appendChild(card);
    });
});

function openModal(subjectName) {
    localStorage.setItem('currentSubject', subjectName);
    document.getElementById('modalTitle').innerText = subjectName;
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

document.getElementById('formLogin').onsubmit = (e) => {
    e.preventDefault();
    const selectedSubject = localStorage.getItem('currentSubject');
    const subjectInfo = getSubjectInfo(selectedSubject);
    // Menghapus spasi di awal/akhir dan mengubah ke huruf besar agar cocok dengan config.js
    const tokenInput = document.getElementById('token').value.trim().toUpperCase();

    if(subjectInfo && tokenInput === subjectInfo.token.toUpperCase()) {
        localStorage.setItem('username', document.getElementById('nama').value);
        localStorage.setItem('examNo', document.getElementById('nomor').value);
        console.log("Login Berhasil:", { subject: selectedSubject, user: document.getElementById('nama').value });
        window.location.href = 'ujian.html';
    } else {
        alert(`Token untuk ${selectedSubject || 'Mata Pelajaran'} salah! Periksa kembali kode token Anda.`);
    }
};