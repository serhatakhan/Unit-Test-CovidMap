import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "./../constants/index";
// * api'lerden bayrak ile ülke corona verisini alacak ve slice'a aktaracak asenkron thunk aksiyonu yaz

// bu bir aksiyon oluşturuyor. aksiyonun 2 değeri type ve payload. buradaki 2.değer payload fonk oluyor.
export const getData = createAsyncThunk("countryData", async (isoCode) => {
  // bu da api parametresi. dinamik değer taşıdığı için constants klasörüne atmadık.
  const params = { q: isoCode };

  //1- api'den corona bilgilerini alacağımız api isteğini ayarla
  const res1 = axios.get(
    `https://covid-19-statistics.p.rapidapi.com/reports`,{ params, headers });

  //2- farklı api'den ülke detaylarını alacağımız api isteğini ayarla
  const res2 = axios.get(
    `https://restcountries.com/v3.1/name/${isoCode}`);


  // * ÖNCE İLK İSTEĞİN CEVABI BEKLENİYOR. ONA CEVAP GELİNCE DİĞER İSTEĞİ ATIYOR. 
  // BU İSTEDİĞİMİZ BİR DURUM DEĞİL. "PROMISEALL" KULLANIP AYNI ANDA İSTEKLERİ ATACAĞIZ. 
  // BUNUN İÇİN İSTEK ATARKEN İSTEKLERİN BAŞINA AWAIT YAZMIŞTIK. ONLARI SİLİYORUZ !!!
  // * DİZİ ŞEKLİNDE OLACAK. AWAIT İLE BİRLİKTE AYNI ANDA İSTEK ATILMALARINI SAĞLA
  const responses = await Promise.all([res1, res2])


  // covid bilgilerindeki 'region' nesnesini, genel covid nesnesi içine dağıt
  const covid = {...responses[0].data.data[0], ...responses[0].data.data[0].region}
  // covid nesnesindeki artık gereksiz değerleri kaldır
  delete covid.region
  delete covid.cities


  // payloadı return et(nesne olarak return ettik kullanırken kolaylık olsun diye.)
  // dizi şeklinde cevap gelmişti. nesneye çevirdik
  return {
    covid,
    country: responses[1].data[0]
  }
});
