import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

// yaptığımız testleri gruplandırıp isim vermeye yarıyor
describe("error display bileşeni", () => {
  // mesela testlerimizin hepsinde render ortaktır. bu kullanılabilir böyle bir durumda.
  // bu testlerimizde renderlar ortak değil. birinde mock var.
  beforeEach(() => {
    console.log("TESTİN ÇALIŞMASINDAN HEMEN ÖNCE");
  });

  beforeAll(() => {
    console.log("TESTİN ÇALIŞMASINDAN HEMEN SONRA");
  });


  test("doğru mesajı gösterir", () => {
    // hata mesajının örneğini oluşturduk. ne yazdığımız önemli değil
    const errorMessage = "404 content was not found";

    // bu testte fonskiyonu test etmeyeceğimi için boş bi fonk yolladık
    render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

    // doğru hata mesajına sahip yazı var mı?
    /** Bu bileşeni izole bir şekilde düşündüğümüzde bu bileşen api'den veri alsaydı find 
        kullanacaktık, böyle bir durum yok o yüzden get. kendi içinde hiçbir asenkron kod içermiyor bu bileşen. **/
    screen.getByText(errorMessage);

    // GEREKSİZ KALIYOR --> çünkü yukarıdaki de aynı işi yapıyor. bu metni ver diyor yukardaki. varsa veriyor yoksa fail zaten.
    // expect(item).toBeInTheDocument()
  });

  test("tekrar dene butonuna tıklanınca fonksiyon çalışır", async () => {
    const user = userEvent.setup(); //user-event kurulumu

    // fonksiyonu mocklama yani taklidini oluşturacağız(test fonksiyonu oluşturduk yani)
    const retryMock = jest.fn();

    // bileşeni renderla
    render(<ErrorDisplay message={"xx"} retry={retryMock} />);

    // butonu çağır
    const button = screen.getByRole("button");

    // butona tıkla(kurulumu yukarıda yapıldı)(async-await unutma !)
    await user.click(button);

    // fonk. çağırıldı mı kontrol et
    expect(retryMock).toHaveBeenCalled();
  });
});
