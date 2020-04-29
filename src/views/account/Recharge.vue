<template>
  <div>
    <div class="Recharge">
      <top-head :title="title" @leftClick="goBack"></top-head>
      <div v-show="method=='1'">
        <div class="recharge_box recharge_box2">
          <div class="head_box">
            <div class="head_main">
              <div class="m_t">{{recharge_info.price|numFormatD}}</div>
              <div class="not_msg">Jumlah</div>
              <div class="m_t">{{recharge_info.code}}</div>
              <div class="not_msg">Kode Transaksi</div>
            </div>
          </div>
          <div class="main_box">
            <ol>
              <li>Catat kode pembayaran di atas dan datang ke gerai Alfamart, Alfa Midi, Alfa Express, Lawson atau DAN+DAN terdekat</li>
              <li>Beritahukan ke kasir bahwa anda ingin melakukan pembayaran PLASAMAL</li>
              <li>
                Jika kasir tidak mengetahui mengenai pembayaran PLASAMAL , informasikan ke kasir untuk
                membuka terminal e-transaction, pilih "no. 2 menu Pembayaran atau cari pada menu
                search"
              </li>
              <li>Minta kasir untuk menekan "Shift" dan "?" lalu ketik PLASAMAL , setelah itu klik OK</li>
              <li>Minta kasir untuk pilih "no.1 PLASAMAL - Pembayaran PLASAMAL "</li>
              <li>
                Kasir akan menanyakan kode pembayaran. Berikan kode pembayaran anda
                <span
                  class="yellow"
                >{{recharge_info.code}}</span>. Kasir akan
                melakukan konfirmasi data konsumen berupa Nama Merchant, Nama Konsumen, dan
                Nominal. Lakukan pembayaran ke kasir sejumlah nominal yang disebutkan
              </li>
              <li>
                Terima struk sebagai bukti pembayaran sudah sukses dilakukan. Notifikasi pembayaran
                akan langsung diterima oleh Merchant
              </li>
              <li>
                Selesai.
                <div>(Jika kode pembayaran diawalkan dengan 1174 , sebutkan bayar ke WAYANGPAY, kalau ada pilihan lagi, pilih WAYANGPAY VIA NICEPAY saja)</div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div v-show="method=='15'">
        <div class="recharge_box recharge_box2">
          <div class="head_box">
            <div class="head_main">
              <div class="m_t">{{recharge_info.price|numFormatD}}</div>
              <div class="not_msg">Jumlah</div>
              <div class="m_t">{{recharge_info.code}}</div>
              <div class="not_msg">Kode Transaksi</div>
            </div>
          </div>
          <div class="main_box">
            <ol>
              <li>Temukan Indomaret</li>
              <li>Masukkan PLASAMAL di kios</li>
              <li>Ketika hasilnya keluar, klik ikon PLASAMAL</li>
              <li>Masukkan nomor telepon dan kode pembayaran Anda dan klik Lanjut</li>
              <li>Tinjau informasi dan klik Lanjut</li>
              <li>Pilih pembayaran tunai atau non tunai</li>
              <li>Pilih pembayaran tunai dan bawa tanda terima dari mesin ke kasir untuk pembayaran</li>
            </ol>
          </div>
        </div>
      </div>
      <div v-show="method=='4'">
        <van-tabs v-model="active">
          <van-tab title="ATM">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Masukkan kartu dan pin ATM.</li>
                  <li>Pilih menu “Transfer”.</li>
                  <li>Pilih menu “Ke Rek Bank Lain”.</li>
                  <li>
                    Masukkan sandi Bank “
                    <span class="yellow">013</span>” dan pilih “Benar”.
                  </li>
                  <li>
                    Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (
                    <span
                      class="yellow"
                    >{{recharge_info.code}}</span>) dan pilih “Benar”.
                  </li>
                  <!-- <li>Masukkan nominal isi ulang (<span class="yellow">{{amount}}</span>) dan pilih “Benar”.</li> -->
                  <li>Masukkan nominal isi ulang dan pilih “Benar”</li>
                  <li>Pilih “Benar” pada halaman konfirmasi</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="ONLINE">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>
                    Login di
                    <a href="https://ib.bri.co.id/ib-bri/">https://ib.bri.co.id/ib-bri/</a>, masukkan username dan password.
                  </li>
                  <li>Pilih menu “Transfer”.</li>
                  <li>Pilih menu “Bank Lain”.</li>
                  <li>
                    Pilih kode Bank “Bank PERMATA (
                    <span class="yellow">013</span>)”.
                  </li>
                  <li>
                    Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (
                    <span
                      class="yellow"
                    >{{recharge_info}}</span>).
                  </li>
                  <!-- <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>)</li> -->
                  <li>Masukkan jumlah transfer (nominal isi ulang)</li>
                  <li>Pilih OK</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="MBANKING">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Masuk ke aplikias BRI Mobile.</li>
                  <li>Pilih menu “Transfer”.</li>
                  <li>Pilih menu “Bank Lain”.</li>
                  <li>
                    Pilih kode Bank “Bank PERMATA” (
                    <span class="yellow">013</span>).
                  </li>
                  <li>
                    Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (
                    <span
                      class="yellow"
                    >{{recharge_info.code}}</span>) .
                  </li>
                  <!-- <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>). </li> -->
                  <li>Masukkan jumlah transfer (nominal isi ulang)</li>
                  <li>Pilih OK</li>
                </ol>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div v-show="method=='10'">
        <van-tabs v-model="active">
          <van-tab title="ATM">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Masukkan Kartu ATM Permata dan PIN.</li>
                  <li>Pilih “Transaksi Lainya” > Pilih “Transfer” > Pilih “Rekening NSB di Permata"</li>
                  <li>
                    Masukkan Kode Pembayaran (
                    <span class="yellow">{{recharge_info.code}}</span>)
                  </li>
                  <li>Masukkan nominal</li>
                  <li>Ikuti Instruksi untuk menyelesaikan transaksi.</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="ONLINE">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Kunjungi Internet Banking Permata</li>
                  <li>Masukkan User Name dan Password</li>
                  <li>Pilih Pembayaran > Tagihan Pembayaran > Virtual Account</li>
                  <li>Masukan “Billing Number” dengan mengetikan “Kode Pembayaran” yang ada</li>
                  <li>Masukan nominal yang harus di bayar dan pilih “Lanjut”</li>
                  <li>Ikuti langkah selanjutnya sampai transaksi di nyatakan berhasil.</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="MBANKING">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Buka Aplikasi Mobile Banking Permata di HP</li>
                  <li>Masukkan User Name dan Password</li>
                  <li>
                    Pilih Pembayaran > Virtual Account > Pilih Rekening untuk Pembayaran > Pilih Tagihan Baru > Masukkan Kode Pembayaran (
                    <span
                      class="yellow"
                    >{{recharge_info.code}}</span>)
                  </li>
                  <li>Masukkan Nominal</li>
                  <li>Ikuti langkah selanjutnya sampai transaksi di nyatakan berhasil.</li>
                </ol>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div v-show="method=='2'||method == '6' || method == '3'||method == '5'">
        <van-tabs v-model="active">
          <van-tab title="ATM">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <ol>
                  <li>Pilih “Transfer” pada menu</li>
                  <li>Pilih “Ke Bank Lain” pada menu</li>
                  <li>
                    Masukan kode bank “
                    <span class="yellow">013</span>” dan pilih “Benar”
                  </li>
                  <li>
                    Masukan Kode Pembayaran (
                    <span class="yellow">{{recharge_info.code}}</span>) pada tujuan transfer
                  </li>
                  <li>Masukan nominal yang harus dibayarkan dan pilih “Benar”</li>
                  <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="ONLINE">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <p>Daftarkan VA anda untuk pertama kali</p>
                <ol>
                  <li>Masuk ke Internet Banking atau Mobile Banking anda, kemudian pilih Daftar Rekening Tujuan.</li>
                  <li>Pilih Rekening Bank Lain, kemudian klik "KIRIM" .</li>
                  <li>Pilih Bank Tujuan "BANK PERMATA"</li>
                  <li>Pilih Kota "JAKARTA".</li>
                  <li>Pilih Kategori Penerima "Perusahaan".</li>
                  <li>Pilih "YA" untuk Penduduk.</li>
                  <li>Pilih "YA" untuk WNI</li>
                  <li>Masukkan Nama Penerima “BLUEPAY”</li>
                  <li>
                    Masukkan No. Rekening Tujuan dengan Kode Pembayaran (
                    <span
                      class="yellow"
                    >{{recharge_info.code}}</span>)
                  </li>
                  <li>Masukkan 8 Angka yang tertera kedalam Key BCA Anda</li>
                  <li>Masukkan Angka yang tertera setelah respon didapat dari Key BCA</li>
                  <li>Lalu Klik Kirim</li>
                </ol>
                <p>Pembayaran VA yang sudah di daftarkan</p>
                <ol>
                  <li>Masuk Ke Menu Transfer ke Rek Bank Lain Dalam Negri .</li>
                  <li>Masukkan nomer rekening tujuan dengan nomor yang tadi didaftarkan .</li>
                  <!-- <li>Masukkan nominal (<span class="yellow">{{amount}}</span>) </li> -->
                  <li>Masukkan nominal yang ingin dibayarkan</li>
                  <li>Masukkan berita sesuai dengan keinginan (optional).</li>
                  <li>Untuk Layanan Transfer pilih LLG.</li>
                  <li>Masukkan 8 Angka yang tertera ke dalam Key BCA Anda .</li>
                  <li>Masukkan Respon yang terdapat dalam Key BCA anda kedalamnya</li>
                </ol>
              </div>
            </div>
          </van-tab>
          <van-tab title="MBANKING">
            <div class="recharge_box">
              <div class="head_box">
                <div class="head_main">
                  <div class="m_t">{{recharge_info.price|numFormatD}}</div>
                  <div class="not_msg">Jumlah</div>
                  <div class="m_t">{{recharge_info.code}}</div>
                  <div class="not_msg">Kode Transaksi</div>
                </div>
              </div>
              <div class="main_box">
                <p>Daftarkan VA anda untuk pertama kali</p>
                <ol>
                  <li>Masuk ke m-BCA.</li>
                  <li>Masukkan kode akses.</li>
                  <li>Pilih “m-Transfer”</li>
                  <li>Pada kolom Daftar Transfer, pilih “Antar Bank”.</li>
                  <li>
                    Pilih bank “PERMATA”, lalu masukkan Kode Pembayaran (
                    <span
                      class="yellow"
                    >{{recharge_info.code}}</span>).
                  </li>
                  <li>Klik “Send”.</li>
                </ol>
                <p>Pembayaran VA yang sudah di daftarkan.</p>
                <ol>
                  <li>Masuk ke m-BCA.</li>
                  <li>Masukkan kode akses.</li>
                  <li>Pilih “m-Transfer”</li>
                  <li>Pada kolom Transfer, pilih “Antar Bank”.</li>
                  <li>Pilih bank “013-BANK PERMATA”.</li>
                  <li>Pilih rekening tujuan yang sudah didaftarkan .</li>
                  <!-- <li>Masukkan jumlah uang (<span class="yellow">{{amount}}</span>)</li> -->
                  <li>Masukkan jumlah uang</li>
                  <li>Lalu klik “Send”</li>
                </ol>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from "@/components/TopHead";
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);
export default {
  name: "Recharge",
  components: {
    TopHead
  },
  data() {
    return {
      method: null,
      active: 0,
      title: "",
      recharge_info: {}
    };
  },
  created() {
    this.recharge_info = this.$store.state.rechargeInfo;
    this.method = this.recharge_info.method;
    this.setTitle();
  },
  methods: {
    setTitle() {
      switch (this.method) {
        case "1":
          this.title = "Bayar di Alfamart";
          break;
        case "2":
          this.title = "BCA";
          break;
        case "3":
          this.title = "Mandiri";
          break;
        case "4":
          this.title = "BRI";
          break;
        case "5":
          this.title = "BNI";
          break;
        case "6":
          this.title = "CIMB";
          break;
        case "7":
          this.title = "MEGA";
          break;
        case "8":
          this.title = "PANIN";
          break;
        case "9":
          this.title = "DANAMON";
          break;
        case "10":
          this.title = "PERMATA";
          break;
        case "11":
          this.title = "BII";
          break;
      }
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/account.less">
</style>


