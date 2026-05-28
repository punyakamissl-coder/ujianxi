const subjectsData = [
    { name: "Matematika", token: "qweasd", url: "soal/matematika.html" },
    { name: "B. Indonesia", token: "cxzjiop", url: "soal/bindo.html" },
    { name: "B. Inggris", token: "rtgcvb", url: "soal/bing.html" },
    { name: "Budi Daya", token: "jsdpwe", url: "soal/fisika.html" },
    { name: "B. Inggris TL", token: "lkdpp", url: "soal/kimia.html" },
    { name: "Biologi", token: "fghjkl", url: "soal/biologi.html" },
    { name: "Sejarah", token: "asqwxvb", url: "soal/sejarah.html" },
    { name: "Ekonomi", token: "jdksnfgg", url: "soal/ekonomi.html" },
    { name: "Sosiologi", token: "sskkjjhh", url: "soal/sosiologi.html" },
    { name: "Alquran Hadist", token: "wedesn", url: "soal/ah.html" },
    { name: "P. Pancasila", token: "jshdksop", url: "soal/ppkn.html" },
    { name: "Seni Budaya", token: "werdrty", url: "soal/seni.html" },
    { name: "PJOK", token: "pjokpjok", url: "soal/pjok.html" },
    { name: "Informatika", token: "tikidfg", url: "soal/informatika.html" },
    { name: "B. Arab", token: "strewsd", url: "soal/ba.html" },
    { name: "Akidah Akhlak", token: "nvmcbdf", url: "soal/aa.html" },
    { name: "Fiqih", token: "utyrosj", url: "soal/fiqih.html" },
    { name: "SKI", token: "wsdfcvbn", url: "soal/ski.html" },
    { name: "BMR", token: "ytrioep", url: "soal/bmr.html" },
];

// Helper untuk mencari data mapel berdasarkan nama
const getSubjectInfo = (name) => subjectsData.find(s => s.name === name);