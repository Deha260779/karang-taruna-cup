// ==========================================
// KARANG TARUNA CUP MANAGER ENGINE
// Versi 2.0
// ==========================================

const Engine = {

    // Ambil data dari database
    get(key, defaultValue = null) {
        return DB.get(key, defaultValue);
    },

    // Simpan data
    set(key, value) {
        DB.set(key, value);
    },

    // Hapus data
    remove(key) {
        DB.remove(key);
    },

    // Acak array (Fisher-Yates)
    shuffle(array) {

        let arr = [...array];

        for (let i = arr.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];

        }

        return arr;
    },

    // Urutkan klasemen
    sortKlasemen(data) {

        return data.sort((a, b) => {

            if (b.poin !== a.poin) return b.poin - a.poin;

            if (b.sg !== a.sg) return b.sg - a.sg;

            return b.gm - a.gm;

        });

    }

};