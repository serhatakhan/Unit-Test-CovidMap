import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";

// test ortamındaki store'un kurulumunu yap, thunk middleware'ı kullandığımızı söyle
const mockStore = configureStore([thunk]);

// it'de test anlamına geliyor !!
it("yüklenme durumunda doğru bileşenler(yüklenme bileşeni) ekrana basılır", () => {
  // store'un yüklenme durumundaki halini simüle et
  const store = mockStore({
    isLoading: true,
    error: false,
    data: null,
  });

  // * sayfamız ne ile kaplanıyorsa (bildirim kütüphanesiyle kaplansa dahi)
  // test yaparken de o bileşende bu şekilde söylememiz lazım. hem store oluşturup tanıtacağız hem de birden çok sayfaya sahipse BrowserRouter ile sarmalayacağız
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // loader ekrana geliyor mu kontrol et(birden çok kart olduğu için all dedik, diğerinde bir tane var all demedik)
  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("hata durumunda doğru hata bileşeni ekrana basılır", () => {
  // store'un hata durumunu simüle et
  const store = mockStore({
    isLoading: false,
    error: "Cannot read properties of undefined (reading 'region')",
    data: null,
  });

  // test edilecek bileşeni renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // hatanın mesajını gösteren bileşen ekrana basıldı mı
  screen.getByText(/Cannot read properties/i);
});

it("veri gelme durumunda doğru kartlar ekrana basılır", () => {
  // store'un verinin geldiği durumdaki halinin bir kopyasını oluştur
  const store = mockStore(storeData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // ülke bayrağı ekrana geliyor mu
  /* Normal şartlarda <DetailPage>'i doğrudan ekrana basıyor olsaydık "find" cevabı doğru olurdu. çünkü DetailPage çalışacak dispatch edecek veriyi alacak vs.
  Ama biz şu an zaten store'daki veriyi simüle ettik. yani veri gelme durumunu zaten kendimiz tanımlamış olduk. verilerin geldiği senaryoda şunlara(storeData) sahip olsun dedik.
  Bu verilerin gelmesi şu noktada asenkron bir işlem değil. Bundan dolayo find ile almamıza gerek yok. "get" ile alacağız.*/
  const image = screen.getByRole("img")

  // resmin kaynağı doğru mu
  expect(image).toHaveProperty("src", storeData.data.country.flags.svg) //"https://flagcdn.com/br.svg" bunu da yazabilirdik dinamik kısım yerine

  // ülke başlığı ekrana geliyor mu(birden çok brazil yazan başlık var. biz spesifik olarak birini istediğimiz için ona data-testid vereceğiz.)
  const title = screen.getByTestId("title")

  // başlığın içeriği doğru mu
  expect(title).toHaveTextContent("Brazil")

  // kartlar ekrana geliyor mu
  // storeData.data.covid --> BU NESNEYİ BİLEŞENDE OLDUĞU GİBİ DİZİYE ÇEVİRMEMİZ LAZIM. biz buradaki her bilgiyi ekrana basıyoruz. teker teker yazmaya kalkarsak içinden çıkamayız. o yüzden DİZİYE çevireceğiz.
  const covidData = Object.entries(storeData.data.covid)

  // dizideki her bir eleman için key ve value değerleri ekrana basılıyor mu kontrol et. döngü yaptık.tekrar dizi oluşturmak istemediğimiz için forEach kullandık
  covidData.forEach((item)=> {
    // başlıklar doğru geldi mi
    screen.getAllByText(item[0].split("_").join(" "), {exact:false}) //{exact:false}-->yani birebir aynısına bakma. küçük harf olabilir büyük harf olabilir. 
    // değerler doğru geld mi
    screen.getAllByText(item[1])
  })
});

// * ARAYÜZE API'DEN GELEN VERİLERİ BASAN BİLEŞENLERİN TESTLERİNİ YAZARKEN, VERİ API'DEN GELİYOR
// MU? ŞEKLİNDE TEST YAPMAK SAĞLIKLI DEĞİL. VERİ APİ'DEN GELİYOR MU SAĞLIKLI BİR İŞLEM DEĞİL.
// * ONUN YERİNE İSE BU PROJEDE OLDUĞU GİBİ, YÜKLENME STATE'INI AYRI SİMÜLE EDİYORUZ.
// * BAŞARILI OLMA STATAE'INI AYRI, HATA OLMA STATE'INI AYRI SİMÜLE ETMEMİZ GEREKİYOR !!!
