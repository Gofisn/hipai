<template>
  <div class="Questions">
    <top-head title="Pertanyaan Umum" @leftClick="goBack"></top-head>
    <!-- <div class="head">Pertanyaan Umum</div> -->
    <div class="list">
      <van-collapse v-model="activeNames" accordion>
        <div class="main_tit">Apa itu Hi-Koin</div>
        <van-collapse-item
          title="Q: Cara mendapatkan Hi-Koin ?"
          name="1"
        >A: Hi-Koin diperoleh oleh pengguna dengan melike foto.</van-collapse-item>
        <van-collapse-item
          title="Q: Apa manfaat Hi-Koin ?"
          name="2"
        >A: Bonus Hi-Koin hasil melike foto dapat ditukarkan untuk voucher tugas, undian hadiah atau bisa ditukarkan dengan pemain lain dll.</van-collapse-item>
        <van-collapse-item title="Q: Perhitungan bonus Hi-Koin ?" name="3">
          <div>A: Ada dua cara untuk mendapatkan Hi-Koin: Pertama, dengan melakukan pembelian, kedua dengan meningkatkan skor yang diperoleh melalui aktivitas.</div>
          <div>A: Jumlah Hi-Koin/hari = (0,04 * Aktivitas Tugas * Jumlah Like ) + (0,04* Total Skor)</div>
        </van-collapse-item>
        <van-collapse-item
          title="Q: Hi-Koin dihitung secara perhari. .Jika tugas dilakukan selama 28 hari, dan 		kelewatan lupa 2 hari apakah Hi-Koin sebelumnya akan hangus ?"
          name="4"
        >A: Hi-Koin yang sebelumnya didapat tidak akan hilang, Hi-Koin bisa diperoleh setiap harinya, kemudian ditukarkan dengan berbagai voucher atau undian hadiah lainnya.</van-collapse-item>
        <van-collapse-item
          title="Q :Apakah ada biaya admin setiap melakukan penukaran undian di Mall dengan	Hi-Koin ?"
          name="5"
        >A: Beberapa item akan dikenakan biaya admin, (Hi-Koin) sebagai biaya kurir pengiriman barang.</van-collapse-item>
        <van-collapse-item
          title="Q: Waktu perhitungan Hi-Koin masuk ke akun sebagai saldo pemasukan ?"
          name="6"
        >A: Hi-Koin akan masuk ke dalam total perhitungan pada jam 23:59:59.</van-collapse-item>
        <van-collapse-item title="Q: Apa gunanya Hi-Koin ?" name="7">
          <div>A: Penukaran produk dapat dilakukan di Mall undian</div>
          <div>A: Dapat digunakan untuk membeli voucher tugas</div>
        </van-collapse-item>

        <div class="main_tit">Skor</div>
        <van-collapse-item
          title="Q: Apa itu skor? Bagaimana pengguna meningkatkan skor?"
          name="8"
        >A: Skor mengacu pada tingkat aktivitas pengguna menggunakan aplikasi PopLike, yang terdiri dari Skor Tugas dan Skor Bonus.</van-collapse-item>
        <van-collapse-item
          title="Q: Bagaimana cara mendapatkan Skor Tugas ?"
          name="9"
        >A: Jumlah total Hi-Koin; tukar voucher tugas. Semakin tinggi level tugas kamu, semakin tinggi pula skor tugas .</van-collapse-item>
        <van-collapse-item
          title="Q: Bagaimana cara mendapatkan Skor Bonus ?"
          name="10"
        >A: Ajak lebih banyak teman untuk bermain di aplikasi dan nikmati 0.5 tambahan skor . Kemudian terus tingkatkan tugas ke level yang lebih tinggi. Kamu juga bisa mendapatkan skor dengan mengajak pengguna lainnya bergabung ke grup kamu.</van-collapse-item>
        <van-collapse-item
          title="Q: Jika saya tidak mengerjakan tugas, apakah saya bisa mendapatkan skor ?"
          name="11"
        >A: Tidak mengerjakan tugas, maka tidak bisa mendapatkan skor. Tidak mendapatkan skor maka tidak dapat Hi-Koin.</van-collapse-item>
        <van-collapse-item
          title="Q: Saya punya skor yang tinggi, tetapi bisakah saya menghasilkan Hi-Koin tanpa melike foto ?"
          name="12"
        >A: Jika tidak melike foto, tidak bisa mendapatkan skor tugas, sehingga tidak dapat Hi-Koin. Maka disarankan untuk memastikan like foto.</van-collapse-item>
        <van-collapse-item
          title="Q: Mengapa skor saya menjadi sedikit ?"
          name="14"
        >A: Jika voucher tugas sudah kadarluasa dan tidak melakukan pembelian voucher tugas yang baru maka skoryang di dapat akan berkurang.</van-collapse-item>

        <div class="main_tit">Voucher Tugas</div>
        <van-collapse-item title="Q: Bagaimana mekanisme pengaturan tugas di platform ?" name="3A">
          <table>
            <thead>
              <tr>
                <th>Tugas Level</th>
                <th>HI-KOIN Yang Dibutuhkan</th>
                <th>Bonus Hi-Koin</th>
                <th>Jumlah Like Foto/Hari</th>
                <th>Skor Tugas</th>
                <th>Siklus Tugas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Tugas Pemula</th>
                <th>1</th>
                <th>10.8</th>
                <th>9</th>
                <th>1</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level I</th>
                <th>10</th>
                <th>12</th>
                <th>10</th>
                <th>1</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level II</th>
                <th>100</th>
                <th>120</th>
                <th>10</th>
                <th>10</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level III</th>
                <th>500</th>
                <th>660</th>
                <th>11</th>
                <th>50</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level IV</th>
                <th>1000</th>
                <th>1320</th>
                <th>11</th>
                <th>100</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level V</th>
                <th>5000</th>
                <th>7200</th>
                <th>12</th>
                <th>500</th>
                <th>30</th>
              </tr>
              <tr>
                <th>Tugas Level VI</th>
                <th>10000</th>
                <th>14400</th>
                <th>12</th>
                <th>1000</th>
                <th>30</th>
              </tr>
            </tbody>
          </table>
        </van-collapse-item>
        <van-collapse-item
          title="Q: Berapa lama untuk menyelesaikan setiap tugas?"
          name="15"
        >A: Setiap tugas membutuhkan waktu 30 hari untuk diselesaikan.</van-collapse-item>
        <van-collapse-item
          title="Q: Apakah tugas harus diselesaikan sesuai tingkatan level atau dapat dimulai dari level tertinggi?"
          name="16"
        >A: Selama Hi-Koin untuk tukar voucher tugas cukup, tugas dapat dimulai dari level mana saja.</van-collapse-item>
        <van-collapse-item
          title="Q: Bolehkan saya hanya mengerjakan tugas pemula saja?"
          name="17"
        >A: Tidak, tugas pemula hanya dapat dikerjakan satu kali saja.</van-collapse-item>
        <van-collapse-item
          title="Q: Apakah saya harus menyelesaikan tugas pemula agar dapat melanjutkan ke tugas berikutnya?"
          name="18"
        >A: Tidak perlu. Setiap anggota dapat melakukan hingga 11 tugas sekaligus (4 tugas Level I, 2 tugas Level II, 2 tugas Level III, 1 tugas Level IV, 1 tugas Level V, 1 tugas Level VI)</van-collapse-item>
        <van-collapse-item
          title="Q: Saya menukarkan beberapa voucher tugas pada saat yang bersamaan. Apakah jumlah like foto harus di lakukan berulang-ulang ?"
          name="19"
        >A: Tidak perlu, jika level tugas berbeda maka dapat dilakukan secara bersamaan sekaligus.</van-collapse-item>
        <van-collapse-item
          title="Q: Jika saya sehari tidak melike foto, apakah masih dapat hadiah?"
          name="20"
        >A: Hadiah untuk hari itu tidak didapatkan, tetapi Anda masih bisa mendapatkan Hi-Koin dari Skor Bonus</van-collapse-item>
        <div class="main_tit">Undang teman</div>
        <van-collapse-item
          title="Q: Bonus undang teman"
          name="21"
        >A: Undang teman untuk mendapatkan Skor Bonus. Semakin tinggi skor, semakin banyak Hi-Koin yang diperoleh.</van-collapse-item>
        <div class="main_tit">Tentang Team</div>

        <van-collapse-item
          title="Q: Bisakah satu orang bergabung dengan banyak team?"
          name="5a"
        >A: Satu orang hanya bisa bergabung dengan satu team. Isi kode undangan teman dan Anda telah berhasil bergabung dengan team.</van-collapse-item>
        <van-collapse-item
          title="Q: Apa gunanya bergabung dengan team?"
          name="5b"
        >A: Team terkait dengan Skor Bonus. Setiap teman yang Anda undang bisa mendapatkan bonus 0,1; sementara itu, Anda dapat menikmati Skor Bonus 5% dan skor aktivitas team 10%. Semakin aktif Anda, semakin banyak Hi-Koin yang bisa Anda dapatkan setiap hari.</van-collapse-item>
        <div class="main_tit">Ketua Team</div>
        <van-collapse-item
          title="Q: Bisakah semua orang bergabung atau membuat beberapa team?"
          name="6a"
        >A: Setiap orang hanya dapat memiliki satu team. Ketika Anda membuat team sendiri, Anda tidak dapat bergabung dengan team lain, ketika Anda bergabung dengan team lain, Anda tidak dapat membuat team sendiri.</van-collapse-item>
        <van-collapse-item
          title="Q: Apakah bonus yang didapat sama jika bergabung membuat team sendiri atau bergabung dengan team orang lain?"
          name="6b"
        >A: Tidak. Ketika Anda menjadi ketua team, Anda akan mendapatkan bonus 0,02 untuk setiap pemain baru yang Anda ajak bergabung. Jika Anda bergabung dengan team lain, Anda akan mendapatkan bonus 0,01 untuk setiap pemain baru yang Anda ajak bergabung.</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import Vue from "vue";
import { Collapse, CollapseItem } from "vant";

Vue.use(Collapse).use(CollapseItem);
export default {
  name: "Questions",
  data() {
    return {
      activeNames: "1"
    };
  },
  components: {
    TopHead
  },
  methods: {
    goBack() {
      this.$getSystemInfoFromApp("closeWebPage");
    }
  }
};
</script>

<style lang="less" scoped  src="../../assets/css/style.less">
</style>
