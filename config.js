const subjectsData = [
    { name: "Matematika", token: "0", url: "soal/matematika.html" },
    { name: "B. Indonesia", token: "0", url: "soal/bindo.html" },
    { name: "B. Inggris", token: "0", url: "soal/bing.html" },
    { name: "Budi Daya", token: "0", url: "soal/bdaya.html" },
    { name: "B. Inggris TL", token: "0", url: "soal/bingtl.html" },
    { name: "Biologi", token: "0", url: "soal/biologi.html" },
    { name: "Sejarah", token: "0", url: "soal/sejarah.html" },
    { name: "Ekonomi", token: "0", url: "soal/ekonomi.html" },
    { name: "Sosiologi", token: "0", url: "soal/sosiologi.html" },
    { name: "Alquran Hadist", token: "0", url: "soal/ah.html" },
    { name: "P. Pancasila", token: "0", url: "soal/ppkn.html" },
    { name: "Seni Budaya", token: "0", url: "soal/seni.html" },
    { name: "PJOK", token: "0", url: "soal/pjok.html" },
    { name: "Informatika", token: "0", url: "soal/informatika.html" },
    { name: "B. Arab", token: "0", url: "soal/ba.html" },
    { name: "Akidah Akhlak", token: "0", url: "soal/aa.html" },
    { name: "Fiqih", token: "0", url: "soal/fiqih.html" },
    { name: "SKI", token: "0", url: "soal/ski.html" },
    { name: "BMR", token: "0", url: "soal/bmr.html" },
];

// Helper untuk mencari data mapel berdasarkan nama
const getSubjectInfo = (name) => subjectsData.find(s => s.name === name);
